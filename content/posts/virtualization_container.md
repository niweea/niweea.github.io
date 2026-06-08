---
title: "虚拟化与容器化漫谈"
date: 2021-11-03T00:52:56+08:00
draft: false
---

## 虚拟化的概念

### 什么是虚拟化 Virtualization？

虚拟化是一种技术，可以利用以往局限于硬件的资源来创建有用的 IT 服务。它让您能够将物理计算机的工作能力分配给多个用户或环境，从而充分利用计算机的所有能力。

![传统方式](/images/virtualization/server-usage.png)

![借助虚拟化](/images/virtualization/server-usage-for-virtualization.png)

**虚拟化** 就是由位于下层的软件模块，通过向上一层软件模块提供一个与它原先所期待的运行环境完全一致的接口的方法。
抽象出一个虚拟的软件或者硬件接口，使得上层软件可以直接运行在虚拟的环境上。（《系统虚拟化：原理与实现》）


从计算机抽象层次来划分虚拟化技术

* 硬件抽象层上的虚拟化（指令集级虚拟化）
* 操作系统层上的虚拟化
* 库函数层上的虚拟化
* 编程语言层上的虚拟化


### 系统虚拟化

#### 什么是VMM?

`Virtual Machine Monitor（虚拟机监控器）` 

系统虚拟化指将一台物理计算机系统虚拟化为一台或者多台虚拟计算机系统（虚拟机）。每个虚拟机都有拥有自己的虚拟硬件，来提供一个独立的虚拟机执行环境。
通过虚拟化层的模拟，虚拟机中的操作系统任务自己仍然是独占一个系统在运行。这层虚拟化层就被称为`VMM`。

虚拟化的三大任务： 处理器虚拟化、内存虚拟化和`I/O`虚拟化

**按VMM实现结构分类**

1. Hypervisor 模型

    在Hypervisor模型中，VMM首先可以被看作是一个完备的操作系统，专门为虚拟化而设计。所有的物理资源都归VMM所管理。

    缺点：

        实现所有的设备驱动，工作量巨大
    
    <img src="/images/virtualization/vmm-hypervisor.png" alt="VMM-Hypervisor模型" width="400px" height="240px" />


2. 宿主模型

    在宿主模式中，物理资源由宿主机操作系统管理。实际的虚拟化功能由作为宿主机操作系统独立的内核模块的VMM来提供。VMM需要调用宿主机操作系统的服务
    来获取资源进行虚拟化。

    缺点：

        1. 依赖与宿主机是否考虑支持虚拟化
        2. 虚拟机安全依赖于VMM和宿主机

    <img src="/images/virtualization/vmm-host.png" alt="VMM-Host模型" width="400px" height="240px" />


    **虚拟化产品**

    `VMware Server`、 `VMware Workstation`、`Virtual PC` 等



3. 混合模型

    混合模型是上述两种模式的混合体。VMM依赖位于最底层，拥有所有的物理资源。与Hypervisor模式不同的是，VMM会主动让出大部分I/O设备的控制权，由一个
    运行在特权虚拟机中的特权操作系统来控制。

    缺点：

        切换到特权操作系统时会产生上下文切换的开销

    <img src="/images/virtualization/vmm-hybrid.png" alt="VMM-混合模型" width="500px" height="300px" />


    **虚拟化产品**

    `Windows Server 2008(Hyper-V)`、 `Xen`


 #### Xen VS KVM

 *全虚拟化与半虚拟化*

 *全虚拟化模式* 允许虚拟机运行未经修改的操作系统。

 *半虚拟模式* 通常需要根据虚拟化环境对Guest 操作系统进行修改，以半虚拟模式运行的操作系统比全虚拟化模式下运行的操作系统的性能更佳。


 ##### Xen

 `Xen`是半虚拟 (PV) 模式的典型代表，但也支持全虚拟化模式。要使 Guest 操作系统能够在半虚拟模式下运行，通常需要根据虚拟化环境对其进行修改。不过，以半虚拟模式运行的操作系统比全虚拟化模式下运行的操作系统的性能更佳。


 ![XEN 虚拟化体系结构](/images/virtualization/xen_structure.png)


 ##### KVM （Kernel-based Virtual Machine）

`KVM`是全虚拟化模式。全虚拟化模式允许虚拟机运行未经修改的操作系统。

`KVM` 从Linux 2.6.20版本开始合并到 Linux 内核中,现在是内建于 Linux 中的开源虚拟化技术。`KVM` 可将Linux转变为虚拟机监控程序，使主机计算机能够运行多个隔离的虚拟环境。

`KVM` 是 Linux 的一部分。Linux 也是 `KVM` 的一部分。Linux 有的，`KVM` 全都有。`KVM` 享有了 Linux 的有点。

在 `KVM` 模型中，虚拟机是一种 Linux 进程，由内核进行调度和管理。通过 Linux 调度程序，可对分配给 Linux 进程的资源进行精细的控制，并且保障特定进程的服务质量。



**产品**

阿里、华为ECS(Elastic Compute Service)、腾讯CVM（Cloud Virtual Machine）、VPS 等


以华为鲲鹏BoostKit虚拟化总体架构为例

![华为鲲鹏BoostKit虚拟化总体架构](/images/virtualization/huawei-kunpeng-virtualization.png)


`QEMU` 全称 Quick Emulator。是纯软件实现的虚拟化模拟器。

`libvirt` 是用于管理虚拟化平台的开源的API，后台程序和管理工具。


## Container


LXC是一种内核虚拟化技术，可以提供轻量级的虚拟化，以便隔离进程和资源。

### Docker

![Containers and Virtual Machines](/images/virtualization/docker-containerized-and-vm-transparent-bg.png)


1. Linux Namespace

用于隔离系统资源； 支持 `Mount namespace`、 `UTS Namespace`、`IPC Namepsace`、`PID Namespace`、`Network Namespace`、`User Namespace`。


2. Linux Cgroups

Linux Cgroups(Control Groups)提供了对一组进程及将来子进程的资源（CPU、内存、存储、网络等）限制、控制和统计的能力，通过Cgroups可以方便的限制某个进程的资源占用。


3. Union File System

  把其他文件系统联合到一个联合挂载点的文件系统服务。


### Kubernetes(k8s)


#### 计算资源配额限定


```yaml
  resources:
      requests:
        memory: "64Mi"
        cpu: "250m"
      limits:
        memory: "128Mi"
        cpu: "500m"
```


`Requests`：该资源的最小申请量，系统必须满足要求。

`Limits`：该资源最大允许使用的量，不能被突破，当容器试图使用超过这个量的资源时，可能会被Kubernetes“杀掉”并重启。


资源Limits 允许出现超卖，也就是所有limits申请资源可以超过节点资源总和的100%。但是如果节点资源使用量超过100%，那么就会有容器被Kill。

CPU 是一种可压缩资源，对其使用量进行限制,而不对容器内运行的进程产生不利影响。

而内存不同，当进程尝试申请分配比限额更多的内存时会被杀掉。（OOM）


##### 内存不足时哪个容器会被杀死

通过Pod的QoS来判断


* BestEffort （优先级最低）
* Burstable 
* Guaranteed （优先级最高）


![equests 和limits 之间的关系如何定义QoS等级](/images/virtualization/k8s-qos.png)


![哪个pod会第一个被杀掉](/images/virtualization/container-to-kill.png)


> 
>> /sys/fs/cgroup/cpu/cpu.cfs_quota_us 
>> 
>> /sys/fs/cgroup/cpu/cpu.cfs_period_us 


#### Pod生命周期和重启策略

|  状态值       |  描述                                                                     |
|--------------|--------------------------------------------------------------------------|
| Pending     | API Server 已经创建该Pod， 但在Pod内还有容器的镜像没有创建，包括正在下载镜像的过程   |
| Running     |  Pod内所有容器均已创建，且至少有一个容器处于运行状态、正在启动状态或者正在重启状态     |
| Succeeded   | Pod内所有容器均成功执行后退出，切不会再重启                                     |
| Failed      | Pod内所有容器已退出，但至少有一个容器退出为失败状态                              |
| Unknown     | 由于某种原因无法获取该Pod的状态，可能由于网络通信不畅导致                         |


![k8s Probes](/images/virtualization/pod-phase.png)

* PodScheduled：Pod 已经被调度到某节点；
* ContainersReady：Pod 中所有容器都已就绪；
* Initialized：所有的 Init 容器 都已成功启动；
* Ready：Pod 可以为请求提供服务，并且应该被添加到对应服务的负载均衡池中;

![The transitions of the pod’s conditions during its lifecycle](/images/virtualization/pod-condition.jpg)


##### 容器生命周期

|    状态    |   描述                  | 
|--------------|----------------------|
| Waiting      | 处于 Waiting 状态的容器仍在运行它完成启动所需要的操作   |
| Running      | Running 状态表明容器正在执行状态并且没有问题发生。 如果配置了 postStart 回调，那么该回调已经执行且已完成。  |
| Terminated   | 如果容器配置了 preStop 回调，则该回调会在容器进入 Terminated 状态之前执行。   |


#### Health Check

##### 默认健康检查机制

每个容器启动时都会执行一个进程，此进程由Dockerfile的CMD或ENTRYPOINT指定。如果进程退出时返回码非零，则认为容器发生故障，Kubernetes 就会根据restartPolicy重启容器。

##### startupProbe探针(1.17版本)

`startupProbe`探针判断容器内的应用程序是否已启动。如果配置了启动探测，在则在启动探针状态为 Succes 之前，其他所有探针都处于无效状态，直到它成功后其他探针才起作用。如果启动探测失败，kubelet 将杀死容器，容器将服从其重启策略。如果容器没有配置启动探测，则默认状态为 Success。 使用`startupProbe`探针保护慢启动容器。

##### ReadinessProbe探针

`ReadinessProbe`探测则是告诉Kubernetes什么时候可以将容器加入到Service负载均衡池中，对外提供服务。

`ReadinessProbe`探针用于判断容器是否启动完成，且准备接收请求。 如果`ReadinessProbe`探针检测到容器启动失败，则Pod的状态将被修改， `Endpoint Controller`将从Service的Endpoint中删除包含该容器所在Pod的IP地址的Endpoint条目。

##### LivenessProbe探针

`LivenessProbe`探针让用户可以自定义判断容器是否健康。如果探测到容器不健康，则kubelet将删除该容器，并根据容器的重启策略做相应的处理。

如果一个容器不包含`Livenessprobe`探针，那么kubelet认为该容器的 `LivenessProbe`探针返回的值应该是Success。

##### 三种实现方式

* ExecAction: 在容器内部执行一个命令，如果该命令的退出状态码为0，则表明容器健康。
* TCPSocketAction：通过容器的IP地址和端口号执行TCP检查，如果端口能被访问，则表明容器健康。
* HTTPGetAction：通过容器的IP地址和端口号及路径调用 HTTP Get方法，如果响应的状态码大于等于200且小于等于400，则认为容器状态健康。


ExecAction

```yaml
    livenessProbe:
      exec:
        command:
        - cat
        - /tmp/healthy
      initialDelaySeconds: 15
      timeoutSeconds: 1           
```

HTTPGetAction

```yaml
    livenessProbe:
      httpGet:
        path: /healthy
        prot: 8080
     initialDelaySeconds: 15
     timeoutSeconds: 1   
```

* initialDelaySeconds: 启动容器后进行首次健康检查的等待时间，单位为s。我们一般会根据应用启动的准备时间来设置，应该大于应用启动时间。

* periodSeconds: 执行一次Liveness探测周期。

* timeoutSeconds: 健康检查发送请求后等待响应的超时时间，单位为s。当超时发生时，kubelet会认为容器已经无法提供服务，将会重启该容器。

* successThreshold：探测器在失败后，被视为成功的最小连续成功数。默认值是 1。 存活和启动探测的这个值必须是 1。最小值是 1。

* failureThreshold：当探测失败时，Kubernetes 的重试次数。 存活探测情况下的放弃就意味着重新启动容器。 就绪探测情况下的放弃 Pod 会被打上未就绪的标签。默认值是 3。最小值是 1。

##### 监控检查流程

![k8s Probes](/images/virtualization/k8s_probes.svg)

[Kubernetes Probes lifecycle by Andrew Lock](https://andrewlock.net/deploying-asp-net-core-applications-to-kubernetes-part-6-adding-health-checks-with-liveness-readiness-and-startup-probes/)


#### Container Lifecycle Hooks

* `PostStart`
* `PreStop`

```yaml
    lifecycle:
      postStart:
        exec:
          command: ["/bin/sh", "-c", "echo Hello from the postStart handler > /usr/share/message"]
      preStop:
        exec:
          command: ["/bin/sh","-c","nginx -s quit; while killall -0 nginx; do sleep 1; done"]
```

##### PostStart

Kubernetes 在容器创建后立即发送 postStart 事件。Kubernetes 的容器管理逻辑会一直阻塞等待 postStart 处理函数执行完毕。 只有 postStart 处理函数执行完毕，容器的状态才会变成 RUNNING。

##### PreStop

Kubernetes 在容器结束(Terminated)前立即发送 preStop 事件。除非 Pod 宽限期限超时，Kubernetes 的容器管理逻辑 会一直阻塞等待 preStop 处理函数执行完毕。


![A container’s termination sequence ](/images/virtualization/container-termination-sequence.png)

<br/>

1. 执行停止前钩子（如果配置了的话），然后等待它执行完毕
2. 向容器的主进程发送SIGTERM信号
3. 等待容器优雅地关闭或者等待终止宽限期超时
4. 如果容器主进程没有优雅地关闭，使用SIGKILL信号强制终止进程

<br/>

![The termination sequence inside a pod](/images/virtualization/termination-sequence.jpg)


> SIGINT、SIGTERM和SIGKILL区别
>> 1. SIGINT 关联`CTRL + C`,只能用来结束前台进程，结束信号被被进程树接收到（当前进程以及子进程）
>> 2. SIGTERM 可以被阻塞、处理和忽略，只有当前进程收到结束信号 (kill不带参数发送的信号)，进程可以进行清理工作。
>> 3. SIGKILL 强行终止进程，不允许别忽略。无法进行清理工作。（kill -9 命令）


> 僵尸进程、孤儿进程
>> 孤儿进程：一个父进程退出，而它的一个或多个子进程还在运行，那么那些子进程将成为孤儿进程。孤儿进程将被init进程(进程号为1)所收养，并由init进程对它们完成状态收集工作。
>>
>> 僵尸进程：一个进程使用fork创建子进程，如果子进程退出，而父进程并没有调用wait或waitpid回收子进程，那么子进程的进程描述符仍然保存在系统中。这种进程称之为僵死进程。

##### 思考问题

1. 容器退出后会出现僵尸进程吗？

    有些程序作为pid = 1 的父进程，无法清理

   [Docker and Node.js Best Practices](https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md#handling-kernel-signals)

2. 使用bash启动服务，容器退出时应用程序没有收到SIGTERM信号？

    sh不进行信号转发

3. 容器退出时，服务为什么出现Connection Refused？

  ![pod 删除时事件发生的时间线](/images/virtualization/pod-termination-timeline.png)

  ![妥善关闭流程](/images/virtualization/fix-pod-termination-timeline.png)


#### k8s常用命令

* 获取命名空间下的所有pod

```shell
    kubectl get pods -n <namespace>
```

* 获取pod的消息

```shell
    kubectl describe pod <pod-name> -n <namespace>
```

* 获取pod资源使用情况

```shell
    kubectl top pod -n <namespace>
```

* 获取pod日志信息

```shell
    kubectl logs --since=1h <pod-name> -n <namespace>   // 查看最近1小时的日志

    kubectl logs -f <pod-name> -c <container-name>     // 查看指定容器日志
```

* 进入容器内

```shell
    kubectl exec -it -n <namespace> <pod-name> bash
```

## 参考内容


- [SUSE Linux Enterprise Server 15 虚拟化指南](https://documentation.suse.com/zh-cn/sles/15-SP2/html/SLES-all/book-virt.html)

- 《Kubernetes in action》

- 《Kubernetes权威指南》

