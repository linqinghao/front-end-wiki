# 散列表

## 介绍

**散列表**与字典很相似，不过键名是通过特定的**散列算法**生成的。散列函数的作用是给定一个键值，然后返回值在表中的地址。

一个表现良好的散列函数是由几个方面构成的：插入和检索元素的时间（即性能）。最常见的散列函数：

```js
let djb2HashCode = function(key) {
  let hash = 5381;
  for (let i = 0; i < key.length; i++) {
    hash = hash * 33 + key.charCodeAt(i);
  }
  return hash % 1013;
};
```

实现散列表的数据结构以及以下方法：

- `put(key, value)`: 向散列表增加一个新的项。
- `remove(key)`：根据键值从散列表中移除值。
- `get(key)`：返回根据键值检索到的值。
- `clear()`：清空散列表
- `isEmpty()`：判断散列表是否包含项。
- `size()`：返回散列表包含项的数量。
- `print()`：以二维数组形式打印散列表。

## 实现

```js
class HashTable {
  constructor() {
    this.hashTable = {};
  }
  // 散列函数
  djb2HashCode(key) {
    let hash = 5381;
    for (let i = 0; i < key.length; i++) {
      hash = hash * 33 + key.charCodeAt(i);
    }
    return hash % 1013;
  }

  hashCode(key) {
    return this.djb2HashCode(key);
  }

  put(key, value) {
    if (key !== null && value !== null) {
      const position = this.hashCode(key);
      this.hashTable[position] = value;
      return true;
    }
    return false;
  }

  get(key) {
    const position = this.hashCode[key];
    return this.hashTable[position] == null ? undefined : this.hashTable[position];
  }

  remove(key) {
    const position = this.hashCode[key];
    if (this.hashTable[position] != null) {
      delete this.hashTable[position];
      return true;
    }
    return false;
  }

  clear() {
    this.hashTable = {};
  }

  isEmpty() {
    return Object.keys(this.hashTable).length === 0;
  }

  size() {
    return Object.keys(this.hashTable).length;
  }

  print() {
    console.log(Object.entries(this.hashTable));
  }
}
```

测试结果：

```js
let hashTable = new HashTable();

hashTable.put('name', 'alin');
hashTable.put('nation', 'china');

hashTable.print(); // [ [ '61', 'alin' ], [ '944', 'china' ] ]

hashTable.remove('nation');
console.log(hashTable.get('nation')); // undefined
```
