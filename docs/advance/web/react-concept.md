# React 一些重要的概念

## JSX 与 React 元素

```jsx
const element = <h1>Hello, world!</h1>;
```

JSX 是对 JavaScript 的语法扩展。它允许我们以类似 XML 标记的形式直接地声明界面，其目的在于直观地用 JS 表示浏览器的 DOM 结构。

React 认为渲染逻辑本质上与其他 UI 逻辑内在耦合，比如，在 UI 中需要绑定处理事件、在某些时刻状态发生变化时需要通知到 UI，以及需要在 UI 中展示准备好的数据。React 并没有采用将标记与逻辑进行分离到不同文件这种人为地分离方式，而是通过将二者共同存放在称之为“组件”的松散耦合单元之中，来实现关注点分离。

Babel 会把 JSX 转译成一个名为 `React.createElement()` 函数调用。

```js
const element = React.createElement('h1', { className: 'greeting' }, 'Hello, world!');
```

最终会生成一个对象，这个对象就称作 **React 元素**。

## React 组件

组件允许我们将 UI 拆分为独立可复用的代码片段。

### 函数组件

定义组件最简单的方式就是编写 JavaScript 函数：

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

该函数是一个有效的 React 组件，因为它接收唯一带有数据的 “props”（代表属性）对象与并返回一个 React 元素。这类组件被称为“函数组件”，因为它本质上就是 JavaScript 函数。函数组件也叫无状态组件，其本身不包含各种组件状态。

函数组件的一些特点：

- 组件不会被实例化，整体渲染性能得到提升

因为组件被精简成一个 `render` 方法的函数来实现的，由于是无状态组件，所以无状态组件就不会在有组件实例化的过程，无实例化过程也就不需要分配多余的内存，从而性能得到一定的提升。

- 组件不能访问 `this` 对象

无状态组件由于没有实例化过程，所以无法访问组件 `this` 中的对象，例如：`this.ref`、`this.state` 等均不能访问。若想访问就不能使用这种形式来创建组件

- 组件无法访问生命周期的方法

因为无状态组件是不需要组件生命周期管理和状态管理，所以底层实现这种形式的组件时是不会实现组件的生命周期方法。所以无状态组件是不能参与组件的各个生命周期管理的。

- 无状态组件只能访问输入的 `props`，同样的 `props` 会得到同样的渲染结果，不会有副作用

### 类组件

```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

使用 ES6 的 Class 定义的组件，就是类组件。类组件的实例就叫有状态组件，其包含了 React 提供的各种生命周期方法，并且能够在组件内部维护自身的状态。

## Props 和 State

React 的核心思想是组件化的思想，页面会被切分成一些独立的、可复用的组件。而 React 组件的定义可以通过下面的公式描述：

```js
UI = Component(props, state);
```

组件根据 props 和 state 两个参数，计算得到对应界面的 UI。可见，props 和 state 是组件的两个重要数据源。

### Props

组件从概念上看就是一个函数，可以接受一个参数作为输入值，这个参数就是 props，所以可以把 props 理解为从外部传入组件内部的数据。由于 React 是单向数据流，所以 props 基本上也就是从服父级组件向子组件传递的数据。

注意：**所有 React 组件都必须像纯函数一样保护它们的 props 不被更改。**

#### 只读

props 经常被用作渲染组件和初始化状态，当一个组件被实例化之后，它的 props 是只读的，不可改变的。如果 props 在渲染过程中可以被改变，会导致这个组件显示的形态变得不可预测。只有通过父组件重新渲染的方式才可以把新的 props 传入组件中。

#### 默认值

在组件中，我们最好为 props 中的参数设置一个 defaultProps，并且制定它的类型。比如，这样：

```jsx
HelloWorld.defaultProps = {
  text: 'Hello World',
};
```

#### propTypes 类型检查

随着时间的推移，应用程序会变得越来越大，因此类型检查非常重要。PropTypes 为组件提供类型检查，并为其他开发人员提供很好的文档。

### State

一个组件的显示形态可以由数据状态和外部参数所决定，外部参数也就是 props，而数据状态就是 state。state 维护的是组件的内部状态。

#### setState

state 不同于 props 的一点是，state 是可以被改变的。

1. 不要直接修改 State

```js
// 错误的用法
this.state.comment = 'Hello';
```

这种方式不会重新渲染组件。

```js
// 正确的用法
this.setState({ comment: 'Hello' });
```

正确的用法是使用`setState()`方法。

2. State 的更新可能是异步的

出于性能考虑，React 可能会把多个 `setState()` 调用合并成一个调用。

因为 `this.props` 和 `this.state` 可能会异步更新，所以你不要依赖他们的值来更新下一个状态。

要解决这个问题，可以让 `setState()` 接收一个函数而不是一个对象。这个函数用上一个 state 作为第一个参数，将此次更新被应用时的 props 做为第二个参数：

```js
// Correct
this.setState((state, props) => ({
  counter: state.counter + props.increment,
}));
```

3. State 的更新会被合并

当你调用 `setState()` 的时候，React 会把你提供的对象合并到当前的 state。

## 组件生命周期

下图为 React 16.4 的生命周期图。

![react-组件生命周期-2019-12-26.png](https://allin-bucket.oss-cn-beijing.aliyuncs.com/blog/react-组件生命周期-2019-12-26.png?x-oss-process=style/alin)

我们将 React 的生命周期分为三个阶段，然后详细讲解每个阶段具体调用了什么函数，这三个阶段是：

1. 挂载阶段
2. 更新阶段
3. 卸载阶段

### 挂载阶段

挂载阶段，也可以理解为组件的初始化阶段，就是将我们的组件插入到 DOM 中，只会发生一次。这个阶段的生命周期函数调用如下：

- `constructor`
- `getDerivedStateFromProps`
- <del>`componentWillMount/UNSAVE_componentWillMount`</del>
- `render`
- `componentDidMount`

#### constructor

组件构造函数，第一个被执行。如果没有显示定义它，我们会拥有一个默认的构造函数。在构造函数里，我们可以初始化 state 对象。

```js
class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 'blue',
    };
  }
}
```

#### getDerivedStateFromProps

```js
static getDerivedStateFromProps(nextProps, prevState)
```

- 该方法是一个静态方法，因此不能在这个函数里面使用 `this`，这个函数有两个参数 props 和 state，分别指接收到的新参数和当前的 state 对象，这个函数会返回一个对象用来更新当前的 state 对象，如果不需要更新可以返回 `null`。
- 该函数会在挂载时，接收到新的 props，调用了`setState`和`forceUpdate`时被调用。

#### render

`render()`是组件的渲染方法，其必须返回以下类型：

- 原生的 DOM，如 div
- React 组件
- Fragment（片段）
- Portals（插槽）
- 字符串和数字，被渲染成 text 节点
- Boolean 和 null，不会渲染任何东西

#### componentDidMount

`componentDidMount()` 是组件装载之后调用的方法，此时可以对 DOM 节点进行操作，或者发起数据请求。

### 更新阶段

更新阶段，当组件的 props 改变了，或组件内部调用了`setState()`或者`forceUpdate()`发生，会发生多次。这个阶段的生命周期函数调用如下：

- <del>`componentWillReceiveProps/UNSAFE_componentWillReceiveProps`</del>
- `getDerivedStateFromProps`
- `shouldComponentUpdate`
- <del>`componentWillUpdate/UNSAFE_componentWillUpdate`</del>
- `render`
- `getSnapshotBeforeUpdate`
- `componentDidUpdate`

#### shouldComponentUpdate

```js
shouldComponentUpdate(nextProps, nextState);
```

有两个参数 nextProps 和 nextState，表示新的属性和变化之后的 state，返回一个布尔值，true 表示会触发重新渲染，false 表示不会触发重新渲染，默认返回 true

注意：当我们调用 `forceUpdate()` 并不会触发此方法

#### getSnapshotBeforeUpdate

```js
getSnapshotBeforeUpdate(prevProps, prevState);
```

这个方法在 `render` 之后，`componentDidUpdate` 之前调用，有两个参数 prevProps 和 prevState，表示之前的属性和之前的 state，这个函数有一个返回值，会作为第三个参数传给 `componentDidUpdate`，如果不想要返回值，可以返回 null。并且该方法必须要和 `componentDidUpdate` 一起使用。

##### componentDidUpdate

```js
componentDidUpdate(prevProps, prevState, snapshot);
```

该方法在 `getSnapshotBeforeUpdate` 方法之后被调用，有三个参数 prevProps，prevState，snapshot，表示之前的 props，之前的 state，和 snapshot。第三个参数是 `getSnapshotBeforeUpdate` 返回的。

### 卸载阶段

卸载阶段，当我们的组件被卸载或者销毁了。这个阶段的生命周期函数只有一个：`componentWillUnmount`。

#### componentWillUnmount

当我们的组件被卸载或者销毁了就会调用，我们可以在这个函数里去清除一些定时器，取消网络请求，清理无效的 DOM 元素等垃圾清理工作

注意：不要在这个函数里去调用 `setState`，因为组件不会重新渲染了。

## 事件处理

- React 事件使用了事件委托的机制，一般事件委托的作用都是为了减少页面的注册事件数量，减少内存开销，优化浏览器性能，React 这么做也是有这么一个目的，除此之外，也是为了能够更好的管理事件，实际上，React 中所有的事件最后都是被委托到了 `document` 这个顶级 DOM 上。
- 既然所有的事件都被委托到了 document 上，那么肯定有一套管理机制，所有的事件都是以一种先进先出的队列方式进行触发与回调。
- 既然都已经接管事件了，那么不对事件做些额外的事情未免有些浪费，于是 React 中就存在了自己的合成事件(SyntheticEvent)，合成事件由对应的 EventPlugin 负责合成，不同类型的事件由不同的 plugin 合成，例如 `SimpleEvent Plugin`、`TapEvent Plugin` 等。
- 为了进一步提升事件的性能，使用了 EventPluginHub 这个东西来负责合成事件对象的创建和销毁。

## 状态提升

在 React 应用中，任何可变数据应当只有一个相对应的唯一“数据源”。通常，state 都是首先添加到需要渲染数据的组件中去。然后，如果其他组件也需要这个 state，那么我们可以将它提升至这些组件的最近共同父组件中。组件应当保持自上而下的数据流，而不是尝试在不同组件间同步 state。

## 受控组件与非受控组件

### 受控组件

在 HTML 中，表单元素（如`<input>`、 `<textarea>` 和 `<select>`）之类的表单元素通常自己维护 state，并根据用户输入进行更新。而在 React 中，可变状态（mutable state）通常保存在组件的 state 属性中，并且只能通过使用 setState()来更新。

我们可以把两者结合起来，使 React 的 state 成为“唯一数据源”。渲染表单的 React 组件还控制着用户输入过程中表单发生的操作。被 React 以这种方式控制取值的表单输入元素就叫做“受控组件”。

### 非受控组件

非受控组件指表单数据将交由 DOM 节点来处理。我们可以使用 ref 来从 DOM 节点中获取表单数据。

在 React 中，`<input type="file">`始终是一个非受控组件，因为它的值只能由用户设置，而不能通过代码控制。下面的例子显示了如何创建一个 DOM 节点的 ref 从而在提交表单时获取文件的信息。

```jsx
class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = React.createRef();
  }
  handleSubmit(event) {
    event.preventDefault();
    alert(`Selected file - ${this.fileInput.current.files[0].name}`);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Upload file:
          <input type='file' ref={this.fileInput} />
        </label>
        <br />
        <button type='submit'>Submit</button>
      </form>
    );
  }
}

ReactDOM.render(<FileInput />, document.getElementById('root'));
```

## Context

### 介绍

Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法。

在一个典型的 React 应用中，数据是通过 props 属性自上而下（由父及子）进行传递的，但这种做法对于某些类型的属性而言是极其繁琐的（例如：地区偏好，UI 主题），这些属性是应用程序中许多组件都需要的。Context 提供了一种在组件之间共享此类值的方式，而不必显式地通过组件树的逐层传递 props。

- 相比 props 和 state，React 的 Context 可以实现跨层级的组件通信。
- Context API 的使用基于生产者消费者模式。
- 可以把 Context 当做组件的作用域来看待，但是需要关注 Context 的可控性和影响范围，使用之前，先分析是否真的有必要使用，避免过度使用所带来的一些副作用。
- 可以把 Context 当做媒介，进行 App 级或者组件级的数据共享。

### 用法

1. React.createContext

```jsx
const MyContext = React.createContext(defaultValue);
```

创建一个 Context 对象。当 React 渲染一个订阅了这个 Context 对象的组件，这个组件会从组件树中离自身最近的那个匹配的 `Provider` 中读取到当前的 context 值。

2. Context.Provider

```jsx
<MyContext.Provider value={/* 某个值 */}>
```

每个 Context 对象都会返回一个 Provider React 组件，它允许消费组件订阅 context 的变化。

Provider 接收一个 `value` 属性，传递给消费组件。一个 Provider 可以和多个消费组件有对应关系。多个 Provider 也可以嵌套使用，里层的会覆盖外层的数据。

当 Provider 的 `value` 值发生变化时，它内部的所有消费组件都会重新渲染。Provider 及其内部 consumer 组件都不受制于 `shouldComponentUpdate` 函数，因此当 consumer 组件在其祖先组件退出更新的情况下也能更新。

3. Class.contextType

挂载在 class 上的 `contextType` 属性会被重赋值为一个由 `React.createContext()` 创建的 Context 对象。这能让你使用 `this.context` 来消费最近 Context 上的那个值。你可以在任何生命周期中访问到它，包括 render 函数中。

4. Context.Consumer

```jsx
<MyContext.Consumer>
  {value => /* 基于 context 值进行渲染*/}
</MyContext.Consumer>
```

这里，React 组件也可以订阅到 context 变更。这能让你在函数式组件中完成订阅 context。

这需要函数作为子元素（function as a child）这种做法。这个函数接收当前的 context 值，返回一个 React 节点。传递给函数的 `value` 值等同于往上组件树离这个 context 最近的 Provider 提供的 `value` 值。如果没有对应的 Provider，`value` 参数等同于传递给 `createContext()` 的 `defaultValue`。

5. Context.displayName

context 对象接受一个名为 `displayName` 的 property，类型为字符串。React DevTools 使用该字符串来确定 context 要显示的内容。

## Error Boundaries

### 介绍

部分 UI 的 JavaScript 错误不应该导致整个应用崩溃，为了解决这个问题，React 16 引入了一个新的概念 —— 错误边界。

错误边界是一种 React 组件，这种组件可以捕获并打印发生在其子组件树任何位置的 JavaScript 错误，并且，它会渲染出备用 UI，而不是渲染那些崩溃了的子组件树。错误边界在渲染期间、生命周期方法和整个组件树的构造函数中捕获错误。

需要注意的是，错误边界无法捕获以下场景中产生的错误：

- 事件处理（了解更多）
- 异步代码（例如 `setTimeout` 或 `requestAnimationFrame` 回调函数）
- 服务端渲染
- 它自身抛出来的错误（并非它的子组件）

如果一个 class 组件中定义了 `static getDerivedStateFromError()` 或 `componentDidCatch()` 这两个生命周期方法中的任意一个（或两个）时，那么它就变成一个错误边界。当抛出错误后，请使用 `static getDerivedStateFromError()` 渲染备用 UI ，使用 `componentDidCatch()` 打印错误信息。

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 你同样可以将错误日志上报给服务器
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
```

然后你可以将它作为一个常规组件去使用：

```jsx
<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>
```

错误边界的工作方式类似于 JavaScript 的 `catch {}`，不同的地方在于错误边界只针对 React 组件。只有 class 组件才可以成为错误边界组件。大多数情况下, 你只需要声明一次错误边界组件, 并在整个应用中使用它。

注意错误边界仅可以捕获其子组件的错误，它无法捕获其自身的错误。如果一个错误边界无法渲染错误信息，则错误会冒泡至最近的上层错误边界，这也类似于 JavaScript 中 `catch {}` 的工作机制。

**自 React 16 起，任何未被错误边界捕获的错误将会导致整个 React 组件树被卸载。**

## Refs 和 DOM

### 介绍

Refs 提供了一种方式，允许我们访问 DOM 节点或在 render 方法中创建的 React 元素。

在典型的 React 数据流中，props 是父组件与子组件交互的唯一方式。要修改一个子组件，你需要使用新的 props 来重新渲染它。但是，在某些情况下，你需要在典型数据流之外强制修改子组件。被修改的子组件可能是一个 React 组件的实例，也可能是一个 DOM 元素。

下面是几个适合使用 refs 的情况：

- 管理焦点，文本选择或媒体播放。
- 触发强制动画。
- 集成第三方 DOM 库。

### 用法

1. 创建 Refs

Refs 是使用 `React.createRef()` 创建的，并通过 `ref` 属性附加到 React 元素。在构造组件时，通常将 Refs 分配给实例属性，以便可以在整个组件中引用它们。

```js
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    return <div ref={this.myRef} />;
  }
}
```

2. 访问 Refs

当 ref 被传递给 `render` 中的元素时，对该节点的引用可以在 ref 的 `current` 属性中被访问。

```js
const node = this.myRef.current;
```

ref 的值根据节点的类型而有所不同：

- 当 `ref` 属性用于 HTML 元素时，构造函数中使用 `React.createRef()` 创建的 `ref` 接收底层 DOM 元素作为其 `current` 属性。
- 当 `ref` 属性用于自定义 class 组件时，`ref` 对象接收组件的挂载实例作为其 `current` 属性。
- 你不能在函数组件上使用 ref 属性，因为他们没有实例。

## Portal

### 介绍

Portal 提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的优秀的方案。

### 用法

```jsx
ReactDOM.createPortal(child, container);
```

第一个参数（child）是任何可渲染的 React 子元素，例如一个元素，字符串或 fragment。第二个参数（container）是一个 DOM 元素。

一个 portal 的典型用例是当父组件有 overflow: hidden 或 z-index 样式时，但你需要子组件能够在视觉上“跳出”其容器。例如，对话框、悬浮卡以及提示框：

## 高阶组件

### 简介

高阶组件是一个函数，它接受一个组件作为参数，返回一个新的组件。高阶组件采用了装饰器模式，让我们可以增强原有组件的功能，并且不破坏它原有的特性。

```jsx
function enhance(Comp) {
  // 增加一些其他的功能
  return class extends Component {
    // ...
    render() {
      return <Comp />;
    }
  };
}
```

## Hooks

### 简介

1. 介绍

Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

举个例子：

```jsx
import React, { useState } from 'react';

function Example() {
  // 声明一个新的叫做 “count” 的 state 变量
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

2. 引入 Hook 的动机

- 在组件之间复用状态逻辑很难

  React 没有提供将可复用性行为“附加”到组件的途径（例如，把组件连接到 store）。由 providers，consumers，高阶组件，render props 等其他抽象层组成的组件会形成“嵌套地狱”。

- 复杂组件变得难以理解

  我们经常维护一些组件，组件起初很简单，但是逐渐会被状态逻辑和副作用充斥。每个生命周期常常包含一些不相关的逻辑。在多数情况下，不可能将组件拆分为更小的粒度，因为状态逻辑无处不在。这也给测试带来了一定挑战。为了解决这个问题，**Hook 将组件中相互关联的部分拆分成更小的函数（比如设置订阅或请求数据），而并非强制按照生命周期划分。**

- class 难以理解

  Hook 使你在非 class 的情况下可以使用更多的 React 特性。

3. Hook！

Hook 是一些可以让你在函数组件里“钩入” React state 及生命周期等特性的函数。

注意：

- 只能在函数最外层调用 Hook。不要在循环、条件判断或者子函数中调用。
- 只能在 React 的函数组件中调用 Hook。不要在其他 JavaScript 函数中调用。

内置 Hook：

- State Hook
- Effect Hook

### 使用 State Hook

通过在函数组件里调用 `useState` 来给组件添加一些内部 state。React 会在重复渲染时保留这个 state。`useState` 会返回一对值：**当前状态**和**一个更新它的函数**，我们可以在事件处理函数中或其他一些地方调用这个函数。它类似 class 组件的 `this.setState`，但是它不会把新的 state 和旧的 state 进行合并。

举个例子：

```jsx
import React, { useState } from 'react';

function Example() {
  // 声明一个叫 "count" 的 state 变量
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

- 第一行: 引入 React 中的 `useState` Hook。它让我们在函数组件中存储内部 state。
- 第四行: 在 Example 组件内部，我们通过调用 `useState` Hook 声明了一个新的 state 变量。它返回一对值给到我们命名的变量上。我们把变量命名为 `count`，因为它存储的是点击次数。我们通过传 `0` 作为 `useState` 唯一的参数来将其初始化为 `0`。第二个返回的值本身就是一个函数。它让我们可以更新 `count` 的值，所以我们叫它 `setCount`。
- 第九行: 当用户点击按钮后，我们传递一个新的值给 `setCount`。React 会重新渲染 Example 组件，并把最新的 `count` 传给它。

### 使用 Effect Hook

1. 用法

在 React 组件中执行数据获取、订阅或者手动修改 DOM 等这些操作，我们统一称为“副作用”，或者简称为“作用”。

`useEffect` 就是一个 Effect Hook，给函数组件增加了操作副作用的能力。它跟 class 组件中的 `componentDidMount`、`componentDidUpdate` 和 `componentWillUnmount` 具有相同的用途，只不过被合并成了一个 API。

例如，下面这个组件在 React 更新 DOM 后会设置一个页面标题：

```jsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // 相当于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    // 使用浏览器的 API 更新页面标题
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

当我们调用 `useEffect` 时，React 会保存传递的**副作用**函数，并且在执行 DOM 更新之后调用它。由于副作用函数是在组件内声明的，所以它们可以访问到组件的 props 和 state。默认情况下，React 会在每次渲染后调用副作用函数 —— 包括第一次渲染的时候。副作用函数还可以通过返回一个函数来指定如何**清除**副作用。

注意：**传递给 useEffect 的函数在每次渲染中都是不同的。**

2. 使用 Effect Hook 的注意事项

- 使用多个 Effect 实现关注点分离

  使用 Hook 其中一个目的就是要解决 class 中生命周期函数经常包含不相关的逻辑，但又把相关逻辑分离到了几个不同方法中的问题。

- 每次更新，都会执行 `useEffect`，以确保状态一致性。

- 通过跳过 Effect 进行性能优化

  如果某些特定值在两次重渲染之间没有发生变化，可以通知 React 跳过对 effect 的调用，只要传递数组作为 useEffect 的第二个可选参数即可。

  如果想执行只运行一次的 effect（仅在组件挂载和卸载时执行），可以传递一个空数组（[]）作为第二个参数。

### 自定义 Hook

- 通过自定义 Hook，可以将组件逻辑提取到可重用的函数中。

- 自定义 Hook 是一个函数，其名称以 “use” 开头，函数内部可以调用其他的 Hook。

- 使用相同的 Hook 不会共享 state
