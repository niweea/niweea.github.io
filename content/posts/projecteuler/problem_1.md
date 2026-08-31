---
title: "欧拉计划 Problem 1：3或5的倍数（Multiples of 3 and 5）"
date: 2020-10-28T17:40:00+08:00
tags: ["欧拉计划", "Project Euler", "数学", "算法", "题解"]
categories: ["欧拉计划"]
description: "Project Euler Problem 1 题解与算法分析：求 1000 以内所有 3 或 5 的倍数之和，涵盖暴力循环解法与等差数列公式 O(1) 数学优化。"
---

Multiples of 3 and 5
=======

If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.
Find the sum of all the multiples of 3 or 5 below 1000.

---

#### 3或5的倍数

在小于10的自然数中，3或5的倍数有3、5、6和9，这些数之和是23。

求小于1000的自然数中所有3或5的倍数之和。

---


## 知识点

等差数列求和公式：

{{< katex >}}

$$
\sum_{k=1}^{n} k = \frac{n(n+1)}{2}
$$

小于 1000 的 3 或 5 的倍数之和，可分别求 3、5 的倍数之和，再减去被重复计算的 15 的倍数（容斥原理）：

$$
3\sum_{k=1}^{333} k + 5\sum_{k=1}^{199} k - 15\sum_{k=1}^{66} k
$$

项数分别为：

$$
333 = \left\lfloor \frac{999}{3} \right\rfloor,\quad 199 = \left\lfloor \frac{999}{5} \right\rfloor,\quad 66 = \left\lfloor \frac{999}{15} \right\rfloor
$$

代入公式：

$$
= 3 \cdot \frac{333 \cdot 334}{2} + 5 \cdot \frac{199 \cdot 200}{2} - 15 \cdot \frac{66 \cdot 67}{2} = 166833 + 99500 - 33165 = 233168
$$



## 实现

### C

```C
#include <stdio.h>

int arithmetic_progression_sum(int i, int limit) {
	int len = (limit - 1) / i;
	return i * len * (len + 1) / 2;
}

int main(void){
    int s3  = arithmetic_progression_sum(3, 1000);
    int s5  = arithmetic_progression_sum(5, 1000);
    int s15 = arithmetic_progression_sum(15, 1000);
    int result = s3 + s5 - s15;
    printf("%d",result);
    return 0;
}

```

### Java

```Java
class Main {
    public static void main(String[] args) {
        int s3 = arithmeticProgressionSum(3, 1000);
        int s5 = arithmeticProgressionSum(5, 1000);
        int s15 = arithmeticProgressionSum(15, 1000);
        int result = s3 + s5 - s15;
        System.out.println(result);
    }

    private static int arithmeticProgressionSum(int i, int limit) {
        int len = (limit - 1) / i;
        return i * len * (len + 1) / 2;
    }
}
```

### Go

```Golang
package main

import (
	"fmt"
)

func main() {
	s3 := arithmetic_progression_sum(3, 1000)
	s5 := arithmetic_progression_sum(5, 1000)
	s15 := arithmetic_progression_sum(15, 1000)
	result := s3 + s5 - s15
	fmt.Println(result)
}

func arithmetic_progression_sum(i uint32, limit uint32) uint32 {
	len := (limit - 1) / i
	return i * len * (len + 1) / 2
}

```


### Rust

```Rust

fn main() {
    let s3 = arithmetic_progression_sum(3, 1000);
    let s5 = arithmetic_progression_sum(5, 1000);
    let s15 = arithmetic_progression_sum(15, 1000);
    let result = s3 + s5 - s15;
    println!("{}", result);
}

fn arithmetic_progression_sum(i: u32, limit: u32) -> u32 {
    let len = (limit - 1) / i;
    i * len * (len + 1) / 2
}

```
