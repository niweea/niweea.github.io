---
title: "爱生气的书店老板（LeetCode 1052）"
date: 2021-02-24T18:10:06+08:00
tags: ["LeetCode", "滑动窗口", "算法", "题解", "Java"]
categories: ["LeetCode"]
description: "LeetCode 1052 题「爱生气的书店老板」详细题解与算法思路：利用滑动窗口（Sliding Window）技巧求出在限定情绪抑制期内的最大满意客户数量。"
---

今天，书店老板有一家店打算试营业 customers.length 分钟。每分钟都有一些顾客（customers[i]）会进入书店，所有这些顾客都会在那一分钟结束后离开。

在某些时候，书店老板会生气。 如果书店老板在第 i 分钟生气，那么 grumpy[i] = 1，否则 grumpy[i] = 0。 当书店老板生气时，那一分钟的顾客就会不满意，不生气则他们是满意的。

书店老板知道一个秘密技巧，能抑制自己的情绪，可以让自己连续 X 分钟不生气，但却只能使用一次。

请你返回这一天营业下来，最多有多少客户能够感到满意的数量。

---

###### 示例

```
输入：customers = [1,0,1,2,1,1,7,5], grumpy = [0,1,0,1,0,1,0,1], X = 3
输出：16
解释：
书店老板在最后 3 分钟保持冷静。
感到满意的最大客户数量 = 1 + 1 + 1 + 1 + 7 + 5 = 16.

```

###### 提示

*    1 <= X <= customers.length == grumpy.length <= 20000
*    0 <= customers[i] <= 1000
*    0 <= grumpy[i] <= 1


## 思路

### 拆分问题

老板不生气时，顾客一定满意；生气时顾客一定不满意。秘密技巧只能连续使用 **X** 分钟，且只能用一次——在这 X 分钟内老板强制不生气。

因此答案可以拆成两部分：

```
最大满意人数 = base + max_increase
```

- **base**：老板本来就不生气的分钟里，所有顾客人数之和
- **max_increase**：选一个长度为 X 的窗口，使用技巧后**额外**挽回的满意人数

### 为什么只看「额外」部分

在不生气的分钟里，顾客已经满意了，技巧用不用都一样。技巧的价值只体现在：把窗口内**原本生气**的分钟变成不生气。

第 `i` 分钟若 `grumpy[i] = 1`，使用技巧可以多挽回 `customers[i]` 人；若 `grumpy[i] = 0`，则无额外收益。定义：

```
extra[i] = customers[i] × grumpy[i]
```

问题转化为：在 `extra` 数组上找**长度为 X 的连续子数组**，使其元素之和最大。

### 滑动窗口

暴力枚举每个窗口是 O(n×X)，用滑动窗口优化到 O(n)：

1. 先算 `base`
2. 用窗口 `[0, X)` 初始化 `increase`（第一个窗口的 extra 之和）
3. 窗口右移：加入 `extra[i]`，移出 `extra[i - X]`，维护最大值
4. 返回 `base + max_increase`

### 示例推导

```
customers = [1, 0, 1, 2, 1, 1, 7, 5]
grumpy    = [0, 1, 0, 1, 0, 1, 0, 1]
extra     = [0, 0, 0, 2, 0, 1, 0, 5]   // customers[i] * grumpy[i]
X = 3
```

- **base** = 1 + 1 + 1 + 7 = **10**（索引 0、2、4、6 不生气）
- 窗口 `[5, 7]` 的 extra 之和 = 1 + 0 + 5 = **6**（最后 3 分钟使用技巧）
- 答案 = 10 + 6 = **16**

### 复杂度

- 时间：O(n)
- 空间：O(1)


## 实现

### Rust

```rust
pub struct Solution {}

impl Solution {

    pub fn max_satisfied(customers: Vec<i32>, grumpy: Vec<i32>, x: i32) -> i32 {
        let x = x as usize;
        let mut base: i32 = 0;

        for (i, b) in grumpy.iter().enumerate() {
            if b.eq(&0) {
                base += customers.get(i).unwrap()
            }
        }

        let mut max_increase = 0;
        let mut increase = 0;
        for (i, v) in customers.iter().enumerate() {
            if i < x {
                increase += v * grumpy.get(i).unwrap();
                if i == x - 1 {
                    max_increase = increase;
                }
            } else {
                increase = increase + v * grumpy.get(i).unwrap() - customers.get(i - x).unwrap() * grumpy.get(i - x).unwrap();
                max_increase = max(max_increase, increase);
            }
        }

        base + max_increase
    }
}


#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test() {
        assert_eq!(
            16,
            Solution::max_satisfied(
                vec![1, 0, 1, 2, 1, 1, 7, 5],
                vec![0, 1, 0, 1, 0, 1, 0, 1],
                3,
            )
        );
    }
}
```

### Java

```java
public class Solution {
    
    public int maxSatisfied(int[] customers, int[] grumpy, int x) {
        int base = 0;
        for (int i = 0; i < customers.length; i++) {
            if (grumpy[i] == 0) {
                base += customers[i];
            }
        }

        int increase = 0;
        for (int i = 0; i < x; i++) {
            increase += customers[i] * grumpy[i];
        }

        int maxIncrease = increase;
        for (int i = x; i < customers.length; i++) {
            increase = increase + customers[i] * grumpy[i] - customers[i - x] * grumpy[i - x];
            maxIncrease = Math.max(maxIncrease, increase);
        }

        return base + maxIncrease;
    }
}
```
