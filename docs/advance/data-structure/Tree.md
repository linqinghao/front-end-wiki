# 树

## 树数据结构

**树**是一种分层数据的抽象模型。在现实中，家谱或者公司的组织结构与树的数据结构非常相似。

## 树的相关术语

一个树结构包含一系列存在父子关系的节点。每个节点都有一个父节点（除了根节点）以及零个或多个节点。

位于树顶部的节点叫作**根节点**。它没有父节点。树中的每个元素都叫作节点，节点分为内部节点和外部节点。至少有一个子节点的节点被称为**内部节点**。没有子元素的节点称为**外部节点或者叶子节点**。

**子树**由节点和它的后代构成。

节点的**深度**取决于它的祖先节点的数量。

## 二叉树

**二叉树**中的节点最多只能有两个子节点：一个是左侧子节点，另一个是右侧子节点。

## 二叉搜索树

### 介绍

**二叉搜索树**是二叉树的一种，但是它只允许在左侧节点存储（比父节点）小的值，在右侧节点存储（比父节点）大的值。

实现二叉搜索树的数据结构以及以下方法：

- `insert(key)`：向树中插入一个新的键。
- `search(key)`：在树中查找一个键，如果节点存在，则返回 true；如果不存在，则返回 false。
- `inOrderTraverse`：通过中序遍历方式遍历所有节点。
- `preOrderTraverse`：通过先序遍历方式遍历所有节点。
- `postOrderTraverse`：通过后序遍历方式遍历所有节点。
- `min`：返回树中最小的值/键。
- `max`：返回树中最大的值/键。
- `remove(key)`：从树中移除某个键。

### 实现

```js
class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    // 根节点
    this.root = null;
  }

  insert(key) {
    let node = new Node(key);
    if (this.root === null) {
      this.root = node;
    } else {
      this._insertNode(this.root, node);
    }
  }

  max(node) {
    node = node || this.root;
    while (node && node.right !== null) {
      node = node.right;
    }
    return node;
  }

  min(node) {
    node = node || this.root;
    while (node && node.left !== null) {
      node = node.left;
    }
    return node;
  }

  search(key, node) {
    node = node || this.root;
    return this._searchNode(key, node);
  }

  remove(key, node) {
    node = node || this.root;
    return this._removeNode(key, node);
  }

  preOrderTraverse(cb) {
    this._preOrderTraverseNode(this.root, cb);
  }

  inOrderTraverse(cb) {
    this._inOrderTraverseNode(this.root, cb);
  }

  postOrderTraverse(cb) {
    this._postOrderTraverseNode(this.root, cb);
  }

  _preOrderTraverseNode(node, cb) {
    if (node !== null) {
      cb(node.key);
      this._preOrderTraverseNode(node.left, cb);
      this._preOrderTraverseNode(node.right, cb);
    }
  }

  _inOrderTraverseNode(node, cb) {
    if (node !== null) {
      this._inOrderTraverseNode(node.left, cb);
      cb(node.key);
      this._inOrderTraverseNode(node.right, cb);
    }
  }

  _postOrderTraverseNode(node, cb) {
    if (node !== null) {
      this._postOrderTraverseNode(node.left, cb);
      this._postOrderTraverseNode(node.right, cb);
      cb(node.key);
    }
  }

  _removeNode(key, node) {
    if (node == null) {
      return false;
    }

    node = this.search(key, node);

    if (node.left === null && node.right === null) {
      node = null;
      return node;
    }

    if (node.left == null) {
      node = node.right;
      return node;
    } else if (node.right == null) {
      node = node.left;
      return node;
    }

    let minNode = this.min(node.right);

    node.key = minNode.key;

    node.right = this._removeNode(minNode.key, node.right);

    return node;
  }

  _searchNode(key, node) {
    if (node == null) {
      return false;
    }
    if (key < node.key) {
      return this._searchNode(node.left, key);
    } else if (key > node.key) {
      return this._searchNode(node.right, key);
    } else {
      return node;
    }
  }

  _insertNode(node, newNode) {
    if (node.key > newNode.key) {
      // 左查找
      if (node.left === null) {
        node.left = newNode;
      } else {
        this._insertNode(node.left, newNode);
      }
    } else {
      // 右查找
      if (node.right === null) {
        node.right = newNode;
      } else {
        this._insertNode(node.right, newNode);
      }
    }
  }
}
```

测试结果：

```js
const tree = new BinarySearchTree();

tree.insert(10);
tree.insert(9);
tree.insert(6);
tree.insert(2);
tree.insert(11);
tree.insert(20);
tree.insert(41);

tree.inOrderTraverse(console.log);

// 2
// 6
// 9
// 10
// 11
// 20
// 41
```
