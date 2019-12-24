# 队列

## 队列数据结构

### 介绍

**队列**是遵循 FIFO(First In First Out)的原则的一组有序的项。队列在尾部添加新元素，并从顶部移除元素。

生活中，常见的队列例子就是排队，在超市收银台、电影院等等。

实现队列的数据结构以及一下方法：

- `enqueue(element)`：向队列尾部添加新项。
- `dequeue()`：移除队列的第一项，并返回被移除的元素。
- `front()`：返回队列中第一个元素，队列不做任何变动。
- `back()`：返回队列中最后一个元素，队列不做任何变动。
- `isEmpty()`：如果队列中不包含任何元素，返回 true，否则返回 false。
- `size()`：返回队列包含的元素个数，与数组的 length 属性类似。
- `clear()`：清空整个队列。
- `print()`：打印队列中的元素。

### 实现

```js
class Queue {
  constructor() {
    this.list = [];
  }

  enqueue(ele) {
    this.list.push(ele);
  }

  dequeue() {
    return this.list.shift();
  }

  front() {
    return this.list[0];
  }

  back() {
    return this.list[this.list.length - 1];
  }

  isEmpty() {
    return this.list.length === 0;
  }

  size() {
    return this.list.length;
  }

  clear() {
    this.list = [];
  }

  print() {
    console.log(this.list.toString());
  }
}
```

测试结果：

```js
let queue = new Queue();
console.log(queue.isEmpty()); // true
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(4);

console.log(queue.dequeue()); // 1

queue.enqueue(5);

console.log(queue.front()); // 2
console.log(queue.back()); // 5

queue.print(); // 2,4,5
```

## 优先队列

**优先队列**是一种特殊的队列，元素的增加和移除是基于优先级的。

在现实中，有很多类似的例子。比如机场登记的顺序，头等舱和商务舱乘客的优先级要高于经济舱的乘客。还比如医院处理急诊的病人优先级会比普通的病人高。

实现一个优先队列，有两种选项：

- 设置优先级，然后在正确的位置添加元素。
- 正常入列操作，但是按优先级出列。

而且优先级也可分大小，即最小优先队列以及最大优先队列。最小优先队列指优先级较小的元素被放置在队列操作前面(1 代表最高优先级)，最大优先队列则反之。

### 最小优先队列的实现

## 循环队列

**循环队列**指队列的头尾相接，出列即会重新入列，形成一个环状结构。

一个经典的例子就是击鼓传花游戏。在这个游戏中，孩子们围成一个圈，把花尽快传递给旁边的人。某一时刻传花停止，这个时候花在谁手里，谁就要退出游戏。重复这个过程，直到只剩一个孩子。

### 实现
