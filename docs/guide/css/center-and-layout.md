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

1. 单列布局

2. 两列布局

3. 多列布局

4. Sticky Footer
