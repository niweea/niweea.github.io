---
title: "Linux netstat 命令详解"
date: 2023-01-15
description: "netstat 是 Linux 下强大的网络状态查看工具，可用于显示路由表、接口状态、连接状态等网络信息。本文详细介绍其参数用法与常用示例。"
tags: ["Linux", "网络", "运维", "命令行"]
categories: ["Linux 工具"]
---

## 简介

`netstat`（network statistics）是 Linux 系统下一款用于查看网络状态信息的经典工具。它可以显示网络连接、路由表、接口统计、伪装连接、多播成员等信息，是网络排查和运维监控的常用利器。

> **注意：** 在较新的 Linux 发行版中，`netstat` 已被 `ss` 命令逐步替代，但 `netstat` 在生产环境中仍被广泛使用。可通过安装 `net-tools` 包来获取 `netstat`。
>
> ```bash
> # Debian / Ubuntu
> sudo apt install net-tools
>
> # RHEL / CentOS
> sudo yum install net-tools
> ```

---

## 参数说明

| 参数 | 说明 |
|------|------|
| `-a` | 显示所有连接和侦听端口（包括 TCP、UDP） |
| `-c` | 持续输出，每隔一秒刷新一次连接信息 |
| `-e` | 显示网络数据包的统计信息（入站/出站数量、错误数等） |
| `-g` | 显示多播组（Multicast Group）成员信息 |
| `-i` | 显示网络接口的统计信息 |
| `-l` | 仅显示处于监听（LISTEN）状态的端口 |
| `-n` | 不解析主机名和服务名，直接显示 IP 地址和端口号 |
| `-p` | 显示占用端口的进程名称及 PID |
| `-r` | 显示内核路由表 |
| `-s` | 显示各协议（TCP、UDP、ICMP 等）的统计信息 |
| `-t` | 仅显示 TCP 协议的连接 |
| `-u` | 仅显示 UDP 协议的连接 |
| `-v` | 显示详细输出信息 |
| `-w` | 显示 RAW 套接字的连接信息 |

---

## 常用示例

### 查看所有连接

```bash
netstat -a
```

显示所有处于活动状态和监听状态的连接，包含 TCP 和 UDP。

---

### 查看 TCP / UDP 连接

```bash
# 仅查看 TCP 连接
netstat -t

# 仅查看 UDP 连接
netstat -u

# 同时查看 TCP 和 UDP
netstat -tu
```

---

### 查看监听端口

```bash
# 显示所有监听端口
netstat -l

# 仅显示监听中的 TCP 端口
netstat -lt

# 仅显示监听中的 UDP 端口
netstat -lu
```

---

### 查看端口对应的进程

```bash
# 需要 root 权限才能看到所有进程信息
sudo netstat -p

# 查看监听端口及其进程（常用组合）
sudo netstat -tlnp
```

输出示例：

```
Proto Recv-Q Send-Q Local Address   Foreign Address  State   PID/Program name
tcp        0      0 0.0.0.0:22      0.0.0.0:*        LISTEN  1234/sshd
tcp        0      0 0.0.0.0:80      0.0.0.0:*        LISTEN  5678/nginx
```

---

### 不解析域名（加快输出速度）

```bash
netstat -n

# 实用组合：查看所有 TCP 连接，不解析域名，显示进程
sudo netstat -tnp
```

加上 `-n` 参数后，输出中的主机名和服务名将直接以 IP 和端口号显示，速度更快。

---

### 查看网络接口信息

```bash
netstat -i
```

输出各网络接口的收发包数量、错误数、丢包数等统计信息，类似 `ifconfig` 的统计部分。

---

### 查看路由表

```bash
netstat -r

# 等价于 route -n，加 -n 不解析主机名
netstat -rn
```

---

### 查看协议统计信息

```bash
netstat -s
```

分协议（TCP、UDP、ICMP、IP 等）显示数据包收发、错误、重传等详细统计，适合排查网络异常。

---

### 持续监控连接

```bash
netstat -c
```

每隔 1 秒自动刷新并输出当前连接状态，适合实时观察网络变化。

---

### 查看多播组信息

```bash
netstat -g
```

显示当前系统加入的多播组列表，用于排查组播相关问题。

---

## 常用组合速查

| 场景 | 命令 |
|------|------|
| 查看所有监听端口及进程 | `sudo netstat -tlnp` |
| 查看所有 TCP 连接状态 | `netstat -tn` |
| 统计各 TCP 状态数量 | `netstat -tn \| awk '{print $6}' \| sort \| uniq -c` |
| 查看路由表 | `netstat -rn` |
| 实时监控连接 | `netstat -c` |
| 查看网络接口统计 | `netstat -i` |
| 查看协议详细统计 | `netstat -s` |

---

## TCP 连接状态说明

使用 `netstat -t` 时，`State` 列会显示 TCP 连接的当前状态，常见状态如下：

| 状态 | 说明 |
|------|------|
| `LISTEN` | 监听中，等待客户端连接 |
| `ESTABLISHED` | 连接已建立，正在通信 |
| `TIME_WAIT` | 连接已关闭，等待超时后释放 |
| `CLOSE_WAIT` | 等待本端关闭连接 |
| `SYN_SENT` | 已发送 SYN，等待对端响应 |
| `SYN_RECV` | 收到 SYN，等待 ACK 确认 |
| `FIN_WAIT1` | 已发送 FIN，等待对端响应 |
| `FIN_WAIT2` | 收到对端 ACK，等待对端 FIN |
| `CLOSING` | 双方同时发起关闭 |
| `CLOSED` | 连接已完全关闭 |

---

## 与 `ss` 命令对比

`ss` 是 `netstat` 的现代替代品，速度更快，输出更丰富：

| 功能 | netstat | ss |
|------|---------|----|
| 查看所有连接 | `netstat -a` | `ss -a` |
| 查看监听端口 | `netstat -tlnp` | `ss -tlnp` |
| 查看 TCP 状态 | `netstat -tn` | `ss -tn` |
| 过滤特定端口 | 需配合 `grep` | `ss -tnp sport = :80` |

在系统资源有限或连接数量较大时，推荐优先使用 `ss`。

---

## 参考

- `man netstat`
- [net-tools GitHub](https://github.com/ecki/net-tools)
- Linux `ss` 命令文档：`man ss`
