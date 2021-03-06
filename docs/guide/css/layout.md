# 布局

CSS 页面布局技术允许我们拾取网页中的元素，并且控制它们相对正常布局流、周边元素、父容器或者主视口/窗口的位置。

布局有如下几种：

- 正常布局流
- 浮动`float`
- 定位`postion`
- 弹性布局`Flex`
- 网格布局`Grid`
- <del>表格布局（过时）</del>
- 多列布局`column`

## 正常布局流

在正常布局流中，元素按照其在 HTML 中的先后位置至上而下布局，在这个过程中，行内元素水平排列，直到当行被占满然后换行，块级元素则会被渲染为完整的一个新行， 除非另外指定，否则所有元素默认都是普通流定位，也可以说，普通流中元素的位置由该元素在 HTML 文档中的位置决定。

`display` 属性允许我们更改默认的布局样式，指定了元素的显示类型，它包含两类基础特征，用于指定元素怎样生成盒模型——外部显示类型定义了元素怎样参与流式布局的处理，内部显示类型定义了元素内子元素的布局方式。该属性有以下常见属性值：

- `inline`: 行内元素
- `block`： 块级元素
- `inline-block(inline block)`： 对内是行内元素，对外部是块级元素
- `flex`: 弹性布局
- `grid`: 网格布局
- `table`: 表格布局
- `none`: 从可访问性树中移除

## 浮动

1. float 属性

`float`属性最早是用于图像与文本的混合排版，现在多使用它来创建多列布局。该属性包含这些值：

- `static`: 默认值，不浮动
- `left`： 将元素浮动到左侧
- `right`: 将元素浮动到右侧

只要元素设置了`float`属性，该元素就会脱离正常的文档布局流，并且吸附到父容器的某一侧。在正常布局中位于该浮动元素之下的内容，此时会围绕着浮动元素，填满其另一侧的空间。

2. 浮动的弊端

- 造成父元素的塌陷，父元素无法正确计算高度
- 固定列会造成溢出

3. 清除浮动

- 父元素形成 BFC，添加`overflow: hidden/auto`
- 使用伪元素

```css
.clearfix:after {
  content: '.';
  display: block;
  height: 0;
  visibility: hidden;
  clear: both;
}
.clearfix {
  *zoom: 1;
}
```

## 定位

> 定位允许您从正常的文档流布局中取出元素，并使它们具有不同的行为，例如放在另一个元素的上面，或者始终保持在浏览器视窗内的同一位置。

`postion`属性允许我们更改页面上元素的定位，其包含以下值：

- `static`: 默认值，无任何变化
- `relative`: 相对定位，元素先放置在未添加定位时的位置，再在不改变页面布局的前提下调整元素位置
- `absolute`: 绝对定位，不为元素预留空间，通过指定元素相对于最近的非 static 定位祖先元素的偏移，来确定元素位置。
- `fixed`: 固定定位，不为元素预留空间，而是通过指定元素相对于屏幕视口（viewport）的位置来指定元素位置。元素的位置在屏幕滚动时不会改变。打印时，元素会出现在的每页的固定位置。`fixed` 属性会创建新的层叠上下文。当元素祖先的 `transform` 属性非 `none` 时，容器由视口改为该祖先。
- `sticky`： 粘性布局，最初会被当作是 relative，相对于原来的位置进行偏移；一旦超过一定阈值之后，会被当成 fixed 定位，相对于视口进行定位。

**设置`position`时，可以设置`top`, `left`, `right`, `bottom`等偏移量大小。**

1. 相对定位
2. 绝对定位
3. 固定定位
4. 粘性布局

## Flex 弹性布局

flexbox，是一种一维的布局模型。它给 flexbox 的子元素之间提供了强大的空间分布和对齐能力。

在认识一个布局之前，需要了解布局所需要的一些要素，方向，对齐，顺序，大小。

![flexbox-layouts-7abd58-2019-12-3.png](https://allin-bucket.oss-cn-beijing.aliyuncs.com/blog/flexbox-layouts-7abd58-2019-12-3.png?x-oss-process=style/alin)

### 基础概念

1. flex 主轴与交叉轴

![flex-axes-2019-12-3.png](https://allin-bucket.oss-cn-beijing.aliyuncs.com/blog/flex-axes-2019-12-3.png?x-oss-process=style/alin)

主轴是由`flex-direction` 定义，默认是`row`，即水平方向延展，则交叉轴则是垂直于主轴并向下延展的。

**flex 的特性之一就是 flex 容器里的子元素是沿着主轴与交叉轴分布的。**

2. flex 容器

使用`display: flex`可以将某个容器元素变为 flex 容器。flex 容器涉及到一下属性：

- `flex-direction`
- `flex-wrap`
- `flex-flow`
- `justify-content`
- `align-items`
- `align-content`

3. flex 元素

flex 元素指 flex 容器的直系元素。flex 元素涉及到以下属性：

- `order`
- `align-self`
- `flex-grow`
- `flex-shrink`
- `flex-basis`
- `flex`

### 方向

1. `flex-direction`

布局的方向取决于主轴的方向， 主轴由 `flex-direction` 定义，可以取 4 个值：

- `row`: 水平延展
- `row-reverse`： 水平反向延展
- `column`： 垂直延展
- `column-reverse`： 垂直方向延展

![flex-direction-illustration-2019-12-3.jpg](https://allin-bucket.oss-cn-beijing.aliyuncs.com/blog/flex-direction-illustration-2019-12-3.jpg?x-oss-process=style/alin)

如果你选择了 `row` 或者 `row-reverse`，你的主轴将沿着 `inline` 方向延伸，交叉轴就是垂直于主轴向下的。反之如果是`column`和`column-reverse`，则主轴与交叉轴相反。

2. `flex-wrap`

如果一行的 flex 元素的总宽度超出 flex 容器的宽度，则有可能会造成溢出。因此，可以使用`flex-wrap`进行换行。`flex-wrap`有以下值：

- `nowrap`： 不换行（初始值）
- `wrap`: 换行
- `wrap-reverse`: 反向换行

![flex-wrap-illustration-2019-12-3.jpg](https://allin-bucket.oss-cn-beijing.aliyuncs.com/blog/flex-wrap-illustration-2019-12-3.jpg?x-oss-process=style/alin)

3. `flex-flow`

`flex-flow`是`flex-direction`和`flex-wrap`的合成属性。可以看做`<'flex-direction'> <'flex-wrap'>`。

```css
flex-flow: row nowrap;
```

### 对齐

对齐涉及到延主轴或者交叉轴对齐，主轴对应`justify-content`，交叉轴对应`align-items`。

1. `justify-content`

![justify-content-illustration-2019-12-3.jpg](https://allin-bucket.oss-cn-beijing.aliyuncs.com/blog/justify-content-illustration-2019-12-3.jpg?x-oss-process=style/alin)

`justify-content`属性用来使元素在主轴方向上对齐, 有以下值：

- `flex-start`(initial): 元素从容器的起始线排列
- `flex-end`: 元素从终止线开始排列
- `center`: 在中间排列
- `space-between`: 把元素排列好之后的剩余空间拿出来，平均分配到元素之间，所以元素之间间隔相等
- `space-around`: 使每个元素的左右空间相等

2. `align-items`

![align-items-illustration-2019-12-3.jpg](https://allin-bucket.oss-cn-beijing.aliyuncs.com/blog/align-items-illustration-2019-12-3.jpg?x-oss-process=style/alin)

align-items 属性可以使元素在交叉轴方向对齐。有以下值，

- `stretch`(initial)： 拉伸填充交叉轴
- `flex-start`
- `flex-end`
- `center`
- `baseline`

3. `align-content`

![align-content-illustration-2019-12-3.jpg](https://allin-bucket.oss-cn-beijing.aliyuncs.com/blog/align-content-illustration-2019-12-3.jpg?x-oss-process=style/alin)

`align-content`属性用来设置分配交叉轴上各行的剩余空间。该属性对单行弹性盒子模型无效。该属性有以下值，

- `flex-start`
- `flex-end`
- `center`
- `space-between`
- `space-around`
- `stretch`(initial)

2. `align-self`

![align-self-illustration-2019-12-3.png](https://allin-bucket.oss-cn-beijing.aliyuncs.com/blog/align-self-illustration-2019-12-3.png?x-oss-process=style/alin)

使用`align-self`可以对交叉轴上单个 flex 元素进行对齐。有以下值：

- `auto`(initial)
- `flex-start`
- `flex-end`
- `center`
- `baseline`
- `scretch`

### 顺序

1. `order`

使用`order`可以对 flex 元素进行排序。flex 元素默认是 0。注意的是，`order`属性进行的排序只是屏幕上的顺序，而不是反映源文档里的顺序。

![order-illustration-2019-12-3.png](https://allin-bucket.oss-cn-beijing.aliyuncs.com/blog/order-illustration-2019-12-3.png?x-oss-process=style/alin)

`order`的语法如下：

```css
order: <integer>;
```

### 大小

flex 元素的大小可以使用`flex-grow`, `flex-shrink`, `flex-basis`三个属性控制。这三个属性可以决定如何分配剩余的“布局空白”空间，以及超出父容器宽度时如何收缩。

1. `flex-basis`

`flex-basis`属性定义了该元素的布局空白（available space）的基准值。该属性的默认值是 `auto`。如果没有给元素设定尺寸，`flex-basis` 的值采用元素内容的尺寸。这就解释了：我们给只要给 Flex 元素的父元素声明 `display: flex` ，所有子元素就会排成一行，且自动分配小大以充分展示元素的内容。

2. `flex-grow`

`flex-grow`属性只有在所有 flex 元素以`flex-basis`的值进行排列后，仍有剩余空间的时候才会发挥作用。默认值为 0，即不对剩余空间进行分配。它的语法是：

```css
flex-grow: <number>;
```

其包含的值是个比例大小，flex 元素就按比例分配空白的空间。

![flex-grow-illustration-2019-12-3.jpg](https://allin-bucket.oss-cn-beijing.aliyuncs.com/blog/flex-grow-illustration-2019-12-3.jpg?x-oss-process=style/alin)

3. `flex-shrink`

`flex-grow`属性只有在所有 flex 元素以`flex-basis`的值进行排列后，没有足够的空间时才会发生作用。`flex-grow`是用于决定增加空间时 flex 元素的表现，而它是用于决定收缩空间时 flex 元素的表现，同一时间，只会有其中一个生效。它的语法是与`flex-grow`一致，flex 元素按比例大小进行收缩。默认为 1，即如果所有项目的 `flex-shrink` 属性都为 1，当空间不足时，都将等比例缩小。

4. `flex`

`flex`属性是`flex-grow`，`flex-shrink`，和 `flex-basis` 属性的组合属性。其语法是：

```css
flex: <flex-grow> <flex-shrink> <flex-basis>;
```

该属性有以下值：

- `initial`: 相当于`flex: 0 1 auto`，
- `auto`: 相当于`flex: 1 1 auto`，flex 元素在需要的时候既可以拉伸也可以收缩
- `none`: 可以把 flex 元素设置为不可伸缩，相当于`flex: 0 0 auto`
- `<positive-number>`: `flex: 1`相当于`flex: 1 1 0`等。元素可以在`flex-basis`为 0%的基础上伸缩。

### 优缺点
- 优点在于容易上手，根据 flex 规则很容易达到某个布局效果；
- 缺点是浏览器兼容性比较差，只能兼容到 IE9 及以上；

## Grid 网格布局

## 多列布局
