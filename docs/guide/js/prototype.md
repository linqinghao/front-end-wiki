# 原型与继承

## 一、JS 中的原型与原型链

### `[[Prototype]]`与原型

`[[Prototype]]` 引用的对象就叫做**原型**。

在 JS 中，对象有一个特殊的隐藏属性 `[[Prototype]]`（规范中命名的），其取值为 `null` 或者为另一个对象的引用，该对象就被称为**原型**。

作用：当我们想要从 `object` 中读取一个缺失的属性时，JS 会自动从原型中获得它。

读取：`[[Prototype]]` 是内部的属性并且是隐藏的，但是可以通过 `__proto__` 访问它。该属性是个访问器属性（即 getters/setters）。

### 函数原型`prototype`

当用 `new F()` 创建一个新对象时，该对象的 `[[Prototype]]` 被设置为 `F.prototype`。

每个函数都有 `prototype` 属性。默认的 `"prototype"` 是一个只有属性 `constructor` 的对象，它指向函数本身。

### 原型链

首先是这张经典的图，能够看懂已经明白 JS 中的原型之间的关系了。

![js-prototype-原型链-2019-12-7.jpg](https://allin-bucket.oss-cn-beijing.aliyuncs.com/blog/js-prototype-原型链-2019-12-7.jpg?x-oss-process=style/alin)

### 原型方法

获取与设置原型的方法：

- `Object.create(proto[, descriptors])`: 利用 `proto` 作为 `[[Prototype]]` 和可选的属性描述来创建一个空对象。
- `Object.getPrototypeOf(obj)`: 返回 `obj` 对象的 `[[Prototype]]`。
- `Object.setPrototypeOf(obj, proto)`: 将 `obj` 对象的 `[[Prototype]]` 设置为 `proto`。

## 二、new 对象的过程与模拟实现

```js
function Foo(age) {
  this.age = age;
}

var o = new Foo(111);
console.log(o);
```

1. 详细过程:

- 创建 ECMAScript 原生对象 `obj`;
- 给`obj`设置原生对象的内部属性;（和原型属性不用，内部属性表示为 `[[PropertyName]]`，两个方括号包裹属性名，并且属性名大写，比如常见 `[[Prototype]]`、`[[Constructor]]`）;
- 设置 `obj` 的内部属性 `[[Class]]` 为 `Object`；
- 设置 `obj` 的内部属性 `[[Extensible]]` 为 `true`；
- 将 `proto` 的值设置为 `F` 的 `prototype` 属性值；
- 如果 `proto` 是对象类型，则设置 `obj` 的内部属性 `[[Prototype]]` 值为 `proto`；（进行原型链关联，实现继承的关键）
- 如果`proto`不是对象类型，则设置 `obj` 的内部属性`[[Prototype]]`值为内建构造函数 `Object` 的 `prototype` 值；（函数 `prototype` 属性可以被改写，如果改成非对象类型，obj 的 `[[Prototype]]`就指向 `Object` 的原型对象）
- 调用函数`F`，将其返回值赋给 result；其中， `F`  执行时的实参为传递给`[[Construct]]`（即 `F`  本身） 的参数， `F`  内部`this`指向`obj`；
- 如果 result 是 `Object`类型，返回 result；
- 如果 `F` 返回的不是对象类型，则返回创建的对象`obj`。

2. 简洁描述：

若执行 `new Foo()`，过程如下：

- 创建新对象 `o`；
- 给新对象的内部属性赋值，关键是给 `[[Protoype]]` 属性赋值，构造原型链（如果构造函数的原型是 `Object` 类型，则指向构造函数的原型；不然指向 `Object` 对象的原型）;
- 执行函数 `Foo`，执行过程中内部 `this` 指向新创建的对象 `o`;
- 如果 `Foo` 内部显示返回对象类型数据，则，返回该数据，执行结束；不然返回新创建的对象 `o`；

3. `new` 的意义：

通过 `new` 创建的 **对象** 和 **构造函数** 之间建立了一条原型链，原型链的建立，让原本孤立的对象有了依赖关系和继承能力，让 JavaScript 对象能以更合适的方式来映射真实世界里的对象，这是面向对象的本质。

4. 模拟实现过程：

> 参考实现来自: https://github.com/mqyqingfeng/Blog/issues/13

```js
function objectFactory() {
  var obj = new Object(),
    Constructor = [].shift.call(arguments);

  obj.__proto__ = Constructor.prototype;

  var ret = Constructor.apply(obj, arguments);

  return typeof ret === 'object' ? ret : obj;
}
```

注意： 箭头函数不能使用 `new` 关键字。原因是箭头函数中没有 `[[Construct]]` 方法，不能使用 `new` 调用，会报错。

## 三、实现继承的方式以及优缺点

1. 原型链继承

```js
function Parent() {
  this.name = 'kevin';
}

Parent.prototype.getName = function() {
  console.log(this.name);
};

function Child() {}

Child.prototype = new Parent();

var child1 = new Child();

console.log(child1.getName()); // kevin
```

问题：

- 引用类型的属性被所有实例共享。
- 在创建 Child 的实例时，无法向 Parent 传参。

2. 经典继承（借用构造函数）

```js
function Parent() {
  this.names = ['kevin', 'daisy'];
}

function Child() {
  Parent.call(this);
}

var child1 = new Child();

child1.names.push('yayu');

console.log(child1.names); // ["kevin", "daisy", "yayu"]

var child2 = new Child();

console.log(child2.names); // ["kevin", "daisy"]
```

优点：

- 避免了引用类型的属性被所有实例共享。
- 可以在 Child 中向 Parent 传参。

缺点：

方法都在构造函数中定义，每次创建实例都会创建一遍方法。

3. 组合继承

```js
function Parent(name) {
  this.name = name;
  this.colors = ['red', 'blue', 'green'];
}

Parent.prototype.getName = function() {
  console.log(this.name);
};

function Child(name, age) {
  Parent.call(this, name);

  this.age = age;
}

Child.prototype = new Parent();
Child.prototype.constructor = Child;

var child1 = new Child('kevin', '18');

child1.colors.push('black');

console.log(child1.name); // kevin
console.log(child1.age); // 18
console.log(child1.colors); // ["red", "blue", "green", "black"]

var child2 = new Child('daisy', '20');

console.log(child2.name); // daisy
console.log(child2.age); // 20
console.log(child2.colors); // ["red", "blue", "green"]
```

优点：融合原型链继承和构造函数的优点，是 JavaScript 中最常用的继承模式。

4. 原型式继承

```js
function createObj(o) {
  function F() {}
  F.prototype = o;
  return new F();
}
```

`Object.create`的模拟实现，将传入的对象作为创建的对象的原型。

缺点：

包含引用类型的属性值始终都会共享相应的值，这点跟原型链继承一样。

5. 寄生式继承

创建一个仅用于封装继承过程的函数，该函数在内部以某种形式来做增强对象，最后返回对象。

```js
function createObj(o) {
  var clone = Object.create(o);
  clone.sayName = function() {
    console.log('hi');
  };
  return clone;
}
```

缺点：跟借用构造函数模式一样，每次创建对象都会创建一遍方法。

6. 寄生组合式继承

```js
function Parent(name) {
  this.name = name;
  this.colors = ['red', 'blue', 'green'];
}

Parent.prototype.getName = function() {
  console.log(this.name);
};

function Child(name, age) {
  Parent.call(this, name);
  this.age = age;
}

// 关键的三步
var F = function() {};

F.prototype = Parent.prototype;

Child.prototype = new F();

var child1 = new Child('kevin', '18');

console.log(child1);
```

最后我们封装一下这个继承方法：

```js
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

function prototype(child, parent) {
  var prototype = object(parent.prototype);
  prototype.constructor = child;
  child.prototype = prototype;
}

// 当我们使用的时候：
prototype(Child, Parent);
```

这种方式的高效率体现它只调用了一次 `Parent` 构造函数，并且因此避免了在 `Parent.prototype` 上面创建不必要的、多余的属性。与此同时，原型链还能保持不变；因此，还能够正常使用 `instanceof` 和 `isPrototypeOf`。开发人员普遍认为寄生组合式继承是引用类型最理想的继承范式。

## 四、ES6 中的 Class 以及继承的底层实现原理

在面向对象的编程中，class 是用于创建对象的可扩展的程序代码模版，它为对象提供了状态（成员变量）的初始值和行为（成员函数和方法）的实现。

### 1. ES6 类

```js
class Person {
  static head = 1;
  constructor(name) {
    this.name = name;
  }
  sayName() {
    console.log(this.name);
  }
}
```

类与构造函数的差异：

1. 通过 `class` 创建的函数是由特殊内部属性标记的 `[[FunctionKind]]：“classConstructor”`
1. 调用类构造器需要 `new` 关键字，否则会报错。
1. 类方法不可枚举。
1. 类默认使用 `"use strict"`。在类构造函数中的所有方法自动使用严格模式。

### 2. ES6 类的实现

```js
class Parent {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  speakSomething() {
    console.log('I can speek chinese');
  }
}
```

借助 babel 转换后：

```js
'use strict';

// 创建类
var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

// 判断当前实例是否在类构造器的原型链上，防止构造函数作为普通函数直接执行
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

var Parent = (function() {
  function Parent(name, age) {
    _classCallCheck(this, Parent);

    this.name = name;
    this.age = age;
  }

  _createClass(Parent, [
    {
      key: 'speakSomething',
      value: function speakSomething() {
        console.log('I can speek chinese');
      },
    },
  ]);

  return Parent;
})();
```

ES6 的类底层还是使用构造函数去创建的。核心是通过 `_createClass` 方法，它通过 `Object.defineProperty` 方法给 `Parent` 添加属性。实例属性会添加到 `Constructor.prototype`，静态属性会添加到构造函数 `Constructor` 上。

### 3. 类的继承

1. 在 ES6 中是使用 `extend` 关键字来实现类的继承。

```js
class Parent {
  static height = 12;
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  speakSomething() {
    console.log('I can speek chinese');
  }
}
Parent.prototype.color = 'yellow';

//定义子类，继承父类
class Child extends Parent {
  static width = 18;
  constructor(name, age) {
    super(name, age);
  }
  coding() {
    console.log('I can code JS');
  }
}

var c = new Child('job', 30);
c.coding();
```

上面例子上，`extends` 做了以下这些事情：

1. 将 `Child.prototype.__proto__` 指向了 `Parent.prototype`，实现公有属性和方法的继承。
2. 将 `Child.__proto__` 指向了 `Parent` ，即 `B.[[Prototype]] = A`，实现了静态属性和方法的继承。

:::tip 注意
继承类的构造函数必须调用 `super(...)`，并且要在 `this` 之前调用。

这是因为在继承类中，相应的构造函数会被标记为特殊的内部属性 `[[ConstructorKind]]:"derived"`。当一个普通构造函数执行时，它会创建一个空对象作为 `this` 并继续执行。

但是当继承的构造函数执行时，它并不会做这件事。它期望父类的构造函数来完成这项工作。因此，如果我们构建了我们自己的构造函数，我们必须调用 `super`，因为如果不这样的话 `this` 指向的对象不会被创建。并且我们会收到一个报错。
:::

2. 方法的重写

在子类中，我们可以使用 `super.method()` 调用父类的方法，并且根据需要重写子类的方法。

`super` 解析父类方法是用过方法在内部的 `[[HomeObject]]` 属性来实现的。而不是通过`this.__proto__` 访问原型对象。当一个函数被定义为类或者对象方法时，它的 `[[HomeObject]]` 属性就被赋值为那个对象。

### 4. 继承的底层实现原理

**寄生组合式继承**

上面继承的例子通过`babel`转换后如下：

```js
'use strict';

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === 'object' || typeof call === 'function') ? call : self;
}
// 继承
function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError(
      'Super expression must either be null or a function, not ' + typeof superClass
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

var Parent = (function() {
  function Parent(name, age) {
    _classCallCheck(this, Parent);

    this.name = name;
    this.age = age;
  }

  _createClass(Parent, [
    {
      key: 'speakSomething',
      value: function speakSomething() {
        console.log('I can speek chinese');
      },
    },
  ]);

  return Parent;
})();

Parent.height = 12;

Parent.prototype.color = 'yellow';

//定义子类，继承父类

var Child = (function(_Parent) {
  _inherits(Child, _Parent);

  function Child(name, age) {
    _classCallCheck(this, Child);

    return _possibleConstructorReturn(
      this,
      (Child.__proto__ || Object.getPrototypeOf(Child)).call(this, name, age)
    );
  }

  _createClass(Child, [
    {
      key: 'coding',
      value: function coding() {
        console.log('I can code JS');
      },
    },
  ]);

  return Child;
})(Parent);

Child.width = 18;

var c = new Child('job', 30);
c.coding();
```

上面例子上，`_inherits` 就是用来实现继承，其核心思想类似于下面：

```js
subClass.prototype.__proto__ = superClass.prototype;
subClass.__proto__ = superClass;
```

方法内部实现的原理同寄生组合式继承是大同小异的。

```js
function F() {}
F.prototype = superClass.prototype;
subClass.prototype = new F();
subClass.prototype.constructor = subClass;
```
