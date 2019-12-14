# 链表

**链表**存储有序的元素集合，但不同于数组，链表中的元素在内存中不是连续放置的。每个元素由一个存储元素本身的节点和一个指向下一个元素引用(也称指针或链接)组成。

链表的一个好处在于添加和移除元素的时候不需要移动其他元素。但坏处就是要访问链表中的某一个节点，需要遍历整条链。

在现实中，火车就类似与链表，每节车厢之间相互连接，可以很容易添加新的车厢或者分离。

## 单向链表

实现单向链表的结构以及以下方法：

- `append(element)`：尾部添加元素。
- `insert(position, element)`：特定位置插入一个新的项。
- `getElementAt(position)`：根据索引获取元素，若元素不存在，返回 undefined。
- `removeAt(position)`：特定位置移除一项。
- `remove(element)`：移除一项。
- `indexOf(element)`：返回元素在链表中的索引。如果链表中没有该元素则返回 -1。
- `isEmpty()`：如果链表中不包含任何元素，返回 true，如果链表长度大于 0，返回 false。
- `size()`：返回链表包含的元素个数，与数组的 length 属性类似。
- `clear()`: 清空链表。
- `getHead()`：返回链表的第一个元素。
- `toString()`：由于链表使用了 Node 类，就需要重写继承自 JavaScript 对象默认的 toString() 方法，让其只输出元素的值。
- `print()`：打印链表的所有元素。

### 实现

```js
class Node {
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}
class LinkedList {
  constructor() {
    // 链表长度
    this.length = 0;
    this.head = null;
  }

  append(element) {
    let node = new Node(element);
    let current;
    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next !== null) {
        current = current.next;
      }
      current.next = node;
    }
    this.length++;
  }

  getElementAt(postion) {
    if (this.isEmpty() || postion < 0 || postion > this.length) {
      return undefined;
    } else {
      let node = this.head;
      for (let i = 0; i < postion && node !== null; i++) {
        node = node.next;
      }
      return node;
    }
  }

  insert(position, element) {
    if (position < 0 || position > this.length) {
      return false;
    } else {
      let node = new Node(element);
      let current = this.head;
      let previous;
      let index = 0;

      if (position == 0) {
        node.next = current;
        this.head = node;
      } else {
        while (index++ < position) {
          previous = current;
          current = current.next;
        }
        previous.next = node;
        node.next = current;
      }
      this.length++;
      return true;
    }
  }

  removeAt(position) {
    if (this.isEmpty() || position < 0 || position > this.length) {
      return false;
    } else {
      let current = this.head;
      let previous;
      let index = 0;

      if (position == 0) {
        this.head = current.next;
      } else {
        while (index++ < position) {
          previous = current;
          current = current.next;
        }
        previous.next = current.next;
      }
      this.length--;
      return true;
    }
  }

  remove(element) {
    let index = this.indexOf(element);
    return this.removeAt(index);
  }

  indexOf(element) {
    let current = this.head;
    let index = 0;
    while (current) {
      if (current.element == element) {
        return index;
      }
      index++;
      current = current.next;
    }
    return -1;
  }

  isEmpty() {
    return this.length === 0;
  }

  size() {
    return this.length;
  }

  clear() {
    this.head = null;
    this.hength = 0;
  }

  getHead() {
    return this.head;
  }

  toString() {
    let current = this.head;
    let str = '';
    while (current) {
      str += ',' + current.element;
      current = current.next;
    }
    return str.slice(1);
  }

  print() {
    console.log(this.toString());
  }
}
```

测试结果：

```js
let linkList = new LinkedList();

console.log(linkList.removeAt(0)); // false
console.log(linkList.isEmpty()); // true

linkList.append('Alin');

linkList.append('Banana');

linkList.append('Coral');

linkList.print(); // Alin,Banana,Coral

linkList.insert(1, 'Zoz');

linkList.print(); // Alin,Zoz,Banana,Coral
```

## 双向链表

**双向链表**和单向链表的区别在于，在双向链表中，一个节点既连接下一个节点，也连接上一个节点。

### 实现

```js
class Node {
  constructor(element) {
    this.element = element;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  append(element) {
    let node = new Node(element);
    let current = this.tail;
    if (current === null) {
      this.head = node;
    } else {
      current.next = node;
      node.prev = current;
    }
    this.tail = node;
    this.length++;
  }

  insert(position, element) {
    if (position < 0 || position > this.length) {
      return false;
    } else {
      let node = new Node(element);
      let current = this.head;
      let previous;
      let index = 0;
      // 首位
      if (position == 0) {
        if (!this.head) {
          this.head = node;
          this.tail = node;
        } else {
          node.next = current;
          current.prev = node;
          this.head = node;
          this.tail = current;
        }
      } else if (position == this.length) {
        // 末位
        this.append(element);
      } else {
        // 中位
        while (index++ < position) {
          previous = current;
          current = current.next;
        }
        previous.next = node;
        node.next = current;
        node.prev = previous;
        current.prev = node;
      }
      this.length++;
      return true;
    }
  }

  getElementAt(position) {
    if (this.isEmpty() || postion < 0 || postion > this.length) {
      return undefined;
    } else {
      let node = this.head;
      for (let i = 0; i < postion && node !== null; i++) {
        node = node.next;
      }
      return node;
    }
  }

  removeAt(position) {
    if (this.isEmpty() || position < 0 || position > this.length) {
      return false;
    } else {
      let current = this.head;
      let previous;
      let index = 0;
      if (position == 0) {
        if (this.length == 1) {
          this.head = null;
          this.tail = null;
        } else {
          this.head = current.next;
          this.head.prev = null;
        }
      } else if (position == this.length - 1) {
        if (this.length == 1) {
          this.head = null;
          this.tail = null;
        } else {
          current = this.tail;
          this.tail = current.prev;
          this.tail.next = null;
        }
      } else {
        while (index++ < position) {
          previous = current;
          current = current.next;
        }
        previous.next = current.next;
        current.next.prev = previous;
        previous = current.next.prev;
      }
      this.length--;
      return true;
    }
  }

  remove(element) {
    let index = this.indexOf(element);
    return this.removeAt(index);
  }

  indexOf(element) {
    let current = this.head;
    let index = 0;
    while (current.next) {
      if (current.element == element) {
        return index;
      }
      index++;
      current = current.next;
    }
    return -1;
  }

  isEmpty() {
    return this.length == 0;
  }

  size() {
    return this.length;
  }

  clear() {
    this.head = null;
    this.tail = null;
    this.hength = 0;
  }

  getHead() {
    return this.head;
  }

  getTail() {
    return this.tail;
  }

  toString() {
    let current = this.head;
    let str = '';
    while (current) {
      str += ',' + current.element;
      current = current.next;
    }
    return str.slice(1);
  }

  print() {
    console.log(this.toString());
  }
}
```

测试结果：

```js
let doublyLinkedList = new DoublyLinkedList();

console.log(doublyLinkedList.isEmpty()); // true
doublyLinkedList.append(1);
doublyLinkedList.append(2);
doublyLinkedList.append(3);
console.log(doublyLinkedList.size()); // 3

doublyLinkedList.insert(1, 4);

doublyLinkedList.print(); // 1,4,2,3

doublyLinkedList.remove(2);

doublyLinkedList.print(); // 1,4,3

doublyLinkedList.getHead();
```

## 循环链表

**循环链表**与单向链表的区别在于最后一个元素指向下一个元素的指针(`tail.next`)不是 null，而是指向第一个元素(head)。

**双向循环链表**有指向 head 元素的`tail.next`，和指向 tail 元素的`head.prev`。

### 实现

```js
class CircularLinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  append(element) {
    let node = new Node(element);
    let current = this.head;
    if (current === null) {
      this.head = node;
    } else {
      let current = this.getElementAt(this.size() - 1);
      current.next = node;
    }
    node.next = this.head;
    this.length++;
  }

  insert(position, element) {
    if (position < 0 || position > this.length) {
      return false;
    } else {
      let node = new Node(element);
      let current = this.head;
      if (position === 0) {
        if (this.head === null) {
          this.head = node;
          node.next = this.node;
        } else {
          node.next = current;
          current = this.getElementAt(this.size());
          this.head = node;
          current.next = node;
        }
      } else {
        const previous = this.getElementAt(position - 1);
        node.next = previous.next;
        previous.next = node;
      }
      this.length++;
      return true;
    }
  }

  getElementAt(postion) {
    if (this.isEmpty() || postion < 0 || postion > this.length) {
      return undefined;
    } else {
      let node = this.head;
      for (let i = 0; i < postion && i < this.size(); i++) {
        node = node.next;
      }
      return node;
    }
  }

  removeAt(position) {
    if (this.isEmpty() || position < 0 || position > this.length) {
      return false;
    } else {
      let current = this.head;
      if (position === 0) {
        if (this.size() == 1) {
          this.head = null;
        } else {
          const removed = this.head;
          current = this.getElementAt(this.size() - 1);
          this.head = this.head.next;
          current.next = this.head;
          current = removed;
        }
      } else {
        const previous = this.getElementAt(this.size() - 1);
        current = previous.next;
        previous.next = current.next;
      }
      this.length--;
      return current.element;
    }
  }

  remove(element) {
    let index = this.indexOf(element);
    return this.removeAt(index);
  }

  indexOf(element) {
    let current = this.head;
    let index = 0;
    while (index < this.size()) {
      if (current.element == element) {
        return index;
      }
      index++;
      current = current.next;
    }
    return -1;
  }

  isEmpty() {
    return this.length == 0;
  }

  size() {
    return this.length;
  }

  clear() {
    this.head = null;
    this.hength = 0;
  }

  getHead() {
    return this.head;
  }

  toString() {
    let current = this.head;
    let str = '';
    let index = 0;
    if (current === null) return str;
    while (index++ < this.size()) {
      str += ',' + current.element;
      current = current.next;
    }
    return str.slice(1);
  }

  print() {
    console.log(this.toString());
  }
}
```

测试结果：

```js
let circularLinkList = new CircularLinkedList();

console.log(circularLinkList.removeAt(0)); // false
console.log(circularLinkList.isEmpty()); // true

circularLinkList.append(1);

circularLinkList.append(2);

circularLinkList.append(3);

circularLinkList.print(); // 1,2,3

circularLinkList.insert(2, 4);

console.log(circularLinkList.indexOf(4)); // 2

circularLinkList.print(); // 1,2,4,3

circularLinkList.clear();

circularLinkList.print();
```
