---
title: "你必须知道的排重策略"
date: 2021-06-08T18:59:58+08:00
tags: ["排重", "Bloom filter", "BitMap"]
categories: ["排重"]
---

## 精准去重

Array、Set、Map、BitSet、Tree等

### Array/普通Set/普通Map

数据量小的时候，大家通常会使用Array、HashSet、TreeSet、Map等数据结构。当数据量大时，此类数据结构占用内存较大。

### BitSet/BitMap

面试题

> 在10亿个unsigned int型整数中，如何找出重复出现的数。

此面试题我们会想到使用BitMap结构来存储unsigned int。

`BitSet`本质上是定义了一个很大的 bit 数组，每个元素对应到 bit 数组的其中一位。

`BitSet` 将数字值转为bit位的位置。每一个integer值只占用1bit。以集合 ${1, 3, 7}$ 对应的BitMap为 $[10001010]$(伪结构，不区分大小端问题)。

以Java BitSet为例，其实现采用 `long[]` 按位处理值。

> Java语言中long 类型 等同于 golang语言中的int64。

```java
    // 存储结构
    private long[] words;
    // 简化后逻辑
    int wordIndex = bitIndex >> 6;
    words[wordIndex] |= (1L << bitIndex);
```

`BitSet` 存储所需的内存大小要根据存储元素的最大值来确认，这就造成了稀疏的BitSet和稠密的BitSet占用相同的空间。


为了节省空间在压缩优化历史中产生了`WAH(Word Aligned Hybrid)`、`EWAH(Enhanced Word Aligned Hybrid)`、`CONCISE(Compressed N Composble Integer Set)`、`VALWAH(Variable-Aligned Length WAH)` 等压缩算法。

上述中算法都是基于`WAH`进行的改进。

### WAH

横向压缩bitmap index, 其实就是对单个bitmap的bit位进行压缩。

对单个bitmap进行压缩, 最常用的一个算法思想是RLE(Run Length Encoding), 就是指: 如果有连续100个bit位的值都是0, 存储100,0两个数字比存储100个bit更划算.

WAH就是一种利用RLE思想设计的方案。是一种字对齐的混合结构。

WAH压缩的内部格式的最小单元是字(一般一个字就是32个bit)。 WAH的的字有两种情况, 原文字(literal word)和压缩字(fill word)。

* 两种字通过32个bit中的第一个bit来区分, 第一个bit为`0`是原文字, 为`1`则是压缩字。

* 如果是原文字, 那么这个字剩余的31个bit, 和原始bitmap中未压缩的31个bit一模一样.

* 如果是压缩字, 那么剩余31个bit中:

    第2个bit表示压缩的值是 `0` 还是 `1`

    剩余30个bit表示有多少字的重复的值, 称为run number

    比如第一个bit是1, 第2个bit是1, 剩下30个bit是数值5, 则表示有连续的5*31 个1


![](/images/exclude_duplicate/wah_example.png)


WAH前两组: `01000000_00000000_00000011_10000000    10000000_00000000_00000000_00000010`


*缺点*

每次操作时都需要解压数据。

### Roaring Bitmap

> We partition the range of 32-bit indexes ([0, n)) into chunks of $2^{16}$ integers sharing the same 16 most significant digits. We use specialized containers to store their 16 least significant bits.


将32-bit的无符号Integer的高16位bits用来计算 `Container`索引, 低16位bits存放在 `Container`内。

那么就有$2^{16}$ = 65536 个 `Container`。

计算Container索引

```java
  protected static char highbits(int x) {
    return (char) (x >>> 16);
  }
```

计算低位

```java
  protected static char lowbits(int x) {
    return (char) x;
  }
```

`RoaringBitmap`类主要属性包含`RoaringArray highLowContainer = null;`。

RoaringArray主要结构

```java
  char[] keys = null;    // short数组，用来存储高16位作为索引
  Container[] values = null;    // Container数组，用来存储低16位数据
  int size = 0;    // 用来记录当前RBM包含的key-value有效数量
```

将一个32-bit的无符号Integer按照高16位分桶处理，其中高16位作为索引存储在char数组中，低16位作为数据存储在某个特定的Container内的数组中。

存储数据时，先根据高16位找到对应的索引key（二分查找），由于keys和values是一一对应的，即找到了对应的Container，若key存在则将低16位放入对应的Container中，若不存在则创建一个和key对应的Container，并将低16位放入Container中。

![](/images/exclude_duplicate/roaring_container.png)

#### Container

`Container`包含`ArrayContainer`、`BitmapContainer`、`RunContainer`

![](/images/exclude_duplicate/container_inherit.png)

##### ArrayContainer

当`Container`内的元素个数少于4096时，默认会采用`ArrayContainer`。适合存放稀疏的数据。

`ArrayContainer` 通过`char[]`实现，当元素个数位4096时，使用内存为 $4096 * 2 * 8 = 65536 bit $ 。当元素个数小于4096时，所使用的内存低于BitSet所使用的内存。

`Arraycontainer`查询时会使用二分查找。

> Java `char`类型占2字节(16bit)，等同于golang 中的`uint16`类型。

![](/images/exclude_duplicate/roaring_memory.png)

##### BitmapContainer

当`Container`内元素个数大于等于4096时，会采用`BitmapContainer`。`BitmapContainer`通过`long[]`实现。适合用来存放稠密数据。

因为我们只存储低16位数据，所有需要存储的位数最大为 $ 2^{16} = 65536 $。`BitmapContainer` 使用内存大小一直是 8KB。

BitmapContainer初始化

```java
    //简化后代码

    final long[] bitmap;  // 数组最大长度为1024
    
    for (int k = 0; k < arrayContainer.cardinality; ++k) {
      final char x = arrayContainer.content[k];
        bitmap[(x) / 64] |= (1L << x);
    }
```

BitmapContainer增加元素

```java
  public Container add(final char i) {
    final long previous = bitmap[i >>> 6];
    long newval = previous | (1L << i);
    bitmap[i >>> 6] = newval;
    if (USE_BRANCHLESS) {
      cardinality += (int)((previous ^ newval) >>> i);
    } else if (previous != newval) {
      ++cardinality;
    }
    return this;
  }
```


##### RunContainer

`RunContainer`适用于存储连续的数据。采用了行程长度压缩算法(Run Length Encoding)。RLE算法：例如 { 1, 10, 20,0, 31,2 } 会被记录为 {  11, 4, 21, 1}。

最好情况是如果数据是连续分布的，就算是存放 65536 个元素，也只会占用2个short。而最坏的情况就是当数据全部不连续的时候，会占用128 KB 内存。

* 通过调用`runOptimize`来判断是否满足条件转换为`RunContainer`。

* 其他Container超过设定容量后会转为`RunContainer`

##### 总结

![](/images/exclude_duplicate/roaring_container_type.png)


* 支持64位整数

* 支持序列化

时间空间复杂度

`BitmapContainer`只涉及到位运算，时间复杂度为O(1)。`ArrayContainer`和`RunContainer`需要用二分查找在有序数组中定位元素，故为O(logN)。

空间占用（即序列化时写出的字节流长度）方面，`BitmapContainer`是恒定为8192Byte的。`ArrayContainer`的空间占用与基数（c）有关，为(2 + 2c)Byte；`RunContainer`的则与它存储的连续序列数（r）有关，为(2 + 4r)Byte。


## 概率性去重

概率性去重显著特点时存在误判。常使用的方法有基于bit map 的Bloom Filter及变种和基数估计算法如HyperLogLog。

### Bloom Filter

*布隆过滤器基本思想*

由一个很长的二进制向量和一系列随机映射函数组成。

当一个元素被加入集合时，通过K个散列函数将这个元素映射成一个位数组中的K个点，把它们置为1。

检索时，我们只要看看这些点是不是都是1就（大约）知道集合中有没有它了：如果这些点有任何一个0，则被检元素一定不在；如果都是1，则被检元素很可能在。

![](/images/exclude_duplicate/bloom_filter_demo.jpg)

`False Positive`: 中文可以理解为“假阳性”。在这里表示，有可能把不属于这个集合的元素误认为属于这个集合；例如上图中的`d`元素。

`False Negative`: 中文可以理解为“假阴性”，Bloom Filter是不存在false negatived的， 即不会把属于这个集合的元素误认为不属于这个集合(False Negative)。

[Interactive Demonstration](https://www.jasondavies.com/bloomfilter/)

#### 公式

*误判率*

$\sum _{t}\Pr(q=t)(1-t)^{k}\approx (1-E[q])^{k}=\left(1-\left[1-{\frac {1}{m}}\right]^{kn}\right)^{k}\approx \left(1-e^{-kn/m}\right)^{k}$

- `n` 是已经添加元素的数量
- `k` 哈希的次数
- `m` 布隆过滤器的总长度


#### 性能优化

哈佛大学论文 <<Less Hashing, Same Performance: Building a Better Bloom Filter>>提供了优化的解决方法。

google `guava`框架实现了哈佛这篇论文。`guava`采用Murmur3 Hash算法。

首先将object通过funnel转换为基本类型，计算出64位hash，并且将高位低位分别作为hash。这样一来只调用了一次hash函数，大大节约了时间开销。

使用示例

```java
    BloomFilter<String> bloomFilter = BloomFilter.create(Funnels.stringFunnel(Charsets.UTF_8), 100000, 0.1);
    bloomFilter.put("a");
    bloomFilter.put("b");
    boolean result = bloomFilter.mightContain("a");
    System.out.println(result);
```

`guava`实现了`MURMUR128_MITZ_32`和`MURMUR128_MITZ_64`两种Hash算法。默认使用`MURMUR128_MITZ_64`。

写入

```java
    public <T> boolean put(T object, Funnel<? super T> funnel, int numHashFunctions, LockFreeBitArray bits) {
      long bitSize = bits.bitSize();
      byte[] bytes = Hashing.murmur3_128().hashObject(object, funnel).getBytesInternal();
      long hash1 = lowerEight(bytes);
      long hash2 = upperEight(bytes);

      boolean bitsChanged = false;
      long combinedHash = hash1;
      for (int i = 0; i < numHashFunctions; i++) {
        bitsChanged |= bits.set((combinedHash & Long.MAX_VALUE) % bitSize);
        combinedHash += hash2;
      }
      return bitsChanged;
    }
```

根据期望写入数与假阳性率计算总bit位数

```java
   /**
   * Computes m (total bits of Bloom filter) which is expected to achieve, for the specified
   * expected insertions, the required false positive probability.
   *
   * <p>See http://en.wikipedia.org/wiki/Bloom_filter#Probability_of_false_positives for the
   * formula.
   *
   * @param n expected insertions (must be positive)
   * @param p false positive rate (must be 0 < p < 1)
   */
  static long optimalNumOfBits(long n, double p) {
    if (p == 0) {
      p = Double.MIN_VALUE;
    }
    return (long) (-n * Math.log(p) / (Math.log(2) * Math.log(2)));
  }
```

根据期望插入数量和总位数计算需要hash次数

```java
   /**
   * Computes the optimal k (number of hashes per element inserted in Bloom filter), given the
   * expected insertions and total number of bits in the Bloom filter.
   *
   * <p>See http://en.wikipedia.org/wiki/File:Bloom_filter_fp_probability.svg for the formula.
   *
   * @param n expected insertions (must be positive)
   * @param m total number of bits in Bloom filter (must be positive)
   */
  static int optimalNumOfHashFunctions(long n, long m) {
    // (m / n) * log(2), but avoid truncation due to division!
    return Math.max(1, (int) Math.round((double) m / n * Math.log(2)));
  }
```

> 联想一下算法导论散列表那一节，对于开放地址法，算法导论提出了线性探查、二次探查、双重散列等几种探查方法，以双重散列为冲突最小，这里的思路其实就是双重散列！联想一下上面提到的因为hash冲突而导致误判，那么减少冲突其实是自然而然的。

*缺点*

* 布隆过滤器不支持删除元素
* 有误报率

### Counting Bloom Filter

A counting Bloom filter is a Bloom filter that uses counters instead of bits.

![](/images/exclude_duplicate/counting_bloom_filter_visualize.png)


`Counting Bloom Filter`将标准 `Bloom Filter` 位数组的每一位扩展为一个小的计数器（Counter），在插入元素时给对应的 k （k 为哈希函数个数）个 Counter 的值分别加 1，删除元素时给对应的 k 个 Counter 的值分别减 1。`Counting Bloom Filter` 通过多占用几倍的存储空间的代价， 给 Bloom Filter 增加了删除操作。

![](/images/exclude_duplicate/counting_bloom_filter_demo.png)


`d-left counting Bloom`对CBF的优化。


### Cuckoo Filter

布谷鸟过滤器也删除了删除功能。

#### 实现原理

初始化内存：初始化一块内存给一维数组Buckets，其中每个Bucket有n个位置可供使用，每个位置存储对应元素的指纹信息，即每个Bucket中可供存储n个元素的指纹信息；

Bucket映射：通过两个Hash函数得到两个对应的位置点（p1和p2）信息，尝试将对应元素的指纹信息存入指定的Bucket中，如果p1对应的Bucket已经填充满了，则尝试填充到p2对应的Bucket中；

元素指纹挤兑：当两个位置点（p1和p2）对应的Bucket都已经填充满了就会触发填充挤兑，从p1和p2对应的Bucket中随机选择一个进行挤兑操作，将Bucket中的已经存在的指纹信息踢除（被踢除的指纹信息会存储到它可存储的另一个Bucket中，如果另一个Bucket中也没有了位置，则又会触发挤兑操作，直到达到挤兑操作的上限），然后将该指纹信息存储到当前的Bucket中；


因为布谷鸟过滤器中只存储指纹信息，当这个位置上的指纹被挤兑之后，它需要计算出另一个对偶位置，而计算这个对偶位置是需要元素本身的，但是布谷鸟过滤器巧妙的设计了一个独特的 hash函数，使得可以根据 p1 和 元素指纹 直接计算出 p2，而不需要完整的 x 元素。

```
    f = fingerprint(x);
    i1 = hash(x);
    i2 = i1 ^ hash(f);
```

![](/images/exclude_duplicate/cuckoo_hashing.png)

[Cuckoo Hashing Visualization](http://www.lkozma.net/cuckoo_hashing_visualization/)

![](/images/exclude_duplicate/bloom_filter_compare.png)

Insert

```
    f = fingerprint(x);
    i1 = hash(x);
    i2 = i1 ^ hash(f);
    if bucket[i1] or bucket[i2] has an empty entry then
    add f to that bucket;
    return Done;
    // must relocate existing items;
    i = randomly pick i1 or i2;
    for n = 0; n < MaxNumKicks; n++ do
    randomly select an entry e from bucket[i];
    swap f and the fingerprint stored in entry e;
    i = i ^ hash(f);
    if bucket[i] has an empty entry then
    add f to bucket[i];
    return Done;
    // Hashtable is considered full;
    return Failure;
```


#### 缺点

* 由于进行XOR运算，使得Filter个数必须为 2的整数次幂。

### Other BF

`d-left counting Bloom`

`Quotient filter`

`Xor Filters`

...

### HyperLogLog

基数估计算法是基于概率统计理论的用于估算给定多重集“势”的算法。现阶段对基数估计算法的研究主要基于Philippe Flaiolet于1985年提出的PCSA算法；
在此基础上，他于2003年引入分桶数的概念，提出了Super-LogLog算法，该算法在提高算法估计精度的同时降低了时空消耗；2007年在SuperLogLog算法的基础上，他用调和平均取代算数平均，并根据
数据规模对估计值进行修正 ，提出了在可处理数据量、估计精度、时空复杂性等方面都有极大提升的Hyper-LogLog算法。

[Sketch of the Day: HyperLogLog — Cornerstone of a Big Data Infrastructure](http://content.research.neustar.biz/blog/hll.html)

Redis实现了HyperLogLog


未完待续......

## 参考文章

[Better bitmap performance with Roaring bitmaps](https://arxiv.org/pdf/1402.6407v4.pdf)

[Roaring Bitmaps](http://roaringbitmap.org/)

[Bitmap Index和在Druid中的应用](https://tianzhipeng-git.github.io/2020/09/07/bitmap-index.html)

[Bloom Filter Interactive Demonstration](https://www.jasondavies.com/bloomfilter/)

[Bloom Filter Tutorial](https://llimllib.github.io/bloomfilter-tutorial/)

[Less Hashing, Same Performance:Building a Better Bloom Filter](https://www.eecs.harvard.edu/~michaelm/postscripts/rsa2008.pdf)

[大数据分析常用去重算法分析『Bitmap 篇』](https://cn.kyligence.io/blog/count-distinct-bitmap/)

[大数据分析常用去重算法分析『HyperLogLog 篇』](https://cn.kyligence.io/blog/count-distinct-hyperloglog/)

[Cuckoo Filter: Practically Better Than Bloom](https://www.cs.cmu.edu/~dga/papers/cuckoo-conext2014.pdf)

[布谷鸟过滤器：实际上优于布隆过滤器](http://www.linvon.cn/posts/cuckoo/)

[Xor Filters: Faster and Smaller Than Bloom and CuckooFilters](https://arxiv.org/pdf/1912.08258.pdf)
