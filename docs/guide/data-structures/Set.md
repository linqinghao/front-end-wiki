# 集合

## 介绍

**集合**是由一组**无序**且**唯一**的项组成的。这个数据结构使用了与有限集合相同的数学概念。

实现集合的数据结构和以下方法：

- `add(element)`： 向集合添加一个新的项。
- `remove(element)`：从集合中移除一个值。
- `has(element)`：如果值在集合中，返回 true，否则返回 false。
- `clear()`：移除集合中的所有项。
- `size()`：返回集合所包含元素的数量。
- `isEmpty()`: 判断集合是否包含元素。
- `values()`：返回一个包含集合中所有值的数组。
- `print()`：打印集合中的所有项。
- `union(otherSet)`：并集
- `intersection(otherSet)`：交集
- `difference(otherSet)`： 差集
- `isSubsetOf(otherSet)`：判断是否是其他集合的子集。

## 实现

```js
class Set {
  constructor() {
    this.items = {};
  }

  add(element) {
    if (!this.has(element)) {
      this.items[element] = element;
      return true;
    }
    return false;
  }

  remove(element) {
    if (this.has(element)) {
      delete this.items[element];
      return true;
    }
    return false;
  }

  has(element) {
    return Object.prototype.hasOwnProperty.call(this.items, element);
  }

  clear() {
    this.items = {};
  }

  size() {
    return Object.keys(this.items);
  }

  isEmpty() {
    return this.size() === 0;
  }

  values() {
    return Object.values(this.items);
  }

  print() {
    console.log(this.values().join(','));
  }

  union(otherSet) {
    const unionSet = new Set();
    this.values().forEach(value => unionSet.add(value));
    otherSet.values().forEach(value => unionSet.add(value));
    return unionSet;
  }

  intersection(otherSet) {
    const intersectionSet = new Set();
    const values = this.values();
    const otherValues = otherSet.values();
    let biggerSet = values;
    let smallerSet = otherValues;
    if (otherValues.length - values.length > 0) {
      biggerSet = otherValues;
      smallerSet = values;
    }
    smallerSet.forEach(value => {
      if (biggerSet.includes(value)) {
        intersectionSet.add(value);
      }
    });
    return intersectionSet;
  }

  difference(otherSet) {
    const differenceSet = new Set();
    this.values().forEach(value => {
      if (!otherSet.has(value)) {
        differenceSet.add(value);
      }
    });
    return differenceSet;
  }

  isSubsetOf(otherSet) {
    if (this.size() > otherSet.size()) return false;
    let isSubset = true;
    this.values().every(value => {
      if (!otherSet.has(value)) {
        isSubset = false;
        return false;
      }
      return true;
    });
    return isSubset;
  }
}
```

测试结果：

```js
const set = new Set();

set.add(1);
set.add(2);
set.add(3);
set.add(4);

console.log(set.has(1)); // true
set.print(); // 1,2,3,4
set.remove(2);
set.print(); // 1,3,4

const otherSet = new Set();
otherSet.add(5);
otherSet.add(7);
otherSet.add(8);
otherSet.add(1);
otherSet.add(2);

otherSet.union(set).print(); // 1,2,3,4,5,7,8
otherSet.intersection(set).print(); // 1
otherSet.difference(set).print(); // 2,5,7,8
console.log(otherSet.isSubsetOf(set)); // false
```
