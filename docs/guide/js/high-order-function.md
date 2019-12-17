# JS 中的高阶函数及其应用

## 高阶函数

高阶函数是指至少满足下列条件之一的函数：

- 函数可以作为参数被传递；
- 函数可以作为返回值输出。

JavaScript 语言中的函数显然满足高阶函数的条件，在实际开发中，无论是将函数当作参数传递，还是让函数的执行结果返回另外一个函数，这两种情形都有很多应用场景。

## 高阶函数的应用

### 装饰器模式

装饰者模式属于面向切面编程的一种实现方式，面向切面编程的作用可以把一些与核心业务逻辑无关的功能抽离出来，比如日志统计、安全控制、异常处理等。若将这些功能抽离出来，再动态添加到业务模块中，这样的好处可以更好地解耦业务模块的逻辑和辅助功能模块，也能够更方便地复用日志统计等功能。

举个例子：

```js
function log(fn) {
  const that = this;
  return function() {
    console.log(...arguments);
    return fn.apply(that, arguments);
  };
}

function sum(a, b) {
  return a + b;
}

let sumLog = log(sum);
console.log(sumLog(1, 2));
// Output：
// 1 2
// 3
```

上面例子中，log 函数用于打印传入函数的参数值，将 sum 函数作为参数传递，返回一个新的函数，增强函数的功能，并且不更改原函数的执行结果，这样的方式就是装饰器模式。

### 函数柯里化 currying

**柯里化**又称部分求值，柯里化函数会接收一些参数，然后不会立即求值，而是继续返回一个新函数，将传入的参数通过闭包的形式保存，等到被真正求值的时候，再一次性把所有传入的参数进行求值。将常规函数的参数传值转换为下列的方式，就是函数柯里化。

```js
fn(1, 2, 3, 4)  ->  fn(1)(2)(3)(4)()
```

实现一个通用的函数柯里化方法：

```js
let currying = function wrapper(fn) {
  let args = [];
  return function() {
    if (args.length == fn.length) {
      return fn.apply(this, args);
    } else {
      [].push.apply(args, arguments);
      return wrapper;
    }
  };
};
```

测试：

```js
function sum(a, b) {
  return a + b;
}

let s = currying(sum);

s(1);
s(2);
s(); // Output: 3
```

柯里化的作用:

- 参数复用
- 提前返回
- 延迟计算

### 反柯里化

在 JavaScript 中，当我们调用对象的某个方法时，其实不用去关心该对象原本是否被设计为拥有这个方法，这是动态类型语言的特点，也是常说的鸭子类型思想。如果柯里化的作用是固定部分参数，使函数针对性更强。那么反柯里化的作用就是扩大一个函数的应用范围，使一个函数适用于其他的对象。

在 javascript 里面，很多函数都不做对象的类型检测，而是只关心这些对象能做什么，如 Array 和 String 的 prototype 上的方法就被特意设计成了这种模式，这些方法不对 this 的数据类型做任何校验，因此 obj 可以冒用 Array 的 push 方法进行操作。

反柯里化的实现:

```js
Function.prototype.uncurrying = function() {
  var self = this;
  return function() {
    return Function.prototype.call.apply(self, arguments);
  };
};
```

测试：

```js
var push = Array.prototype.push.uncurrying();

var obj = {
  length: 1,
  '0': 1,
};

push(obj, 2);
console.log(obj); // Output： {0: 1, 1: 2, length: 2}
```

### 函数节流

当一个函数被频繁调用时，如果会造成很大的性能问题的时候，这个时候可以考虑函数节流，降低函数被调用的频率。

函数节流的原理是，将即将被执行的函数用 setTimeout 延迟一段时间执行。如果该次延迟执行还没有完成，则忽略接下来调用该函数的请求。throttle 函数接受 2 个参数，第一个参数为需要被延迟执行的函数，第二个参数为延迟执行的时间。

```js
function throttle(func, wait) {
  var timeout;
  var previous = 0;

  return function() {
    context = this;
    args = arguments;
    if (!timeout) {
      timeout = setTimeout(function() {
        timeout = null;
        func.apply(context, args);
      }, wait);
    }
  };
}
```

### 分时函数

与函数节流一样，分时函数也是用来解决函数频繁执行带来的性能问题。不同的是，函数节流场景为被动调用，分时函数为主动调用。

当一次的用户操作会严重地影响页面性能，如在短时间内往页面中大量添加 DOM 节点显然也会让浏览器吃不消，我们看到的结果往往就是浏览器的卡顿甚至假死。

分时函数的作用就在于将耗时耗性能的操作分割成多个小块，分时间段分批地执行。这样子就提高了页面性能，减轻了页面渲染的压力。

实现一个 timeChunk 函数，接受 4 个参数，第 1 个参数是创建节点时需要用到的数据，第 2 个参数是封装了创建节点逻辑的函数，第 3 个参数表示每一批创建的节点数量，第 4 个参数表示分批执行的时间间隔。

```js
function timeChunk(data, fn, count, wait) {
  let timer;

  function start() {
    let len = Math.min(count, data.length);
    for (let i = 0; i < len; i++) {
      val = data.shift(); // 每次取出一个数据，传给fn当做值来用
      fn(val);
    }
  }

  return function() {
    timer = setInterval(function() {
      if (data.length === 0) {
        // 如果数据为空了，就清空定时器
        return clearInterval(timer);
      }
      start();
    }, wait);
  };
}
```

### 惰性加载函数

在 Web 开发中，因为浏览器之间的实现差异，一些嗅探工作总是不可避免。比如我们需要一个在各个浏览器中能够通用的事件绑定函数 addEvent，常见的写法如下：

```js
var addEvent = function(elem, type, handler) {
  if (window.addEventListener) {
    return elem.addEventListener(type, handler, false);
  }

  if (window.attachEvent) {
    return elem.attachEvent('on' + type, handler);
  }
};
```

缺点：当它每次被调用的时候都会执行里面的 if 条件分支，虽然执行这些 if 分支的开销不算大，但也许有一些方法可以让程序避免这些重复的执行过程。

优化：

```js
var addEvent = function(elem, type, handler) {
  if (window.addEventListener) {
    addEvent = function(elem, type, handler) {
      elem.addEventListener(type, handler, false);
    };
  } else if (window.attachEvent) {
    addEvent = function(elem, type, handler) {
      elem.attachEvent('on' + type, handler);
    };
  }
  addEvent(elem, type, handler);
};
```

此时 addEvent 依然被声明为一个普通函数，在函数里依然有一些分支判断。但是在第一次进入条件分支之后，在函数内部会重写这个函数，重写之后的函数就是我们期望的 addEvent 函数，在下一次进入 addEvent 函数的时候，addEvent 函数里不再存在条件分支语句。
