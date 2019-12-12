# CSS

## 关键概念

- 语言语法和形式（The syntax and forms of the language）
- 特殊性（另译优先级）、继承和级联（Specificity, inheritance and the Cascade）
- 盒子模型和外边距合并（Box model and margin collapse）
- 包含块（The containing block）
- 堆叠和块格式化上下文（Stacking and block-formatting contexts）
- 初始值、计算值、应用值和实际值（Initial, computed, used, and actual values）
- CSS 简写属性（CSS shorthand properties）
- CSS 弹性盒子布局 (CSS Flexible Box Layout)
- CSS 网格布局 (Grid Layout)
- 媒体查询
- 动画

## CSS 选择器及其优先级

### 1. CSS 选择器与权值

基本选择器：

| 名称                                 | 含义                                             | 描述                                                                                           |
| ------------------------------------ | ------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| elename                              | 元素选择器                                       | 选择所有匹配给定元素名的元素                                                                   |
| .classname                           | 类选择器                                         | 基于类属性的值来选择元素                                                                       |
| #idname                              | id 选择器                                        | 这种基本选择器会选择所有 id 属性与之匹配的元素。需要注意的是一个文档中每个 id 都应该是唯一的。 |
| \* ns                                | \* \*                                            | \*                                                                                             | 通用选择器 | 选择所有节点 |
| [attr][attr=value] [attr~=value]attr | =value] [attr^=value][attr$=value] [attr*=value] | 属性选择器                                                                                     | 根据元素的属性来进行选择 |

组合选择器：

| 名称  | 含义           | 描述                                                                                               |
| ----- | -------------- | -------------------------------------------------------------------------------------------------- |
| A + B | 紧邻兄弟选择器 | '+' 操作符选择相邻元素，即第二个节点紧邻着第一个节点，并且拥有共同的父节点。                       |
| A ~ B | 一般兄弟选择器 | '~' 操作符选择兄弟元素，也就是说，第二个节点在第一个节点后面的任意位置，并且这俩节点的父节点相同。 |
| A > B | 子选择器       | '>' 操作符选择第一个元素的直接子节点。                                                             |
| A B   | 后代选择器     | ' ' (空格) 操作符将选择第一个元素的子代节点。                                                      |

伪类： 允许基于未包含在文档树中的状态信息来选择元素。
伪元素： 表示所有未被包含在 HTML 的实体。

### 2. 优先级的计算规则

> 内联 > ID 选择器 > 类选择器 > 标签选择器。

优先级是由 A 、B、C、D 的值来决定的，其中它们的值计算规则如下：

- 如果存在内联样式，那么 A = 1, 否则 A = 0;
- B 的值等于 ID 选择器 出现的次数;
- C 的值等于 类选择器 和 属性选择器 和 伪类 出现的总次数;
- D 的值等于 标签选择器 和 伪元素 出现的总次数 。

### 3. 伪元素与伪类的区别

伪类： 伪类用于当已有元素处于的某个状态时，为其添加对应的样式，这个状态是根据用户行为而动态变化的。比如说，当用户悬停在指定的元素时，我们可以通过`:hover`来描述这个元素的状态。虽然它和普通的 css 类相似，可以为已有的元素添加样式，但是它只有处于 dom 树无法描述的状态下才能为元素添加样式，所以将其称为伪类。

伪元素： 伪元素用于创建一些不在文档树中的元素，并为其添加样式。比如说，我们可以通过`:before`来在一个元素前增加一些文本，并为这些文本添加样式。虽然用户可以看到这些文本，但是这些文本实际上不在文档树中。

### 4. CSS 属性的继承

继承属性：

> 当元素的一个继承属性 （inherited property）没有指定值时，则取父元素的同属性的计算值 computed value。

非继承属性：

> 当元素的一个非继承属性(在 Mozilla code 里有时称之为 reset property )没有指定值时，则取属性的初始值 initial value。

[Which CSS properties are inherited?](https://stackoverflow.com/questions/5612302/which-css-properties-are-inherited)

### 5. at 规则

> 一个 at-rule 是一个 CSS 语句，以'@'符号开头，后跟一个标识符，并包括直到下一个';'的所有内容，或下一个 CSS 块，以先到者为准。——MDN

- `@charset`, 定义样式表使用的字符集.
- `@import`, 告诉 CSS 引擎引入一个外部样式表.
- `@namespace`, 告诉 CSS 引擎必须考虑 XML 命名空间。

嵌套@规则, 是嵌套语句的子集, 不仅可以作为样式表里的一个语句，也可以用在条件规则组里：

- `@media`, 如果满足媒介查询的条件则条件规则组里的规则生效。
- `@page`, 描述打印文档时布局的变化.
- `@font-face`, 描述将下载的外部的字体。 -`@keyframes`, 描述 CSS 动画的中间步骤 .
- `@supports`, 如果满足给定条件则条件规则组里的规则生效。
- `@document`, 如果文档样式表满足给定条件则条件规则组里的规则生效。 (推延至 CSS Level 4 规范)

## CSS 盒模型

### 1. 盒模型

盒模型又称框模型（Box Model）,包含了元素内容（content）、内边距（padding）、边框（border）、外边距（margin）几个要素。

![box-model-2019-12-2.png](https://allin-bucket.oss-cn-beijing.aliyuncs.com/blog/box-model-2019-12-2.png?x-oss-process=style/alin)

由于 IE 盒模型的怪异模式，IE 模型和标准模型的内容计算方式不同。

### 2. 标准模型与 IE 模型的区别

![ie-box-model-2019-12-2.png](https://allin-bucket.oss-cn-beijing.aliyuncs.com/blog/ie-box-model-2019-12-2.png?x-oss-process=style/alin)

IE 模型元素宽度**width=content+padding**，高度计算相同。

![w3c-box-model-2019-12-2.png](https://allin-bucket.oss-cn-beijing.aliyuncs.com/blog/w3c-box-model-2019-12-2.png?x-oss-process=style/alin)

标准模型元素宽度**width=content**，高度计算相同。

### 3. css 如何设置获取这两种模型的宽和高

通过 css3 新增的属性`box-sizing: content-box | border-box`分别设置盒模型为标准模型（content-box）和 IE 模型（border-box）。

### 4. javascript 如何设置获取盒模型对应的宽和高

1. `dom.style.width/height` 只能取到行内样式的宽和高，style 标签中和 link 外链的样式取不到。
2. `dom.currentStyle.width/height` 取到的是最终渲染后的宽和高，只有 IE 支持此属性。
3. `window.getComputedStyle(dom).width/height` 但是多浏览器支持，IE9 以上支持。
4. `dom.getBoundingClientRect().width/height` 也是得到渲染后的宽和高，大多浏览器支持。IE9 以上支持，除此外还可以取到相对于视窗的上下左右的距离

## 块级上下文 BFC

### 1. 块级格式上下文

> 块格式化上下文（block formatting context） 是页面 CSS 视觉渲染的一部分。它是用于决定块盒子的布局及浮动相互影响的一个区域。 –[MDN 块格式上下文](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)

我的理解是，BFC 是一个环境，在这个环境中的元素不会影响到其他环境中的布局，也就是说，处于不同 BFC 中的元素是不会互相干扰的。

### 2. BFC 的触发条件

- 根元素(`<html>`)
- 浮动元素（元素的 `float` 不是 `none`）
- 绝对定位元素（元素的 `position` 为 `absolute` 或 `fixed`）
- 行内块元素（元素的 `display` 为 `inline-block`）
- 表格单元格（元素的 `display` 为 `table-cell`，HTML 表格单元格默认为该值）
- 表格标题（元素的 `display` 为 `table-caption`，HTML 表格标题默认为该值）
- 匿名表格单元格元素（元素的 `display`为 `table`、`table-row`、 `table-row-group`、`table-header-group`、`table-footer-group`（分别是`HTML table、row、tbody、thead、tfoot`的默认属性）或 `inline-table`）
- `overflow` 值不为 `visible` 的块元素
- `display` 值为 `flow-root` 的元素
- `contain` 值为 `layout`、`content`或 `paint` 的元素
- 弹性元素（`display`为 `flex` 或 `inline-flex`元素的直接子元素）
- 网格元素（`display`为 `grid` 或 `inline-grid` 元素的直接子元素）
- 多列容器（元素的 `column-count` 或 `column-width` 不为 `auto`，包括 `column-count` 为 1）
- `column-span` 为 all 的元素始终会创建一个新的 BFC，即使该元素没有包裹在一个多列容器中（标准变更，Chrome bug）。

其中，最常见的就是`overflow: hidden`、`float: left/right`、`position: absolute`。也就是说，每次看到这些属性的时候，就代表了该元素以及创建了一个 BFC 了。

### 3. BFC 的特性

1. 内部的盒会在垂直方向一个接一个排列（可以看作 BFC 中有一个的常规流）；
2. 处于同一个 BFC 中的元素相互影响，可能会发生 margin collapse；
3. 每个元素的 margin box 的左边，与容器块 border box 的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此；
4. BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然；
5. 计算 BFC 的高度时，考虑 BFC 所包含的所有元素，连浮动元素也参与计算；
6. 浮动盒区域不叠加到 BFC 上；

### 4. BFC 的作用

1. 可以阻止外边距折叠

两个相连的块级元素在垂直上的外边距会发生叠加，有些把这种情况看作是 bug，但我觉得可能是出于段落排版的考虑，为了令行间距一致才有的这一特性。我们先来看看例子：

```html
<p>first</p>
<p>second</p>
```

```css
* {
  margin: 0px;
  padding: 0px;
}
p {
  color: red;
  background: #eee;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  margin: 10px;
  border: solid 1px red;
}
```

![css-sup-demo1-2019-12-7.png](https://allin-bucket.oss-cn-beijing.aliyuncs.com/blog/css-sup-demo1-2019-12-7.png?x-oss-process=style/alin)

从上面可以看出，我们给两个 p 元素都设置`margin`,但中间的间距却发生了折叠。然后举个 BFC 的例子：

```css
/* css */
.ele {
  overflow: hidden;
  border: solid 1px red;
}
```

```html
<!-- html -->
<div class="ele">
  <p>first</p>
</div>
<div class="ele">
  <p>second</p>
</div>
```

![css-sup-demo2-2019-12-7.png](https://allin-bucket.oss-cn-beijing.aliyuncs.com/blog/css-sup-demo2-2019-12-7.png?x-oss-process=style/alin)

从上面可以看出，我们为每个 div 元素设置`overflow`的值为`hidden`,产生一个块级格式上下文，因为外边距不会相互重叠。

2. 可以包含浮动的元素

如果块级元素里面包含着浮动元素会发生高度塌陷，但是将它变成一个 BFC 后，BFC 在计算高度时会自动将浮动元素计算在内。

```html
<div class="box">
  <div class="floatL">float</div>
  <div class="floatL">float</div>
</div>
<br style="clear:both" />
<div class="box BFC">
  <div class="floatL">float</div>
  <div class="floatL">float</div>
</div>
```

```css
* {
  margin: 0px;
  padding: 0px;
}
.floatL {
  float: left;
  width: 100px;
  height: 100px;
  background-color: red;
  text-align: center;
  line-height: 100px;
}
.box {
  border: 1px solid red;
  width: 300px;
  margin: 100px;
  padding: 20px;
}
.BFC {
  overflow: hidden;
  *zoom: 1;
}
```

![css-sup-demo3-2019-12-7.png](https://allin-bucket.oss-cn-beijing.aliyuncs.com/blog/css-sup-demo3-2019-12-7.png?x-oss-process=style/alin)

从运行结果可以看出，如果块级元素里面包含着浮动元素会发生高度塌陷，但是将它变成一个 BFC 后，BFC 在计算高度时会自动将浮动元素计算在内。

3. 可以阻止元素被浮动元素覆盖

```html
<!-- html -->
<div class="box1">box1</div>
<div class="box2">box2</div>
```

```css
* {
  margin: 0px;
  padding: 0px;
}
.box1 {
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  background-color: rgba(0, 0, 255, 0.5);
  border: 1px solid #000;
  float: left;
}
.box2 {
  width: 200px;
  height: 200px;
  line-height: 100px;
  text-align: center;
  background-color: rgba(255, 0, 0, 0.5);
  border: 1px solid #000;
  /* overflow: hidden; */
  /* *zoom: 1; */
}
```

![css-sup-demo4-2019-12-7.png](https://allin-bucket.oss-cn-beijing.aliyuncs.com/blog/css-sup-demo4-2019-12-7.png?x-oss-process=style/alin)

从上面看出，当元素浮动后，会与后面的块级元素产生相互覆盖。那怎么解决这个问题，只要为后面的元素创建一个 BFC。添加`overflow`属性到`box2`上。

```css
overflow: hidden;
*zoom: 1;
```

![css-sup-demo5-2019-12-7.png](https://allin-bucket.oss-cn-beijing.aliyuncs.com/blog/css-sup-demo5-2019-12-7.png?x-oss-process=style/alin)

这样子阻止了浮动元素重叠的问题。

### 5. BFC 与 hasLayout

除了使用 `overflow: hidden` 触发 BFC 外，还使用了一个 `*zomm: 1` 的属性，这是 IEhack ，因为 IE6-7 并不支持 W3C 的 BFC ，而是使用私有属性 hasLayout 。从表现上来说，hasLayout 跟 BFC 很相似，只是 hasLayout 自身存在很多问题，导致了 IE6-7 中一系列的 bug 。触发 hasLayout 的条件与触发 BFC 有些相似，推荐为元素设置 IE 特有的 CSS 属性 `zoom: 1` 触发 hasLayout ，zoom 用于设置或检索元素的缩放比例，值为“1”即使用元素的实际尺寸，使用 `zoom: 1` 既可以触发 hasLayout 又不会对元素造成其他影响，相对来说会更为方便。


<Vssue title="Vssue" />