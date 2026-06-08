---
title: "Kafka"
date: 2021-04-08T16:32:15+08:00
draft: true
---


kafka基本概念
======

1. Broker（代理）

在kafka集群中，一个kafka进程（kafka实例）被成为一个代理（Broker）节点。

2. Partition（分区）







buffer.memory 32M 

max.block.ms    60s 


### 再均衡原理

* 有新的消费者加入消费组
* 有消费者宕机下线。消费者不一定需要真正下线，例如：长时间GC、未向GroupCoordinator发送心跳等情况
* 有消费者主动退出
* 消费组所对应的GroupCoorinator节点发生了变化
* 消费组内所订阅的任一主题或者主题的分区数量发生变化



`max.poll.interval.ms`  用来指定使用poll() 方法调用之间的最大延迟；如果此超时时间期满之前poll() 没有调用，则消费者被视为失败，而导致再均衡。

`session.timeout.ms`默认值 `10s`。消费者在被认为死亡之前可以与服务器断开连接的时间。 也就是消费者可以多久不发送心跳。消费者没有在 `session.timeout.ms` 指定的时间内发送心跳给群组协调器，就被认为 
已经死亡，协调器就会触发再均衡。

request.timeout.ms 

max.poll.records

`heartbeat.interval.ms` 指定poll方法向协调器发送心跳的频率。 其必须小于 `session.timeout.ms`，一般情况下 `heartbeat.interval.ms`的配置值不能超过`session.timeout.ms`配置值的 1/3。



