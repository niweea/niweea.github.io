---
title: "Rust奇奇怪怪的语法与实战特性"
date: 2021-01-28T19:26:32+08:00
tags: ["Rust", "编程语言", "语法特性", "Rust进阶"]
categories: ["Rust"]
description: "汇总梳理 Rust 语言中独特而精妙的语法特性：问号操作符错误传递、模式匹配高级用法、生命周期标注、闭包与迭代器语法糖。"
---

Rust 语法奇奇怪怪的写法。

`?` 操作符 （Error propagation）
======

函数调用后带 `?` 什么含义

```rust
 File::create(filename)?;
```
等同于

```rust
let output = match File::create(filename){
    Ok(f) => { f }
    Err(e) => { return Err(e); }
};
```

`?` 操作符用于简化 `Result` 的写法：遇到 `Err` 就提前返回，遇到 `Ok` 则解包取值。

Go 中每次都要写：

```go
f, err := os.Create(filename)
if err != nil {
    return err
}
```

Rust 用 `?` 一行等价：

```rust
let f = File::create(filename)?;
```

`||` 闭包结构
======

`|param1, param2| { // do something }` 结构

Rust闭包表达式写法,采用了与Smalltalk 和 Ruby 类似的`|`结构

```rust
let expensive_closure = |num| {
    println!("this is closure expensive...");
    num
};
```

两个竖线(`|`)包裹的是闭包参数，大括号(`{}`)内是闭包执行体, 单行时大括号可省略。


`_` 下划线操作符
======

* 忽略某些值
   
   类似于golang 中的用法

```rust
let numbers = (2, 4, 8, 16, 32);

match numbers {
    (first, _, third, _, fifth) => {
        println!("Some numbers: {}, {}, {}", first, third, fifth)
    },
}

// output: Some numbers: 2, 8, 32
```


* 变量名前添加`_` 用来忽略未使用的变量。

    以下划线开始变量名以便去掉未使用变量警告

```rust
fn main() {
    let _x = 5;   // _x不会产生警告
    let y = 10;  // y 未使用，会产生警告
}
```

* `_` 不会变量绑定

```rust
let s = Some(String::from("Hello!"));

// s 的值仍然会移动进 _s，并阻止我们再次使用 s
// if let Some(_s) = s {
// 只使用下`_`本身，并不会绑定值,s 没有被移动进`_`

if let Some(_) = s {
    println!("found a string");
}

println!("{:?}", s);
```

`r#` 操作符
======

原始标识符（Raw identifiers）前缀 `r#`。

原始标识符允许我们使用任何的单词作为标识符。

Rust不允许使用Rust定义的关键字以及保留字（例：use、as、type、where、match等）作为标识符。

```rust
fn match(needle: &str, haystack: &str) -> bool {
    haystack.contains(needle)
}
```
会得到如下错误:
```
error: expected identifier, found keyword `match`
 --> src/main.rs:4:4
  |
4 | fn match(needle: &str, haystack: &str) -> bool {
  |    ^^^^^ expected identifier, found keyword
```

正确写法

```rust
fn r#match(needle: &str, haystack: &str) -> bool {
    haystack.contains(needle)
}

fn main() {
    assert!(r#match("foo", "foobar"));
}
```


原始字符串 `r"..."` / `r#"..."#`
======

前缀 `r` 表示 raw string（原始字符串），字符串内的 `\`、引号等特殊字符**不会被转义**。

```rust
// 普通字符串：\n 会被解析为换行
let s1 = "line1\nline2";

// 原始字符串：\n 就是字面量 \ 和 n
let s2 = r"line1\nline2";

// Windows 路径等场景很常用
let path = r"C:\Users\name\file.txt";
```

当字符串本身包含 `"` 时，用 `#` 定界，避免冲突：

```rust
let json = r#"{"name": "Rust", "version": 1}"#;
println!("{}", json);
```

若字符串里还有 `"#`，就增加 `#` 的数量：

```rust
let s = r##"contains "# and \" both"##;
```

与上一节 `r#` 原始标识符不同：`r"..."` 用于**字符串字面量**，`r#match` 用于**标识符**。

其他语言也有类似写法：Python 的 `r"..."`、C# 的 `@"..."`、Swift 的 `#"..."#`。


`!` 宏调用
======

Rust 里带 `!` 的调用（如 `println!`、`vec!`）是**宏**，不是普通函数。

宏在**编译期**展开成代码，因此可以：

- 接受可变数量的参数
- 根据参数类型生成不同代码
- 在编译期做语法层面的代码生成

```rust
println!("x = {}, y = {}", x, y);
let v = vec![1, 2, 3];
let s = format!("hello {}", name);
```

常见标准库宏：

| 宏 | 作用 |
|----|------|
| `println!` | 打印并换行 |
| `format!` | 格式化字符串 |
| `vec!` | 创建 `Vec` |
| `panic!` | 触发 panic |
| `assert!` / `assert_eq!` | 断言 |
| `dbg!` | 调试打印表达式 |

自定义宏用 `macro_rules!` 声明：

```rust
macro_rules! say_hello {
    () => {
        println!("Hello!");
    };
}

fn main() {
    say_hello!();
}
```

宏与函数的区别：函数签名固定，宏在编译期按规则展开，灵活性更高，但错误信息通常不如函数直观。


所有权系统
======

Rust 没有垃圾回收，靠**所有权（Ownership）**在编译期管理内存。这是 Rust 最「怪」也最核心的部分，其他很多语法都建立在它之上。

### 三条基本规则

1. 每个值有且仅有一个**所有者**
2. 所有者离开作用域，值被自动释放（`drop`）
3. 同一时刻，对同一数据只能有**一个可变引用**（`&mut`）或**多个不可变引用**（`&`），不能并存

### 移动（Move）

赋值、传参、从函数返回时，**所有权会转移**，原变量不可再用：

```rust
let s1 = String::from("hello");
let s2 = s1;          // 所有权 move 给 s2
// println!("{}", s1); // 编译错误：s1 已失效
```

基本类型（如 `i32`、`bool`）实现了 `Copy` trait，赋值时**复制**而非移动：

```rust
let x = 5;
let y = x;   // 复制，x 仍可用
println!("{}", x);
```

### 借用（Borrow）

不转移所有权，只临时访问，用 `&`（不可变借用）和 `&mut`（可变借用）：

```rust
fn main() {
    let mut s = String::from("hello");

    let r1 = &s;       // 不可变借用
    let r2 = &s;
    println!("{} {}", r1, r2);

    let r3 = &mut s;   // 可变借用
    r3.push_str(" world");
    println!("{}", r3);
}
```

以下写法会编译失败——同时存在可变和不可变借用：

```rust
let mut s = String::from("hello");
let r1 = &s;
let r2 = &mut s;   // 错误：已有不可变借用 r1
println!("{} {}", r1, r2);
```

与 C/C++ 指针不同：Rust 的借用规则由**编译器强制检查**，而不是靠程序员自觉。


`ref` / `ref mut` 模式
======

在 `match`、`if let` 等模式匹配中，默认是**按值绑定**——会移动（move）所有权。

`ref` 和 `ref mut` 则在模式里创建**引用**，避免把值移走：

```rust
let s = String::from("hello");

match s {
    ref r => println!("borrowed: {}", r),
}
// s 仍可用，因为 match 只借用了它
println!("{}", s);
```

对比：直接绑定会 move 走 `s`：

```rust
let s = String::from("hello");

match s {
    r => println!("owned: {}", r),
}
// println!("{}", s);  // 编译错误：s 已被 move
```

`ref mut` 用于需要修改的场景：

```rust
let mut v = vec![1, 2, 3];

match v {
    ref mut r => r.push(4),
}
println!("{:?}", v);  // [1, 2, 3, 4]
```

与 `_` 的区别（见上文）：`_` 忽略值；`ref` 借用值；直接写变量名则获取所有权。

其他语言几乎没有在模式匹配里区分「借用」和「移动」，这是 Rust 所有权系统的延伸。


生命周期 `'a`
======

生命周期（Lifetime）标注引用**能存活多久**，防止悬垂引用（dangling reference）。

语法上用 `'a`、`'b` 等单引号前缀命名：

```rust
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}
```

含义：`'a` 表示「返回的引用，与参数 `x`、`y` 中较短的那个生命周期一致」。编译器据此检查：调用方不能在使用返回值时，让被引用的数据已经失效。

### 为什么需要

```rust
fn broken() -> &str {
    let s = String::from("hello");
    &s          // 错误：s 在函数结束时被 drop，返回 &s 成为悬垂引用
}
```

编译器会拒绝这类代码。生命周期标注帮助编译器在**编译期**验证引用合法性。

### 结构体中的生命周期

结构体若持有引用，必须标注生命周期：

```rust
struct Excerpt<'a> {
    text: &'a str,
}

fn main() {
    let novel = String::from("Call me Ishmael.");
    let first = novel.split_whitespace().next().unwrap();
    let e = Excerpt { text: first };
    println!("{}", e.text);
}
```

`Excerpt<'a>` 表示：`text` 字段引用的字符串，不能比 `'a` 活得更短。

### `'static` 生命周期

`'static` 表示整个程序运行期间都有效，例如字符串字面量：

```rust
let s: &'static str = "I live forever";
```

生命周期是 Rust 独有的显式语法，Go / Java / Python 等语言没有同等机制——它们用 GC 或约定来管理，不在类型系统里标注引用有效期。



# 参考资料

[Rust 程序设计语言](http://120.78.128.153/rustbook/appendix-02-operators.html)
