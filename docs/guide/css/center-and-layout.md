# 水平居中方案与常见布局

## 水平垂直居中

1. 行内元素

要实现行内元素的水平居中,只需把行内元素包裹在块级父层元素(`<div>`、`<li>`、`<p>`等)中，并且在父层元素 CSS 设置如下：

```css
.container {
  text-align: center;
}
```

实现文本的垂直居中使用`line-height`

实现图片的垂直居中使用`display: table;`和`display: table-cell; vertical: middle;`

2. 块级元素

要实现块状元素的水平居中，我们只需要将它的左右外边距`margin-left`和`margin-right`设置为`auto`，即可实现块状元素的居中，要水平居中的块状元素 CSS 设置如下：

```css
.container {
  margin: 0 auto;
}
```

3. 已知高度宽度的元素

- 利用绝对定位与负边距实现(`absolute` + `margin`)

利用绝对定位，将元素的`top`和`left`属性都设为 50%，再利用`margin`边距，将元素回拉它本身高宽的一半，实现垂直居中。

```css
.container {
  position: relative;
}
.center {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -50px 0 0 -50px;
}
```

- 利用绝对定位和 `margin`

```css
.container {
  position: relative;
}
.center {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
```

4. 未知高度和宽度元素

- 被居中的元素是`inline`或者`inline-block`元素

可以巧妙的将父级容器设置为`display: table-cell`，配合`text-align: center`和`vertical-align: middle`即可以实现水平垂直居中。

```css
.container {
  width: 600px;
  height: 600px;
  background: #eee;
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}
.center {
  background: blue;
}
```

- 利用`transform`的属性

```css
.container {
  width: 100%;
  height: 400px;
  background: #eee;
  position: relative;
}
.center {
  background: blue;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

- flex 布局

```css
.container {
  width: 100%;
  height: 400px;
  background: #eee;
  /* flex 布局解决水平居中 */
  display: flex;
  justify-content: center;
  align-items: center;
}
.center {
  width: 100px;
  height: 100px;
  background: blue;
  text-align: center;
}
```

## 常见布局

### 单列布局

单列布局是实现最简单的，不需要复杂的定位和浮动等。分为两种情况：

1. header, content, footer 宽度相同

![css-单列布局-1-2019-12-16.png](https://allin-bucket.oss-cn-beijing.aliyuncs.com/blog/css-单列布局-1-2019-12-16.png?x-oss-process=style/alin)

实现：

```html
<body>
  <header>Header</header>
  <section>Content</section>
  <footer>Footer</footer>
</body>
```

```css
html,
body {
  margin: 0;
  padding: 0;
}
header,
section,
footer {
  text-align: center;
  font-size: 24px;
  line-height: 100px;
}
header {
  height: 100px;
  text-align: center;
  background-color: #eee;
}
section {
  min-height: 500px;
  background-color: #ccc;
}
footer {
  height: 200px;
  background-color: #eee;
}
```

2. header 和 footer 占满浏览器窗口宽度，content 有一个 max-width，并且水平居中。

![css-单列布局-2-2019-12-16.png](https://allin-bucket.oss-cn-beijing.aliyuncs.com/blog/css-单列布局-2-2019-12-16.png?x-oss-process=style/alin)

实现：

```css {3, 4}
section {
  min-height: 500px;
  max-width: 980px;
  margin: 0 auto;
  background-color: #ccc;
}
```

### 两列布局

两列布局常用于包含侧边栏和内容区域的场景。两列布局可以分别使用浮动或者绝对定位实现。

1. 使用浮动

![css-两列布局-1-2019-12-16.png](https://allin-bucket.oss-cn-beijing.aliyuncs.com/blog/css-两列布局-1-2019-12-16.png?x-oss-process=style/alin)

实现：

```html
<header>Header</header>
<div class="content">
  <aside>Aside</aside>
  <section>Content</section>
</div>
<footer>Footer</footer>
```

```css
.content {
  max-width: 1140px;
  margin: 0 auto;
  /* BFC */
  overflow: hidden;
}
aside {
  width: 300px;
  min-height: 300px;
  background: #a98dff;
  /* 向左浮动 */
  float: left;
}
section {
  min-height: 500px;
  width: 800px;
  /* 向右浮动 */
  float: right;
  background-color: #36d8c2;
}
```

2. 绝对定位

![css-两列布局-2-2019-12-16.png](https://allin-bucket.oss-cn-beijing.aliyuncs.com/blog/css-两列布局-2-2019-12-16.png?x-oss-process=style/alin)

实现：

```css {4, 9, 10, 16, 17}
.content {
  max-width: 1140px;
  min-height: 600px;
  margin: 0 auto;
  position: relative;
}
aside {
  width: 300px;
  min-height: 300px;
  position: absolute;
  left: 0;
  background: #a98dff;
}
section {
  width: 800px;
  height: 100%;
  position: absolute;
  right: 0;
  background-color: #36d8c2;
}
```

### 三列布局

1. 圣杯布局

一个经典的三列布局就是圣杯，其原理非常简单，利用到了浮动、负边距以及定位。

实现：

```html
<header>Header</header>
<div class="content">
  <section>Content</section>
  <aside class="left-aside">Left Aside</aside>
  <aside class="right-aside">Right Aside</aside>
</div>
<footer>Footer</footer>
```

```css
.content {
  height: 600px;
  margin: 0 auto;
  position: relative;
  padding: 0 300px 0 300px;
  overflow: hidden;
}
section {
  width: 100%;
  height: 100%;
  float: left;
  background-color: #36d8c2;
}
aside {
  width: 300px;
  min-height: 300px;
  background: #a98dff;
  float: left;
}
.left-aside {
  margin-left: -100%;
  position: relative;
  left: -300px;
}
.right-aside {
  margin-left: -300px;
  position: relative;
  right: -300px;
}
```

![三列圣杯-圣杯布局-2019-12-16.png](https://allin-bucket.oss-cn-beijing.aliyuncs.com/blog/三列圣杯-圣杯布局-2019-12-16.png?x-oss-process=style/alin)

### Sticky Footer

![css-Sticky-footer-2019-12-16.png](https://allin-bucket.oss-cn-beijing.aliyuncs.com/blog/css-Sticky-footer-2019-12-16.png?x-oss-process=style/alin)

所谓 Sticky Footer，就是类似于上图，Footer 在内容区域不够长时总是保持在浏览器窗口底部，如果内容区域足够长时，会一直固定在页面的最底部。实现的方式有很多种。

默认的 HTML 结构如下：

```html
<div class="main">
  <section class="content">
    Content
  </section>
  <footer>Footer</footer>
</div>
```

1. 绝对定位

让 main 使用相对定位并且 padding 留出 footer 的高度，防止被 footer 遮挡，footer 基于它底部使用绝对定位。

```css
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}
.main {
  position: relative;
  min-height: 100%;
  background-color: #eee;
  padding-bottom: -100px;
}

footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  height: 100px;
  background-color: #666;
}
```

这种方案必须指定 html, body 的高度为 100%。

2. calc

通过计算函数 calc 计算（视窗高度 - 页脚高度）赋予内容区最小高度，不需要任何额外样式处理。

```css
.main {
  height: 100%;
  background-color: #eee;
}
.content {
  min-height: calc(100vh - 100px);
}

footer {
  width: 100%;
  height: 100px;
  background-color: #666;
}
```

这种方案需要考虑 `calc()`计算函数的兼容性。

3. flex 布局

flex 布局可以轻松的实现这种效果，并且页脚的高度可以任意变化。

```css
.main {
  display: flex;
  min-height: 100%;
  flex-direction: column;
}
.content {
  flex: 1;
  background-color: #eee;
}

footer {
  width: 100%;
  height: 100px;
  background-color: #666;
}
```

同样地，这种方案也需要考虑兼容性。

完整代码可以查看[github/code](https://github.com/heiyelin/code/tree/master/css/center-and-layout)