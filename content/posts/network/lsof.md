---
title: "Linux lsof 命令详解"
date: 2023-01-12
description: "lsof（List Open Files）列出进程打开的文件与网络连接，是 Linux 运维排查「谁占用了文件/端口/设备」的必备工具。本文介绍常用参数、网络与文件场景及实践案例。"
tags: ["Linux", "网络", "运维", "命令行"]
categories: ["Linux 工具"]
---

## 简介

`lsof`（List Open Files）用于列出当前系统上进程已打开的**文件描述符**及其关联信息。在 Unix/Linux 中，「一切皆文件」：普通文件、目录、块设备、管道、套接字等都会以文件形式出现在进程的文件描述符表中，因此 `lsof` 不仅能查磁盘上的文件，还能查 **网络连接、管道、设备节点** 等。

典型用途包括：排查端口占用、查找删除后仍被占用的文件、确认某进程打开了哪些库或日志、审计用户或服务的资源使用情况。

> 多数发行版已预装。若提示未找到命令，可安装：
>
> ```bash
> # RHEL / CentOS / Fedora / Rocky
> sudo yum install lsof
>
> # Debian / Ubuntu
> sudo apt install lsof
> ```

---

## 参数说明

| 选项 | 说明 |
|------|------|
| `-h` | 显示帮助摘要 |
| `-v` | 显示版本信息 |
| `-a` | **与**（AND）：同时满足其后多个筛选条件时必须加 `-a`，否则条件之间默认是 **或**（OR） |
| `-c <前缀>` | 匹配命令名以该字符串开头的进程（如 `-c ssh` 匹配 `sshd`） |
| `-p <PID>` | 仅列出指定进程 ID |
| `-u <用户>` | 列出指定用户打开的文件；前缀 `^` 表示排除该用户 |
| `-U` | 仅列出 UNIX Domain Socket |
| `-d <描述符>` | 按文件描述符筛选，如 `1`、`cwd`、`txt`、`mem`；支持逗号列表与范围 |
| `-n` | 不将 IP 解析为主机名（加快输出、避免 DNS 依赖） |
| `-P` | 不将端口号解析为服务名（显示数字端口） |
| `-i` | 列出网络相关打开项；可配合协议、地址、端口等进一步限定 |
| `+d <目录>` | 列出某目录下被打开的文件（不递归） |
| `+D <目录>` | 递归列出目录下被打开的文件（**可能较慢**，生产环境慎用） |
| `-t` | 仅输出 PID（适合脚本 `kill` 等场景） |
| `-r [秒]` | 每隔指定秒数重复执行；`r` 后无数字则每秒一次，`r` 可多次叠加间隔 |
| `-w` | 抑制部分警告信息 |
| `-e` | 可配合 `-p` 等在无法访问内核信息时跳过（具体行为见 `man lsof`） |

网络筛选常用写法（跟在 `-i` 后）：

| 形式 | 含义 |
|------|------|
| `-i4` / `-i6` | 仅 IPv4 / 仅 IPv6 |
| `-iTCP` / `-iUDP` | 仅 TCP / 仅 UDP |
| `-iTCP:80` | TCP 且涉及端口 80（监听或连接均可匹配，视内核信息而定） |
| `-i @192.168.1.1` | 与指定主机相关的套接字 |
| `-i :3306` | 与指定端口相关的网络文件 |
| `-sTCP:LISTEN` | TCP 状态为监听（需与 `-i` 组合使用） |

---

## 常用示例

### 列出所有打开文件（信息量大）

```bash
sudo lsof
```

默认列包括：`COMMAND`、`PID`、`USER`、`FD`（文件描述符）、`TYPE`、`DEVICE`、`SIZE/OFF`、`NODE`、`NAME` 等。普通用户只能看到自己有权限的进程；查看全系统通常需要 `sudo`。

---

### 按进程查看

```bash
# 指定 PID
lsof -p 1234

# 命令名前缀（匹配以 nginx 开头的进程名）
sudo lsof -c nginx
```

---

### 按用户查看

```bash
lsof -u www-data

# 排除某用户
sudo lsof -u ^root
```

---

### 网络：查看所有网络连接相关项

```bash
sudo lsof -i -n -P
```

`-n`、`-P` 避免解析主机名和服务名，输出更稳定、更快。

---

### 查看监听某端口的进程

```bash
sudo lsof -iTCP:8080 -sTCP:LISTEN -n -P
```

若服务只监听 IPv6，可同时尝试：

```bash
sudo lsof -iTCP:8080 -sTCP:LISTEN -n -P
sudo ss -tlnp | grep 8080
```

（与 `ss -tlnp` 对照时，`lsof` 更侧重「进程 ↔ 打开的文件描述符」视角。）

---

### 查看某端口上的所有 TCP 套接字（含已建立连接）

```bash
sudo lsof -iTCP:80 -n -P
```

---

### UNIX Domain Socket

```bash
lsof -U
```

常用于排查本机 socket 文件（如 MySQL、PHP-FPM）被谁占用。

---

### 查看某文件或目录被谁占用

```bash
# 单个文件
lsof /var/log/nginx/access.log

# 目录内被打开的文件（不递归）
sudo lsof +d /var/lib/mysql

# 递归（慎用，目录大时很慢）
sudo lsof +D /data/app
```

---

### 文件被删除但仍占用磁盘（空间不释放）

当文件已从目录中 `unlink` 但仍有进程保持打开时，`lsof` 会显示 `(deleted)`：

```bash
sudo lsof +L1
# 或针对某路径/进程排查
sudo lsof -p <PID> | grep deleted
```

处理思路：结束占用进程或让其执行关闭/轮转，空间才会在文件系统层面回收。

---

### 仅输出 PID（便于脚本）

```bash
sudo lsof -t -iTCP:8080 -sTCP:LISTEN
```

可配合 `xargs`：

```bash
sudo kill $(sudo lsof -t -iTCP:8080 -sTCP:LISTEN)
```

使用前务必确认 PID 正确，避免误杀。

---

### 组合条件（AND）

默认多个 `-u`、`-i` 等是 **或** 关系。要同时满足，例如「用户 `nginx` 且网络相关」：

```bash
sudo lsof -a -u nginx -i -n -P
```

---

## 输出列简读

典型一行含义概要：

- **COMMAND**：进程名（可能被截断，短名与完整路径以 `man` 说明为准）。
- **PID / USER**：进程号与运行用户。
- **FD**：如 `cwd` 当前工作目录、`rtd` 根目录、`txt` 程序文本段、`mem` 内存映射库、数字为描述符；末尾状态如 `u` 读写、`r` 读、`w` 写等。
- **TYPE**：`REG` 普通文件、`DIR` 目录、`CHR` 字符设备、`IPv4`/`IPv6` 网络、`unix` 本地套接字等。
- **NAME**：路径、对端地址:端口、或 socket 路径等。

---

## 实践案例

### 案例一：部署报错「Address already in use」

```bash
sudo lsof -iTCP:8080 -sTCP:LISTEN -n -P
```

确认进程名与 PID 后，再决定停止服务或更换端口。

---

### 案例二：磁盘满但 `du` 与 `df` 不一致

大量空间被已删除但仍被进程持有的文件占用：

```bash
sudo lsof +L1 | grep deleted
```

对相应进程做日志轮转、重启或优雅关闭，释放 inode 与块。

---

### 案例三：无法卸载挂载点（device is busy）

```bash
sudo lsof +D /mnt/data
```

查看仍有打开文件的进程，结束后再 `umount`。

---

### 案例四：确认某配置文件是否被进程加载

```bash
sudo lsof /etc/nginx/nginx.conf
```

可辅助判断重载后是否仍有旧 worker 持有旧配置相关资源（需结合 Nginx 实际行为与部署方式）。

---

### 案例五：查找连接到指定数据库端口的客户端

```bash
sudo lsof -iTCP:3306 -n -P
```

快速看到哪些本机进程作为客户端连向 `3306`，或哪些监听与连接并存（视输出而定）。

---

## 常用组合速查

| 场景 | 命令 |
|------|------|
| 谁监听某端口 | `sudo lsof -iTCP:端口 -sTCP:LISTEN -n -P` |
| 某端口所有网络项 | `sudo lsof -iTCP:端口 -n -P` |
| 某进程打开的所有文件 | `lsof -p PID` |
| 某文件被谁打开 | `lsof /path/to/file` |
| 已删除仍占用的文件 | `sudo lsof +L1 \| grep deleted` |
| 仅要 PID | `sudo lsof -t -iTCP:端口 -sTCP:LISTEN` |
| 某用户网络相关 | `sudo lsof -a -u 用户名 -i -n -P` |
| UNIX socket | `lsof -U` |

---

## 与 `ss` / `fuser` 的简要对比

| 场景 | 更趁手的工具 |
|------|----------------|
| 快速看全机监听与 TCP 状态统计 | `ss`（Netlink，适合大量连接） |
| 从**进程—文件描述符**角度查端口、文件、设备 | `lsof` |
| 对某**文件或套接字文件**发信号或批量杀进程 | `fuser`（如 `fuser -k /path`） |

三者常配合使用：`ss` 看连接全景，`lsof` 追到具体进程与打开对象，`fuser` 在确认路径后直接作用于占用者。

---

## 参考

- `man lsof`
- [lsof-org/lsof（源码与说明）](https://github.com/lsof-org/lsof)
