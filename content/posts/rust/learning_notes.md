---
title: "Rust学习笔记"
date: 2022-10-27T20:20:48+08:00
draft: true
---


基元类型

bool 布尔类型
char 字符类型

整型：分为有符合、无符号

i8、i16、i32、i64、i128、isize
u8、u16、u32、u64、u128、usize

isize: 指针大小的有符号整数； 在32位CPU上相当于i32，在64位CPU上相当于i64

usize: 指针大小的无符号整数； 在32位CPU上相当于u32，在64位CPU上相当于u64

f32

f64

[T; N] 固定大小的数组， T表示元素类型， N 表示元素数目

[T] 动态大小的连续序列


* repr关键字



trait学习


trait 中带self的函数称为方法，通过变量实例使用小数点调用

没有self的函数称为静态函数，通过类型加双冒号：：的方式调用

```rust
trait T {
fn method1(self: Self);
fn method2(self: &Self); 
fn method3(self: &mut Self);
```

为某些类型实现trait；

impl Trait for dyn T {

}

也可以直接对类型增加成员方法,称之为 内在方法 (inherent methods)

```
impl T {

}
```


```
impl Trait1 for Trait2 {

}
```

扩展方法

孤儿规则

impl块要么与trait的声明在同一个crate中，要么与类型的声明在同一个crate中。


通用函数调用语法


trait 约束和继承

范型约束

where T:  Debug

继承

trait A {}
trait AA: A {}


#[derive(Copy, Debug)]

自动impl 某些trait

常用trait

PartialOrd、Ord、Sized

在编译阶段能确认大小的类型，都满足Sized约束。

DST(Dynamic Sized Type) 动态大小类型

trait 可以用在范型参数的约束中
trait 可以为一组类型impl，也可以单独为某一个具体类型impl
trait 可以为某个trait impl
trait 可以包含关联类型
trait 可以实现范型代码的静态分派，也可以通过trait object 实现动态分派
triat 可以不包含任何方法
trait 可以包含常量


使用trait做参数

```
pub fn use_trait(item: impl Trait) {
    println!("Breaking news! {}", item.summarize());
}
```


返回trait





范型

对多种类型进行统一的抽象，这就是范型。范型可以将 类型 作为参数，在函数或者结构体中使用。

```rust
enum Option<T> {
    Some(T),
    None,
}

let x: Option<i32> = Some(42);     // 范型参数T被具化成了i32
let y: Option<f64> = None;         // 范型参数T被具化成了f64
```

这里的<T>是声明了一个类型参数。


范型参数可以有多个，也可以有默认值

```rust
struct S<T=i32> {
    data: T
}

let v1 = S {data: 0};       // 如果不指定，参数默认为i32
let v2 = S::<bool> {data: false};
println!("{} {}", v1.data, v2.data);
```
范型类型具体化后，是完全不同的具体类型， Option<i32> 和 Option<i64>是完全不同的类型，不可相互转换。
编译器在生成代码时会为每一个不同的范型参数生成不同的代码。 


函数中的范型


```rust
fn compare_option<T>(first: Option<T>, second: Option<T>) -> bool {
    match(first, second) {
        (Some(..), Some(..)) => true,
        (None, None) => true,
        _ =>false
    }
}
```

两个参数必须是完全一致的类型 Option<T>

```rust
fn compare_option<T1, T2>(first: Option<T1>, second: Option<T2>) -> bool {
    ...
}
```

function_name::<type params>(function params);

```rust
compare_option::<i32, f32>(Some(1), Some(1.0));
```


impl块中的范型

impl <Trait> for <Type> {}

范型类型既可以出现在 <Trait>位置，也可以出现在<Type> 位置。

impl <T, U> Into<U> for T where U: From <T> {
    fn into(self) -> U {
        U::from(self)
    }
}



trait object 含义

```rust
    fn say_hello(out: &mut dyn Write) -> std::io::Result<()> {
        out.write_all(b"hello world\n")?;
        out.flush()
    }
```

coherence rule 规则


impl Trait 和 Trait object 都属于类型

函数中使用impl Trait 和泛型中 T: Trait区别

impl Trait使用场景

impl Trait provides ways to specify unnamed but concrete types that implement a specific trait. It can appear in two sorts of places: argument position (where it can act as an anonymous type parameter to functions), and return position (where it can act as an abstract return type).

impl Trait 提供了一种指定未命名但实现特定 trait 的具体类型的方式。它可以出现在两种位置：参数位置（在这里，它可以作为函数的匿名类型参数），以及返回位置（在这里，它可以作为抽象返回类型）

1. as an argument type
2. as a return type

```rust
trait Trait {}

// argument position: anonymous type parameter
fn foo(arg: impl Trait) {
}

// return position: abstract return type
fn bar() -> impl Trait {
}
```



rust 
.. 含义

@ .. 含义

ref subslice @ ..

ref 
ref mut



生命周期规则：
每一个引用参数都会拥有自己的生命周期参数
当只存在一个输入生命周期参数时，这个生命周期会被赋予给所有输出生命周期参数
当拥有多个生命周期参数，而其中一个是&self或者&mut self时，self的生命周期会被赋予给所有的输出生命周期参数



update_informer 的使用
