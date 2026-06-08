---
title: "从Java 8到Java 21的新特性"
date: 2023-10-10T10:55:21+08:00
---


## modules 模块化

模块化在包之上提供更高层次的聚合。

列出 JDK 的模块

```shell
    java --list-modules
```

输出结构如下：

```
java.base@21
java.compiler@21
java.datatransfer@21
java.desktop@21
java.instrument@21
java.logging@21
java.management@21
java.management.rmi@21
java.naming@21
java.net.http@21
...
```
> @21 表示正在使用的 JDK 的版本。

![](/images/java_new_features/jdk_modules.png)

查看模型详细信息

```shell
java --describe-module java.base
```

### 模块声明

模块使用module-info.java提供模块信息描述。也就是用于指定模块的依赖项、让其他模块使用的包等的元数据。每个模块声明以关键字 `module` 开头，紧接着一个专属的模块名称，以及括在括号中的模块主体内容。

```java
module org.example.features {
    requires java.base;
}
```

> 模块名称必须是唯一的
> module-info.java 不是一个合法的java标识符，因为它包含了破折号。这样做的目的是防止部分IDE将module-info.java或module-info.class 作为普通的Java类加以处理。

#### requires

requires子句用于指定执行的模块还需要哪些模块的支持。

默认情况下，所有的模块都依赖于名叫java.base的平台模块，它包含了Java主要的包，比如net、io和util。默认情况下，这个模块总是需要的，因此你不需要显式声明。

##### 隐式可读性

默认情况下，可读性是不可传递的。例如上图中`java.desktop`不能通过`java.prefs`读取`java.xml`。如果我们希望使用可传递的可读性关系。

```java
    requires transitive java.xml;
```

#### exports

exports子句声明了你的模块中哪些包可以被其他模块访问和使用。默认情况下，模块中的所有内容都是被封装的。如果某个类不在导出的包中，就不能通过反射来访问类中的非公共成员。


```java
import sun.net.util.IPAddressUtil;

String ip = "127.0.0.1";
boolean v4 = IPAddressUtil.isIPv4LiteralAddress(ip);
// 错误：软件包 'sun.net.util' 在模块 'java.base' 中声明，但后者没有将它导出到模块 'org.example.features'
```
解决方案

```java
--add-exports java.base/sun.net.util=org.example.features
```

#### exports…to

使用 to 关键字限制可以访问的模块。由多个逗号分隔模块名称。

```java
exports sun.net.util to
        java.desktop,
        java.net.http,
        jdk.jconsole,
        jdk.sctp;
```

> `moditect`项目可以自动生成module-info文件


#### 其他

`uses`、`provides…with`、 `open、opens` 及 `opens…to`


## 未模块化的代码如何运行在模块化sdk上

当编译没有模块描述符的代码会被放在`未命名模块(unnamed module)`中。 未命名模块非常特殊，它可以读取所有其他模块。使用未命名模块，尚未模块化的代码可以继续运行在模块化的JDK上。

### 目录结构发生变化 (JEP 220)

JDK 9之后

`bin`、`conf`、 `lib`、 `jmods`、`include`。 `jre` 目录不再存在，原 65M 大小的java标准库 `rt.jar` 也不复存在。现在拆分为几十个模块（.jmod扩展名，在jmods目录下），可以按需导入模块。


### 其他语言比较

```javascript
// javascript
export something

import { something} from 'file'
```

## 局部变量类型推断（JEP 286）

局部变量类型推断（JEP 286）（Local-Variable Type Inference ）在其他编程语言早已支持，例如：

C++ (auto)、C# (var)、Scala/Kotlin (var/val)、Go (声明 := ）、Rust(let)

JDK 11 提供了一个用来简化局部变量定义的特性。我们可以通过`var` 关键字启用它。

```java
    // 显式类型：
    String oldHello = "Hello";
    // 类型推断：
    var newHello = "Hello!";
```

通过查看字节码 LocalVariableTable中newHello变量被推断为String类型。

![](/images/java_new_features/local_variable_type_inference.png)


局部变量类型推断仅限于带有初始化值的局部变量、增强项 for循环中的索引以及传统for循环中声明的局部变量。

```java
        var nums = Arrays.asList(2, 4, 6, 8);

        for (var i = 0; i < nums.size(); i++) {
            System.out.println(nums.get(i));
        }

        for (var i : nums) {
            System.out.println(i);
        }
```

方法签名、构造函数、字段、catch代码块等变量声明都不支持。

```java
        // 编译器推断出类型
        var oddNumbers = new ArrayList<Integer>();
        // 会出现编译错误
        oddNumbers = new LinkedList<Integer>();
```

一旦变量被初始化，其类型是固定的，后续的赋值必须与初始化表达式的类型兼容。


## 在接口中允许使用私有方法

在接口中允许使用私有方法（Allow private methods in interfaces ）。 从Java 8开始，Java接口中允许使用默认方法（default methods）和静态方法（static methods）。从Java 9版本开始，Java允许在接口中使用私有方法（private methods）。用于将接口中的重复代码抽象为私有方法，以提高代码的可维护性和可读性。

```java
public interface MyInterface {
    // 接口中的常量,会隐式声明为 public static final
    int COUNT = 1;

    /**
     * 抽象方法
     * public abstract void abstractMethod()
     */
    void abstractMethod();

    /**
     * 默认方法
     */
    default void defaultMethod() {
        System.out.println("interface default method");
        privateMethod(); // 调用私有方法
    }

    /**
     * 静态方法
     */
    static void staticMethod() {
        System.out.println("interface static method");
    }

    /**
     * 私有方法
     */
    private void privateMethod() {
        System.out.println("interface private method");
    }

    /**
     * 私有静态方法
     */
    private static void privateStaticMethod() {
        System.out.println("interface private static method");
    }
}
```

## 匿名内部类的钻石操作符

匿名内部类的钻石操作符（Diamond operator for anonymous inner classes ）。钻石操作符（<>）是Java 7中加入的一个非常有用的特性，用来减少冗余类型声明。但是在java 9 之前此特性并不支持匿名内部类（anonymous inner classes）。

```java
// java 7以后普通类不需要在右侧提及范型类型，使用钻石操作符，编译器可以自行推断。
List<String> list = new ArrayList<>();
```

```java
abstract class Calculator<T> {
    abstract T add(T x, T y);
}

// 在java 8 中实例化泛型类时不允许省略类型参数，如果省略会提示“无法将 '<>' 用于匿名内部类”
Calculator<Integer> calculator = new Calculator<Integer>() {
    @Override
    Integer add(Integer x, Integer y) {
        return x + y;
    }
};

// 在java 9 中匿名内部类允许实例化泛型类时省略类型参数
Calculator<Integer> calculator = new Calculator<>() {
    @Override
    Integer add(Integer x, Integer y) {
        return x + y;
    }
};

```


## JShell REPL(Read–eval–print loop)

JShell（Java Shell），是Java 9引入的交互式编程工具，它允许开发者在命令行界面中即时编写和执行Java代码片段，而不需要创建和编译独立的Java类文件。


* 输入表达式可以不包含在方法中
* 可以省略分号
* 默认导入常用的包
* 上/下键可以查看历史记录
* TAB键可以提升方法以及javaDoc
* 将会话保存到文件中(/save)
* 复杂、多行支持不好

![](/images/java_new_features/jshell.png)



## Record Classes 记录类型 （JEPS 395）

java 16中增加了record关键字（Preview in JDK 14 JDK 15），用于表示不可变的数据对象。有助于减少样板代码，提高代码的可读性和可维护性。

此特性与Kotlin的Data classes、Scala的Case classes相似。

```java
public record Point(int x, int y) {
    public int add() {
        return x + y;
    }
}
```

通过查看字节码，发现Point类继承于java.lang.Record抽象类。用final修饰class以及每个字段，编译器还自动为我们创建了构造方法，和字段名同名的方法，以及覆写toString()、equals()和hashCode()方法。


```java
final class Point extends Record {
    private final int x;
    private final int y;

    public Point(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public int add() {
        return x + y;
    }

    public int x() {
        return this.x;
    }

    public int y() {
        return this.y;
    }

    public String toString() {
        return String.format("Point[x=%s, y=%s]", x, y);
    }

    public boolean equals(Object o) {
        ...
    }
    public int hashCode() {
        ...
    }
}
```

* 不可变的字段
* 一个规范的构造器
* 每个元素都有的访问器方法
* equals()、hashCode()、toString()
* 序列化/反序列化不再需要 serialVersionUID

```java
// 显式定义规范构造函数
public record Point(int x, int y) {
  public Point {
    if (x < 0) {
      throw new IllegalArgumentException("x can't be negative");
    }
    if (y < 0) {
      y = 0;
    }
  }
    // 重写
    @Override
    public int x() {
        return x;
    }
}
```

### 其他语言比较

```kotlin
// kotlin
data class Point(val x: Int, val y: Int)
```

```scala
// scala
case class Point(x: Int, y: Int)
```


## Switch Expressions switch表达式

在JDK14中（Preview in JDK 12 JDK 13）引入`switch`表达式

```java
    private static void showDay(String day) {
        String result = switch (day) {
            case "Monday" -> "First day of week";
            case "Tuesday", "Wednesday", "Thursday" -> "Midweek day";
            case "Friday" -> "Last day of week";
            default -> {
                System.out.println(day);
                yield "Midweek day";
            }
        };

        System.out.println(result);
    }
```

>  yield关键字与break类似，会终止执行，但是yield会生成一个值。 
>  如果在 switch 中没有涵盖所有 case 的话，它将无法编译通过。

### 其他语言比较

Kotlin `if expression` 和 `when expression`

```kotlin
var max = if (a > b) a else b

val result = when(x) {
  1 -> "one"
  2 -> "two" 
  else -> "other"
}
```

Rust中`match`表达式

```rust
let x = 2;

let result = match x {
    1 => "one",
    2 => "two",
    _ => "other", // `_`相当于Kotlin中的`else`，用来匹配所有其他情况
};

println!("Result: {}", result);
```


## try-with-resources 语句中允许使用 effectively-final 变量

try-with-resources 语句中允许使用 effectively-final 变量（Effectively final variables in try-with-resources ）。

更简洁的`try-with-resources` 语句, 只要变量被显示的声明为最终变量或者实际上的最终变量都可以使用此新特性。

```java
    // java 8
    try (BufferedReader reader = new BufferedReader(new FileReader("testRead.txt"));
         BufferedWriter writer = new BufferedWriter(new FileWriter("testWrite.txt"))) {
        // omitted
    } catch (Exception exception) {
        
    }
```

```java
    // java 9
    BufferedReader reader = new BufferedReader(new FileReader("testRead.txt"));
    BufferedWriter writer = new BufferedWriter(new FileWriter("testWrite.txt"));
    try (reader; writer) {
        // omitted
    } catch (Exception exception) {

    }
```

>> ##### ⚠️注意事项
>> 1. 引用变量被 try-with-resources 释放之后再次使用会触发异常
>> 2. 引用变量无法移除后无法捕获异常，需要在加一层try-catch结构


## Text Blocks 文本块（JEPS 378)

java 15（Preview in JDK 13 JDK 14）可以通过使用三重双引号来处理多行文本。此语法与Python/Kotlin一致。

```java
    String json = "{\n" +
            "    \"id\": \"6437e92ca47f284a0307c042\"\n" +
            "    \"hash\": \"9222309919699314151\",\n" +
            "    \"width\": 1024,\n" +
            "    \"height\": 1024\n" +
            "}";

    json = """
        {
            "id": "6437e92ca47f284a0307c042"
            "hash": "9222309919699314151",
            "width": %d,
            "height": %d
        }
        """; 

    json = json.formatted(1024, 1024);           
```
为了支持文本块，String 类里添加了一个新的 formatted() 方法

```java
String singleLine = """
          Hello \
          World
          """;
```

通过使用`\` 防止换行

### 其他语言比较

```php
// php
$str = <<<EOD
这是
一个文本块
EOD;
```

```go
// go
text := `这是
一个文本块`
```

```rust
// rust
let text = r#"这是
一个文本块"#;
```


## 有帮助的 NullPointerException 报告机制

```java
        String test = null;
        test.length();       
```

```java
// java 8
java.lang.NullPointerException

// java 21
Exception in thread "main" java.lang.NullPointerException: Cannot invoke "String.length()" because "test" is null
	at features/org.example.features.nullpointer.Demo.main(Demo.java:6)   
```


## Sealed Classes 密封类/接口 （JEPS 409）

枚举创建了一个只有固定数量实例的类。JDK 17 （Preview in JDK 15 JDK 16）最终确定引入了密封（sealed）类和密封接口，因此基类或接口可以限制自己能派生出哪些类。提供了更细粒度的继承关系控制。


```java
public sealed class Shape permits Triangle, Rectangle, Polygon {
}

public final class Triangle extends Shape {
}

public final class Rectangle extends Shape {
}

public non-sealed class Polygon extends Shape {
}

// 错误，sealed 层次结构中不允许使用 'Circle'
public class Circle extends Shape {
}
```

尝试继承未在`permits`子句中列出的子类，编译器会产生错误。 除了`permits`中的子类，不会再有其他子类。

如果所有的子类都定义在同一个文件中，则不需要 permits 子句。

sealed 类的子类只能通过下面的某个修饰符来定义。

* final： 不允许有进一步的子类
* sealed：允许有一组密封子类
* non-sealed：一个新关键字，允许未知的子类来继承它

子类继承方式sealed传递了密封性，final确认了密封性，non-sealed显式声明破坏密封性。

> 一个  sealed 类必须至少有一个子类
> record 也可以用作接口的密封实现


## String Templates 字符串模板 (JEPS 430 Preview)


```java
String customerName    = "Java Duke";
String phone           = "555-123-4567";
String address         = "1 Maple Drive, Anytown";
String json = STR."""
{
    "name":    "\{customerName}",
    "phone":   "\{phone}",
    "address": "\{address}"
}
""";
```

```java
int index = 0;
String data = STR."\{index++}, \{index++}, \{++index}, \{index++}, \{index}";
System.out.println(data);
```

还提供了FMT模版处理器，其提供了左侧的格式化处理功能。

> 通过参数--enable-preview使用预览特性


## 虚拟线程

TODO: 


## HTTP Client 升级

TODO:

## JVM

TODO: 


## 其他

1. HTTP 2 客户端 & 标准 HTTP Client 升级
2. 改进的 Stream API & 响应式流（Reactive Streams) API
3. 改进的 CompletableFuture API
4. 轻量级的 JSON API
5. 集合工厂方法
6. socket API重构


## 参考

* [了解 Java 9 模块](https://www.oracle.com/cn/corporate/features/understanding-java-9-modules.html)
* <<Java 9模块化开发>>
* [Java Language Updates](https://docs.oracle.com/en/java/javase/21/language/preface.html#GUID-840E8268-A821-4BCE-83FE-A4ACAAED68DA)
* [A categorized list of all Java and JVM features since JDK 8 to 21](https://advancedweb.hu/a-categorized-list-of-all-java-and-jvm-features-since-jdk-8-to-21/)
* [Java 9 到 17 的语言特性更新](https://nanova.me/posts/Java-lang-updates)
