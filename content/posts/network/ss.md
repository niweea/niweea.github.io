---
title: "Linux ss 命令详解"
date: 2023-01-29
description: "ss 是 Linux 下用于替代 netstat 的现代网络状态查看工具，直接调用内核 Netlink 接口，速度更快、信息更丰富。本文详细介绍其参数用法与实践案例。"
tags: ["Linux", "网络", "运维", "命令行"]
categories: ["Linux 工具"]
---

## 简介

`ss`（Socket Statistics）是 Linux 系统中用于查看网络连接状态的现代工具，是 `netstat` 的官方替代品，由 `iproute2` 工具包提供。

与 `netstat` 读取 `/proc/net/` 虚拟文件系统不同，`ss` 直接通过内核的 **Netlink 接口**获取套接字信息，因此在连接数量大时性能显著更优，输出的信息也更加详细。

> 在大多数现代 Linux 发行版中，`ss` 已预装。如未安装，可通过以下命令获取：
>
> ```bash
> # RHEL / CentOS / Fedora
> sudo yum install iproute iproute-doc
>
> # Debian / Ubuntu
> sudo apt install iproute2
> ```

---

## 参数说明

| 选项 | 长选项 | 说明 |
|------|--------|------|
| `-h` | `--help` | 显示帮助信息并退出 |
| `-V` | `--version` | 显示版本信息并退出 |
| `-n` | `--numeric` | 以数字形式显示 IP 地址和端口号，不解析服务名 |
| `-r` | `--resolve` | 解析并显示主机名称 |
| `-a` | `--all` | 显示所有连接，包括监听和非监听状态 |
| `-l` | `--listening` | 仅显示处于监听（LISTEN）状态的套接字 |
| `-o` | `--options` | 显示计时器信息（如 keepalive、retrans） |
| `-e` | `--extended` | 显示详细连接信息（UID、inode 等） |
| `-m` | `--memory` | 显示套接字的内存使用情况 |
| `-p` | `--processes` | 显示占用套接字的进程名称和 PID |
| `-i` | `--info` | 显示 TCP 内部信息（拥塞窗口、RTT 等） |
| `-s` | `--summary` | 显示各协议的套接字统计摘要 |
| `-4` | `--ipv4` | 仅显示 IPv4 套接字 |
| `-6` | `--ipv6` | 仅显示 IPv6 套接字 |
| `-0` | `--packet` | 显示 PACKET 套接字信息 |
| `-t` | `--tcp` | 仅显示 TCP 连接 |
| `-u` | `--udp` | 仅显示 UDP 连接 |
| `-d` | `--dccp` | 显示 DCCP 连接信息 |
| `-w` | `--raw` | 显示 RAW 套接字连接信息 |
| `-x` | `--unix` | 显示 UNIX Domain Socket 连接信息 |
| `-f` | `--family=FAMILY` | 指定地址族，如 `inet`、`inet6`、`unix` |
| `-Z` | `--context` | 显示 SELinux 安全上下文信息 |
| `-z` | `--context-addr` | 显示套接字及地址的 SELinux 上下文 |
| `-N` | `--net=NSNAME` | 在指定的网络命名空间中查找连接信息 |

---

## 常用示例

### 查看所有连接

```bash
ss -a
```

显示所有套接字，包括 TCP、UDP、UNIX socket，以及监听和已建立的连接。

---

### 查看 TCP / UDP 连接

```bash
# 仅查看 TCP 连接
ss -t

# 仅查看 UDP 连接
ss -u

# 同时查看 TCP 和 UDP（含监听状态）
ss -tua
```

---

### 查看监听端口

```bash
# 所有监听端口
ss -l

# 仅 TCP 监听端口
ss -tl

# 仅 UDP 监听端口
ss -ul
```

---

### 查看监听端口及对应进程

```bash
sudo ss -tlnp
```

这是日常最常用的组合，输出示例：

```
State   Recv-Q  Send-Q  Local Address:Port  Peer Address:Port  Process
LISTEN  0       128     0.0.0.0:22         0.0.0.0:*          users:(("sshd",pid=1234,fd=3))
LISTEN  0       511     0.0.0.0:80         0.0.0.0:*          users:(("nginx",pid=5678,fd=6))
LISTEN  0       128     127.0.0.1:3306     0.0.0.0:*          users:(("mysqld",pid=9012,fd=21))
```

各参数含义：`-t` TCP、`-l` 监听、`-n` 不解析域名、`-p` 显示进程。

---

### 查看统计摘要

```bash
ss -s
```

输出示例：

```
Total: 432
TCP:   28 (estab 12, closed 3, orphaned 0, timewait 3)

Transport  Total  IP   IPv6
RAW        0      0    0
UDP        8      6    2
TCP        25     18   7
INET       33     24   9
FRAG       0      0    0
```

快速了解当前系统套接字总体状况，适合日常巡检。

---

### 过滤特定端口

`ss` 支持强大的过滤表达式，无需借助 `grep`：

```bash
# 查看本地 80 端口的连接
ss -tnp sport = :80

# 查看目标端口为 443 的连接
ss -tnp dport = :443

# 查看本地端口范围 8000~9000
ss -tnp sport gt :8000 and sport lt :9000
```

---

### 过滤特定 IP

```bash
# 查看来自指定 IP 的连接
ss -tn dst 192.168.1.100

# 查看发往指定网段的连接
ss -tn dst 10.0.0.0/24
```

---

### 查看 UNIX Domain Socket

```bash
ss -x

# 仅查看监听的 UNIX socket
ss -xl
```

常用于排查本机进程间通信（如 Nginx 与 PHP-FPM 的 socket 通信）。

---

### 查看 TCP 内部详情

```bash
ss -tni
```

输出示例：

```
ESTAB  0  0  [::ffff:10.67.73.70]:39424  [::ffff:10.60.64.75]:3717
     cubic wscale:9,9 rto:207 rtt:6.747/10.607 ato:40 mss:1440 pmtu:1500 rcvmss:820 advmss:1460 cwnd:10 bytes_sent:500 bytes_acked:501 bytes_received:4765026 segs_out:5815 segs_in:5814 data_segs_out:2 data_segs_in:5811 send 17074255bps lastsnd:58158181 lastrcv:9270 lastack:39296 pacing_rate 34147240bps delivery_rate 7097960bps delivered:3 app_limited busy:44ms rcv_rtt:233260 rcv_space:65622 rcv_ssthresh:4195079 minrtt:1.623 snd_wnd:41984
```

详细说明（按行解读）：

1. 第一行（连接基本信息）

- `ESTAB`：连接状态为已建立（ESTABLISHED）。
- 前两个 `0 0`：分别是 `Recv-Q` 和 `Send-Q`，表示当前收发队列长度。
- `[::ffff:10.67.73.70]:39424`：本地地址与端口，属于 IPv4-mapped IPv6 表示法（实际 IPv4 地址是 `10.67.73.70`）。
- `[::ffff:10.60.64.75]:3717`：对端地址与端口（实际 IPv4 地址是 `10.60.64.75`）。

2. 第二行（拥塞控制与时延基础参数）

- `cubic`：当前拥塞控制算法。
- `wscale:9,9`：发送/接收窗口扩大因子。
- `rto:207`：重传超时时间（毫秒），过大通常代表链路质量一般或抖动明显。
- `rtt:6.747/10.607`：RTT 平均值/抖动（毫秒），后者通常可近似理解为 RTT 方差带来的波动。
- `ato:40`：延迟 ACK 相关定时（毫秒）。
- `mss:1440`：当前连接使用的最大报文段大小（Maximum Segment Size）。
- `pmtu:1500`：路径 MTU（Path MTU）。

3. 第三行（接收能力与拥塞窗口）

- `rcvmss:820`：接收方向观测到的 MSS。
- `advmss:1460`：通告给对端的 MSS。
- `cwnd:10`：拥塞窗口大小（单位通常可近似看作 MSS 个数）。
- `bytes_sent:500`：已发送字节总量。
- `bytes_acked:501`：被对端确认的字节数。
- `bytes_received:4765026`：已接收字节总量。

4. 第四行（确认与分段计数）

- `segs_out:5815` / `segs_in:5814`：发送/接收 TCP 段数量。
- `data_segs_out:2` / `data_segs_in:5811`：仅统计“携带数据”的 TCP 段，能反映业务方向是否明显偏单向。

5. 第五行（瞬时发送速率与最近活动时间）

- `send 17074255bps`：当前估算发送速率。
- `lastsnd:58158181`：距上次发送经过的时间（毫秒）；数值很大说明本端近期几乎不发送数据。
- `lastrcv:9270`：距上次接收经过的时间（毫秒）。
- `lastack:39296`：距上次 ACK 的时间（毫秒）。
- `pacing_rate 34147240bps`：内核 pacing 限速估算值，用于平滑发包。

6. 第六行（有效吞吐与应用限速信号）

- `delivery_rate 7097960bps`：有效交付速率（比 `send` 更贴近“真正送达对端”的吞吐）。
- `delivered:3`：已成功交付的数据段统计。
- `app_limited`：发送受应用供数速度限制，而非网络瓶颈（应用写得慢时常见）。
- `busy:44ms`：发送路径处于忙碌状态的累计时间片段。

7. 第七行（接收方向时延与窗口）

- `rcv_rtt:233260`：接收方向估算 RTT（微秒，约等于 233ms）。
- `rcv_space:65622`：当前接收窗口可用空间。
- `rcv_ssthresh:4195079`：接收侧慢启动阈值相关指标。
- `minrtt:1.623`：观测到的最小 RTT（毫秒），可作为链路“理想时延”参考。
- `snd_wnd:41984`：对端通告给本端的发送窗口，过小会限制本端可发送数据量。

快速判读建议：

- `bytes_retrans` 持续上涨 + `rtt` 抖动变大：优先怀疑链路丢包/拥塞。
- `cwnd` 长期较小且上不去：可能受丢包或拥塞控制收敛限制。
- `Send-Q` 长期堆积：对端接收慢或网络瓶颈。
- 出现 `app_limited` 且吞吐低：先排查应用写入速率，不一定是网络问题。

---

### 查看计时器信息

```bash
ss -tno
```

输出示例：

```
ESTAB  0  0  10.0.0.1:22  10.0.0.2:51234  timer:(keepalive,1min52sec,0)
```

可以看到 keepalive、retrans 等计时器的剩余时间，用于判断连接是否即将超时。

---

## 实践案例

### 案例一：排查端口被占用

部署服务时提示 `address already in use`，快速定位占用进程：

```bash
sudo ss -tlnp | grep :8080
```

输出：

```
LISTEN  0  128  *:8080  *:*  users:(("java",pid=23456,fd=88))
```

发现是 PID 为 `23456` 的 Java 进程占用了 8080 端口，执行 `kill 23456` 或 `systemctl stop <service>` 释放端口。

---

### 案例二：统计 TCP 连接状态分布

服务器响应变慢，快速统计各 TCP 状态的连接数量：

```bash
ss -tn | awk 'NR>1 {print $1}' | sort | uniq -c | sort -rn
```

输出示例：

```
 1024 ESTABLISHED
  512 TIME_WAIT
   32 CLOSE_WAIT
    8 SYN_SENT
```

`TIME_WAIT` 过多说明短连接频繁，可考虑开启连接复用；`CLOSE_WAIT` 过多说明服务端代码未及时关闭连接，需排查业务逻辑。

---

### 案例三：监控指定服务的连接数

实时统计 Nginx（80/443 端口）当前的并发连接数：

```bash
# 统计 80 端口 ESTABLISHED 连接数
ss -tn state established sport = :80 | wc -l

# 同时统计 80 和 443
ss -tn state established '( sport = :80 or sport = :443 )' | wc -l
```

---

### 案例四：排查 MySQL 远程连接

检查 MySQL 是否在监听远程连接，以及当前有哪些 IP 连入：

```bash
# 查看 MySQL 监听情况
sudo ss -tlnp | grep :3306

# 查看当前所有 MySQL 连接及来源 IP
sudo ss -tnp dst :3306
```

若发现 MySQL 监听在 `0.0.0.0:3306`（而非 `127.0.0.1:3306`），需检查防火墙规则和 MySQL 的 `bind-address` 配置，避免安全风险。

---

## 常用组合速查

| 场景 | 命令 |
|------|------|
| 查看监听端口及进程 | `sudo ss -tlnp` |
| 查看所有 TCP 连接 | `ss -tn` |
| 统计各 TCP 状态数量 | `ss -tn \| awk 'NR>1 {print $1}' \| sort \| uniq -c` |
| 过滤指定端口连接 | `ss -tnp sport = :端口号` |
| 查看 TCP 底层指标 | `ss -tni` |
| 查看套接字统计摘要 | `ss -s` |
| 查看 UNIX socket | `ss -xlp` |
| 查看计时器信息 | `ss -tno` |

---

## 与 `netstat` 命令对比

| 功能 | `netstat` | `ss` |
|------|-----------|------|
| 查看所有连接 | `netstat -a` | `ss -a` |
| 查看监听端口及进程 | `sudo netstat -tlnp` | `sudo ss -tlnp` |
| 过滤特定端口 | 需配合 `grep` | `ss -tnp sport = :80` |
| 过滤特定 IP | 需配合 `grep` | `ss -tn dst 192.168.1.1` |
| 查看 TCP 底层指标 | 不支持 | `ss -tni` |
| 查看内存使用 | 不支持 | `ss -m` |
| 大量连接时性能 | 较慢（读取 /proc） | 快（Netlink 接口） |
| 系统预装情况 | 需安装 `net-tools` | 现代发行版默认预装 |

---

## 参考

- `man ss`
- [iproute2 源码仓库](https://github.com/iproute2/iproute2)
