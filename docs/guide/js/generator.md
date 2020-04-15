# 迭代器与 Generator

## 一、可迭代协议与迭代器协议

1. 可迭代协议

可迭代协议允许 JavaScript 对象去定义或定制它们的迭代行为。为一个对象添加 `[Symbol.iterator]` 方法，即为该对象添加可迭代行为。

2. 迭代器协议

> 迭代器协议定义了一种标准的方式来产生一个有限或无限序列的值，并且当所有的值都已经被迭代后，就会有一个默认的返回值。

当一个对象实现 `next()` 方法，并且该方法必须返回一个包含 `done` 和 `value` 属性的对象，这才符合迭代器协议。

例如：

```js
let obj = {
  values: [1, 2, 3],
  count: 0,
  next() {
    if (this.count < this.values.length) {
      return { done: false, value: this.values[this.count++] };
    }
    return { done: true, value: undefined };
  },
};
obj.next(); // {done: false, value: 1}
obj.next(); // {done: false, value: 2}
obj.next(); // {done: false, value: 3}
obj.next(); // {done: true, value: undefined}
```

## 二、迭代器

在 JavaScript 中，迭代器是一个对象，它定义一个序列，并在终止时可能返回一个返回值。

更具体地说，迭代器是通过使用 `next()` 方法实现迭代协议（Iterator protocol）的任何一个对象，该方法返回具有两个属性的对象： `value`和 `done` ，如果已经迭代到序列中的最后一个值，则它为 `true` 。如果 `value` 和 `done` 一起存在，则它是迭代器的返回值。

### 可迭代对象

> 若一个对象拥有迭代行为，比如在 `for...of` 中会循环那些值，那么这个对象便是一个可迭代对象。

### 内置可迭代对象

`String`、`Array`、`TypedArray`、`Map` 和 `Set` 都是内置可迭代对象，因为它们的原型对象都拥有一个 `Symbol.iterator` 方法。

### Symbol.iterator

`[Symbol.iterator]` 方法可以为对象添加自定义迭代的返回值，其需要返回一个迭代器对象的无参函数 `next()`，并且被返回对象拥有 `done` 和 `value` 两个属性。

```js
let range = {
  from: 1,
  to: 5,

  [Symbol.iterator]() {
    this.current = this.from;
    return this;
  },

  next() {
    if (this.current <= this.to) {
      return { done: false, value: this.current++ };
    } else {
      return { done: true };
    }
  },
};

for (let num of range) {
  alert(num); // 1, 然后 2, 3, 4, 5
}
```

### 迭代器对象的 return 与 throw

## 三、Generator 函数

### Generator 函数是什么？

Generator 函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同。

可以理解成，Generator 函数是一个状态机，封装了多个内部状态。

执行 Generator 函数会返回一个迭代器对象，也就是说，Generator 函数除了状态机，还是一个迭代器对象生成函数。返回的迭代器对象，可以一次遍历 Generator 函数内部的每一个状态。

### 特点

1. `function`关键字前带有一个星号`*`
2. 函数内部可以使用`yield`关键字，定义不同的内部状态。

示例：

```js
function* gen() {
  yield 1;
  yield 2;
  return 3;
}
let g = gen();
g.next(); // {value: 1, done: false}
g.next(); // {value: 2, done: false}
g.next(); // {value: 3, done: false}
g.next(); // {value: undefined, done: false}
```

上面定义了一个 Generator 函数 `gen`，它内部定义了三个状态，分别是 1，2，3。调用 `gen` 后，该函数并不执行，返回的是一个指向内部状态的指针对象，也就是迭代器对象（`Iterator Object`）。

下一步，必须调用迭代器的`next`方法，将是得指针向下一个状态，直到遇到下一个 `yield` 或者 `return` 语句为止。换言之，Generator 函数是分段执行的，`yield` 表达式是暂停执行的标记，而 `next` 方法可以恢复执行。

`next()` 的结果总是一个对象：

- `value`: yielded 值。
- `done`: 如果代码没有执行完，其值为 false，否则就是 true。

### 与 Iterator 接口的关系

由于 Generator 函数就是遍历器生成函数，因此可以把 Generator 赋值给对象的 `Symbol.iterator` 属性，从而使得该对象具有 `Iterator` 接口。

```js
var myIterable = {};
myIterable[Symbol.iterator] = function*() {
  yield 1;
  yield 2;
  yield 3;
};
[...myIterable]; // [1, 2, 3]
```

### next 方法的参数

`yield` 表达式本身没有返回值，或者说总是返回 `undefined`。`next` 方法可以带一个参数，该参数就会被当作上一个 `yield` 表达式的返回值。

```js
function* f() {
  for (var i = 0; true; i++) {
    var reset = yield i;
    if (reset) {
      i = -1;
    }
  }
}

var g = f();

g.next(); // { value: 0, done: false }
g.next(); // { value: 1, done: false }
g.next(true); // { value: 0, done: false }
```

这个功能有很重要的语法意义。Generator 函数从暂停状态到恢复运行，它的上下文状态（context）是不变的。

通过 `next` 方法的参数，就有办法在 Generator 函数开始运行之后，继续向函数体内部注入值。也就是说，可以在 Generator 函数运行的不同阶段，从外部向内部注入不同的值，从而调整函数行为。

### for...of

`for...of`循环可以自动遍历 Generator 函数运行时生成的 `Iterator` 对象，且此时不再需要调用`next`方法。

下面是一个利用 Generator 函数和 `for...of` 循环，实现斐波那契数列的例子。

```js
function* fibonacci() {
  let [prev, curr] = [0, 1];
  for (;;) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

for (let n of fibonacci()) {
  if (n > 1000) break;
  console.log(n);
}
```

利用 `for...of` 循环，可以写出遍历任意对象的方法。原生的 JavaScript 对象没有遍历接口，无法使用 `for...of` 循环，通过 Generator 函数为它加上这个接口，就可以用了。

```js
function* objectEntries() {
  let propKeys = Object.keys(this);

  for (let propKey of propKeys) {
    yield [propKey, this[propKey]];
  }
}

let jane = { first: 'Jane', last: 'Doe' };

jane[Symbol.iterator] = objectEntries;

for (let [key, value] of jane) {
  console.log(`${key}: ${value}`);
}
// first: Jane
// last: Doe
```

### `yield*`组合 Generator

ES6 提供了 `yield*` 表达式，作为解决办法，用来在一个 Generator 函数里面执行另一个 Generator 函数。

实际上，任何数据结构只要有 Iterator 接口，就可以被 `yield*` 遍历。

作用：

1. 自动迭代 Generator 函数返回的迭代器对象。

2. 可以很方便地取出嵌套数组的所有成员。

```js
function* iterTree(tree) {
  if (Array.isArray(tree)) {
    for (let i = 0; i < tree.length; i++) {
      yield* iterTree(tree[i]);
    }
  } else {
    yield tree;
  }
}

const tree = ['a', ['b', 'c'], ['d', 'e']];

[...iterTree(tree)]; // ["a", "b", "c", "d", "e"]
```

另外一个例子，使用 `yield*` 语句遍历完全二叉树。

```js
// 下面是二叉树的构造函数，
// 三个参数分别是左树、当前节点和右树
function Tree(left, label, right) {
  this.left = left;
  this.label = label;
  this.right = right;
}

// 下面是中序（inorder）遍历函数。
// 由于返回的是一个遍历器，所以要用generator函数。
// 函数体内采用递归算法，所以左树和右树要用yield*遍历
function* inorder(t) {
  if (t) {
    yield* inorder(t.left);
    yield t.label;
    yield* inorder(t.right);
  }
}

// 下面生成二叉树
function make(array) {
  // 判断是否为叶节点
  if (array.length == 1) return new Tree(null, array[0], null);
  return new Tree(make(array[0]), array[1], make(array[2]));
}
let tree = make([[['a'], 'b', ['c']], 'd', [['e'], 'f', ['g']]]);

// 遍历二叉树
var result = [];
for (let node of inorder(tree)) {
  result.push(node);
}

result;
// ['a', 'b', 'c', 'd', 'e', 'f', 'g']
```

### Generator 函数的 this

- Generator 函数总是返回迭代器对象，而不是 `this` 对象。
- Generator 函数也不能使用 `new` 命令。

使用变通方法，支持 Generator 实例既可以访问`this`，又可以使用 `new` 命令。

```js
function* gen() {
  this.a = 1;
  yield (this.b = 2);
  yield (this.c = 3);
}

function F() {
  return gen.call(gen.prototype);
}

var f = new F();

f.next(); // Object {value: 2, done: false}
f.next(); // Object {value: 3, done: false}
f.next(); // Object {value: undefined, done: true}

f.a; // 1
f.b; // 2
f.c; // 3
```

### Generator 与协程

协程（coroutine）是一种程序运行的方式，可以理解成“协作的线程”或“协作的函数”。协程既可以用单线程实现，也可以用多线程实现。前者是一种特殊的子例程，后者是一种特殊的线程。

1. 协程与子例程的差异

传统的“子例程”（subroutine）采用堆栈式“后进先出”的执行方式，只有当调用的子函数完全执行完毕，才会结束执行父函数。

协程与其不同，多个线程（单线程情况下，即多个函数）可以并行执行，但是只有一个线程（或函数）处于正在运行的状态，其他线程（或函数）都处于暂停态（suspended），线程（或函数）之间可以交换执行权。

也就是说，一个线程（或函数）执行到一半，可以暂停执行，将执行权交给另一个线程（或函数），等到稍后收回执行权的时候，再恢复执行。这种可以并行执行、交换执行权的线程（或函数），就称为**协程**。

从实现上看，在内存中，子例程只使用一个栈（stack），而协程是同时存在多个栈，但只有一个栈是在运行状态，也就是说，协程是以多占用内存为代价，实现多任务的并行。

2. 协程与普通线程的差异

不难看出，协程适合用于多任务运行的环境。在这个意义上，它与普通的线程很相似，都有自己的执行上下文、可以分享全局变量。它们的不同之处在于，同一时间可以有多个线程处于运行状态，但是运行的协程只能有一个，其他协程都处于暂停状态。此外，普通的线程是抢先式的，到底哪个线程优先得到资源，必须由运行环境决定，但是协程是合作式的，执行权由协程自己分配。

由于 JavaScript 是单线程语言，只能保持一个调用栈。引入协程以后，每个任务可以保持自己的调用栈。这样做的最大好处，就是抛出错误的时候，可以找到原始的调用栈。不至于像异步操作的回调函数那样，一旦出错，原始的调用栈早就结束。

Generator 函数是 ES6 对协程的实现，但属于不完全实现。Generator 函数被称为“半协程”（semi-coroutine），意思是只有 Generator 函数的调用者，才能将程序的执行权还给 Generator 函数。如果是完全执行的协程，任何函数都可以让暂停的协程继续执行。

如果将 Generator 函数当作协程，完全可以将多个需要互相协作的任务写成 Generator 函数，它们之间使用 `yield` 表达式交换控制权。

### Generator 与上下文

JavaScript 代码运行时，会产生一个全局的上下文环境（context，又称运行环境），包含了当前所有的变量和对象。然后，执行函数（或块级代码）的时候，又会在当前上下文环境的上层，产生一个函数运行的上下文，变成当前（active）的上下文，由此形成一个上下文环境的堆栈（context stack）。

这个堆栈是“后进先出”的数据结构，最后产生的上下文环境首先执行完成，退出堆栈，然后再执行完成它下层的上下文，直至所有代码执行完成，堆栈清空。

Generator 函数不是这样，它执行产生的上下文环境，一旦遇到 `yield` 命令，就会暂时退出堆栈，但是并不消失，里面的所有变量和对象会冻结在当前状态。等到对它执行 `next` 命令时，这个上下文环境又会重新加入调用栈，冻结的变量和对象恢复执行。

```js
function* gen() {
  yield 1;
  return 2;
}

let g = gen();

console.log(g.next().value, g.next().value);
```

上面代码中，第一次执行 `g.next()` 时，Generator 函数 `gen` 的上下文会加入堆栈，即开始运行 `gen` 内部的代码。等遇到 `yield 1` 时，`gen` 上下文退出堆栈，内部状态冻结。第二次执行 `g.next()` 时，`gen` 上下文重新加入堆栈，变成当前的上下文，重新恢复执行。

### 用途

1. 异步操作的同步化表达

Generator 函数的暂停执行的效果，意味着可以把异步操作写在 `yield` 表达式里面，等到调用 `next` 方法时再往后执行。

这实际上等同于不需要写回调函数了，因为异步操作的后续操作可以放在 `yield` 表达式下面，反正要等到调用 `next` 方法时再执行。所以，Generator 函数的一个重要实际意义就是用来处理异步操作，改写回调函数。

```js
function* main() {
  var result = yield request('http://some.url');
  var resp = JSON.parse(result);
  console.log(resp.value);
}

function request(url) {
  makeAjaxCall(url, function(response) {
    it.next(response);
  });
}

var it = main();
it.next();
```

上面代码的 `main` 函数，就是通过 Ajax 操作获取数据。可以看到，除了多了一个`yield`，它几乎与同步操作的写法完全一样。注意，`makeAjaxCall` 函数中的 `next` 方法，必须加上 `response` 参数，**因为 `yield` 表达式，本身是没有值的，总是等于 undefined**。

2. 控制流管理

如果有一个多步操作非常耗时，采用回调函数，可能会写成下面这样。

```js
step1(function(value1) {
  step2(value1, function(value2) {
    step3(value2, function(value3) {
      step4(value3, function(value4) {
        // Do something with value4
      });
    });
  });
});
```

采用 `Promise` 改写上面的代码。

```js
Promise.resolve(step1)
  .then(step2)
  .then(step3)
  .then(step4)
  .then(
    function(value4) {
      // Do something with value4
    },
    function(error) {
      // Handle any error from step1 through step4
    }
  )
  .done();
```

上面代码已经把回调函数，改成了直线执行的形式，但是加入了大量 `Promise` 的语法。Generator 函数可以进一步改善代码运行流程。

```js
function* longRunningTask(value1) {
  try {
    var value2 = yield step1(value1);
    var value3 = yield step2(value2);
    var value4 = yield step3(value3);
    var value5 = yield step4(value4);
    // Do something with value4
  } catch (e) {
    // Handle any error from step1 through step4
  }
}
```

然后，使用一个函数，按次序自动执行所有步骤。

```js
run(longRunningTask(initialValue));

function run(task) {
  var obj = task.next(task.value);
  // 如果Generator函数未结束，就继续调用
  if (!obj.done) {
    task.value = obj.value;
    run(task);
  }
}
```

注意，上面这种做法，只适合同步操作，即所有的 task 都必须是同步的，不能有异步操作。因为这里的代码一得到返回值，就继续往下执行，没有判断异步操作何时完成。

3. 部署 Iterator 接口

4. 作为数据结构

## 四、Generator 函数的异步应用

### 传统方法

ES6 诞生以前，异步编程的方法，大概有下面四种。

- 回调函数
- 事件监听
- 发布/订阅
- Promise 对象

### 基本概念

1. 异步

所谓"异步"，简单说就是一个任务不是连续完成的，可以理解成该任务被人为分成两段，先执行第一段，然后转而执行其他任务，等做好了准备，再回过头执行第二段。

2. 回调函数

JavaScript 语言对异步编程的实现，就是回调函数。所谓回调函数，就是把任务的第二段单独写在一个函数里面，等到重新执行这个任务的时候，就直接调用这个函数。回调函数的英语名字 callback，直译过来就是"重新调用"。

3. Promise

Promise 对象是为了解决“回调地狱”问题提出来的。它不是新的语法功能，而是一种新的写法，允许将回调函数的嵌套，改成链式调用。

Promise 最大的问题是代码冗余，原来的任务被 Promise 包装一下，不管什么操作，一眼看上去都是一堆`then`，原来的语义变得很不清除。

4. Generator 函数

1. 协程

传统的编程语言，早有异步编程的解决方案（其实是多任务的解决方案）。其中有一种叫做"协程"（coroutine），意思是多个线程互相协作，完成异步任务。

2. 协程的 Generator 函数实现

Generator 函数是协程在 ES6 的实现，最大特点就是可以交出函数的执行权（即暂停执行）。

**Generator 不同于普通函数的地方，即执行它不会返回结果，返回的是指针对象。调用指针对象的 `next()` 方法，会移动内部指针到下一个 `yield` 语句，直到 `done` 为 true。**

3. Generator 函数的数据交换和错误处理

- `next()`: 该方法可以接受参数，向 Generator 函数体内输入数据。
- `thorw()`: 向 Generator 体内抛出错误。

**Generator 函数将异步操作表述为类似同步操作，但是流程管理却不方便。**

### Thunk 函数

Thunk 函数是自动执行 Generator 函数的一种方法。

1. 参数的求值策略

求值策略：指函数的参数到底何时应该求值。分为以下两种：

- 传值调用：传入函数体之前求值。弊端就是有可能造成性能损失。
- 传名调用：只在执行时求值。

2. Thunk 函数的含义

编译器的“传名调用”实现，往往是将参数放到一个临时函数之中，再将这个临时函数传入函数体。这个临时函数就叫做 Thunk 函数。

```js
function f(m) {
  return m * 2;
}

f(x + 5);

// 等同于

var thunk = function() {
  return x + 5;
};

function f(thunk) {
  return thunk() * 2;
}
```

上面代码中，函数 f 的参数 `x + 5` 被一个函数替换了。凡是用到原参数的地方，对 Thunk 函数求值即可。

3. Javascipt 的 Thunk 函数

JavaScript 语言是传值调用，它的 Thunk 函数含义有所不同。在 JavaScript 语言中，Thunk 函数替换的不是表达式，而是多参数函数，将其替换成一个只接受回调函数作为参数的单参数函数。

```js
// 正常版本的readFile（多参数版本）
fs.readFile(fileName, callback);

// Thunk版本的readFile（单参数版本）
var Thunk = function(fileName) {
  return function(callback) {
    return fs.readFile(fileName, callback);
  };
};

var readFileThunk = Thunk(fileName);
readFileThunk(callback);
```

上面代码中，`fs`模块的`readFile`方法是一个多参数函数，两个参数分别为文件名和回调函数。经过转换器处理，它变成了一个单参数函数，只接受回调函数作为参数。这个单参数版本，就叫做 Thunk 函数。

任何函数，只要参数有回调函数，就能写成 Thunk 函数的形式。下面是一个简单的 Thunk 函数转换器。

```js
// ES5版本
var Thunk = function(fn) {
  return function() {
    var args = Array.prototype.slice.call(arguments);
    return function(callback) {
      args.push(callback);
      return fn.apply(this, args);
    };
  };
};

// ES6版本
const Thunk = function(fn) {
  return function(...args) {
    return function(callback) {
      return fn.call(this, ...args, callback);
    };
  };
};
```

### Generator 函数的流程管理

Generator 函数可以自动执行。

```js
function* gen() {
  // ...
}

var g = gen();
var res = g.next();

while (!res.done) {
  console.log(res.value);
  res = g.next();
}
```

上面代码中，Generator 函数 `gen` 会自动执行完所有步骤。但是，这不适合异步操作。如果必须保证前一步执行完，才能执行后一步，上面的自动执行就不可行。这时，Thunk 函数就能派上用处。

Thunk 函数，因为它可以在回调函数里，将执行权交还给 Generator 函数。

```js
var g = gen();

var r1 = g.next();
r1.value(function(err, data) {
  if (err) throw err;
  var r2 = g.next(data);
  r2.value(function(err, data) {
    if (err) throw err;
    g.next(data);
  });
});
```

上面代码中，变量 `g` 是 Generator 函数的内部指针，表示目前执行到哪一步。`next` 方法负责将指针移动到下一步，并返回该步的信息（`value` 属性和 `done` 属性）。

仔细查看上面的代码，可以发现 Generator 函数的执行过程，其实是将同一个回调函数，反复传入 `next` 方法的 `value` 属性。这使得我们可以用递归来自动完成这个过程。

### Thunk 函数的自动流程管理

Thunk 函数真正的威力，在于可以执行 Generator 函数。下面是一个基于 Thunk 函数的 Generator 执行器。

```js
function run(fn) {
  // gen为返回的迭代器
  var gen = fn();

  // 使用递归
  function next(err, data) {
    var result = gen.next(data);
    if (result.done) return;
    // yield 必须是个回调函数
    result.value(next);
  }

  next();
}

function* g() {
  // ...
}

run(g);
```

上面代码的`run`函数，就是一个 Generator 函数的自动执行器。

内部的 `next` 函数就是 Thunk 的回调函数。`next` 函数先将指针移到 Generator 函数的下一步（`gen.next` 方法），然后判断 Generator 函数是否结束（`result.done` 属性），如果没结束，就将 `next` 函数再传入 Thunk 函数（`result.value` 属性），否则就直接退出。

有了这个执行器，执行 Generator 函数方便多了。不管内部有多少个异步操作，直接把 Generator 函数传入 `run` 函数即可。当然，前提是每一个异步操作，都要是 Thunk 函数，也就是说，跟在 `yield` 命令后面的必须是 Thunk 函数。

## 五、基于 Promise 的流程管理

如果`yield`后面是一个 Promise 对象。那么 Generator 函数的自动执行器相应的要做些改动。

```js
function run(gen) {
  var g = gen();

  function next(data) {
    var result = g.next(data);

    if (result.done) return;

    result.value
      .then(function(data) {
        return data.json();
      })
      .then(function(data) {
        next(data);
      });
  }

  next();
}

run(gen);
```

其中的关键就是 yield 的时候返回一个 Promise 对象，给这个 Promise 对象添加 then 方法，当异步操作成功时执行 `then` 中的 `onFullfilled` 函数，`onFullfilled` 函数中又去执行 `g.next`，从而让 Generator 继续执行，然后再返回一个 Promise，再在成功时执行 `g.next`，然后再返回……

由 `run` 方法可以看到 Generator 函数的自动执行需要一种机制，即当异步操作有了结果，能够自动交回执行权。
而两种方法可以做到这一点。
（1）回调函数。将异步操作进行包装，暴露出回调函数，在回调函数里面交回执行权。
（2）Promise 对象。将异步操作包装成 Promise 对象，用 `then` 方法交回执行权。

### co 模块

co 模块是著名程序员 TJ Holowaychuk 于 2013 年 6 月发布的一个小工具，用于 Generator 函数的自动执行。

co 模块的原理：

co 模块其实就是将两种自动执行器（Thunk 函数和 Promise 对象），包装成一个模块。使用 co 的前提条件是，Generator 函数的 `yield` 命令后面，只能是 Thunk 函数或 Promise 对象。如果数组或对象的成员，全部都是 Promise 对象，也可以使用 co，详见后文的例子。

```js
/**
 * slice() reference.
 */

var slice = Array.prototype.slice;

/**
 * Expose `co`.
 */

module.exports = co['default'] = co.co = co;

/**
 * Wrap the given generator `fn` into a
 * function that returns a promise.
 * This is a separate function so that
 * every `co()` call doesn't create a new,
 * unnecessary closure.
 *
 * @param {GeneratorFunction} fn
 * @return {Function}
 * @api public
 */

co.wrap = function(fn) {
  createPromise.__generatorFunction__ = fn;
  return createPromise;
  function createPromise() {
    return co.call(this, fn.apply(this, arguments));
  }
};

/**
 * Execute the generator function or a generator
 * and return a promise.
 *
 * @param {Function} fn
 * @return {Promise}
 * @api public
 */

function co(gen) {
  var ctx = this;
  var args = slice.call(arguments, 1);

  // co 将 Generator 函数的内部指针对象的next方法，包装成onFulfilled函数。这主要是为了能够捕捉抛出的错误。

  // we wrap everything in a promise to avoid promise chaining,
  // which leads to memory leak errors.
  // see https://github.com/tj/co/issues/180
  return new Promise(function(resolve, reject) {
    // 在返回的 Promise 对象里面，co 先检查参数gen是否为 Generator 函数。如果是，就执行该函数，得到一个内部指针对象；如果不是就返回，并将 Promise 对象的状态改为resolved。
    if (typeof gen === 'function') gen = gen.apply(ctx, args);
    if (!gen || typeof gen.next !== 'function') return resolve(gen);

    onFulfilled();

    /**
     * @param {Mixed} res
     * @return {Promise}
     * @api private
     */
    // co 将 Generator 函数的内部指针对象的next方法，包装成onFulfilled函数。这主要是为了能够捕捉抛出的错误。
    function onFulfilled(res) {
      var ret;
      try {
        ret = gen.next(res);
      } catch (e) {
        return reject(e);
      }
      next(ret);
      return null;
    }

    /**
     * @param {Error} err
     * @return {Promise}
     * @api private
     */

    function onRejected(err) {
      var ret;
      try {
        ret = gen.throw(err);
      } catch (e) {
        return reject(e);
      }
      next(ret);
    }

    /**
     * Get the next value in the generator,
     * return a promise.
     *
     * @param {Object} ret
     * @return {Promise}
     * @api private
     */

    function next(ret) {
      // 检查当前是否为 Generator 函数的最后一步，如果是就返回。
      if (ret.done) return resolve(ret.value);
      // 确保每一步的返回值，是 Promise 对象。
      var value = toPromise.call(ctx, ret.value);
      // 使用then方法，为返回值加上回调函数，然后通过onFulfilled函数再次调用next函数。
      if (value && isPromise(value)) return value.then(onFulfilled, onRejected);
      // 在参数不符合要求的情况下（参数非 Thunk 函数和 Promise 对象），将 Promise 对象的状态改为rejected，从而终止执行。
      return onRejected(
        new TypeError(
          'You may only yield a function, promise, generator, array, or object, ' +
            'but the following object was passed: "' +
            String(ret.value) +
            '"'
        )
      );
    }
  });
}

/**
 * Convert a `yield`ed value into a promise.
 *
 * @param {Mixed} obj
 * @return {Promise}
 * @api private
 */

function toPromise(obj) {
  if (!obj) return obj;
  if (isPromise(obj)) return obj;
  if (isGeneratorFunction(obj) || isGenerator(obj)) return co.call(this, obj);
  if ('function' == typeof obj) return thunkToPromise.call(this, obj);
  if (Array.isArray(obj)) return arrayToPromise.call(this, obj);
  if (isObject(obj)) return objectToPromise.call(this, obj);
  return obj;
}

/**
 * Convert a thunk to a promise.
 *
 * @param {Function}
 * @return {Promise}
 * @api private
 */

function thunkToPromise(fn) {
  var ctx = this;
  return new Promise(function(resolve, reject) {
    fn.call(ctx, function(err, res) {
      if (err) return reject(err);
      if (arguments.length > 2) res = slice.call(arguments, 1);
      resolve(res);
    });
  });
}

/**
 * Convert an array of "yieldables" to a promise.
 * Uses `Promise.all()` internally.
 *
 * @param {Array} obj
 * @return {Promise}
 * @api private
 */

function arrayToPromise(obj) {
  return Promise.all(obj.map(toPromise, this));
}

/**
 * Convert an object of "yieldables" to a promise.
 * Uses `Promise.all()` internally.
 *
 * @param {Object} obj
 * @return {Promise}
 * @api private
 */

function objectToPromise(obj) {
  var results = new obj.constructor();
  var keys = Object.keys(obj);
  var promises = [];
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var promise = toPromise.call(this, obj[key]);
    if (promise && isPromise(promise)) defer(promise, key);
    else results[key] = obj[key];
  }
  return Promise.all(promises).then(function() {
    return results;
  });

  function defer(promise, key) {
    // predefine the key in the result
    results[key] = undefined;
    promises.push(
      promise.then(function(res) {
        results[key] = res;
      })
    );
  }
}

/**
 * Check if `obj` is a promise.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isPromise(obj) {
  return 'function' == typeof obj.then;
}

/**
 * Check if `obj` is a generator.
 *
 * @param {Mixed} obj
 * @return {Boolean}
 * @api private
 */

function isGenerator(obj) {
  return 'function' == typeof obj.next && 'function' == typeof obj.throw;
}

/**
 * Check if `obj` is a generator function.
 *
 * @param {Mixed} obj
 * @return {Boolean}
 * @api private
 */

function isGeneratorFunction(obj) {
  var constructor = obj.constructor;
  if (!constructor) return false;
  if ('GeneratorFunction' === constructor.name || 'GeneratorFunction' === constructor.displayName)
    return true;
  return isGenerator(constructor.prototype);
}

/**
 * Check for plain object.
 *
 * @param {Mixed} val
 * @return {Boolean}
 * @api private
 */

function isObject(val) {
  return Object == val.constructor;
}
```

## 六、Generator 函数的模拟实现
