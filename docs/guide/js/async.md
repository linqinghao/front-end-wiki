# async/await

## 一、async

ES2017 引入了 async 函数，这使得异步操作更加便捷。async 其实是 Generator 函数的语法糖。

async 函数对 Generator 函数的改进，体现在一下四点：

- 内置执行器。
- 更好的语义。
- 更广的适用性：`yield`后面只能是 Thunk 函数或者 Promise 对象，而 `await`命令后面可以是 Promise 对象或者原始类型值（但会自动转换成 `resolved` 的 Promise 对象）。
- 返回值是 Promise。

## 二、错误处理

```js
async function myFunction() {
  try {
    await somethingThatReturnsAPromise();
  } catch (err) {
    console.log(err);
  }
}

// 另一种写法
async function myFunction() {
  await somethingThatReturnsAPromise().catch(function(err) {
    console.log(err);
  });
}
```

## 三、async 函数的实现原理

async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里。

```js
async function fn(args) {
  // ...
}

// 等同于

function fn(args) {
  return spawn(function*() {
    // ...
  });
}
```

所有的 async 函数都可以写成上面的第二种形式，其中的`spawn`函数就是自动执行器。

```js
function spawn(genF) {
  return new Promise(function(resolve, reject) {
    const gen = genF();
    function step(nextF) {
      let next;
      try {
        next = nextF();
      } catch (e) {
        return reject(e);
      }
      if (next.done) {
        return resolve(next.value);
      }
      Promise.resolve(next.value).then(
        function(v) {
          step(function() {
            return gen.next(v);
          });
        },
        function(e) {
          step(function() {
            return gen.throw(e);
          });
        }
      );
    }
    step(function() {
      return gen.next(undefined);
    });
  });
}
```
