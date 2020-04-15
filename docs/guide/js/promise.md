# Promise 原理与实现

## 一、Promise 原理

### 介绍

Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大。

传统的回调函数方案存在一些缺点，比如回调地狱等，`Promise`则用于解决这种无限嵌套的异步回调编程方式。

### 特点

- 对象的状态不受外界影响。`Promise` 对象代表一个异步操作，有三种状态：`pending`（进行中）、`fulfilled`（已成功）和`rejected`（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是 `Promise` 这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。
- 一旦状态改变，就不会再变，任何时候都可以得到这个结果。

### Promise 对象

1. 基本语法：

```js
let promise = new Promise(function(resolve, reject) {
  // executor
});
```

`Promise` 构造函数接受一个函数作为参数，该函数的两个参数分别是`resolve`和`reject`。

`resolve`函数的作用是，将 `Promise` 对象的状态从“未完成”变为“成功”（即从 `pending` 变为 `resolved`），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；
`reject`函数的作用是，将 `Promise` 对象的状态从“未完成”变为“失败”（即从 `pending` 变为 `rejected`），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

2. `Promise` 内部有两个属性

- state: 最初是 `pending`，然后改为 `fulfilled` 或者 `rejected`
- result： 任意值，最初为 `undefined`

**当 Promise 被创建时， 它会被立即调用**

### Promise 方法

1. `then()`

```js
p.then(onFulfilled[, onRejected]);
```

`then`方法作用是为 Promise 实例添加状态改变时的回调函数。其可以接收两个可选参数。

- `onFilfilled`: 当 Promise 变成接受状态（fulfilled）时调用的函数。该函数有一个参数，即接受的最终结果。

- `onRejected`: 当 Promise 变成接受状态或拒绝状态（rejected）时调用的函数。该函数有一个参数，即拒绝的原因。

2. `catch()`

```js
p.catch(onRejected);
```

`catch()` 方法返回一个 Promise，并且处理拒绝的情况。它的行为与调用 `Promise.prototype.then(undefined, onRejected)`相同。

3. `finally()`-ES2018 新增

### Promise 链

1. 链式调用

```js
new Promise(function(resolve, reject) {
  setTimeout(() => resolve(1), 1000); // (*)
})
  .then(function(result) {
    // (**)

    alert(result); // 1
    return result * 2;
  })
  .then(function(result) {
    // (***)

    alert(result); // 2
    return result * 2;
  })
  .then(function(result) {
    alert(result); // 4
    return result * 2;
  });
```

Promise 链看起来就像上面那样，由于 `p.then()` 会返回 Promise 实例，所以可以使用类似 `p.then().then().then()...` 的 Promise 链来组织代码。

2. `Thenables`

确切地说，`.then` 可以返回任意的 `“thenable”` 对象 —— 一个具有 `.then` 方法的任意对象，并且会被当做一个 `promise` 来对待。

这里是一个 `thenable` 对象的示例：

```js
class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    alert(resolve); // function() { native code }
    // 1 秒后用 this.num*2 来 resolve
    setTimeout(() => resolve(this.num * 2), 1000); // (**)
  }
}

new Promise(resolve => resolve(1))
  .then(result => {
    return new Thenable(result); // (*)
  })
  .then(alert); // 1000 ms 后显示 2
```

### Promise API

1. Promise.all
2. Promise.race
3. Promise.allSettled
4. Promise.try

### Promisification / Promisify

`Promisification`: 它指将一个接受回调的函数转换为一个返回 promise 的函数。

```js
function promisify(original) {
  return function(...args) {
    return new Promise((resolve, reject) => {
      args.push(function callback(err, ...values) {
        if (err) {
          return reject(err);
        }
        return resolve(...values);
      });
      original.call(this, ...args);
    });
  };
}
```

### Promise 缺点

1. 无法取消 Promise
   一旦新建它就会立即执行，无法中途取消。

2. 错误被吃掉
   如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部、

3. 无法得知 `pending` 状态
   当处于 `pending` 状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

## 二、Promise 模拟实现

1. Promise 构造函数

```js
function Promise(executor) {
  // status
  this.state = 'pending';
  // value
  this.value = undefined;
  // subscribe event
  this.onResolvedCallBacks = [];
  this.onRejectedCallBacks = [];
  function resolve(value) {
    if (value instanceof Promise) {
      return value.then(resolve, reject);
    }
    setTimeout(() => {
      if (this.status === 'pending') {
        this.status = 'fulfilled';
        this.value = value;
        this.onResolvedCallBacks.forEach(item => item(this.value));
      }
    }, 0);
  }
  function reject(reason) {
    setTimeout(() => {
      if (this.status === 'pending') {
        this.status = 'rejected';
        this.value = reason;
        this.onRejectedCallBacks.forEach(item => item(this.value));
      }
    });
  }
  try {
    executor(resolve, reject);
  } catch (err) {
    reject(err);
  }
}
```

2. Promise.prototype.then

```js
Promise.prototype.then = function(onFulfilled, onRejected) {
  /*当没有函数传递进来的时候，添加默认函数*/
  onFulfilled =
    typeof onFulfilled === 'function'
      ? onFulfilled
      : function(value) {
          return value;
        };
  onRejected =
    typeof onRejected === 'function'
      ? onRejected
      : function(err) {
          throw err;
        };

  let self = this;
  /*由于要实现链式调用，所以每次执行 then 方法的时候都会返回一个新的 Promise 实例*/
  let promise2;
  if (self.status === 'fulfilled') {
    promise2 = new Promise(function(resolve, reject) {
      setTimeout(function() {
        try {
          /*将 onFulfilled 函数执行的结果 resolve 掉*/
          let x = onFulfilled(self.value);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      }, 0);
    });
  }

  if (self.status === 'rejected') {
    promise2 = new Promise(function(resolve, reject) {
      setTimeout(function() {
        try {
          /*将 onRejected 函数执行的结果 reject 掉*/
          let x = onRejected(self.value);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      }, 0);
    });
  }

  if (self.status === 'pending') {
    promise2 = new Promise(function(resolve, reject) {
      /*订阅事件*/
      self.onResolvedCallBacks.push(function() {
        try {
          let x = onFulfilled(self.value);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });

      self.onRejectedCallBacks.push(function() {
        try {
          let x = onRejected(self.value);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    });
  }
  return promise2;
};

/*辅助函数 --> 解决多层嵌套情况*/
function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError('循环引用'));
  }
  let then, called;
  if (x != null && (typeof x === 'function' || typeof x === 'object')) {
    try {
      then = x.then;
      if (typeof then === 'function') {
        then.call(
          x,
          function(data) {
            if (called) return;
            called = true;
            resolvePromise(promise2, data, resolve, reject);
          },
          function(err) {
            if (called) return;
            called = true;
            reject(err);
          }
        );
      } else {
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
}
```

3. Promise.catch

```js
Promise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected);
};
```

4. Promise.all

```js
Promise.all = function(promises) {
  return new Promise(function(resolve, reject) {
    let count = 0;
    let result = [];
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(
        function(data) {
          result[i] = data;
          if (++count === promises.length) {
            resolve(result);
          }
        },
        function(err) {
          reject(err);
        }
      );
    }
  });
};
```

5. Promise.race

```js
Promise.race = function(promises) {
  return new Promise(function(resolve, reject) {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(resolve, reject);
    }
  });
};
```

6. Promise.resolve

```js
Promise.resolve = function(value) {
  return new Promise(function(resolve, reject) {
    resolve(value);
  });
};
```

7. Promise.reject

```js
Promise.reject = function(reason) {
  return new Promise(function(resolve, reject) {
    reject(reason);
  });
};
```

8. Promise.prototype.finally

```js
Promise.prototype.finally = function(callback) {
  let P = this.constructor;
  return this.then(
    value => P.resolve(callback()).then(() => value),
    reason =>
      P.resolve(callback()).then(() => {
        throw reason;
      })
  );
};
```
