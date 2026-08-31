---
title: "你必须知道的位运算"
date: 2021-06-04T18:35:04+08:00
lastmod: 2026-06-07T10:00:00+08:00
draft: false
tags: ["位运算", "算法", "LeetCode", "Java"]
categories: ["算法"]
description: "系统整理常用位运算实用技巧：符号相反判断、2的幂判断、二进制1的个数统计以及 LeetCode 136/137 经典位运算题解。"
---

位运算直接操作二进制位，在判断性质、压缩状态和优化性能时非常高效。下面整理几个实用技巧与对应 LeetCode 题目。

## 检测两个整数是否符号相反

`^`（异或）两值对应位不同时结果为 1。

正数和负数最高位（符号位）不同（正数为 0，负数为 1），异或后若符号相反，则结果为负数：

```java
int x = 6;
int y = -6;
boolean result = (x ^ y) < 0;
System.out.println(result ? "opposite" : "same");  // opposite
```

> 正数的二进制以原码方式表示，负数以补码方式表示。

## 检测一个正整数是否为 2 的幂

如果一个正整数为 2 的幂，其二进制中**只有一位是 1**。以 8 为例：

```java
System.out.println(Integer.toBinaryString(8));     // 1000
System.out.println(Integer.toBinaryString(8 - 1)); // 0111
```

```
8   二进制: 0000_1000
8-1 二进制: 0000_0111
8 & 7     = 0000_0000 = 0
```

`(v & (v - 1))` 会清除 `v` 最低位的 1。若 `v` 是 2 的幂，清除后变为 0，因此：

```
(v > 0) && (v & (v - 1)) == 0
```

```java
for (int i = 0; i <= 16; i++) {
    boolean r = i > 0 && (i & (i - 1)) == 0;  // 注意：0 不是 2 的幂
    System.out.printf("%d is a power of 2: %s %n", i, r ? "yes" : "no");
}
```

## 计算与一个数最接近的 2 的 N 次幂

「最接近」通常有两种需求：**向上取**（≥ n 的最小 2 的幂）和**向下取**（≤ n 的最大 2 的幂）。

### 向上取：≥ n 的最小 2 的幂

若 `n` 本身已是 2 的幂，则返回 `n`；否则将最高位 1 右侧全部填 1，再加 1：

```java
public static int nextPowerOfTwo(int n) {
    if (n <= 0) return 1;
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    return n + 1;
}
```

示例：`nextPowerOfTwo(9) = 16`，`nextPowerOfTwo(8) = 8`。

Java 标准库：`Integer.highestOneBit(n - 1) << 1`（需处理 `n <= 1` 的边界）。

### 向下取：≤ n 的最大 2 的幂

直接取最高位的 1：

```java
int lower = Integer.highestOneBit(n);  // n=9 → 8, n=8 → 8
```

### 四舍五入到最近

比较 `lower` 与 `nextPowerOfTwo(n)` 哪个与 `n` 距离更近即可；相等时通常取较小值。

## 计算二进制表示中 1 的个数

也叫 **popcount**（population count）。

### 方法一：Brian Kernighan 算法

利用 `n & (n - 1)` 每次消掉最低位的 1，循环次数等于 1 的个数：

```java
public static int bitCount(int n) {
    int count = 0;
    while (n != 0) {
        n &= (n - 1);
        count++;
    }
    return count;
}
```

`bitCount(0b101101) = 4`。

### 方法二：逐位统计

```java
public static int bitCount2(int n) {
    int count = 0;
    while (n != 0) {
        count += n & 1;
        n >>>= 1;
    }
    return count;
}
```

### 方法三：JDK 内置

```java
Integer.bitCount(n);  // 底层通常由 CPU 指令 POPCNT 或优化实现
```

### SWAR 算法（了解）

并行分治思想，在常数时间内对多个位分组求和，详见 [Variable-precision SWAR algorithm](http://ponder.work/2020/08/01/variable-precision-SWAR-algorithm/)。日常开发直接用 `Integer.bitCount` 即可。

## LeetCode 题

### 136. 只出现一次的数字

[136. 只出现一次的数字](https://leetcode.cn/problems/single-number/)

> 给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。

异或性质：`a ^ a = 0`，`a ^ 0 = a`，且满足交换律、结合律。成对出现的元素异或后为 0，再与单独元素异或即得答案：

```java
public int singleNumber(int[] nums) {
    int single = 0;
    for (int num : nums) {
        single ^= num;
    }
    return single;
}
```

### 137. 只出现一次的数字 II

[137. 只出现一次的数字 II](https://leetcode.cn/problems/single-number-ii/)

> 给你一个整数数组 nums，除某个元素仅出现一次外，其余每个元素都恰出现三次。找出并返回那个只出现了一次的元素。

不能简单异或（三个相同数异或仍为自身）。思路：按位统计每个二进制位上 1 出现的次数，对 3 取模，余数即为结果该位的值。

#### 状态机解法（推荐）

用 `ones` 记录「出现 1 次 mod 3」的位，用 `twos` 记录「出现 2 次 mod 3」的位：

```java
public int singleNumber(int[] nums) {
    int ones = 0, twos = 0;
    for (int num : nums) {
        ones = (ones ^ num) & ~twos;
        twos = (twos ^ num) & ~ones;
    }
    return ones;
}
```

状态转移（每个 bit 独立）：

| 当前状态 | 再来一个 1 | 新状态 |
|----------|-----------|--------|
| 00（0 次） | 1 | 01（1 次）→ `ones` |
| 01（1 次） | 1 | 10（2 次）→ `twos` |
| 10（2 次） | 1 | 00（3 次，归零） |

`& ~twos` / `& ~ones` 保证同一 bit 不会同时在 `ones` 和 `twos` 中为 1。

#### 逐位统计解法

```java
public int singleNumber2(int[] nums) {
    int result = 0;
    for (int i = 0; i < 32; i++) {
        int bitSum = 0;
        for (int num : nums) {
            bitSum += (num >> i) & 1;
        }
        if (bitSum % 3 != 0) {
            result |= (1 << i);
        }
    }
    return result;
}
```

时间 O(32n)，直观但慢于状态机 O(n)。


## 参考

- [Bit Twiddling Hacks](http://graphics.stanford.edu/~seander/bithacks.html)
- [Matters Computational: Ideas, Algorithms, Source Code](https://www.jjj.de/fxt/fxtbook.pdf)
- [位运算技巧总结](https://www.cnblogs.com/inmoonlight/p/9301733.html)
- [Variable-precision SWAR algorithm](http://ponder.work/2020/08/01/variable-precision-SWAR-algorithm/)
- [位运算经典应用](https://zhuanlan.zhihu.com/p/37014715)
