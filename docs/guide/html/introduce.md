# 介绍

## HTML5 规范新特性

[MDN 对 HTML5 的介绍](https://developer.mozilla.org/zh-CN/docs/Web/Guide/HTML/HTML5)

HTML5 是定义 HTML 标准的最新的版本。 该术语通过两个不同的概念来表现：

- 它是一个新版本的 HTML 语言，具有新的元素，属性和行为，
- 它有更大的技术集，允许构建更多样化和更强大的网站和应用程序。

新的增强与改进:

1. 语义：能够让你更恰当地描述你的内容是什么。
2. 连通性：能够让你和服务器之间通过创新的新技术方法进行通信。
3. 离线 & 存储：能够让网页在客户端本地存储数据以及更高效地离线运行。
4. 多媒体：使 video 和 audio 成为了在所有 Web 中的一等公民。
5. 2D/3D 绘图 & 效果：提供了一个更加分化范围的呈现选择。
6. 性能 & 集成：提供了非常显著的性能优化和更有效的计算机硬件使用。
7. 设备访问 Device Access：能够处理各种输入和输出设备。
8. 样式设计: CSS3

## 语义化

**语义化**是根据内容的结构化（内容语义化），选择合适的标签（代码语义化）便于开发者阅读和写出更优雅的代码的同时让浏览器的爬虫和机器很好地解析。

语义化优点：

- 易于用户阅读，样式丢失的时候能让页面呈现清晰的结构。
- 有利于 SEO，搜索引擎根据标签来确定上下文和各个关键字的权重。
- 方便其他设备解析，如盲人阅读器根据语义渲染网页
- 有利于开发和维护，语义化更具可读性，代码更好维护，与 CSS3 关系更和谐。

## 元信息类标签(head、title、meta)的使用目的和配置方法

1. head 标签

作为盛放其它语义类标签的容器使用。

2. title 标签

表示文档的标题

3. meta 标签

meta 标签是一组键值对，它是一种通用的元信息表示标签。一般的 meta 标签由 name 和 content 两个属性来定义。name 表示元信息的名，content 则用于表示元信息的值。

meta 标签提供关于 HTML 文档的元数据。它不会显示在页面上，但是对于机器是可读的。可用于浏览器（如何显示内容或重新加载页面），搜索引擎（关键词），或其他 web 服务。

作用： meta 里的数据是供机器解读的，告诉机器该如何解析这个页面，还有一个用途是可以添加服务器发送到浏览器的 http 头部内容。

在 W3school 中，对于 meta 的可选属性说到了三个，分别是 http-equiv、name 和 scheme。考虑到 scheme 不是很常用，所以就只说下前两个属性吧。

- http-equiv： 添加 http 头部内容，对一些自定义的，或者需要额外添加的 http 头部内容，需要发送到浏览器中，我们就可以是使用这个属性。
- name: 这个属性是供浏览器进行解析，对于一些浏览器兼容性问题，name 属性是最常用的。

4. 常用 meta 标签

- charset: 声明文档使用的字符编码

```html
<meta charset="utf-8" /> <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
```

- SEO 优化

```html
<!-- 页面标题<title>标签(head 头部必须) -->
<title>your title</title>
<!-- 页面关键词 keywords -->
<meta name="keywords" content="your keywords" />
<!-- 页面描述内容 description -->
<meta name="description" content="your description" />
<!-- 定义网页作者 author -->
<meta name="author" content="author,email address" />
<!-- 定义网页搜索引擎索引方式，robotterms 是一组使用英文逗号「,」分割的值，通常有如下几种取值：none，noindex，nofollow，all，index和follow。 -->
<meta name="robots" content="index,follow" />
```

- viewport

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

content 参数： 

  - width viewport 宽度(数值/device-width) 
  - height viewport 高度(数值/device-height) 
  - initial-scale 初始缩放比例 
  - maximum-scale 最大缩放比例 
  - minimum-scale 最小缩放比例 
  - user-scalable 是否允许用户缩放(yes/no)

- 各浏览器平台

```html
<!-- 优先使用最新的ie版本 -->
<meta http-equiv="x-ua-compatible" content="ie=edge" />

<!-- 优先使用最新的chrome版本 -->
<meta http-equiv="X-UA-Compatible" content="chrome=1" />
<!-- 禁止自动翻译 -->
<meta name="google" value="notranslate" />

<!-- 360浏览器 选择使用的浏览器解析内核 -->
<meta name="renderer" content="webkit|ie-comp|ie-stand" />

<!-- QQ浏览器 -->
<!-- 锁定屏幕在特定方向 -->
<meta name="x5-orientation" content="landscape/portrait" />
<!-- 全屏显示 -->
<meta name="x5-fullscreen" content="true" />
<!-- 页面将以应用模式显示 -->
<meta name="x5-page-mode" content="app" />

<!-- apple iOS -->
<!-- Smart App Banner -->
<meta
  name="apple-itunes-app"
  content="app-id=APP_ID,affiliate-data=AFFILIATE_ID,app-argument=SOME_TEXT"
/>
<!-- 禁止自动探测并格式化手机号码 -->
<meta name="format-detection" content="telephone=no" />
<!-- Add to Home Screen添加到主屏 -->
<!-- 是否启用 WebApp 全屏模式 -->
<meta name="apple-mobile-web-app-capable" content="yes" />
<!-- 设置状态栏的背景颜色,只有在 “apple-mobile-web-app-capable” content=”yes” 时生效 -->
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
<!-- 添加到主屏后的标题 -->
<meta name="apple-mobile-web-app-title" content="App Title" />

<!-- Google Android -->
<meta name="theme-color" content="#E64545" />
<!-- 添加到主屏 -->
<meta name="mobile-web-app-capable" content="yes" />
```

- 移动端常用 meta

```html
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
<meta name="format-detection" content="telephone=no, email=no" />
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
<meta name="apple-mobile-web-app-capable" content="yes" /><!-- 删除苹果默认的工具栏和菜单栏 -->
<meta name="apple-mobile-web-app-status-bar-style" content="black" /><!-- 设置苹果工具栏颜色 -->
<meta
  name="format-detection"
  content="telphone=no, email=no"
/><!-- 忽略页面中的数字识别为电话，忽略email识别 -->
<!-- 启用360浏览器的极速模式(webkit) -->
<meta name="renderer" content="webkit" />
<!-- 避免IE使用兼容模式 -->
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<!-- 针对手持设备优化，主要是针对一些老的不识别viewport的浏览器，比如黑莓 -->
<meta name="HandheldFriendly" content="true" />
<!-- 微软的老式浏览器 -->
<meta name="MobileOptimized" content="320" />
<!-- uc强制竖屏 -->
<meta name="screen-orientation" content="portrait" />
<!-- QQ强制竖屏 -->
<meta name="x5-orientation" content="portrait" />
<!-- UC强制全屏 -->
<meta name="full-screen" content="yes" />
<!-- QQ强制全屏 -->
<meta name="x5-fullscreen" content="true" />
<!-- UC应用模式 -->
<meta name="browsermode" content="application" />
<!-- QQ应用模式 -->
<meta name="x5-page-mode" content="app" />
<!-- windows phone 点击无高光 -->
<meta name="msapplication-tap-highlight" content="no" />
<!-- 适应移动端end -->
```

<Vssue title="Vssue" />