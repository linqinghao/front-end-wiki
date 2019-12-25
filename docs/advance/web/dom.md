# DOM 编程

## 浏览器环境

JavaScript 语言最初是为 Web 浏览器创建的。Web 浏览器作为宿主环境，提供了很多 API 来满足查看网页、图片、音视频等需求。下面是浏览器在 Javascript 运行时的鸟瞰图。

![dom-web-2019-12-25.png](https://allin-bucket.oss-cn-beijing.aliyuncs.com/blog/dom-web-2019-12-25.png?x-oss-process=style/alin)

浏览器环境由三部分组成：

1. DOM(文档对象模型)标准

描述文档的结构、操作和事件，参见 https://dom.spec.whatwg.org。

2. CSSOM 标准

介绍样式表和样式规则，对它们的操作及其对文档的绑定，参见 https://www.w3.org/TR/cssom-1/.

3. HTML 标准

介绍 HTML 语言（例如标签）以及 BOM（浏览器对象模型）—— 各种浏览器函数：`setTimeout`、`alert`、`location` 等等，请参阅 https://html.spec.whatwg.org。它采用了 DOM 规范并为其扩展了许多属性和方法。

## DOM 树

浏览器会将 HTML/XML 解析为 DOM 树。

### 节点类型

有 12 种节点类型。实际上，通常用到的有以下几个：

- **`document`**：DOM 树的根节点
- **元素节点**：HTML 标签，“树枝”
- **文本节点**：纯文本，“树叶”
- **注释节点**：注释

### 访问 DOM

DOM 让我们可以对元素和它们其中的内容做任何事，但是首先我们需要获取到对应的 DOM 对象，把这个对象赋予一个变量，然后我们才能修改这个对象。

对 DOM 的所有操作都是从 `document` 对象开始的。从这个对象我们可以到达任何节点。下图描述的是 DOM 节点之间的联系。

![dom-遍历dom树-2019-12-25.png](https://allin-bucket.oss-cn-beijing.aliyuncs.com/blog/dom-遍历dom树-2019-12-25.png?x-oss-process=style/alin)

#### 1. 根节点

- `document`：是整个 DOM 树的根节点。
- `document.documentElement`：对应`<html>`标签的节点。
- `document.body`：对应`<body>`标签的节点。
- `document.head`：对应`<head>`标签的节点。

#### 2. 父节点

父节点可以通过 `parentNode` 访问。

#### 3. 子节点

- `childNodes`: 集合提供了对所有子节点包括其中文本节点的访问。
- `firstChild`: 访问第一个子元素。
- `lastChild`: 访问最后一个子元素。

#### 4. 兄弟节点

兄弟节点可以通过 `nextSibling` 和 `previousSibling` 访问。

#### 5. 元素节点

`childNodes` 不仅存在元素节点，还有文本节点，甚至是注释节点。在日常的使用中，我们更多的是只需要访问元素节点，排除掉其他干扰节点。

![dom-访问元素节点-2019-12-25.png](https://allin-bucket.oss-cn-beijing.aliyuncs.com/blog/dom-访问元素节点-2019-12-25.png?x-oss-process=style/alin)

- `parentElement`：父元素节点
- `children`：只获取类型为元素节点的子节点。
- `firstElementChild, lasElementChild` ： 第一个和最后一个子元素节点。
- `previousElementSibling, nextElementSibling`：前一个和后一个兄弟元素节点。

::: warning 注意
`document.documentElement` 没有 `parentElement` 。因为 `document.documentElement` 的父节点是 `document` ，但 `document` 不是一个元素节点。

```js
alert(document.documentElement.parentNode); // document
alert(document.documentElement.parentElement); // null
```

:::

#### 6. 访问 DOM 节点的方法

- `document.getElementById`

  id 必须唯一，文档中给定的 id 只能有唯一一个元素。
  如果有多个元素具有同名 id，那么对应方法的行为将不可预测。浏览器将随机返回其他的一个。因此未来保证 id 的唯一性，请严格遵守规则。

- `getElementsBy*`

  - `getElementByTagsName(tag)`——用给点的标签来查找元素。
  - `getElementsByClassName(className)`——返回具有给点 CSS 类的元素。
  - `getElementsByName(name)`——返回具有给点 `name` 属性的元素。很少使用。

- `querySelectorAll` 和 `querySelector`

  `elem.querySelectorAll(css)`——返回与给定 CSS 选择器匹配的 `elem` 中的所有元素。
  `elem.querySelector(css)`——返回给定 CSS 选择器的第一个元素。

- `matches`
  `elem.matchs(css)`——检查 `elem` 是否匹配给点的 CSS 选择器。

- `closet`
  `elem.closet(css)` ——查找与 CSS 选择器匹配的最接近的祖先。

## DOM 节点类与节点属性

### DOM 节点类

DOM 节点因为它们的类而具有不同的属性。例如，标记 `<a>` 相对应的元素节点具有链接相关的属性，标记 `<input>` 对应元素节点具有的输入相关的属性等。文本节点不同于元素节点，但是它们之间也存在共有的属性和方法，因为所有的 DOM 节点都形成一个单一层次的结构。

每个 DOM 节点都有与之对应的内置类。层次的根节点是 [EventTarget](https://dom.spec.whatwg.org/#eventtarget)，[Node](http://dom.spec.whatwg.org/#interface-node) 继承自它，其他 DOM 节点也继承自它。

![dom-节点类-2019-12-25.png](https://allin-bucket.oss-cn-beijing.aliyuncs.com/blog/dom-节点类-2019-12-25.png?x-oss-process=style/alin)

类如下所示：

- [EventTarget](https://dom.spec.whatwg.org/#eventtarget) —— 是根的“抽象”类。该类的对象从未被创建。它作为一个基础，为了让所有 DOM 节点都支持所谓的“事件”，我们会在之后对它进行学习。
- [Node](http://dom.spec.whatwg.org/#interface-node) —— 也是一个“抽象”类，充当 DOM 节点的基础。它提供了树的核心功能：`parentNode`、`nextSibling`、`childNodes` 等（它们都是 getter）。`Node` 类的对象从未被创建。但是一些具体的节点类却继承自它，例如：`Text` 表示文本节点，`Element` 用于元素节点，以及更多外来的类（如注释节点 `Comment`）。
- [Element](http://dom.spec.whatwg.org/#interface-element) —— 是 DOM 元素的基类。它提供了元素级的导航，比如 `nextElementSibling`、`children` 以及像 `getElementsByTagName`、`querySelector` 这样的搜索方法。浏览器中不仅有 HTML，还会有 XML 和 SVG 文档。`Element` 类充当以下更具体类的基类：`SVGElement`、`XMLElement` 和 `HTMLElement`。
- [HTMLElement](https://html.spec.whatwg.org/multipage/dom.html#htmlelement)—— 最终会成为所有 HTML 元素的基类。由各种 HTML 元素继承：
  - [HTMLInputElement](https://html.spec.whatwg.org/multipage/forms.html#htmlinputelement) —— `<input>` 元素的类，
  - [HTMLBodyElement](https://html.spec.whatwg.org/multipage/semantics.html#htmlbodyelement) —— `<body>` 元素的类，
  - [HTMLAnchorElement](https://html.spec.whatwg.org/multipage/semantics.html#htmlanchorelement) —— `<a>` 元素的类，
  - 等等，每个标记都有可以为自己提供特定属性和方法的类。

因此，给定节点的全部属性和方法都是继承的结果。

例如，我们考虑一下 `<input>` 元素的 DOM 对象。它属于 [HTMLInputElement](https://html.spec.whatwg.org/multipage/forms.html#htmlinputelement) 类。它将属性和方法作为以下内容的叠加：

- `HTMLInputElement` —— 该类提供特定于输入的属性，而且可以继承…
- `HTMLElement` —— 它提供了通用 HTML 元素方法（getter 和 setter），而且可以继承自其它属性。
- `Element` —— 提供泛型元素方法，而且可以继承自其它属性。
- `Node` —— 提供通用 DOM 节点属性，而且可以继承自其它属性。
- `EventTarget` —— 为事件（包括事件本身）提供支持，
- 最后，它继承了 `Object`，因为像 `hasOwnProperty` 的“纯对象”方法也是可用的。

### 节点属性

1. `nodeType` 属性

- 元素节点—— `nodeType = 1`
- 文本节点—— `nodeType = 3`
- `document`节点—— `nodeType = 9`

2. `nodeName` 与 `tagName`

- `tagName`属性仅用于 `Element`节点。
- `nodeName`属性用于所有 `Node`节点：
  - 对于元素节点，与 `tagName`一致。
  - 对于其他节点，则是一个字符串的节点类型。如 `#document` ， `#comment`

3. `innerHTML`, `outerHTML`, `textContent`

- `innerHTML`赋值会完全重写。
- `outerHTML`包含元素完整的 HTML。
- `textContent`返回元素的文本信息，去掉所有的 `<tags>` 。所有字符都当做字面量处理。

4. `nodeValue` 与 `data`：文本节点内容

用于获取文本节点的属性。

5. `hidden` 属性：指定 DOM 元素是否可见。
6. 更多属性

- `value` ——获取 `HTMLInputElement`的值。
- `href` ——获取 `<a>`的链接。

## DOM 操作

常见操作：

```js
<script>
  let div = document.createElement('div'); div.className = "alert alert-success"; div.innerHTML = "
  <strong>Hi there!</strong> You've read an important message."; document.body.appendChild(div);
</script>
```

### 旧的插值方法

- `parentElem.appendChild(node)`
- `parentElem.insertBefore(node)`
- `parentElem.replaceChild(node)`
- `parentElem.removeChild(node)`

缺点：不够灵活，删除节点或者插入节点需要操作父节点。

### 新的插值方法

- `node.append(...nodes or strings)` —— 在 `node` 末尾插入节点或者字符串，
- `node.prepend(...nodes or strings)` —— 在 `node` 开头插入节点或者字符串，
- `node.before(...nodes or strings)` —— 在 `node` 前面插入节点或者字符串，
- `node.after(...nodes or strings)` —— 在 `node` 后面插入节点或者字符串，
- `node.replaceWith(...nodes or strings)` —— 将 `node` 替换为节点或者字符串。
- `node.remove()` ——从当前位置移除 `node` 。

缺点：字符串以安全的方式插入到页面中，就像调用 `elem.textContent`  方法一样。

### insertAdjacentHTML

`elem.insertAdjacentHTML(where, html)`  方法第一个参数是代码字符串，指定相对于 `elem` 的插入位置，必须是以下四个值之一：

- `"beforebegin"` —— 在 `elem` 开头位置前插入 `html`，
- `"afterbegin"` —— 在 `elem` 开头位置后插入 `html`（译注：即 `elem` 元素内部的第一个子节点之前），
- `"beforeend"` —— 在 `elem` 结束位置前插入 `html`（译注：即 `elem` 元素内部的最后一个子节点之后），
- `"afterend"` —— 在 `elem` 结束位置后插入 `html`。

变种：

- `elem.insertAdjacentText(where, text)` ——作为文本插入
- `elem.insertAdjacentElement(where, elem)` ——插入元素

### 克隆节点：cloneNode

- `elem.cloneNode(true)` 方法用来对一个元素进行“深”克隆 —— 包括所有特性和子元素。`elem.cloneNode(false)` 方法只克隆该元素本身，不对子元素进行克隆。

## 样式操作

### 两种方式

- 内联样式： `<div style="...">`
- 引用 CSS 类： `<div class="...">`

### className 和 classList

- `classsName` ——获取元素的 `class`  属性，字符串。
- `classList` ——获取元素的 `classList`  列表。

`classList`  方法：

- `elem.classList.add/remove("class")` —— 添加/移除类。
- `elem.classList.toggle("class")` —— 如果类存在就移除，否则添加。
- `elem.classList.contains("class")` —— 返回 `true/false`，检查给定类。

### 元素样式

`elem.style`  属性是一个对象，它对应与 `style`  特性中所写的内容。访问时需要使用 `camelCase`  命名法。

```css
background-color  => elem.style.backgroundColor
z-index           => elem.style.zIndex
border-left-width => elem.style.borderLeftWidth
```

**注意： `style`  属性仅对 `style`  属性值进行操作，而不是任何 CSS 级联**

### 计算样式: getComputedStyle

`getComputedStyle(element[, pseudo])`  返回与 `style`  对象类似且包含了所有类的对象，是只读的。

- `element` ——读取样式值的元素。
- `pseudi` ——伪元素

```html
<head>
  <style>
    body {
      color: red;
      margin: 5px;
    }
  </style>
</head>
<body>
  <script>
    let computedStyle = getComputedStyle(document.body);
    // 现在我们可以读出页边距和颜色了
    alert(computedStyle.marginTop); // 5px
    alert(computedStyle.color); // rgb(255, 0, 0)
  </script>
</body>
```

::: warning 注意
计算值与解析值

- `computed` 样式值是应用所有 CSS 规则和 CSS 继承之后的值，这是 CSS 级联的结果。它可以是 `height:1em` 或者 `font-size:125%`。
- `resolved` 样式值最终应用于元素值。像 `1em` 或者 `125%` 这样的值都是相对的。浏览器会进行值计算，然后对其进行 `fixed` 和 `absolute`，例如：`height:20px` 或 `font-size:16px`。对于几何属性，解析值可能是一个浮点，如`width:50.5px`。

`getComputedStyle`实际上返回的是属性的解析值。
:::

## 元素的尺寸与滚动

![dom-元素的尺寸-2019-12-25.png](https://allin-bucket.oss-cn-beijing.aliyuncs.com/blog/dom-元素的尺寸-2019-12-25.png?x-oss-process=style/alin)

- `offsetLeft` / `offsetTop` ——提供相对于元素左上角的 x/y 坐标。
- `offsetWidth` / `offsetHeight` ——它们提供元素的“外部”宽度/高度。换句话说，它的完整大小包括边框。
- `clientLeft` / `clientTop` ——内侧与外侧的相对坐标。
- `clientWidth`  / `clientHeight` ——提供元素边框内区域的大小。包含内容宽度与内填充宽度，不包含滚动条宽度。
- `scrollWidth` / `scrollHeight` ——包含滚动（隐藏部分）

![dom-元素的滚动-2019-12-25.png](https://allin-bucket.oss-cn-beijing.aliyuncs.com/blog/dom-元素的滚动-2019-12-25.png?x-oss-process=style/alin)

- `scrollLeft` / `scrollTop` ——可修改。
  将 `scrollTop` 设置为 `0` 或 `Infinity` 将使元素分别滚动到顶部/底部。

![dom-元素的滚动2-2019-12-25.png](https://allin-bucket.oss-cn-beijing.aliyuncs.com/blog/dom-元素的滚动2-2019-12-25.png?x-oss-process=style/alin)

::: warning 注意
CSS 宽度与 clientWidth 的不同点

1. `clientWidth` 值是数值，然而 `getComputedStyle(elem).width` 返回一个包含 `px` 的字符串。
2. `getComputedStyle` 可能返回非数值的结果，例如内联元素的 `"auto"`。
3. `clientWidth` 是元素的内部内容区域加上内间距，而 CSS 宽度（具有标准的 `box-sizing`）是内部**不包括内间距**的空间区域。
4. 如果有一个滚动条，一般浏览器保留它的空间，有的浏览器从 CSS 宽度中减去这个空间（因为它不再用于内容），而有些则不这样做。`clientWidth` 属性总是相同的：如果保留了滚动条，那么它的宽度将被删去。
   :::

## window 尺寸与滚动

### 窗口的宽度/高度

1. `documentElement.clientWidth` / `documentElement.clientHeight` —— `documentElement`  元素的宽高，包含滚动条。
2. `window.innerWidth / Height` ——不包含滚动条的窗口尺寸。

### 文档的宽度/高度

要获得可靠的窗口大小，应该采用这些属性的最大值：

```js
let scrollHeight = Math.max(
  document.body.scrollHeight,
  document.documentElement.scrollHeight,
  document.body.offsetHeight,
  document.documentElement.offsetHeight,
  document.body.clientHeight,
  document.documentElement.clientHeight
);

alert('Full document height, with scrolled out part: ' + scrollHeight);
```

### 获取当前滚动状态

- 常规元素： `elem.scrollLeft/scrollTop`
- 文档：使用 `document.body`  代替有 bugs 的  `documentElement.scrollTop/Left` ，也可以使用特殊属性 `window,pageXOffset/pageYOffset`

### 滚动到位置

注意：尽量不使用修改  `documentElement.scrollLeft/Top`  和 `document.body.scrollLeft/Top`  的方法滚动到某一个位置。

更加通用的解决方案：使用 `window.scrollBy(x, y)`  和 `window.scrollTo(pageX, pageY)`

### 滚动到视图

调用 `elem.scrollIntoView(top)` 会使 `elem` 滚动到可视范围。它有一个结论：

- 如果 `top=true`（默认值），页面滚动使 `elem` 会出现到窗口顶部。元素的上边缘与窗口顶部对齐。
- 如果 `top=false`，则页面滚动使 `elem` 会出现在窗口底部。元素的下边缘与窗口底部对齐。

### 禁止滚动

```js
document.body.style.overflow = 'hidden'; // 禁止滚动
document.body.style.overflow = ''; // 恢复滚动
```

## 坐标

大多数 JavaScript 方法处理的是以下两种坐标系中的一个：

1. 相对于窗口（或者另一个 viewport）顶部/左侧计算的坐标
2. 相对于文档顶部/左侧计算的坐标

### 窗口坐标：getBoundingClientRect

窗口的坐标是从窗口的左上角开始计算的。`elem.getBoundingClientRect()` 方法返回一个 `elem` 的窗口坐标对象，这个对象有以下这些属性：

- `top` — 元素顶部边缘的 Y 坐标
- `left` — 元素左边边缘的 X 坐标
- `right` — 元素右边边缘的 X 坐标
- `bottom` — 元素底部边缘的 Y 坐标

![dom-元素的窗口坐标-2019-12-25.png](https://allin-bucket.oss-cn-beijing.aliyuncs.com/blog/dom-元素的窗口坐标-2019-12-25.png?x-oss-process=style/alin)

**注意：坐标的右/底部和 CSS 中的属性是不同的。**

### elementFromPoint(x, y)

调用 `document.elementFromPoint(x, y)` 方法返回窗口坐标 `(x, y)` 中最顶层的元素。

**注意：对于在窗口之外的坐标， `elementFromPoint`  返回 `null`**

### 文档坐标

- 文档相对坐标是从文档的左上角开始计算，而不是窗口。
- 在 CSS 中，窗口坐标对应的是 `position:fixed`，而文档坐标则类似顶部的 `position:absolute`。
- 我们可以使用 `position:absolute` 和 `top/left` 来把一些东西放到文档中的固定位置，以便在页面滚动时元素仍能保留在那里。但是我们首先需要正确的坐标。
- 为了清楚起见我们把窗口坐标叫做 `(clientX,clientY)` 把文档坐标叫做 `(pageX,pageY)`。

### 获取文档坐标

- `pageY`  = `clientY` + 文档垂直部分滚动的高度。
- `pageX`  = `clientX` + 文档水平部分滚动的宽度。

```js
// 获取元素的文档坐标
function getCoords(elem) {
  let box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset,
  };
}
```
