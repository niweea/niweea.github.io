---
title: "你必须知道的DNS那些事"
date: 2022-07-19T11:10:06+08:00
tags: ["DNS", "计算机网络", "网络协议", "域名解析", "运维"]
categories: ["计算机网络"]
description: "深入讲解 DNS（域名系统）的核心概念与工作原理：从域名层次结构、根域名服务器、递归与迭代查询过程到常见 DNS 记录类型与解析诊断。"
---

`DNS`（Domain Name System） 域名系统


基本概念
======

域名系统 (DNS) 将人类可读的域名 (例如，www.baidu.com) 转换为机器可读的 IP 地址。

`DNS` 属于应用层协议。把 `域名/主机名字` 转换为IP地址。


## 域名

域名是文本字符串到Ip地址的的映射。

域名采用层次树状结构方法命名。每一个域名都由标号序列组成，各标号直接用点隔开。例如 `news.baidu.com`

级别最低的域名写在最左边，而级别最高的顶级域名则写在最右边。

![news.baidu.com](/images/dns/baidu-domain.png)

> 每一个标号不超过63个字符（中文需要转换成Punycode），不区分大小写。多标号组成的完整域名总共不超过255个字符。


**顶级域名 TLD （Top Level Domain)**

1. 通用顶级域名 gTLD
2. 国家/地区顶级域名 nTLD 
3. 基础结构域名 (infrastructure domain) 
      这种顶级域名只有一个，即 arpa， 用于反向域名解析


用域名树来表示域名系统较清楚。实际上是一个倒过来的树，在最上面的是根，但没有对应的名字。根下面一级的节点，就是最高一级的顶级域名。顶级域名可往下划分子域，即二级域名。再往下划分就是三级域名、四级域名等等。


![domain tree](/images/dns/domain-tree.png)


域名由ICANN （Internet Corporation for Assigned Names and Numbers）互联网名称与数字地址分配机构管理。但是具体的管理工作由域名注册管理机构管理（顶级域名）。

域名注册管理机构将域名注册的商业销售委托给注册商。用户通过注册商购买域名后，注册商必须通知域名注册管理机构并支付费用。

.COM的顶级域域名注册管理机构是VeriSign, Inc. 


![registrar-flow](/images/dns/registrar-flow.webp)

## 域名服务器

域名系统是通过域名服务器实现的。

![dns server tree](/images/dns/dns-server-tree.png)

互联网上的DNS服务器是按照层级结构管理的， 分区管理。

### 域名服务器分类

**根域名服务器 （root name server)**

根域名服务器是最高层次的域名服务器。根域名服务器记录着顶级域名服务器的域名和 IP 地址。

目前根域名服务器由13组构成，为了方便人们记忆，使用从 a.rootservers.net到m.rootservers.net的域名表示。这13组根域名服务器只使用13个不同的IP地址（IPv4/IPv6）。



|  Root Servers       |        IPv4            |   IPv6             |  OPERATOR       |
| ------------------- | -------------------| ---------------------- |-----------------|
| a.root-servers.net  |   198.41.0.4       |   2001:503:ba3e::2:30  | Verisign, Inc.  | 
| b.root-servers.net  |   199.9.14.201     |   2001:500:200::b      | University of Southern California, Information Sciences Institute  | 
| c.root-servers.net  |   192.33.4.12      |   2001:500:2::c        | Cogent Communications | 
| d.root-servers.net  |   199.7.91.13      |  2001:500:2d::d        | University of Maryland | 
| e.root-servers.net  |   192.203.230.10   |   2001:500:a8::e       | NASA (Ames Research Center) | 
| f.root-servers.net  |   192.5.5.241      |   2001:500:2f::f       | nternet Systems Consortium, Inc. | 
| g.root-servers.net  |   192.112.36.4     |   2001:500:12::d0d     | US Department of Defense (NIC) | 
| h.root-servers.net  |   198.97.190.53    |   2001:500:1::53       | US Army (Research Lab) | 
| i.root-servers.net  |   192.36.148.17    |   2001:7fe::53         | Netnod | 
| j.root-servers.net  |   192.58.128.30    |   2001:503:c27::2:30   |  Verisign, Inc. | 
| k.root-servers.net  |   193.0.14.129     |   2001:7fd::1          |  RIPE NCC       | 
| l.root-servers.net  |   199.7.83.42      |   2001:500:9f::42      |  ICANN          | 
| m.root-servers.net  |   202.12.27.33     |   2001:dc3::35         |  WIDE Project   |


[root name servers](https://www.internic.net/domain/named.root)


根域名服务器有很多镜像服务器。在中国大陆北京、上海、广州、杭州等城市都有镜像服务器。

![the root server system instances](/images/dns/root-servers-area.png)

[root-servers.org](https://root-servers.org/)


根域名服务器采用任播(anycast)技术，当 DNS客户向某个根域名服务器的IP地址发出查询报文时，互联网上的路由器就能找到离这个DNS客户最近的一个根域名服务器。这样做不仅加快了DNS的查询过程，也更加合理地利用了互联网的资源。


**顶级域名服务器**

负责管理在该顶级域名服务器注册的所有二级域名。当收到DNS查询请求时，给出相应的应答。

[root zone](https://www.internic.net/domain/root.zone)


**权威域名服务器(Authoritative DNS server)**

权威域名服务器是实际持有并负责DNS资源记录的服务器。是位于DNS查找链底部的服务器，根据所查询的资源记录进行IP地址响应。


```shell
whois baidu.com
```

### 域名服务器解析原理


#### 查询方式

**递归查询(Recursive Query)**

如果主机所询问的本地域名服务器不知道被查询域名的 IP 地址，那么本地域名服务器就以 DNS 客户的身份，向其他根域名服务器继续发出查询请求报文（即替该主机继续查询），而不是让该主机自己进行下一步的查询。递归查询返回的查询结果或者是所要查询的IP地址，或者是报错，表示无法查询到所需的 IP 地址。

**迭代查询(Iterative Query)**

向域名服务器查询时，不是替本地域名服务器进行后续的查询，而是告知了后续的域名查询服务器。本地域名服务器向根域名服务器的查询通常是采用迭代查询。


我们以在浏览器中访问网址为例。（下面内容来源于cloudflare）


DNS查询步骤

1. 用户在 Web 浏览器中输入 “example.com”，查询传输到 Internet 中，并被DNS递归解析器接收(一般由用户的互联网服务提供商 (ISP) 进行管理)。
2. 接着，解析器查询 DNS 根域名服务器（.）。
3. 然后，根服务器使用存储其域信息的顶级域（TLD）DNS 服务器（例如 .com）的地址响应该解析器。在搜索 example.com 时，我们的请求指向 .com TLD。
4. 然后，解析器向 .com TLD 发出请求。
5. TLD 服务器随后使用该域的域名服务器 example.com 的 IP 地址进行响应。
6. 最后，递归解析器将查询发送到域的域名服务器。
7. example.com 的 IP 地址而后从域名服务器返回解析器。
8. 然后 DNS 解析器使用最初请求的域的 IP 地址响应 Web 浏览器。

 DNS 查找的这 8 个步骤返回 example.com 的 IP 地址后，浏览器便能发出对该网页的请求：

9. 浏览器向该 IP 地址发出 HTTP 请求。
10. 位于该 IP 的服务器返回将在浏览器中呈现的网页（第 10 步）。


![DNS解析和网页访问](/images/dns/dns-lookup-diagram.webp)


#### DNS 记录

DNS 记录是位于权威DNS服务器中的指令，提供一个域的相关信息，包括哪些 IP 地址与该域关联，以及如何处理对该域的请求。所有 DNS 记录都有一个 “TTL”，其代表生存时间，指示DNS服务器多久刷新一次该记录。

常用DNS记录


| 类型         |   介绍                                    |
|-------------|-------------------------------------------|
|    A        |   IPv4 地址                               |
|    AAAA     |   IPv6 地址                               |
|   CNAME     |   将域名指向另一个域名地址，与其保持相同解析     |
|   MX        |   用于邮件服务器                            |
|   NS        |   域名服务器                                |
|   SRV       |   用于标识某台服务器使用了某个服务             |
|   PTR       |  用于根据IP地址查询域名                      |  


![DNS Record Demo](/images/dns/dns-record-demo.png)


## 实现


### DNS协议


![DNS 协议格式](/images/dns/dns-protocol.png)

前12字节属于Header头。

**标识字段（ID/Transaction ID)**

标识字段（ID/Transaction ID)  2字节，客户端设置并由服务器返回结果。客户端通过它来确定响应与查询是否匹配。

**标志字段（Flags）**

标志字段（Flags） 2字节，如下字段组成：


|    字段    |  长度(bit)  |       含义                        | 
|-----------|-------------|----------------------------------|
|   QR      |    1        |  0表示查询报文，1表示响应报文        |
|   Opcode  |    4        |  0（标准查询），其他值为 1（反向查询）和2（服务器状态请求)   |
|   AA      |    1        |  授权(权威)回答                                       |
|   TC      |    1        |  可截断的 ( truncated )                               |
|   RD      |    1        |  期望递归 （Recursion Desired）               |
|   RA      |    1        |  可用递归  （Recursion Available ）             |
|   Z       |    3        |   Reserved for future use                 |
|   Rcode   |    4        |   The result code of an answer； 0: No error  1: Format error   |


**问题数(QDCOUNT)**

**资源记录数(ANCOUNTT)**

**授权资源记录数(NSCOUNT)**

**额外资源记录数(ARCOUNT)**



![Question](/images/dns/dns-protocol-question.png)

![Answer](/images/dns/dns-protocol-answer.png)

DNS报文中最后的三个字段，回答字段、授权字段和附加信息字段，均采用一种称为资源记录RR（Resource Record）的相同格式。

[DNS协议详解](https://yangwang.hk/?p=878)

### 常用命令

`ping`、`host`、`nslookup`、`dig`

flags 

1. qr 消息响应
2. aa 权威 
3. rd 递归
4. ra 远程服务器支持递归


dig @域名服务器 域名

dig +[no]recurse 关闭递归查询（递归默认是打开的）

dig +vc 发送基于tcp的查询 ( +[no]tcp )

dig -x ip地址 反向查询

dig +trace 域名 

dig +short 域名


```shell
dig                      // 显示13个根域服务器
dig @8.8.8.8 baidu.com   // 从指定域名服务器上查询
```


```shell
strace -e trace=open -f ping -c1 baidu.com
```


### C 语言

linux glibc库

```c
struct hostent *gethostbyname(const char *hostname);

int getaddrinfo(const char *restrict node, const char *restrict service, 
                const struct addrinfo *restrict hints, struct addrinfo **restrict res);
```

`gethostbyname()`函数因只支持IPv4地址已不建议使用，已被`getaddrinfo()`函数取代。


具体详细信息可参考[getaddrinfo](https://man7.org/linux/man-pages/man3/getaddrinfo.3.html)

### Java 语言

**InetAddress.getAllByName("hostname")**

```java
  InetAddress[] inetAddresses = InetAddress.getAllByName("baidu.com");
  String addresses = Arrays.stream(inetAddresses).map(String::valueOf).collect(Collectors.joining("\r\n"));
  System.out.println(addresses);
```

其底层代码是通过`native InetAddress[] lookupAllHostAddr(String hostname)`方法实现。翻看openJDK源码，此方法调用了系统glibc库的`getaddrinfo`方法 (Inet4AddressImpl.c或者Inet6AddressImpl.c)。

Java的地址解析默认带缓存功能。在Java 8中是通过使用 `Cache` 类实例 `addressCache`（存储解析成功结果）和 `negativeCache`（存储解析失败结果）对结果进行缓存，每次查询时优先查询缓存。

缓存时间我们可以通过：

`networkaddress.cache.ttl`、`sun.net.inetaddr.ttl`  控制解析成功缓存时间 (两参数效果相同)，在不开启安全管理器的情况下，默认时间为 30秒。

  如果值为 `0` 时，不使用缓存；值为 `-1` 时则缓存永久有效。

`networkaddress.cache.negative.ttl`、 `sun.net.inetaddr.negative.ttl` 控制解析失败缓存时间 (两参数效果相同)，默认时间为10秒。

> `sun.net.inetaddr.ttl` 和  `sun.net.inetaddr.negative.ttl`  不建议使用

> 如果开启了 SecurityManager，优先从 ${java.home}/jre/lib/security/java.security 中读取参数，`networkaddress.cache.ttl`值为 -1，永久缓存。

> 可通过 `-Djava.security.manager` 启用安全管理器，然而java 17 中移除了 Security Manager

Java默认使用系统的配置策略解析， 我们在程序中可以通过JNDI DNS服务指定自定义DNS服务器

`sun.net.spi.nameservice.provider.<n>=<default|dns,sun|...>` 

`sun.net.spi.nameservice.nameservers=<server1_ipaddr,server2_ipaddr ...>`

使用Google DNS

```java
-Dsun.net.spi.nameservice.provider.1=dns,sun -Dsun.net.spi.nameservice.nameservers=8.8.8.8,8.8.4.4
```

>  JNDI DNS service 在Java 9 中被移除，使用 `jdk.net.hosts.file`  替代。

#### Java 18

Java 18 中实现了 `Internet-Address Resolution SPI`。 

实现 `InetAddressResolver` 接口 和 `InetAddressResolverProvider`抽象类并在 resources 文件夹下添加 `META-INF/services/java.net.spi.InetAddressResolverProvider` 文件，
在文件内配置我们实现的`InetAddressResolverProvider` 全限定类。


#### 其他框架

`Okhttp` 

提供了`Dns`接口，方便我们实现自定义DNS解析器


`Netty`


### Linux 系统实现

查看glibc版本

```shell
ldd --version                // 查看glibc版本
getconf GNU_LIBC_VERSION    // 查看glibc版本
libc.so.6                   // 查看glibc版本
```


`/etc/nsswitch.conf` *Name Service Switch configuration file*

用来配置不同的来源的查询顺序。

`hosts:      files dns myhostname`

`/etc/hosts`

在DNS出现之前，用于维护主机名和IP地址之间的映射关系


`/etc/resolv.conf`

域名解析器配置文件


|    参数      |     描述                    |       示例                 |
| ----------- | --------------------------- | ------------------------- |
| nameserver  | 用于配置DNS服务器             |  8.8.8.8                  | 
| search      | 用户配置主机名搜索列表         | example.com company.net   |
| sortlist    | IP/子网掩码对                | 130.155.160.0/255.255.240.0 130.155.0.0 | 
| options     | 控制参数                     |                        |


**nameserver**

`nameserver`用于DNS服务器的配置，支持IPv4 和 IPv6。最多支持3个(参考`/resolv/bits/types/res_state.h` 中 MAXNS宏)。按照配置顺序请求DNS服务器，请求超时则使用下一个，直至尝试完所有DNS服务器，
然后再根据配置的重试次数进行重试。


**search**

当查询不完全限定域名时会使用到此参数


**sortlist**

**options**

`timeout`  

解析器请求超时时间，单位为秒，默认为 5，最大值为30。

`attempts`

重试次数，默认值为2。最大值为3。

`rotate` 

轮训名称服务器，而非一直使用第一个。

`single-request`

(since glibc 2.10) glibc从2.9版本开始支持并发执行IPv4和IPv6 请求。此选项禁用并发请求，使glibc顺序执行IPv6和IPv4请求。

`single-request-reopen` (since glibc 2.9)

对IPv4和IPv6使用相同的套接字会因为某些原因可能会导致第二个请求发生丢包现象。设置此参数如果第二个请求没有被正确处理时，关闭此连接并打开一个新的连接。

`ndots`: n

如果域名参数中 "." 的数量大于等于设置的数值，那么解析器就会在使用搜索列表之前，先查找这个域名。

## 容器化

### Docker

Docker 启动容器时，会从宿主机上复制 `/etc/resolv.conf`文件，并删掉其中无法连接到的DNS服务器。

`/etc/hosts` 只记录容器自身的地址和名称
`/etc/hostname` 容器的主机名


启动一个容器，在容器中使用 mount 命令可以看到这三个文件挂载信息

```shell
# mount
/dev/sda on /etc/resolv.conf type ext4
/dev/sda on /etc/hostname type ext4
/dev/sda on /etc/hosts type ext4
```

```shell
--dns=IP_ADDRESS 指定DNS服务器
--dns-option list 指定DNS相关的选项
--dns-search=DOMAIN 指定DNS搜索域
```


### K8s

```shell
kubectl get service -n kube-system
```


Pod 的 DNS 策略

* Default
* ClusterFirst
* ClusterFirstWithHostNet
* None


## 其他DNS

 
### DNS-over-HTTPS (DoH)

### DNS-over-TLS (DoT)

### DNS-over-HTTP/3 (DoH3)


# 参考资料

[cloudflare DNS](https://www.cloudflare.com/zh-cn/learning/dns/what-is-dns/)

[VeriSign 域名系统 (DNS) 工作原理](https://www.verisign.com/zh_CN/website-presence/online/how-dns-works/index.xhtml)

[Java 8 Networking Properties](https://docs.oracle.com/javase/8/docs/technotes/guides/net/properties.html)

[Java 18 JEP 418: Internet-Address Resolution SPI](https://openjdk.org/jeps/418)

[man resolv.conf](https://man7.org/linux/man-pages/man5/resolv.conf.5.html)

[raft-ietf-dnsind-edns0-01](https://datatracker.ietf.org/doc/html/draft-ietf-dnsind-edns0-01)

[DNS解析异常问题排查](https://www.alibabacloud.com/help/zh/container-service-for-kubernetes/latest/troubleshooting-dns-troubleshooting)

[阿里云 服务发现DNS](https://help.aliyun.com/document_detail/201873.html)

