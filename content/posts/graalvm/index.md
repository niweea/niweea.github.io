---
title: "GraalVM入门"
date: 2024-04-11T09:58:32+08:00
draft: false
tags: ["GraalVM", "Java", "Native Image", "AOT"]
categories: ["Java"]
summary: "从 HotSpot 生命周期到 GraalVM 架构、Native Image 静态编译与命令行/Maven 构建入门。"
---

# HotSpot JVM

![](/images/graalvm/java_runtime_lifecycle.png)

## Java 应用程序的运行生命周期

上图是 Java 应用程序的运行生命周期示意图，可分为 JVM 初始化、应用初始化、应用预热、稳定运行和关闭 5 个阶段。

### 1. 启动 JVM

包括解析启动参数、加载 Agent、创建主线程、初始化 JDK 核心类、初始化系统类加载器、初始化即时编译器等。

```shell
time java --version
# java --version  0.03s user 0.03s system 51% cpu 0.122 total
```

可用 `time` 查看仅 JVM 启动的耗时。后续类加载需要从磁盘读取 JAR（解压）和 class 文件，加载类越多，启动时间越长。

### 2. 应用初始化

调用 `main` 进入应用初始化。此阶段通过解释器（Interpreter）解释执行字节码，同时触发 GC，并对热点代码进行 JIT 编译。

### 3. 应用预热

业务代码运行后进入预热阶段，会有大量类加载（CL）和 JIT 编译行为。

### 4. 稳定阶段

充分预热后进入稳定阶段，此时 JIT 编译完成的方法占比高，整体性能最好。

### 5. 应用关闭

释放资源、关闭 JVM。

Java 静态编译的成熟方案主要有 Oracle GraalVM 的 **Substrate VM（Native Image）** 和华为方舟编译器（面向移动端）。

# GraalVM 项目

![](/images/graalvm/java_on_truffle.webp)

GraalVM 是 Oracle 推出的基于 Java 开发的开源高性能多语言运行时平台，可在统一运行时上实现跨语言交互。

其起源于 Oracle 实验室用 Java 编写新的 JIT 编译器，以替代 OpenJDK HotSpot 中由 C++ 实现的 C2 编译器。

GraalVM 可以：

- 嵌入 OpenJDK，用 Graal 编译器替代 C2 做 JIT
- 嵌入 Node.js、Oracle 数据库等运行时
- 作为独立工具链，将 Java 程序 **AOT 静态编译** 为本地可执行文件（Native Image）

## 多语言支持

**Truffle** 是 GraalVM 的解释器实现框架，开发者可用 Java 快速实现语言解释器，在 JVM 上运行其他语言。常见实现：

| 组件 | 语言 |
|------|------|
| GraalJS | JavaScript / Node.js |
| GraalPy | Python |
| TruffleRuby | Ruby |
| FastR | R |
| WebAssembly | WASM |

C/C++ 可通过 LLVM 编译为 bitcode，由 GraalVM 的 **Sulong** 解释器执行。

## Java on Truffle（Espresso）

从 Java 21 起引入实验性 **Espresso**：基于 Truffle 的 Java 字节码解释器，符合 Java 8 / 11 规范，可对热点方法启用 Graal JIT。

```java
Object foreign = Polyglot.eval("js", "[2, 0, 2, 1]");
Object local = new int[]{2, 0, 2, 1};
System.out.println(Polyglot.isForeignObject(foreign)); // true
System.out.println(Polyglot.isForeignObject(local));   // false
```

可在与宿主 JVM 不同的 Java 版本上运行 Guest Java，并与 JS 等语言在同一堆内互操作。需单独安装，目前性能仍低于 HotSpot，适合实验和多语言场景。

## 静态编译（Native Image）

GraalVM 提供 Java 静态编译的完整工具链：**Graal 编译器** 同时用于 JIT 和 AOT，Native Image 在构建期将可达代码编译为本地二进制。

![](/images/graalvm/graalvm_architecture.png)

流程概要：

1. 用户指定编译入口（如 `main`）
2. 静态分析从入口出发，确定可达类与方法
3. Graal 编译器将可达代码与 Substrate VM 运行时一起编译为本地可执行文件或动态库

### 缺点

1. 静态分析消耗大量 CPU、内存和时间
2. 对反射、动态代理、JNI 等分析能力有限，需额外配置
3. 峰值吞吐通常低于长期 JIT 预热后的 HotSpot（换取启动速度与内存占用）

# GraalVM 项目结构

[graal GitHub](https://github.com/oracle/graal)

![](/images/graalvm/graalvm_project.png)

## Graal Compiler

用 Java 编写的动态编译器，是 GraalVM 的基石：

1. 作为 Truffle 语言的 JIT 编译器
2. 作为 Substrate VM / Native Image 的 AOT 编译器

## Truffle

解释器实现框架，提供 Language Implementation Framework 接口：

```shell
java -truffle [options] class
java -truffle [options] -jar jarfile
```

## Substrate VM

Native Image 的静态编译框架，提供静态分析、运行时支持、C 互操作等。编译器使用 Graal Compiler，链接在 Linux 上通常依赖系统 GCC/Clang。

## 安装 GraalVM

```shell
# 下载 graalvm-jdk-<version>_macos-<architecture>.tar.gz 后
sudo xattr -r -d com.apple.quarantine graalvm-jdk-<version>_macos-<architecture>.tar.gz

tar -xzf graalvm-jdk-<version>_macos-<architecture>.tar.gz
sudo mv graalvm-jdk-<version>_macos-<architecture> /Library/Java/JavaVirtualMachines

export JAVA_HOME=/Library/Java/JavaVirtualMachines/<graalvm>/Contents/Home
export PATH=$JAVA_HOME/bin:$PATH

java -version
native-image --version   # 确认 Native Image 可用
```

> **xattr 说明**
>
> macOS 从网络下载的文件可能带有 `com.apple.quarantine` 扩展属性，运行时会弹出安全提示。`xattr -r -d com.apple.quarantine <file>` 可移除该属性。查看属性：`ls -l@` 或 `xattr -l <file>`。

Native Image 将 Java 应用编译为无需 JVM 的本地二进制，启动快、内存占用低、无需预热。主流微服务框架（Spring Boot、Quarkus、Micronaut、Helidon）均提供 Native 构建支持。

# Native Image 构建前配置

Java 的动态特性（反射、JNI、资源、动态代理等）违反静态分析的封闭性假设。GraalVM 通过 JSON 配置文件在构建期补充这些信息：

| 配置文件 | 用途 |
|----------|------|
| `reflect-config.json` | 反射目标 |
| `jni-config.json` | JNI 回调 |
| `resource-config.json` |  classpath 资源文件 |
| `proxy-config.json` | 动态代理接口 |
| `serialization-config.json` | 序列化类 |
| `predefined-classes-config.json` | 预定义动态类 |

框架从编译时 classpath 的 `META-INF/native-image/` 读取上述配置。

## 使用 Agent 自动生成配置

Native Image Agent 基于 JVMTI，在应用运行时收集反射、资源等用法，自动生成配置：

```shell
java -cp $CP \
  -agentlib:native-image-agent=config-output-dir=$CONFIG_ROOT/META-INF/native-image \
  com.example.Main
```

对应用做一次完整功能测试后，Agent 会在 `META-INF/native-image/` 下生成 JSON 文件，供后续 `native-image` 构建使用。

# 静态编译 Java 程序

## 命令行模式

最小示例：编译单个 class 或可执行 JAR 的入口类。

```shell
# 1. 先用 javac / mvn 编译出 class 或 jar
javac -d out src/com/example/Hello.java

# 2. 静态编译
native-image com.example.Hello -o hello

# 3. 运行本地二进制（无需 java 命令）
./hello
```

编译 Spring Boot 可执行 JAR 时，需指定主类并带上完整 classpath：

```shell
native-image \
  -cp target/myapp.jar \
  --no-fallback \
  -H:+ReportExceptionStackTraces \
  com.example.Application \
  -o myapp-native
```

常用参数：

| 参数 | 说明 |
|------|------|
| `--no-fallback` | 禁止回退到 JVM 模式（生产环境常用） |
| `-H:Name=app` | 指定输出文件名 |
| `-H:ReflectionConfigurationFiles=reflect-config.json` | 指定反射配置 |
| `--initialize-at-build-time=com.example` | 构建期初始化指定类 |

首次构建耗时长、内存占用高（建议 `-Xmx8g`），属正常现象。

## 配置文件模式

在 classpath 的 `META-INF/native-image/` 下放置 `native-image.properties`，构建时自动读取：

```properties
Args = -H:Class=com.example.demo.NativeDemoApplication \
  --report-unsupported-elements-at-runtime \
  --no-fallback \
  --install-exit-handlers

JavaArgs = -Xmx8g

ImageName = demo-native
```

| 字段 | 说明 |
|------|------|
| `Args` | 传给 `native-image` 的参数 |
| `JavaArgs` | 构建过程本身使用的 JVM 参数 |
| `ImageName` | 输出二进制文件名 |

配合 Agent 生成的 JSON 文件放在同一目录，可实现「配置 + 代码」一体化打包。

## Maven 插件模式

推荐使用官方 **Native Build Tools** 插件（`org.graalvm.buildtools:native-maven-plugin`）。

`pom.xml` 示例：

```xml
<build>
  <plugins>
    <plugin>
      <groupId>org.graalvm.buildtools</groupId>
      <artifactId>native-maven-plugin</artifactId>
      <version>0.10.2</version>
      <extensions>true</extensions>
      <executions>
        <execution>
          <id>build-native</id>
          <goals>
            <goal>compile-no-fork</goal>
          </goals>
          <phase>package</phase>
        </execution>
      </executions>
      <configuration>
        <imageName>myapp</imageName>
        <buildArgs>
          <buildArg>--no-fallback</buildArg>
        </buildArgs>
      </configuration>
    </plugin>
  </plugins>
</build>
```

构建命令：

```shell
# 需要 GraalVM 作为 JAVA_HOME，并安装 native-image
./mvnw -Pnative native:compile

# 或 Spring Boot 3.x 常用
./mvnw -Pnative package
```

产物通常在 `target/myapp`（或 `ImageName` 指定名称），可直接运行。

Spring Boot 项目还可使用 `spring-boot-maven-plugin` 配合 `native` profile，底层同样依赖 GraalVM Native Image。

---

## 参考

- [GraalVM 官方文档](https://www.graalvm.org/latest/docs/)
- [Native Image 参考手册](https://www.graalvm.org/latest/reference-manual/native-image/)
- [GraalVM GitHub](https://github.com/oracle/graal)
- [Native Build Tools](https://github.com/graalvm/native-build-tools)
