# 栈

## 介绍

**栈**是一种遵从**后进先出**(LIFO)原则的有序集合。新添加的或待删除的元素都保存在栈的同一端，称作栈顶，另一端就叫栈底。在栈里，新元素都靠近栈顶，旧元素都接近栈底。

栈被用在编程语言的编译器和内存中保存变量、方法调用等。

实现一个栈的数据结构以及下列的方法：

- `push(element)`：添加一个（或几个）新元素到栈顶。
- `pop()`：移出栈顶的元素，同时返回被移除的元素。
- `peek()`：返回栈顶的元素，不对栈做任何修改。
- `isEmptry()`：判断栈是否空栈。
- `clear()`: 移除栈里的所有元素
- `size()`：返回栈里的元素个数。
- `print()`：打印栈内的元素。

## 实现

实现如下：

```js
class Stack {
  constructor() {
    this.list = [];
  }

  push(ele) {
    this.list.push(ele);
  }

  pop() {
    return this.list.pop();
  }

  peek() {
    return this.list[this.list.length - 1];
  }

  isEmpty() {
    return this.list.length === 0;
  }

  clear() {
    this.list = [];
  }

  size() {
    return this.list.length;
  }

  print() {
    console.log(this.list.toString());
  }
}
```

测试结果：

```js
let stack = new Stack();
console.log(stack.isEmpty()); // Output: true;
stack.push(5);
stack.push(10);
console.log(stack.peek()); // Output: 10
stack.push(11);
console.log(stack.pop()); // Output: 10
stack.size();
stack.print(); // Output: 5,10
```

## 例子

1. 进制转换

进制转换算法是将基数通过不断除以要转换的进制数，直到为 0，然后反向取余实现的。

比如十进制数 10 转为二进制数的过程如下：

![进制转换-2019-12-14.png](https://allin-bucket.oss-cn-beijing.aliyuncs.com/blog/进制转换-2019-12-14.png?x-oss-process=style/alin)

```js
function baseConverter(decNumber, base) {
  let remStack = new Stack();
  let rem;
  let baseString = '';
  let digits = '0123456789ABCDEF';
  while (decNumber > 0) {
    rem = Math.floor(decNumber % base);
    remStack.push(rem);
    decNumber = Math.floor(decNumber / base);
  }
  while (!remStack.isEmpty()) {
    baseString += digits[remStack.pop()];
  }
  return baseString;
}
```

测试结果：

```js
console.log(baseConverter(1001, 2));
console.log(baseConverter(1001, 8));
console.log(baseConverter(1001, 16));

// Output: 1111101001, 1751, 3E9
```
