# Javascript

## 变量与类型

### js 变量在内存中的存储形式

在 js 中，变量分为**基本类型**和**引用类型**。基本类型是保存在栈内存中的简单数据段，它们的值都有**固定的大小**，保存在**栈空间**，通过**按值访问**。引用类型是保存在堆内存中的对象，**值大小不固定**，栈内存中存放的该对象的访问地址指向堆内存中的对象，js 中不允许直接访问堆内存中的为止。因此操作对象时，实际操作对象的引用，

### js 的数据类型

js 有 7 种数据类型：

- `number` 类型：整数或浮点数。依据 IEEE 754 标准，使用的是 64 位双精度浮点数存储。
- `string` 字符串：由一组 UTF16 编码组成，范围在 0~65536(U+0000 ~U+FFFF)之间。
- `boolean` 布尔值：二元判断，只有`true`和`false`
- `null`: 无、未知
- `undefined`: 表示未定义。不是保留字，内层作用域可以被覆写。
- `symbol`: 用于唯一的标识符。
- `object` 对象：一般是键值对的形式。

::: tip 提示
`function` 是一种数据类型吗？
根据 spec 规范，它不是。虽然 `typeof function() {}; // function`，但是`typeof`是一个运算符，其返回值不能作为 js 类型系统的依据。`function`比较特殊，它同样具有`object`的特性。
:::

### 基本类型的拆箱与装箱操作

#### **装箱**

装箱，是指将基本类型转换为对应的引用类型的操作。分为**显式装箱**和**隐式装箱**。

1. 隐式装箱

```js
var s1 = 'alin';
var s2 = s1.substring(2);
```

上述代码的执行步骤：

- 创建 `String`类型的一个实例
- 在实例中调用该方法
- 销毁该实例

2. 显式装箱

通过**基本包装类型对象**对基本类型进行显示装箱。

```js
var str = new String('alin');
```

显式装箱可以对 `new` 出来的对象进行属性和方法的添加。

因为通过`new`操作符创建的引用类型的实例，在执行流离开当前作用域之间会一直保留在内存中。

#### **拆箱**

拆箱，是指把引用类型转换为基本类型。通过引用类型的 `valueOf()` 和 `toString`方法实现。

在 js 标准中，规定了 `ToPrimitive`方法，它是对象类型到基本类型转换的实现者。

对象到 String 和 Number 的转换遵循“先拆箱后转换”的规则。

### null 与 undefined 的区别

### 隐式转换

### 精度缺失

### Javascript 的内存管理与内存泄漏

#### 内存

内存从物理意义上是指由一系列晶体管构成的可以存储数据的回路，从逻辑的角度我们可以将内存看作是一个巨大的可读写的比特数组。

它存储着我们编写的代码以及我们在代码中定义的各类变量。对于很多静态类型编程语言来说，在代码进入编译阶段时编译器会根据变量声明时指定的类型提前申请分配给该变量的内存（比如，整型变量对应的是 4 个字节，浮点数对应 8 个字节）。

内存区域分为**栈空间**和**堆空间**。

- 栈空间：在编译阶段就能确定内存大小的变量，FILO
- 堆空间：变量占用内存大小是在运行时决定的，动态分配的。

#### 内存的生命周期

分配内存 -> 使用内存 -> 释放内存

#### 内存回收

1. 引用计数
2. 标记清除算法

标记清除判断某个对象是否可以被回收的标志是该对象不能再被访问到。其执行过程总共分为三步：

- a. 确定根对象：在 javascript 中根对象主要是指全局对象，比如浏览器环境中的 window，node.js 中的 global。
- b. 从根对象开始遍历子属性，并将这些属性变量标记为活跃类型，通过根对象- 不能访问到的就标记为可回收类型。
- c. 根据第二步标记出来的结果进行内存回收

#### 内存泄漏

内存泄漏是指未能被垃圾回收机制回收，导致这块内存区域被白白浪费的。

常见的内存泄漏：

1. 全局变量

```js
function foo() {
  bar = 'global variable';
}
```

2. 闭包

内部函数可以访问到其外部作用域中的变量。

3. `DOM`引用

## 作用域与闭包

### 作用域与作用域链

#### 1. 作用域

作用域规定了如何查找变量，也就是确定当前执行代码对变量的访问权限。

::: tip 注意
在 ES6 规范中，作用域概念变为词法环境概念。
:::

词法环境：
在 [ES6 规范](https://tc39.es/ecma262/#sec-lexical-environments)中，词法环境(`LexicalEnvironment`)是一个用于定义特定变量和函数标识符在 ECMAScript 代码的词法嵌套结构上关联关系的规范类型。一个词法环境由一个环境记录项(`Environment Record`)和可能为空的外部词法环境引用(`outer Lexical Environment`)构成。

```
[[LexicalEnvironment]] = {
  [[Environment Record]],
  [[Outer Lexical Environment]]
}
```

词法环境分了三类：

- 全局环境（global environment）： 全局环境是一个没有外部环境的词法环境。全局环境外部环境引用为`null`。全局环境的 EnvironmentRecord（环境记录）可以绑定变量，并关联对应的全局对象。
- 模块环境（module environment）： 模块环境也是一个词法环境，它包含模块顶级声明的绑定。它还包含模块显式导入的绑定。模块环境的外部环境是全局环境。
- 函数环境（function environment）： 函数环境也是一个词法环境，对应于 ECMAScript 函数对象的调用。函数环境可以建立新的此绑定。函数环境还支持 super 调用所需的状态。

环境记录项(`Environment Record`)分为 5 类：

- 声明式环境记录项(`Declarative Environment Records`)： 用于绑定作用域内定义的一系列标识符。例如变量，常量，`let`，`class`，`module`，`import`以及函数声明等。
- 对象式环境记录项(`Object Environment Records`)： 每一个对象式环境记录项都有一个关联的对象，这个对象被称作绑定对象 。对象式环境记录项直接将一系列标识符与其绑定对象的属性名称建立一一对应关系。
- 函数环境记录项(`Function Environment Records`)
- 全局环境记录项(`Global Environment Records`)
- 模块环境记录项(`Module Environment Records`)

#### 2. 作用域链

- 全局环境的外部词法环境引用为 null。
- 一个词法环境可以作为多个词法环境的外部环境。例如全局声明了多个函数，则这些函数词法环境的外部词法环境引用都指向全局环境。

**当代码试图访问一个变量时 —— 它首先会在内部词法环境中进行搜索，然后是外部环境，然后是更外部的环境，直到（词法环境）链的末尾。**

外部词法环境的引用将一个词法环境和其外部词法环境链接起来，外部词法环境又拥有对其自身的外部词法环境的引用。这样就形成一个链式结构，这里我们称其为环境链（即 ES6 之前的作用域链），全局环境是这条链的顶端。

### 执行上下文与执行上下文栈

#### 1. 执行上下文

执行上下文也叫执行环境(`Execution Context`), 执行上下文就是当前 JavaScript 代码被解析和执行时所在环境的抽象概念， JavaScript 中运行任何的代码都是在执行上下文中运行。

对于每个执行上下文，都含有以下几个部分：

- 词法环境组件: 指定一个词法环境对象，用于解析该执行环境内的代码创建的标识符引用。
- 变量环境组件: 指定一个词法环境对象，其环境数据用于保存由该执行环境内的代码通过 `VariableStatement` 和 `FunctionDeclaration` 创建的绑定。
- this 绑定： 指定该执行环境内的 ECMA 脚本代码中 `this` 关键字所关联的值。

#### 2. 执行上下文的类型

- 全局执行上下文：这是默认的，最基础的上下文。它做了两件事，

  - 创建一个全局对象，在浏览器中这个全局对象就是`window`对象；
  - 将`this`指针指向这个全局对象。

- 函数执行上下文：每次调用函数时，都会为该函数创建一个新的执行上下文。
- `eval`函数执行上下文：运行在`eval`函数中的代码也获得自己的执行上下文。

#### 3. 执行上下文的生命周期

执行上下文的生命周期包含三个阶段：创建阶段->执行阶段->回收阶段

1. 创建阶段：

当函数被调用，但未执行任何其内部代码之前，会做一下三件事：

- 确定 `this`  的值
- `LexicalEnvironment` （词法环境）组件被创建。
- `VariableEnvironment` （变量环境）组件被创建。

```
ExecutionContext = {
  ThisBinding = <this value>,     // 确定this
  LexicalEnvironment = { ... },   // 词法环境
  VariableEnvironment = { ... },  // 变量环境
}
```

2. 执行阶段

执行变量赋值、代码执行。

3. 回收阶段

执行上下文出栈等待虚拟机回收。

#### 4. 执行上下文栈

执行上下文栈其实是一个先进后出的栈结构，被用来存储代码运行时创建的所有执行上下文。当 JavaScript 引擎第一次遇到你的脚本时，它会创建一个全局的执行上下文并且压入当前执行栈。每当引擎遇到一个函数调用，它会为该函数创建一个新的执行上下文并压入栈的顶部。引擎会执行那些执行上下文位于栈顶的函数。当该函数执行结束时，执行上下文从栈中弹出，控制流程到达当前栈中的下一个上下文。

### this 的原理

1. `this` ：当前执行代码的环境对象。

在绝大多数情况下，函数的调用方式决定了 `this` 的值。`this` 不能在执行期间被赋值，并且在每次函数被调用时`this`的值也可能会不同。ES5 引入了`bind`方法来设置函数的`this`值，而不用考虑函数如何被调用的，ES2015 引入了支持`this`词法解析的箭头函数（它在闭合的执行环境内设置`this`的值）。

2. 场景

a. 全局环境：无论是否是在严格模式下，在全局执行环境中，`this`都指向全局对象。

b. 函数（运行时）环境：在函数内部，`this`的取值取决于函数被调用的方式。

- 简单调用：在严格模式下为`undefined`，非严格模式下指向全局对象。

```js
function foo() {
  console.log(this);
}
foo(); // window or undefined
```

- `call/apply`：指向绑定到调用中的特定对象。
- `bind`方法：`bind`方法会创建一个与原函数具有相同函数体和作用域的函数。`this`指向绑定的对象。
- 箭头函数：没有`this`，如果访问`this`，则从外部环境获取。
- 作为对象的方法：`this`指向调用该函数的对象。
- 作为构造函数：`this`指向被构造的实例对象。
- 作为`DOM`事件处理函数：`this`指向触发事件的`DOM`元素。

### 闭包与实际的运用

> 函数保存其外部的变量并且能够访问它们称之为闭包。在某些语言中，是没有闭包的，或是以一种特别方式来实现。但正如上面所说的，在 JavaScript 中函数都是天生的闭包（只有一个例外，请参考 "new Function" 语法）。

> 也就是说，他们会通过隐藏的 `[[Environment]]` 属性记住创建它们的位置，所以它们都可以访问外部变量。

#### 1. 闭包

在我看来，函数与其外部词法环境的引用就构成**闭包**。闭包的核心是**词法环境**，词法环境由环境记录项和可能为空的外部词法环境引用构成。在执行环境创建的时候，就生成了类似环境链的数据结构，词法环境是彼此独立的，当前执行环境访问变量时，首先会先从当前词法环境里查找，没找到继续沿着外部词法作用域查找，直到词法环境链的末尾。

#### 2. 实际运用

- 模拟私有方法
- 存储变量
- 循环中的闭包

## 执行机制

![event-loop-2019-11-28.png](https://allin-bucket.oss-cn-beijing.aliyuncs.com/blog/event-loop-2019-11-28.png?x-oss-process=style/alin)

### 单线程

Javascript 语言的一大特点就是单线程，也就是说，同一时间只能做一件事。

为什么是单线程的呢？ js 作为浏览器脚本语言，最先是用来与浏览器的`DOM`进行交互的，如果是多线程，会带来很复杂的同步问题。

所谓单线程，是指在 JS 引擎中负责解释和执行 JavaScript 代码的线程只有一个。这个线程可以称为主线程。

但是实际上还存在其他的线程。例如：处理 Ajax 请求的线程、处理 DOM 事件的线程、定时器线程、读写文件的线程(例如在 Node.js 中)等等。这些线程都可以叫做工作线程。

### 同步与异步

1. 同步

同步的概念很好理解，就是代码顺序地按照自上而下执行。当执行某一函数时，就能够立即得到与其结果。

那如果 js 的代码都是同步地自上而下执行，如果上一行代码解析时间特别长，下面的代码就会被阻塞。对于浏览器用户而言，阻塞意味着“卡死”，所以 js 中存在着异步执行。

2. 异步

当执行某一函数时，调用方不能马上得到预期结果，而是需要在未来一段时间才能得到结果，这就叫异步。

异步的场景十分常见，比如在浏览器端需要发送 Ajax 请求服务器某个资源时，由于网络请求是有时间的，所以不能立即拿到服务器的资源。

在 js 中，异步是用事件循环机制(Event Loop)实现的。

### 浏览器中的 Event Loop

所谓事件循环，就是 js 主线程在空闲时会循环地读取任务队列里的异步任务。

异步执行的运行机制如下：

1. 所有同步任务都在主线程上执行，形成一个执行栈（`execution context stack`）。
2. 主线程之外，还存在一个"任务队列"（`task queue`）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。
3. 一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。
4. 主线程不断重复上面的第三步。

js 主线程会将一下四种放入异步任务队列：

- `setTimeout`和`setInterval`
- `DOM`事件
- `Promise`
- `Ajax` 异步请求

### 微任务(Microtask)与宏任务(Macrotask)

异步任务又分为微任务和宏任务。宏任务队列可以有多个，微任务队列只有一个。

- 宏任务：`script`(全局任务)，定时器，`I/O`，`UI render`
- 微任务：`new Promise().then(回调)`，`process.nextTick`，`MutationObserver`

**当某个宏任务队列的中的任务全部执行完以后,会查看是否有微任务队列。如果有，先执行微任务队列中的所有任务，如果没有，就查看是否有其他宏任务队列。**

注意：

- `setTimeout`的执行优先级高于 `setImmediate` 的
- `process.nextTick`的执行优先级高于`Promise`的

#### 例子

```js
setTimeout(function() {
  console.log('1');
}, 0);
console.log('2');
async function async1() {
  console.log('3');
  await async2();
  console.log('4');
}
async function async2() {
  return new Promise(function(resolve) {
    console.log('5');
    resolve();
  }).then(function() {
    console.log('6');
  });
}
async1();

new Promise(function(resolve) {
  console.log('7');
  resolve();
}).then(function() {
  console.log('8');
});
console.log('9');

// 2, 3, 5, 7, 9, 6, 8, 4, 1
```

```js
setTimeout(() => {
  console.log('a');
  new Promise(res => {
    res();
  }).then(() => {
    console.log('c');
  });
  process.nextTick(() => {
    console.log('h');
  });
}, 0);
console.log('b');

process.nextTick(() => {
  console.log('d');
  process.nextTick(() => {
    console.log('e');
    process.nextTick(() => {
      console.log('f');
    });
  });
});

setImmediate(() => {
  console.log('g');
});

// b, d, e, ef, a, h, c, g
```

### Node.js 的 Event Loop

![nodejs-system-2019-11-28.webp](https://allin-bucket.oss-cn-beijing.aliyuncs.com/blog/nodejs-system-2019-11-28.webp?x-oss-process=style/alin)

#### libuv

Node.js 采用 V8 作为 js 的解析引擎，而 I/O 处理方面使用了自己设计的 `libuv`，`libuv` 是一个基于事件驱动的跨平台抽象层，封装了不同操作系统一些底层特性，对外提供统一的 API，事件循环机制也是它里面的实现。

Node.js 的运行机制如下:

1. V8 引擎解析 JavaScript 脚本。
2. 解析后的代码，调用 Node API。
3. `libuv` 库负责 Node API 的执行。它将不同的任务分配给不同的线程，形成一个 `Event Loop`（事件循环），以异步的方式将任务的执行结果返回给 V8 引擎。
4. V8 引擎再将结果返回给用户。

#### 事件循环机制解析

1. Node.js 的事件循环分为 6 个阶段：

![nodejs-event-loop-2019-11-28.png](https://allin-bucket.oss-cn-beijing.aliyuncs.com/blog/nodejs-event-loop-2019-11-28.png?x-oss-process=style/alin)

每个阶段都有一个 FIFO 队列来执行回调。虽然每个阶段都是特殊的，但通常情况下，当事件循环进入给定的阶段时，它将执行特定于该阶段的任何操作，然后执行该阶段队列中的回调，直到队列用尽或最大回调数已执行。当该队列已用尽或达到回调限制，事件循环将移动到下一阶段，等等。

2. 阶段描述：

- timers 定时器： 本阶段执行已经安排的 `setTimeout()` 和 `setInterval()` 的回调函数。
- pending callbacks 待定回调： 执行延迟到下一个循环迭代的 I/O 回调。
- idle, prepare： 仅系统内部使用。
- poll 轮询： 检索新的 I/O 事件;执行与 I/O 相关的回调（几乎所有情况下，除了关闭的回调函数，它们由计时器和 `setImmediate()` 排定的之外），其余情况 node 将在此处阻塞。
- check 检测： `setImmediate()` 回调函数在这里执行。
- close callbacks 关闭的回调函数： 一些准备关闭的回调函数，如：`socket.on('close', ...)`。

3. `setTimeout` 与 `setImmediate`

- `setTimeout` 在最小阈值（ms 单位）过后运行脚本。
- `setImmediate` 设计为一旦在当前 轮询 阶段完成， 就执行脚本。

4.  `process.nextTick` 与 `setImmediate`

- `process.nextTick` 不属于事件循环的任何一个阶段，它属于该阶段与下阶段之间的过渡, 即本阶段执行结束, 进入下一个阶段前, 所要执行的回调。

- `setImmediate`的回调处于 check 阶段, 当 poll 阶段的队列为空, 且 check 阶段的事件队列存在的时候，切换到 check 阶段执行。

但是需要注意的是：
由于`nextTick`具有插队的机制，`nextTick`的递归会让事件循环机制无法进入下一个阶段. 导致 I/O 处理完成或者定时任务超时后仍然无法执行, 导致了其它事件处理程序处于饥饿状态。

5. 微任务和宏任务在 Node 的执行顺序:

Node 10 以前：

1. 执行完一个阶段的所有任务
2. 执行完 nextTick 队列里面的内容
3. 然后执行完微任务队列的内容

Node 11 以后：
和浏览器的行为统一了，都是每执行一个宏任务就执行完微任务队列。

### 浏览器与 Node.js 的 Event Loop 的区别

#### 浏览器的 Event Loop

![browser-event-loop-2019-11-28.png](https://allin-bucket.oss-cn-beijing.aliyuncs.com/blog/browser-event-loop-2019-11-28.png?x-oss-process=style/alin)

#### Node.js 的 Event Loop

![event-loop-in-node-2019-11-28.png](https://allin-bucket.oss-cn-beijing.aliyuncs.com/blog/event-loop-in-node-2019-11-28.png?x-oss-process=style/alin)

#### 执行时机不同

浏览器和 Node 环境下，`microtask` 任务队列的执行时机不同

- Node.js 中，`microtask` 在事件循环的各个阶段之间执行
- 浏览器端，`microtask` 在事件循环的 `macrotask` 执行完之后执行

::: tip 注意
在 Node.js 11.x 以上， `Event Loop`运行原理发生了变化, 一旦执行一个阶段里的一个宏任务(`setTimeout`,`setInterval`和`setImmediate`)就立刻执行微任务队列，这点就跟浏览器端一致。
:::

#### 例子

```js
setTimeout(() => {
  console.log('timer1');

  Promise.resolve().then(function() {
    console.log('promise1');
  });
}, 0);

setTimeout(() => {
  console.log('timer2');

  Promise.resolve().then(function() {
    console.log('promise2');
  });
}, 0);

// Browser: time1, promise1, time2, promise2
// Node.js8.x: time1, time2, promise1, promise2
```

## 语法与 API

### js 面向对象编程

### new 对象的过程与模拟实现

```js
function Foo(age) {
  this.age = age;
}

var o = new Foo(111);
console.log(o);
```

1. 详细过程:

- 创建 ECMAScript 原生对象 `obj`;
- 给`obj`设置原生对象的内部属性;（和原型属性不用，内部属性表示为`[[PropertyName]]`，两个方括号包裹属性名，并且属性名大写，比如常见 `[[Prototype]]`、`[[Constructor]]`）;
- 设置 `obj` 的内部属性 [`[Class]]`为 `Object`；
- 设置 `obj` 的内部属性 `[[Extensible]]` 为 `true`；
- 将`proto`的值设置为 `F` 的 `prototype` 属性值；
- 如果 proto 是对象类型，则设置 obj 的内部属性 `[[Prototype]]`值为 `proto`；（进行原型链关联，实现继承的关键）
- 如果`proto`不是对象类型，则设置`obj`的内部属性`[[Prototype]]`值为内建构造函数 `Object` 的 `prototype` 值；（函数 `prototype` 属性可以被改写，如果改成非对象类型，obj 的 `[[Prototype]]`就指向 `Object` 的原型对象）
- 调用函数`F`，将其返回值赋给 result；其中， `F`  执行时的实参为传递给`[[Construct]]`（即 `F`  本身） 的参数， `F`  内部`this`指向`obj`；
- 如果 result 是`Object`类型，返回 result；
- 如果 F 返回的不是对象类型（第 h 步不成立），则返回创建的对象`obj`。

2. 简洁描述：

若执行`new Foo()`，过程如下：

- 创建新对象`o`；
- 给新对象的内部属性赋值，关键是给`[[Protoype]]`属性赋值，构造原型链（如果构造函数的原型是`Object`类型，则指向构造函数的原型；不然指向`Object`对象的原型）;
- 执行函数`Foo`，执行过程中内部`this`指向新创建的对象`o`;
- 如果`Foo`内部显示返回对象类型数据，则，返回该数据，执行结束；不然返回新创建的对象`o`；

3. `new`的意义：

通过`new`创建的 对象 和 构造函数 之间建立了一条原型链，原型链的建立，让原本孤立的对象有了依赖关系和继承能力，让 JavaScript 对象能以更合适的方式来映射真实世界里的对象，这是面向对象的本质。

4. 模拟实现过程：

```js
// 参考实现
// From: https://github.com/mqyqingfeng/Blog/issues/13
function objectFactory() {
  var obj = new Object(),
    Constructor = [].shift.call(arguments);

  obj.__proto__ = Constructor.prototype;

  var ret = Constructor.apply(obj, arguments);

  return typeof ret === 'object' ? ret : obj;
}
```

注意： 箭头函数不能使用`new`关键字。原因是箭头函数中没有`[[Construct]]`方法，不能使用`new`调用，会报错。

### js 类与实现继承的方式

### ES6 中的 Class 以及继承的底层实现原理

在面向对象的编程中，class 是用于创建对象的可扩展的程序代码模版，它为对象提供了状态（成员变量）的初始值和行为（成员函数和方法）的实现。

#### 1. ES6 类

```js
class Person {
  static head = 1;
  constructor(name) {
    this.name = name;
  }
  sayName() {
    console.log(this.name);
  }
}
```

类与构造函数的差异：

1. 通过`class`创建的函数是由特殊内部属性标记的`[[FunctionKind]]：“classConstructor”`
1. 调用类构造器需要`new`关键字，否则会报错。
1. 类方法不可枚举。
1. 类默认使用`"use strict"`。在类构造函数中的所有方法自动使用严格模式。

#### 2. ES6 类的实现:

```js
class Parent {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  speakSomething() {
    console.log('I can speek chinese');
  }
}
```

借助 babel 转换后：

```js
'use strict';

// 创建类
var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

// 判断当前实例是否在类构造器的原型链上，防止构造函数作为普通函数直接执行
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

var Parent = (function() {
  function Parent(name, age) {
    _classCallCheck(this, Parent);

    this.name = name;
    this.age = age;
  }

  _createClass(Parent, [
    {
      key: 'speakSomething',
      value: function speakSomething() {
        console.log('I can speek chinese');
      },
    },
  ]);

  return Parent;
})();
```

ES6 的类底层还是使用构造函数去创建的。核心是通过`_createClass`方法，它通过`Object.defineProperty`方法给`Parent`添加属性。实例属性会添加到`Constructor.prototype`，静态属性会添加到构造函数`Constructor`上。

#### 3. 类的继承

1. 在 ES6 中是使用`extend`关键字来实现类的继承。

```js
class Parent {
  static height = 12;
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  speakSomething() {
    console.log('I can speek chinese');
  }
}
Parent.prototype.color = 'yellow';

//定义子类，继承父类
class Child extends Parent {
  static width = 18;
  constructor(name, age) {
    super(name, age);
  }
  coding() {
    console.log('I can code JS');
  }
}

var c = new Child('job', 30);
c.coding();
```

上面例子上，`extends`做了以下这些事情：

1. 将`Child.prototype.__proto__`指向了`Parent.prototype`，实现公有属性和方法的继承。
2. 将`Child.__proto__`指向了`Parent`，即`B.[[Prototype]] = A`，实现了静态属性和方法的继承。

::: tip 注意
继承类的构造函数必须调用 `super(...)`，并且要在`this`之前调用。
这是因为在继承类中，相应的构造函数会被标记为特殊的内部属性`[[ConstructorKind]]:"derived"`。当一个普通构造函数执行时，它会创建一个空对象作为 `this` 并继续执行。
但是当继承的构造函数执行时，它并不会做这件事。它期望父类的构造函数来完成这项工作。因此，如果我们构建了我们自己的构造函数，我们必须调用`super`，因为如果不这样的话 `this` 指向的对象不会被创建。并且我们会收到一个报错。
:::

2. 方法的重写

在子类中，我们可以使用`super.method()`调用父类的方法，并且根据需要重写子类的方法。

`super`解析父类方法是用过方法在内部的`[[HomeObject]]`属性来实现的。而不是通过`this.__proto__`访问原型对象。当一个函数被定义为类或者对象方法时，它的`[[HomeObject]]`属性就被赋值为那个对象。

#### 4. 继承的底层实现原理

**寄生组合式继承**

上面继承的例子通过`babel`转换后如下：

```js
'use strict';

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === 'object' || typeof call === 'function') ? call : self;
}
// 继承
function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError(
      'Super expression must either be null or a function, not ' + typeof superClass
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

var Parent = (function() {
  function Parent(name, age) {
    _classCallCheck(this, Parent);

    this.name = name;
    this.age = age;
  }

  _createClass(Parent, [
    {
      key: 'speakSomething',
      value: function speakSomething() {
        console.log('I can speek chinese');
      },
    },
  ]);

  return Parent;
})();

Parent.height = 12;

Parent.prototype.color = 'yellow';

//定义子类，继承父类

var Child = (function(_Parent) {
  _inherits(Child, _Parent);

  function Child(name, age) {
    _classCallCheck(this, Child);

    return _possibleConstructorReturn(
      this,
      (Child.__proto__ || Object.getPrototypeOf(Child)).call(this, name, age)
    );
  }

  _createClass(Child, [
    {
      key: 'coding',
      value: function coding() {
        console.log('I can code JS');
      },
    },
  ]);

  return Child;
})(Parent);

Child.width = 18;

var c = new Child('job', 30);
c.coding();
```

上面例子上，`_inherits`就是用来实现继承，其核心思想类似于下面：

```js
subClass.prototype.__proto__ = superClass.prototype;
subClass.__proto__ = superClass;
```

方法内部实现的原理同寄生组合式继承是大同小异的。

```js
function F() {}
F.prototype = superClass.prototype;
subClass.prototype = new F();
subClass.prototype.constructor = subClass;
```

### Generator 语法

### Promise 原理与模拟实现

### Javascript 中的高阶函数


<Vssue title="Vssue" />