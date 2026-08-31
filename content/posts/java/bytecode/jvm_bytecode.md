---
title: "JVM字节码理解"
date: 2022-12-04T18:12:22+08:00
tags: ["Java", "JVM", "字节码", "javap", "底层原理"]
categories: ["Java"]
description: "深入探索 JVM 字节码底层机制：从 Class 文件结构、常量池组织、运行时数据区到常用字节码指令集，结合 javap 分析 Java 编译运行原理。"
---

# JVM 概览

![](/images/bytecode/hotspot_jvm.png)

上图为 HotSpot JVM 中 Java 代码的执行流程：`.java` 经 `javac` 编译为 `.class` 字节码，类加载器载入后进入运行时数据区，由解释器或 JIT 编译后的本地代码执行。

## 运行时数据区

JVM 在运行时会划分以下内存区域（逻辑概念，具体实现因 VM 而异）：

| 区域 | 线程共享 | 说明 |
|------|----------|------|
| 程序计数器（PC Register） | 否 | 当前线程执行的字节码行号指示器 |
| Java 虚拟机栈 | 否 | 栈帧：局部变量表、操作数栈、动态链接、方法出口 |
| 本地方法栈 | 否 | 为 Native 方法服务 |
| 堆（Heap） | 是 | 对象实例、数组的分配区域，GC 主要工作区 |
| 方法区（Method Area） | 是 | 类信息、常量、静态变量；Java 8 起元数据在 Metaspace |
| 运行时常量池 | 是 | 方法区的一部分，存放编译期生成的字面量与符号引用 |

Java 虚拟机解释器（Interpreter）的执行流程如下面的伪代码：

```
do {
    自动计算 pc 寄存器以及从 pc 寄存器的位置取出操作码；
    if (存在操作码) 取出操作数；
    执行操作码所定义的操作；
} while (处理下一次循环);
```

热点代码会由 JIT 编译器编译为本地机器码，存入 Code Cache，后续直接执行机器码而非逐条解释字节码。


# 字节码指令集简介

## 了解 class 文件

Java 源代码在执行之前要经历一系列变换。首先就是使用 Java 编译器 `javac` 进行的编译阶段，将 Java 代码转换为包含字节码的 `.class` 文件。字节码是一种中间表示，没有与特定的机器架构绑定。

```java
public class Test {
    public static void main(String[] args) {
        System.out.println("Hello Bytecode!");
    }
}
```

使用 JDK 中自带的 `javac` 命令将 `Test.java` 源文件编译成 class 文件，就可以生成 `Test.class` 文件。

```shell
javac Test.java    # output: Test.class
```

使用十六进制查看工具查看 `Test.class` 文件内容：

![](/images/bytecode/test_class_bytecode.png)

其具体的结构如下面代码所示。

```C
ClassFile {
    u4             magic;                                   // 魔数 0xCAFEBABE
    u2             minor_version;                           // 该类次版本号
    u2             major_version;                           // 该类主版本号
    u2             constant_pool_count;                     // 常量数
    cp_info        constant_pool[constant_pool_count-1];    // 该类的常量池
    u2             access_flags;                            // 访问标志
    u2             this_class;                              // 该类的类名
    u2             super_class;                             // 超类名
    u2             interfaces_count;                        // 该类的实现的接口数量
    u2             interfaces[interfaces_count];            // 该类的实现的接口
    u2             fields_count;                            // 字段数
    field_info     fields[fields_count];                    // 该类的所有字段
    u2             methods_count;                           // 方法数
    method_info    methods[methods_count];                  // 该类的所有方法
    u2             attributes_count;                        // 属性数
    attribute_info attributes[attributes_count];            // 该类的所有属性（比如，源文件的名字，等等）
}
```

> u1、u2、u4 三种数据结构表示 1、2、4 字节无符号整数

《Optimizing Java》一书作者帮我们编了一句顺口溜：**My Very Cute Animal Turns Savage In Full Moon Areas**

![](/images/bytecode/mnemonic_class_file_structure.png)

### 魔数

每个类文件都以魔数（magic number）`0xCAFEBABE` 开始，前面的 4 个以十六进制表示的字节表示当前文件符合 class 文件格式。

可以通过此链接 [GCK'S FILE SIGNATURES TABLE](https://www.garykessler.net/library/file_sigs.html) 查看其他文件的魔数值。

### 版本号

随后的 4 个字节表示用于编译该类文件的**主版本号**和**次版本号**。`Test.class` 文件中的主版本号为 52（0x34），表示是使用 Java 8 编译的。

每次大版本发布，主版本号加 1。Java 8 为 `52`，Java 21 为 `65`。

### 常量池

常量池的作用类似于 C 语言中的符号表（Symbol Table），也是 class 文件中第一个出现的变长结构。

常量池结构由两部分组成：

1. **常量池大小**：`u2` 两字节
2. **常量池项**：由 1 字节 tag 和具体内容组成

    ```c
    cp_info {
        u1 tag;
        u1 info[];
    }
    ```

常量池真正有效的索引是 1 ～ n-1，0 属于保留索引。

下表列出 JVM 规范中常见的常量池 tag 类型（Java 8 使用 tag 1～18，Java 9 起增加 Module / Package）：

**常量池类型**

| 类型 | tag 值 | Java SE |
|------|--------|---------|
| CONSTANT_Utf8 | 1 | 1.0 |
| CONSTANT_Integer | 3 | 1.0 |
| CONSTANT_Float | 4 | 1.0 |
| CONSTANT_Long | 5 | 1.0 |
| CONSTANT_Double | 6 | 1.0 |
| CONSTANT_Class | 7 | 1.0 |
| CONSTANT_String | 8 | 1.0 |
| CONSTANT_Fieldref | 9 | 1.0 |
| CONSTANT_Methodref | 10 | 1.0 |
| CONSTANT_InterfaceMethodref | 11 | 1.0 |
| CONSTANT_NameAndType | 12 | 1.0 |
| CONSTANT_MethodHandle | 15 | 7 |
| CONSTANT_MethodType | 16 | 7 |
| CONSTANT_InvokeDynamic | 18 | 7 |
| CONSTANT_Dynamic | 17 | 11 |
| CONSTANT_Module | 19 | 9 |
| CONSTANT_Package | 20 | 9 |

#### CONSTANT_Integer 和 CONSTANT_Float

```c
CONSTANT_Integer/Float {
    u1 tag;
    u4 bytes;
}
```

两者都是使用 4 字节来表示具体的数值常量。

Java 语言中定义的 boolean、byte、short、char 类型的变量在常量池中都会被当作 int 处理。

#### CONSTANT_Long 和 CONSTANT_Double

```
CONSTANT_Long/Double {
    u1 tag;
    u4 high_bytes;
    u4 low_bytes;
}
```

采用 big-endian（high byte first）存储：

```
((long) high_bytes << 32) + low_bytes
```

`Long` 和 `Double` 占两个常量池槽位，下一索引不可用。

#### CONSTANT_Utf8

```
CONSTANT_Utf8 {
    u1 tag;
    u2 length;
    u1 bytes[length];
}
```

`length` 表示 MUTF-8 编码的字节数组长度，`bytes[length]` 为具体字节。

MUTF-8 与 UTF-8 区别：

1. 采用两个字节表示空字符（`\0`）
2. 只使用单字节、双字节、三字节；四字节字符用「代理对」（双字符）表示

#### CONSTANT_String

用来表示 `java.lang.String` 类型的常量对象。`CONSTANT_Utf8` 存储字符串真正的内容，而 `CONSTANT_String` 并不包含字符串内容，仅包含指向 `CONSTANT_Utf8` 的索引。

```
CONSTANT_String {
    u1 tag;
    u2 string_index;
}
```

#### CONSTANT_Class

用来表示类或者接口，结构与 `CONSTANT_String` 类似。

#### CONSTANT_NameAndType

用来表示字段或方法的名称与描述符：

```
CONSTANT_NameAndType {
    u1 tag;
    u2 name_index;
    u2 descriptor_index;
}
```

1. tag 值固定为 12
2. `name_index` 指向 `CONSTANT_Utf8`，为字段或方法名
3. `descriptor_index` 指向 `CONSTANT_Utf8`，为字段或方法的类型描述符

#### CONSTANT_Fieldref、CONSTANT_Methodref、CONSTANT_InterfaceMethodref

```c
CONSTANT_Fieldref/Methodref/InterfaceMethodref {
    u1 tag;
    u2 class_index;
    u2 name_and_type_index;
}
```

- `class_index` 指向 `CONSTANT_Class`，表示字段或方法所在的类
- `name_and_type_index` 指向 `CONSTANT_NameAndType`

#### CONSTANT_MethodHandle、CONSTANT_MethodType、CONSTANT_InvokeDynamic

从 JDK 7 起为支持动态语言调用新增。`CONSTANT_InvokeDynamic` 为 `invokedynamic` 指令提供引导方法（bootstrap method）的引用。

#### 总结

可以通过 `javap` 命令或者 [jclasslib](https://github.com/ingokegel/jclasslib) 工具查看常量池信息。

![](/images/bytecode/static_constant_pool.png)

### Access flags

在常量池之后是访问标记，用来表示一个类是否为 `final`、`abstract`、`interface`、`annotation`、`enum` 等。两字节，16 个标记位。

### this_class、super_class、interfaces

这三个字段用来确定继承关系：

- `this_class`：当前类索引
- `super_class`：直接父类索引
- `interfaces`：实现的直接父接口列表

均指向常量池索引。

### 字段表

字段表是变长结构，类中定义的字段存储在这个集合中：

```
field_info {
    u2             access_flags;
    u2             name_index;
    u2             descriptor_index;
    u2             attributes_count;
    attribute_info attributes[attributes_count];
}
```

#### 字段描述符

| 描述符 | 类型 | 说明 |
|--------|------|------|
| B | byte | |
| C | char | |
| D | double | |
| F | float | |
| I | int | |
| J | long | |
| S | short | |
| Z | boolean | |
| L ClassName; | 引用类型 | `L` + 全限定名 + `;`，如 `Ljava/lang/String;` |
| [ | 一维数组 | `[I` = `int[]` |
| [[ | 多维数组 | `[[I` = `int[][]` |

### 方法表

方法表也是变长结构，类中定义的方法存储在这里：

```
method_info {
    u2             access_flags;
    u2             name_index;
    u2             descriptor_index;
    u2             attributes_count;
    attribute_info attributes[attributes_count];
}
```

方法描述符格式：`(参数1类型 参数2类型 ...) 返回值类型`

```
(Ljava/lang/String;)V
```

`V` 表示 void。

### 属性表

```
attribute_info {
    u2 attribute_name_index;
    u4 attribute_length;
    u1 info[attribute_length];
}
```

常见属性：

* **ConstantValue**：出现在 `field_info` 中，表示静态变量初始值
* **Code**：出现在 `method_info` 中，包含方法的字节码
* **LineNumberTable**：`Code` 的附属属性，存放源码行号与字节码偏移的对应关系

### javap 使用

`javap [options] [classes]`

默认显示 public、protected 和默认级别的方法。

| 选项 | 作用 |
|------|------|
| `-p` | 显示 private 方法和字段 |
| `-s` | 输出类型描述符签名 |
| `-c` | 反编译，显示方法内字节码 |
| `-v` | 详细信息：版本号、访问权限、常量池 |
| `-l` | 行号表和局部变量表（需 `javac -g` 编译） |


## 字节码指令

Java 虚拟机的指令由 1 字节的操作码（opcode）以及 0 至多个操作数构成。

`opcode [<operand1>, <operand2>]`

```
0 getstatic #2 <java/lang/System.out : Ljava/io/PrintStream;>
3 ldc #3 <Hello world!>
5 invokevirtual #4 <java/io/PrintStream.println : (Ljava/lang/String;)V>
8 return
```

### 虚拟机指令集

按用途可分为：常量、加载、存储、栈、数学、转换、比较、控制、引用等类别。

### 方法调用指令

| 指令 | 用途 |
|------|------|
| `invokestatic` | 调用静态方法 |
| `invokespecial` | 调用构造器 `<init>`、私有方法、父类方法 |
| `invokevirtual` | 调用虚方法（大多数实例方法） |
| `invokeinterface` | 调用接口方法 |
| `invokedynamic` | 运行时动态解析引导方法，再执行目标方法 |

前四条指令的分派逻辑由 JVM 内置；`invokedynamic` 的分派逻辑由用户提供的 bootstrap method 决定（lambda、Stream 等依赖此机制）。

**非虚方法**（Non-Virtual Method）：静态方法、私有方法、构造器、父类方法，以及 `final` 方法。这类方法在类加载的解析阶段即可确定唯一版本。

**虚方法**（Virtual Method）：其余可被覆盖的实例方法，通过 `invokevirtual` / `invokeinterface` 在**运行时**按实际对象类型分派（动态分派）。

### 字符串

> 【推荐】循环体内，字符串的连接方式，使用 StringBuilder 的 append 方法进行扩展。
>
> 说明：反编译出的字节码显示，每次循环都会 new 一个 StringBuilder，再 append，最后 toString，造成额外分配。

```java
String str = "start";
for (int i = 0; i < 100; i++) {
    str = str + "hello";
}
```

Java 8 编译上述代码的字节码：

![](/images/bytecode/java_8_for_string_add.jpg)

### 自动装箱/拆箱

自动装箱、拆箱在编译期被转换为包装类方法调用。以 `int` / `Integer` 为例：

- 装箱：`Integer.valueOf(int)`
- 拆箱：`Integer.intValue()`

### try-catch-finally 以及 try-with-resources 的字节码原理

阿里《Java 开发手册》中关于异常处理的规范，可以从字节码层面理解其原因。

> 异常处理 7.【强制】不要在 finally 块中使用 return
>
> 说明：try 块中的 return 执行成功后并不马上返回，而是继续执行 finally；若 finally 中也有 return，会直接返回，丢弃 try 中的返回点。

```java
class TryCatchFinallyDemo {
    public static void main(String[] args) {
        try {
            int i = 1 / 0;
            System.out.println("try");
        } catch (Exception exception) {
            System.out.println("catch");
        } finally {
            System.out.println("finally");
        }
    }
}
```

![](/images/bytecode/try_catch_finally.png)

现代 Java 编译器采用**复制 finally 代码块**的方式，将其插入 try 和 catch 中所有正常退出与异常退出路径之前，因此 finally 一定会执行。

> 异常处理 6.【强制】必须对资源对象、流对象进行关闭，有异常也要做 try-catch。
>
> 说明：JDK 7+ 可使用 try-with-resources。

```java
public void testTryResource(FileReader fileReader) throws IOException {
    try (BufferedReader br = new BufferedReader(fileReader)) {
        System.out.println(br.readLine());
    }
}
```

编译器会展开为带 `finally` 关闭逻辑的代码（简化示意）：

```java
BufferedReader br = new BufferedReader(fileReader);
Throwable primary = null;
try {
    System.out.println(br.readLine());
} catch (Throwable t) {
    primary = t;
    throw t;
} finally {
    if (br != null) {
        if (primary != null) {
            try { br.close(); } catch (Throwable suppressed) {
                primary.addSuppressed(suppressed);
            }
        } else {
            br.close();
        }
    }
}
```

Java 7 为 `Throwable` 增加了 `addSuppressed`，用于记录关闭资源时被抑制的异常。

**为什么不依赖 `finalize` 关闭资源？**

- `finalize` 执行时机不确定，可能在 GC 时才调用，资源可能长期占用
- 异常被吞掉，难以排查
- Java 9 起 `Object.finalize()` 已废弃，Java 18 起默认禁用

因此应使用 try-with-resources 或显式 `close()`，而不是指望 GC 回收时自动关闭。

### lambda 表达式的原理

Java 8 的 lambda **不是**匿名内部类的语法糖（早期编译器可能生成内部类，现代 javac 使用 `invokedynamic`）。

```java
Runnable r = () -> System.out.println("hello");
```

编译后核心字节码类似：

```
invokedynamic #0:run:()Ljava/lang/Runnable;
```

JVM 在首次执行时调用 bootstrap method（通常是 `LambdaMetafactory.metafactory`），动态生成实现函数式接口的类实例。好处是：不额外生成 `.class` 文件、按需生成、性能更好。

### 反射的实现原理

`Method.invoke()` 在 HotSpot 中的典型路径：

1. **Native 调用**：首次调用走 JNI，开销较大
2. **Inflation（膨胀）**：调用次数超过阈值（默认 15 次）后，JVM 生成字节码访问器（Generated Method Accessor），后续走普通方法调用，性能接近直接调用
3. **`setAccessible(true)`**：跳过 Java 访问检查，但仍需处理安全检查与模块限制（Java 9+）

反射打破了编译期类型约束，灵活性高，但首次调用和安全检查有额外成本。

### Java Instrumentation 的原理

`java.lang.instrument` 包提供运行时修改字节码的能力，基于 JVMTI 实现。

两种挂载方式：

| 方式 | 入口 | 场景 |
|------|------|------|
| Premain | `premain(String, Instrumentation)` | JVM 启动时通过 `-javaagent:agent.jar` 加载 |
| Agentmain | `agentmain(String, Instrumentation)` | 运行时 Attach 到已有进程 |

常见能力：

- `addTransformer`：类加载时转换字节码
- `retransformClasses` / `redefineClasses`：对已加载类重新转换

应用：APM 探针（SkyWalking、Pinpoint）、热部署、单元测试 Mock、Arthas 等。

### Just-In-Time (JIT) 编译器

《Java 性能权威指南》第四章介绍 JIT 编译器。

> 代码格式 11.【推荐】单个方法的总行数不超过 80 行。
>
> 说明：方法过长不利于 JIT 内联与优化，热点方法应保持精简。

JIT 将热点字节码编译为本地机器码，存入 **Code Cache**。Code Cache 大小有限，填满后新代码只能解释执行，性能下降。

常用 JVM 参数（HotSpot，默认值因版本和平台略有差异）：

| 参数 | 含义 | 默认值（约） |
|------|------|-------------|
| `InitialCodeCacheSize` | Code Cache 初始大小 | 255 KB（Client）/ 160 KB（Server） |
| `ReservedCodeCacheSize` | Code Cache 最大容量 | Java 8：240 MB；Java 11+：often 240 MB，可 `-XX:ReservedCodeCacheSize=256m` 调整 |
| `-XX:+UseCodeCacheFlushing` | 允许在 Cache 满时 flush 冷代码 | 视版本而定 |

### 字节码的应用

**方法重载（静态分派）**：编译期根据参数类型选择方法，对应字节码中的 `invokestatic` / `invokespecial` 等，在类加载解析阶段即可确定目标。

**方法重写（动态分派）**：父类引用指向子类对象时，运行时按实际类型选择方法，对应 `invokevirtual` / `invokeinterface`，是 JVM 多态的实现基础。

```java
class Parent { void foo() { System.out.println("parent"); } }
class Child extends Parent { void foo() { System.out.println("child"); } }

Parent p = new Child();
p.foo();  // 输出 child，运行时分派
```

### 字节码增强与 Java Agent

编译后的 `.class` 仍是可读写、可变换的中间产物。在类加载前（改磁盘文件）或类加载时（`ClassFileTransformer`），可以对字节码进行插入、替换、删除指令，从而在不改源码的情况下改变程序行为。

```
源码 (.java)
    ↓ javac
字节码 (.class)  ←── ASM / Javassist / Byte Buddy 读写、改写
    ↓ ClassLoader + Instrumentation
JVM 加载并执行增强后的类
```

#### 常见框架对比

| 框架 | 特点 | 典型使用者 |
|------|------|-----------|
| **ASM** | 直接操作字节码，性能高、控制细，API 偏底层 | Spring、CGLIB、Many agents |
| **Javassist** | 提供 Java 源码级 API（`CtMethod` 等），易上手 | 早期 Hibernate、部分 AOP |
| **Byte Buddy** | 流式 API + 声明式，生成代码质量高，无需编译器 | Mockito、SkyWalking、Hibernate |

Spring AOP 默认对 interface 用 JDK 动态代理，对 class 用 **CGLIB**（底层 ASM）生成子类；而 Java Agent 场景多在**类加载阶段**织入逻辑，两者切入点不同。

#### Java Agent 如何介入

Java Agent 通过 `Instrumentation` 接口注册 `ClassFileTransformer`：

```java
public class MyAgent {
    public static void premain(String args, Instrumentation inst) {
        inst.addTransformer(new MyTransformer(), true);
    }
}
```

类加载时，JVM 把原始 `byte[]` 交给 Transformer，返回修改后的字节码再加载。`-javaagent:my-agent.jar` 在进程启动时生效；Attach API 可在运行中对已存活 JVM 注入 Agent（Arthas 即此路径）。

#### 典型应用场景

| 场景 | 做法 | 代表 |
|------|------|------|
| **AOP** | 方法入口/出口插入拦截逻辑 | Spring AOP、AspectJ 编译织入 |
| **链路监控** | 自动埋点，记录耗时、TraceId | SkyWalking、Pinpoint、Zipkin Agent |
| **热修复** | 替换有 bug 的方法体 | 部分线上 patch 方案（需谨慎） |
| **单元测试 Mock** | 运行时生成子类/替身 | Mockito、PowerMock |
| **诊断排查** | 动态增强指定类观察行为 | Arthas `watch` / `trace` |

#### 简单示例：方法耗时统计

用 Javassist 在方法前后插入计时代码（示意）：

```java
CtMethod method = ctClass.getDeclaredMethod("doWork");
method.insertBefore("long _start = System.nanoTime();");
method.insertAfter("{ System.out.println(\"cost: \" + (System.nanoTime() - _start)); }");
```

等价的 ASM 需要手动维护操作数栈和局部变量表，代码更长，但性能与体积更优。Byte Buddy 则可以用更声明式的方式达到同样效果：

```java
new ByteBuddy()
    .subclass(Foo.class)
    .method(named("doWork"))
    .intercept(MethodDelegation.to(TimingInterceptor.class))
    .make();
```

#### 使用注意

- **类加载顺序**：被增强的类一旦加载，需 `retransformClasses` 才能再次修改
- **性能开销**：频繁插桩会增加方法入口成本，监控类 Agent 通常只增强业务包、排除 JDK 类
- **兼容性**：JDK 模块系统（Java 9+）限制对核心类的改写，Agent 需声明 `Can-Redefine-Classes` 等权限
- **安全与合规**：热修复、远程 Agent 注入涉及线上变更，需严格管控

更系统的实践可参考美团技术团队文章 [字节码增强技术探索](https://tech.meituan.com/2019/09/05/java-bytecode-enhancement.html)。


### 参考资料

* 《深入理解 JVM 字节码》
* 《深入理解 Java 虚拟机》第 6 章（类文件结构）、第 8 章（字节码执行引擎）
* [The Java Virtual Machine Specification](https://docs.oracle.com/javase/specs/jvms/se21/html/index.html)
* [字节码增强技术探索](https://tech.meituan.com/2019/09/05/java-bytecode-enhancement.html)
* [hexdump](https://man7.org/linux/man-pages/man1/hexdump.1.html)
* [Compiler Explorer (godbolt)](https://godbolt.org)
