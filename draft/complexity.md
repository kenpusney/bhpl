# 类型复杂度

我们引入一套简单的符号系统来表示和计算类型的复杂度，并根据这种方法来计算和评价一个类型、接口或者流程的设计。

## 概念

我们选择尽量以简化的符号来表示一个类型的复杂度，其具体的含义表示以使用该类型能够表示和容纳的数据的量。假设该类型为T，我们用$P(T)$来表示这个复杂度。

我们以 32 位整数类型 Integer 为例。这样一个类型可以表示$2^{32}-1$即 4294967296 个数据。但这种量级的数据我们无论是书写还是使用起来都不太方便，所以直接简化为符号 $i$，作为一个常数。

同样的，表示Unicode字符的char、或者long，都是类似的量级，为了简化符号的复杂度，我们同样以 $i$ 来表示。

也即，这种一般性的标量类型的复杂度，都可以简化为 $i$。

## 几个常量

除了标量复杂度 $i$ 以外，还有几个比较常用的量。

一些量级较小的数据，比如中小字符串/数组的长度、ASCII字符的数量、一个复合类型中字段的数量等，其可能是 $0$ 到一个不是那么大的数量。这种量级的数据，我们也统一简化为常数 $a$。

所以，一个中小型字符串的复杂度

$$ 
P(String) = P(Char)^{Length(String)} = n^a
$$

我们进一步把$P(String)$也简化表示成一个常量，$s$。即

$$
s = n^a
$$

除此之外，单元（Unit）类型（比如Java中的 null）因为只有一个特定的值，则可以表示为 $1$：
$$
P(Unit) = 1
$$

而Bottom类型的复杂度为 0：
$$
P(\bot) = 0
$$

同理，Top类型（比如Java中的Object）可以表示用来接受一切值，则表示为 $\infty$：

$$
P(\top) = \infty
$$

由此我们可以得到几个量及相关的常数和他们的排序：

$$
0 \lt 1 \lt a \lt i \lt s \lt \infty
$$

## 和类型与积类型

### 和类型 Sum Type

假设我们分别有两个类型 T 和 U，这两个类型通过合并组成类型 V：

```typescript
type V = T | U
```

当然也可以是类似Java中接口和实现形式：

```java
interface V {}
class T implements V {}
class U implements V {}
```

这样的类型组成形式在代数数据类型中被称作和类型（Sum Type）。大部分编程语言中都可以通过继承、tagged union 或者 variant 来实现。

这个时候类型 V 的复杂度 $P(V)$ 即为类型 T 和类型 U 的复杂度之和。

$$
P(V) = P(T) + P(U)
$$

因为在这种情况下，类型 T 能表示的数据，也都可以作为类型 V 的数据，而同样类型 U 表示的数据也能作为类型 V 表示的数据。而此时类型 V 所能表示的数据集合正是 T 的集合和 U 的集合的并集。在不考虑 T 类型和 U 类型存在相同数据集的情况下，上式是成立的。而在程序场景中，除非 T 和 U 之间本身存在着这种组成关系，否则不会有相交的情况。

这种数据集合并，复杂度相加的情况，应该也是“和类型”这个名字的来源自一。

### 积类型 Product Type

与和类型类似，积类型则是通过类型的组合，进行复杂度的乘积。

同样假设我们有两个类型 T 和 U。通过组合组成 V 类型。比如TypeScript中的元组：

```typescript
type V = [T, U]
```

或者在Java场景中：

```
class T {}
class U {}
class V {
    T t;
    U u;
}
```

这种情况下，V类型的复杂度 $P(V)$ 的复杂度为：

$$
P(V) = P(T) \times P(U)
$$

比如一个由 Integer 和 String 组成的 Pair 类：

```
class Pair {
    Integer i;
    String s;
}
```

那么他的类型复杂度则是 

$$
P(Integer) \times P(String) = i \cdot s
$$

另外一个复杂的例子：

```
class A {
    Integer a;
}
class B extends A {
    Integer b;
}
class C extends A {
    String c;
}
class D {
    A a;
    B b;
    C c;
}
```

$$
\begin{aligned}
&P(A) = i + P(B) + P(C) \\
&P(B) = i^2 \\
&P(C) = i \cdot s \\
&P(D) = P(A) \times P(B) \times P(C)
= (i + i^2 + i \cdot s) \cdot i^2 \cdot (i \cdot s)
\end{aligned}
$$

化简后得：

$$
P(D) = i^{4}s + i^{5}s +i^{4}s^{2}
$$

即使只看最高次项，仅仅 4 个类组合出来的 $i^{4}s^{2}$ 的复杂度也是非常夸张的一个值。

## 递归类型的复杂度

我们来看另外一个例子。

```java
class IntList {
    Integer i;
    IntList next;
}
```

如果还是按照前面提及的积类型的算法，这个等式是不成立的：

$$
P(IntList) = i \times P(IntList)
$$

但好在因为硬件资源的限制，我们的递归类型并不会无限大，所以同样如字符串长度等一样，我们也给一个常数的限制，即递归的深度，而这个深度也可以近似为常数 $a$。

把深度概念引入以后，第 n 层级深的 IntList 的复杂度可以表示为 $P(IntList_{n})$，那么

$$
\begin{aligned}
&P(IntList_{n}) = i \times P(IntList_{n-1})\\
&P(IntList_{1}) = i \times P(null)
\end{aligned}
$$

即，深度为 a 的 IntList，其复杂度为：

$$
P(IntList) = i^{a}
$$

这个结果可以应用到所有的具有相似线性递归的结构上。如果一个线性递归类型 T，除去其递归类型外的复杂度为 n，则该类型的整体复杂度为：

$$
P(T) = n^{a}
$$

树状递归类型相对会复杂一点。以二叉树为例：

```java
class IntTree {
    Integer i;
    IntTree left;
    IntTree right;
}
```

因为我们要考虑两个分支的复杂度乘积，于是深度为 n 的 IntTree，其类型复杂度为：

$$
\begin{aligned}
&P(IntTree_{n}) = i \times P(IntTree_{n-1})^{2} \\
&P(IntTree_{1}) = i \times P(null)^2
\end{aligned}
$$

依次展开递归得：

$$
P(IntTree_{n}) = i^{2^{n}-1}
$$

也就是说，一个递归深度为 $a$ 的二叉树，其类型复杂度为：

$$
P(IntTree) = i^{2^{a}-1}
$$

当然了，这里得 $a$ 表示的是树的深度而不是节点数目。如果换成节点数目，结果是跟线性递归一样的。

## 泛型类型的复杂度

