# 字典

## 介绍

**字典**存储的是 **[键，值]** 对，其中键名是用来查询特定元素的。

实现字典的数据结构以及以下方法：

- `set(key, value)`：向字典中添加新元素。
- `remove(key)`：通过使用键值从字典中移除键值对应的数据。
- `hasKey(key)`：如果某个键值存在与这个字典中，则返回 true，反之则返回 false。
- `get(key)`：通过键值查找特定的数值并返回。
- `clear()`：将这个字典中的所有元素删除。
- `size()`：返回字典所包含元素的数量。
- `keys()`：将字典所包含的所有键名以数组形式返回。
- `values()`：将字典所包含的所有数值以数组形式返回。
- `print()`：以二维数组形式打印字典。

## 实现

```js
class Dictionary {
  constructor() {
    this.dict = {};
  }

  set(key, value) {
    if (key !== null && value !== null) {
      this.dict[key] = value;
      return true;
    }
    return false;
  }

  remove(key) {
    if (this.hasKey(key)) {
      delete this.dict[key];
      return true;
    }
    return false;
  }

  hasKey(key) {
    return this.dict[key] !== null;
  }

  get(key) {
    return this.hasKey(key) ? this.dict[key] : undefined;
  }

  clear() {
    this.dict = {};
  }

  size() {
    return Object.keys(this.dict).length;
  }

  keys() {
    return Object.keys(this.dict);
  }

  values() {
    return Object.values(this.dict);
  }

  print() {
    console.log(Object.entries(this.dict));
  }
}
```

测试结果：

```js
let dict = new Dictionary();

dict.set('name', 'alin');
dict.set('gender', 'male');
dict.set('nation', 'china');

dict.print(); // [ [ 'name', 'alin' ], [ 'gender', 'male' ], [ 'nation', 'china' ] ]
dict.remove('gender');
console.log(dict.hasKey('gender')); // true
console.log(dict.size()); // 2
```
