---
title: "压测工具"
date: 2020-10-28T09:00:00+08:00
tags: ["压测", "wrk", "ab", "性能测试"]
categories: ["工具使用"]
description: "命令行 HTTP 压测工具 ab 与 wrk 的使用方法、Lua 脚本定制及压测实践建议。"
---

HTTP 接口压测是评估服务容量和延迟的常用手段。命令行场景下，`ab` 适合快速验证，`wrk` 则在高并发和请求定制上更强。本文介绍两者的基本用法，并重点说明 wrk 的 Lua 脚本扩展。


ab
======

Apache Benchmark（`ab`）来自 Apache HTTP Server 工具集，安装简单、上手快，适合对单个 URL 做快速冒烟压测。

### 安装

```bash
# RHEL / CentOS
yum install httpd-tools

# Debian / Ubuntu
apt install apache2-utils

# macOS
brew install httpd
```

### 基本用法

```bash
ab -n 10000 -c 100 -k http://127.0.0.1:8080/
```

常用参数：

| 参数 | 说明 |
|------|------|
| `-n` | 总请求数 |
| `-c` | 并发数（同时发起的请求数） |
| `-k` | 启用 HTTP Keep-Alive |
| `-p` | POST 请求体文件路径 |
| `-T` | Content-Type，配合 `-p` 使用 |
| `-H` | 自定义请求头，可多次指定 |

POST 示例：

```bash
ab -n 1000 -c 50 -p body.json -T application/json http://127.0.0.1:8080/api
```

### 输出解读

关注以下几项：

- **Requests per second**：吞吐量（QPS），越高越好
- **Time per request (mean)**：平均响应时间；括号内为每个并发连接的平均时间
- **Transfer rate**：网络吞吐
- **Failed requests**：非 2xx 响应或连接失败，应为 0

### 局限

- 单 URL、单方法，复杂场景需借助脚本或换工具
- 性能低于 wrk，高并发压测时容易先打满压测机
- POST 定制能力弱，动态 body 需借助外部文件


wrk
======

[wrk](https://github.com/wg/wrk) 是一款 C 语言开发的 HTTP 压测工具，性能高，并支持通过 LuaJIT 脚本定制请求内容、节奏和结果统计。

### 安装

```bash
# macOS
brew install wrk

# 源码编译
git clone https://github.com/wg/wrk.git && cd wrk && make
```

### 基本用法

```bash
wrk -t12 -c400 -d30s --latency http://127.0.0.1:8080/index.html
```

参数说明：

| 参数 | 说明 |
|------|------|
| `-t, --threads <N>` | 压测线程数，通常设为 CPU 核数或其倍数 |
| `-c, --connections <N>` | 保持的 TCP 连接数，即并发连接数 |
| `-d, --duration <T>` | 压测持续时间，如 `30s`、`2m` |
| `-s, --script <S>` | Lua 脚本路径，用于定制请求 |
| `-H, --header <H>` | 为每个请求添加 HTTP 头 |
| `--latency` | 压测结束后输出延迟分布（建议始终加上） |
| `--timeout <T>` | Socket / 请求超时时间 |

`<N>` 支持国际单位（`1k`、`1M`），`<T>` 支持时间单位（`2s`、`2m`、`2h`）。

### 输出解读

```
Running 30s test @ http://127.0.0.1:8080/index.html
  12 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency     2.50ms    1.20ms   45.00ms   89.00%
    Req/Sec    13.50k     1.20k   16.00k    85.00%
  Latency Distribution
     50%    2.00ms
     75%    3.00ms
     90%    4.50ms
     99%   12.00ms
  4860000 requests in 30.00s, 580.00MB read
Requests/sec: 162000.00
Transfer/sec:     19.33MB
```

- **Requests/sec**：QPS
- **Latency Distribution**：延迟分位数，P99 是衡量长尾延迟的关键指标
- **Thread Stats → Req/Sec**：单线程吞吐，可判断线程数是否合适


Lua 脚本
======

wrk 在启动、运行、结束三个阶段提供 Lua 钩子，用于定制请求和统计结果。

### 生命周期

```
setup(thread)          ← 每个线程启动前，调用一次
  └─ init(args)        ← 每个线程开始执行时，调用一次
       ├─ delay()      ← 每次请求前，返回等待毫秒数（可选）
       ├─ request()    ← 每次请求前，构造请求（可选）
       └─ response()   ← 每次收到响应后（可选）
done(summary, ...)     ← 全部线程结束后，调用一次
```

### 各函数说明

| 函数 | 调用时机 | 作用 |
|------|----------|------|
| `setup(thread)` | 每个线程启动前，一次 | 线程级初始化，如设置 thread 变量 |
| `init(args)` | 每个线程开始执行时，一次 | 线程内状态初始化，如随机数种子、预生成数据 |
| `delay()` | 每次请求前 | 返回等待毫秒数，模拟用户思考时间；默认 0 |
| `request()` | 每次发请求前 | 构造并返回 HTTP 请求；不定义则使用命令行 URL |
| `response(status, headers, body)` | 收到响应后 | 校验响应、统计错误码 |
| `done(summary, latency, requests)` | 压测结束 | 输出自定义汇总指标 |

`setup` 在 wrk 进程启动时执行，`init` 在线程真正开始发请求前执行。需要 per-thread 状态时，优先在 `init` 中初始化。

### 使用示例

指定线程数、连接数、压测时间，并用 Lua 脚本发送 POST JSON 请求：

```bash
wrk -t50 -c500 -d30s --latency -s load.lua http://localhost/filter
```

`load.lua`：

```lua
-- 全局默认设置（也可在 request() 中覆盖）
wrk.method  = "POST"
wrk.headers["Content-Type"] = "application/json"

local key_length = 16
local charset = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

-- 每个线程独立的状态
local keys_pool = {}

local function random_key(n)
    local s = {}
    for i = 1, n do
        local idx = math.random(1, #charset)
        s[i] = charset:sub(idx, idx)
    end
    return table.concat(s)
end

-- 在线程 init 阶段预生成 body 模板，避免 request() 中重复构造
function init(args)
    math.randomseed(os.time() + wrk.thread:get("id"))
    for i = 1, 10 do
        local keys = {}
        for j = 1, 100 do
            keys[j] = random_key(key_length)
        end
        keys_pool[i] = string.format(
            '{"filter":"bloom","keyspace":"default","action":2,"keys":[%s]}',
            '"' .. table.concat(keys, '","') .. '"'
        )
    end
end

local counter = 0

function request()
    counter = counter + 1
    wrk.body = keys_pool[((counter - 1) % #keys_pool) + 1]
    return wrk.format()
end

function response(status, headers, body)
    if status ~= 200 then
        print("unexpected status: " .. status)
    end
end

function done(summary, latency, requests)
    print(string.format("total errors: %d", summary.errors.status + summary.errors.read + summary.errors.write + summary.errors.timeout))
end
```

示例说明：

- 业务场景：向 `/filter` 接口批量提交 100 个 key 的 bloom filter 查询请求
- `init` 中预生成 body 模板，避免每次请求都跑随机数和 JSON 序列化，减少对压测结果的干扰
- 手写 JSON 而非 `require "cjson"`：wrk 内置 LuaJIT **不包含 cjson**，直接使用会报错；若必须用 cjson，需自行编译带该库的 wrk
- `response` 校验非 200 响应，`done` 汇总错误数


压测实践建议
======

### 参数选型

- **`-t`（线程数）**：从 CPU 核数开始，观察单线程 Req/Sec，再逐步增加
- **`-c`（连接数）**：对应目标并发用户数；过高可能先耗尽压测机端口或文件描述符
- **`-d`（持续时间）**：至少 30s，并预留预热时间；短压测容易受冷启动影响

### 压测前检查

```bash
# 确认文件描述符上限足够
ulimit -n 65535
```

- 被测服务与压测机尽量隔离，避免 localhost 压测掩盖真实网络延迟
- 压测期间同步观察被测服务的 CPU、内存、GC、连接数等指标
- 丢弃前几秒的预热数据，或先跑一轮不计结果的 warmup

### 常见误区

| 问题 | 原因 | 建议 |
|------|------|------|
| QPS 远低于预期 | Lua 脚本开销过大 | 在 `init` 预生成数据，简化 `request()` |
| 大量 connection refused | 压测机端口耗尽 | 提高 `ulimit -n`，或降低 `-c` |
| P99 极高 | 服务 GC、锁竞争或队列积压 | 结合 APM / 监控定位，而非只看 QPS |
| wrk 结果与服务端日志不一致 | 压测的是错误响应 | 用 `response()` 校验状态码 |

### ab 与 wrk 选型

| 维度 | ab | wrk |
|------|----|-----|
| 上手成本 | 低 | 中 |
| 峰值性能 | 较低 | 较高 |
| 请求定制 | 弱（POST 需文件） | 强（Lua 脚本） |
| 适用场景 | 快速冒烟、简单 GET/POST | 高并发、动态 body、自定义统计 |

其他常用工具：`hey`（Go，语法简洁）、`vegeta`（Go，支持速率控制）、`k6`（JavaScript 脚本，适合复杂场景）。


参考链接
======

- [wrk GitHub](https://github.com/wg/wrk)
- [Apache Benchmark 文档](https://httpd.apache.org/docs/current/programs/ab.html)
