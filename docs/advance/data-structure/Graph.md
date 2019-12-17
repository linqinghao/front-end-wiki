# 图

## 图的介绍

![无向图-2019-12-16.png](https://allin-bucket.oss-cn-beijing.aliyuncs.com/blog/无向图-2019-12-16.png?x-oss-process=style/alin)

图和散列表、二叉树一样，是一种非线性数据结构。**图**由一系列顶点以及连接顶点的边构成。由一条边连接在一起的顶点成为**相邻顶点**。比如上图中 A 与 B 是相邻的，A 与 E 是不相邻的。一个顶点相邻顶点的数量叫作**度**。比如上图与 A 相邻的顶点有三个，所以它的度是 3。如果图中每两个顶点之间都有路径相连，则称该图是连通的。如果图中的边是双向的，则该图是强连通的。

![有向图-2019-12-16.png](https://allin-bucket.oss-cn-beijing.aliyuncs.com/blog/有向图-2019-12-16.png?x-oss-process=style/alin)

如果图中的边具有方向，称该图为有向图。如果图中的边是双向的，则该图是强连通的。如上图中的 C 和 D 就是强联通的。

![加权图-2019-12-16.png](https://allin-bucket.oss-cn-beijing.aliyuncs.com/blog/加权图-2019-12-16.png?x-oss-process=style/alin)

并且，图是可以加权的。如上图边上的数字代表权值。

## 图的表示

图的表示方式有多种，没有绝对正确的表示方式，采用哪种方式取决于图的类型和待解决的问题。这里介绍三种方式：邻接矩阵、邻接表、关联矩阵。

1. 邻接矩阵

**邻接矩阵**用一个**二维数组**来表示图中顶点的连接情况；如果索引为 i 的节点和索引为 j 的节点连接，则`array[i][j] === 1`，否则`array[i][j] === 0`。邻接矩阵的缺点是，如果图不是强连通的，矩阵中就会出现很多 0，从而计算机需要浪费存储空间来表示根本不存在的边。

![图的表示-邻接矩阵-2019-12-16.png](https://allin-bucket.oss-cn-beijing.aliyuncs.com/blog/图的表示-邻接矩阵-2019-12-16.png?x-oss-process=style/alin)

2. 邻接表

**邻接表**由图中每个顶点的相邻顶点的列表所组成。只要能表示一对多的数据结构，都可以用来描述邻接表，比如多维列表（数组）、链表、散列表、字典等。在大多数情况下，邻接表是更好的选择，但邻接矩阵也有其优点，比如要判断顶点 A 和 B 是否相邻，邻接矩阵比邻接表要快。

![图的表示-邻接表-2019-12-16.png](https://allin-bucket.oss-cn-beijing.aliyuncs.com/blog/图的表示-邻接表-2019-12-16.png?x-oss-process=style/alin)

3. 关联矩阵

在**关联矩阵**表示的图中，矩阵的行表示顶点，列表示边。如下图所示，我们使用**二维数组**来表示两者之间的连通性，如果顶点 A 是边 E 的入射点，则`array[A][E] === 1`；否则，`array[A][E] === 0`。关联矩阵通常用于边的数量比顶点少的情况下，以节省空间和内存。

![图的表示-关联矩阵-2019-12-16.png](https://allin-bucket.oss-cn-beijing.aliyuncs.com/blog/图的表示-关联矩阵-2019-12-16.png?x-oss-process=style/alin)

## 图的实现

实现图的数据结构以及以下方法：

- `addVertex(v)`: 添加顶点
- `addEdge(a, b)`: 添加边
- `getVerties()`： 获取所有顶点
- `getAdjList()`： 获取图
- `print()`： 打印图

```js
class Graph {
  constructor() {
    this.vertices = [];
    this.adjList = new Dictionary();
  }

  // 添加顶点
  addVertex(v) {
    if (!this.vertices.includes(v)) {
      this.vertices.push(v);
      this.adjList.set(v, []);
    }
  }

  // 添加边
  addEdge(a, b) {
    if (!this.adjList.get(a)) {
      this.addVertex(a);
    }
    if (!this.adjList.get(b)) {
      this.addVertex(b);
    }
    this.adjList.get(a).push(b);
    this.adjList.get(b).push(a);
  }

  // 获取所有顶点
  getVertices() {
    return this.vertices;
  }

  // 获取图
  getAdjList() {
    return this.adjList;
  }

  toString() {
    let s = '';
    for (let i = 0; i < this.vertices.length; i++) {
      s += `${this.vertices[i]} -> `;
      const neighbors = this.adjList.get(this.vertices[i]);
      for (let j = 0; j < neighbors.length; j++) {
        s += `${neighbors[j]} `;
      }
      s += '\n';
    }
    return s;
  }

  print() {
    console.log(this.toString());
  }
}
```

测试结果：

```js
const graph = new Graph();

const vertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

vertices.forEach(item => graph.addVertex(item));

graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('B', 'E');
graph.addEdge('B', 'F');
graph.addEdge('E', 'I');
graph.addEdge('C', 'D');
graph.addEdge('C', 'G');
graph.addEdge('D', 'H');

graph.print();

// Output:
// A -> B C D
// B -> A E F
// C -> A D G
// D -> A C H
// E -> B I
// F -> B
// G -> C
// H -> D
// I -> E
```

## 图的遍历

有两种算法可以对图进行遍历：**广度优先搜索**（Breadth-First Search，BFS）和**深度优先搜索**（Depth-First Search，DFS）。图遍历可以用来寻找特定的顶点或寻找两个顶点之间的路径，检查图是否连通，检查图是否含有环等。
图遍历算法的思路是追踪每个第一次访问的节点，并且追踪有哪些节点还没有被完全探索。对于两种图遍历算法，都需要明确指出第一个被访问的顶点。
完全探索一个顶点需要查看该顶点的每一条边。对于每一条边所连接的没有被访问过的顶点，将其标注为被发现的，并将其加进待访问顶点列表中。
我们用三种状态来反映顶点的状态：

- 白色：表示该顶点还没有被访问。
- 灰色：表示该顶点被访问过，但并未被探索过。
- 黑色：表示该顶点被访问过且被完全探索过。

因为只有这三种状态，初始状态是白色，因此每个顶点至多访问两次，这样做能够保证算法的效率。
广度优先搜索算法和深度优先搜索算法基本上是相同的，只是待访问顶点列表的数据结构不同。
广度优先搜索算法：数据结构是**队列**。通过将顶点存入队列中，最先入队列的顶点先被探索。
深度优先搜索算法：数据结构是**栈**。通过将顶点存入栈中，沿着路径探索顶点，存在新的相邻顶点就去访问。

### 广度优先算法

广度优先搜索算法会从指定的第一个顶点开始遍历图，先访问其所有的相邻点，就像一次访问图的一层。换句话说，就是先宽后深地访问顶点。

![图的遍历-广度优先-2019-12-16.png](https://allin-bucket.oss-cn-beijing.aliyuncs.com/blog/图的遍历-广度优先-2019-12-16.png?x-oss-process=style/alin)

从顶点 v 开始的广度优先搜索的步骤如下：

- 创建一个队列 Q。
- 将 v 标注为被发现的（灰色） ，并将 v 入队列 Q。
  如果 Q 非空，则运行以下步骤：

  - 将 u 从队列 Q 中取出
  - 将 u 标注为被发现的（灰色）
  - 将 u 所有未被访问过的邻节点（白色）加入队列
  - 将 u 标注为已被探索的（黑色）

1. 实现

```js
const COLOR = {
  WHITE: 0,
  GREY: 1,
  BLACK: 2,
};

const initializeColor = function(vertices) {
  const color = {};
  for (let i = 0; i < vertices.length; i++) {
    color[vertices[i]] = COLOR.WHITE;
  }
  return color;
};

const breadthFirstSearch = function(graph, startVertex, cb) {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();
  const color = initializeColor(vertices);

  const queue = new Queue();

  queue.enqueue(startVertex);

  while (!queue.isEmpty()) {
    const u = queue.dequeue();

    const neigbours = adjList.get(u);

    color[u] = COLOR.GREY;

    for (let i = 0; i < neigbours.length; i++) {
      const w = neigbours[i];
      if (color[w] == COLOR.WHITE) {
        color[w] = COLOR.GREY;
        queue.enqueue(w);
      }
    }

    color[u] = COLOR.BLACK;

    cb && cb(u);
  }
};
```

测试结果:

```js
const graph = new Graph();

const vertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

vertices.forEach(item => graph.addVertex(item));

graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('B', 'E');
graph.addEdge('B', 'F');
graph.addEdge('E', 'I');
graph.addEdge('C', 'D');
graph.addEdge('C', 'G');
graph.addEdge('D', 'H');

breadthFirstSearch(graph, 'A', console.log);

// Output:
// A
// B
// C
// D
// E
// F
// G
// H
// I
```

2. 使用 BFS 寻找最短路径

由于广度优先算法是一层层往下遍历的，即先访问与起始顶点距离为 1 的点，再访问距离为 2 的点，以此类推。

```js
const BFS = (graph, startVertex) => {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();
  const color = initializeColor(vertices);
  const queue = new Queue();
  const distances = {};
  const predecessors = {};
  queue.enqueue(startVertex);
  for (let i = 0; i < vertices.length; i++) {
    distances[vertices[i]] = 0;
    predecessors[vertices[i]] = null;
  }
  while (!queue.isEmpty()) {
    const u = queue.dequeue();
    const neighbors = adjList.get(u);
    color[u] = COLOR.GREY;
    for (let i = 0; i < neighbors.length; i++) {
      const w = neighbors[i];
      if (color[w] === COLOR.WHITE) {
        color[w] = COLOR.GREY;
        distances[w] = distances[u] + 1;
        predecessors[w] = u;
        queue.enqueue(w);
      }
    }
    color[u] = COLOR.BLACK;
  }
  return {
    distances,
    predecessors,
  };
};
```

测试结果：

```js
console.log(BFS(graph, 'A'));

// Output:
// { distances: { A: 0, B: 1, C: 1, D: 1, E: 2, F: 2, G: 2, H: 2, I: 3 },
//   predecessors:
//    { A: null,
//      B: 'A',
//      C: 'A',
//      D: 'A',
//      E: 'B',
//      F: 'B',
//      G: 'C',
//      H: 'D',
//      I: 'E'
//    }
// }
```

3. 其他最短路径算法

对于加权图的最短路径，广度优先算法可能并不合适。比如，Dijkstra’s 算法可以解决单源最短路径问题。Bellman–Ford 算法解决了边权值为负的单源最短路径问题。A\*搜索算法解决了求仅一对顶点间的最短路径问题，它用经验法则来加速搜索过程。Floyd–Warshall 算法解决了求所有顶点对间的最短路径这一问题。

### 深度优先算法

**深度优先搜索算法**会从第一个指定的顶点开始遍历图，沿着路径直到这条路径最后一个顶点，接着原路回退并探索下一条路径。换句话说，它是先深度后广度地访问顶点。

![图的遍历-深度优先-2019-12-16.png](https://allin-bucket.oss-cn-beijing.aliyuncs.com/blog/图的遍历-深度优先-2019-12-16.png?x-oss-process=style/alin)

1. 实现

```js
const depthFirstSearch = function(graph, cb) {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();
  const color = initializeColor(vertices);

  for (let i = 0; i < vertices.length; i++) {
    if (color[vertices[i]] === COLOR.WHITE) {
      depthVisit(vertices[i], color, adjList, cb);
    }
  }

  function depthVisit(vertex, color, adjList, cb) {
    color[vertex] = COLOR.GREY;
    cb && cb(vertex);
    const neighbors = adjList.get(vertex);
    for (let i = 0; i < neighbors.length; i++) {
      const w = neighbors[i];
      if (color[w] === COLOR.WHITE) {
        depthVisit(w, color, adjList, cb);
      }
    }
    color[vertex] = COLOR.BLACK;
  }
};
```

测试结果：

```js
const graph = new Graph();

const vertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

vertices.forEach(item => graph.addVertex(item));

graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('B', 'E');
graph.addEdge('B', 'F');
graph.addEdge('E', 'I');
graph.addEdge('C', 'D');
graph.addEdge('C', 'G');
graph.addEdge('D', 'H');

depthFirstSearch(graph, console.log);

// Output:
// A
// B
// E
// I
// F
// C
// D
// H
// G
```

2. 搜索时间

给定一个图 G，要得到任意顶点 u 的发现时间（d[u]）以及完成对该顶点的搜索时间（f[u]）。

```js
const DFS = function(graph) {
  const vertices = graph.getVertices();
  const adjList = graph.getAdjList();
  const color = initializeColor(vertices);
  const d = {};
  const f = {};
  const p = {};
  const time = { count: 0 };
  for (let i = 0; i < vertices.length; i++) {
    f[vertices[i]] = 0;
    d[vertices[i]] = 0;
    p[vertices[i]] = null;
  }
  for (let i = 0; i < vertices.length; i++) {
    if (color[vertices[i]] === COLOR.WHITE) {
      DFSVisit(vertices[i], color, d, f, p, time, adjList);
    }
  }

  function DFSVisit(u, color, d, f, p, time, adjList) {
    color[u] = COLOR.GREY;
    d[u] = ++time.count;
    const neighbors = adjList.get(u);
    for (let i = 0; i < neighbors.length; i++) {
      const w = neighbors[i];
      if (color[w] === COLOR.WHITE) {
        p[w] = u;
        DFSVisit(w, color, d, f, p, time, adjList);
      }
    }
    color[u] = COLOR.BLACK;
    f[u] = ++time.count;
  }
  return {
    discovery: d,
    finished: f,
    predecessors: p,
  };
};
```

测试结果：

```js
console.log(DFS(graph));

// Output:
// { discovery: { A: 1, B: 2, C: 10, D: 11, E: 3, F: 7, G: 15, H: 12, I: 4 },
//   finished: { A: 18, B: 9, C: 17, D: 14, E: 6, F: 8, G: 16, H: 13, I: 5 },
//   predecessors:
//   {
//      A: null,
//      B: 'A',
//      C: 'A',
//      D: 'C',
//      E: 'B',
//      F: 'B',
//      G: 'C',
//      H: 'D',
//      I: 'E'
//   }
// }
```
