# 执行机制

![event-loop-2019-11-28.png](https://allin-bucket.oss-cn-beijing.aliyuncs.com/blog/event-loop-2019-11-28.png?x-oss-process=style/alin)

## 单线程

Javascript 语言的一大特点就是单线程，也就是说，同一时间只能做一件事。

为什么是单线程的呢？ js 作为浏览器脚本语言，最先是用来与浏览器的`DOM`进行交互的，如果是多线程，会带来很复杂的同步问题。

所谓单线程，是指在 JS 引擎中负责解释和执行 JavaScript 代码的线程只有一个。这个线程可以称为主线程。

但是实际上还存在其他的线程。例如：处理 Ajax 请求的线程、处理 DOM 事件的线程、定时器线程、读写文件的线程(例如在 Node.js 中)等等。这些线程都可以叫做工作线程。

## 同步与异步

1. 同步

同步的概念很好理解，就是代码顺序地按照自上而下执行。当执行某一函数时，就能够立即得到与其结果。

那如果 js 的代码都是同步地自上而下执行，如果上一行代码解析时间特别长，下面的代码就会被阻塞。对于浏览器用户而言，阻塞意味着“卡死”，所以 js 中存在着异步执行。

2. 异步

当执行某一函数时，调用方不能马上得到预期结果，而是需要在未来一段时间才能得到结果，这就叫异步。

异步的场景十分常见，比如在浏览器端需要发送 Ajax 请求服务器某个资源时，由于网络请求是有时间的，所以不能立即拿到服务器的资源。

在 js 中，异步是用事件循环机制(Event Loop)实现的。

## 浏览器中的 Event Loop

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

## 微任务(Microtask)与宏任务(Macrotask)

异步任务又分为微任务和宏任务。宏任务队列可以有多个，微任务队列只有一个。

- 宏任务：`script`(全局任务)，定时器，`I/O`，`UI render`
- 微任务：`new Promise().then(回调)`，`process.nextTick`，`MutationObserver`

**当某个宏任务队列的中的任务全部执行完以后,会查看是否有微任务队列。如果有，先执行微任务队列中的所有任务，如果没有，就查看是否有其他宏任务队列。**

注意：

- `setTimeout`的执行优先级高于 `setImmediate` 的
- `process.nextTick`的执行优先级高于`Promise`的

### 例子

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

## Node.js 的 Event Loop

![nodejs-system-2019-11-28.webp](https://allin-bucket.oss-cn-beijing.aliyuncs.com/blog/nodejs-system-2019-11-28.webp?x-oss-process=style/alin)

### libuv

Node.js 采用 V8 作为 js 的解析引擎，而 I/O 处理方面使用了自己设计的 `libuv`，`libuv` 是一个基于事件驱动的跨平台抽象层，封装了不同操作系统一些底层特性，对外提供统一的 API，事件循环机制也是它里面的实现。

Node.js 的运行机制如下:

1. V8 引擎解析 JavaScript 脚本。
2. 解析后的代码，调用 Node API。
3. `libuv` 库负责 Node API 的执行。它将不同的任务分配给不同的线程，形成一个 `Event Loop`（事件循环），以异步的方式将任务的执行结果返回给 V8 引擎。
4. V8 引擎再将结果返回给用户。

### 事件循环机制解析

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

## 浏览器与 Node.js 的 Event Loop 的区别

### 浏览器的 Event Loop

![browser-event-loop-2019-11-28.png](https://allin-bucket.oss-cn-beijing.aliyuncs.com/blog/browser-event-loop-2019-11-28.png?x-oss-process=style/alin)

### Node.js 的 Event Loop

![event-loop-in-node-2019-11-28.png](https://allin-bucket.oss-cn-beijing.aliyuncs.com/blog/event-loop-in-node-2019-11-28.png?x-oss-process=style/alin)

### 执行时机不同

浏览器和 Node 环境下，`microtask` 任务队列的执行时机不同

- Node.js 中，`microtask` 在事件循环的各个阶段之间执行
- 浏览器端，`microtask` 在事件循环的 `macrotask` 执行完之后执行

::: tip 注意
在 Node.js 11.x 以上， `Event Loop`运行原理发生了变化, 一旦执行一个阶段里的一个宏任务(`setTimeout`,`setInterval`和`setImmediate`)就立刻执行微任务队列，这点就跟浏览器端一致。
:::

### 例子

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