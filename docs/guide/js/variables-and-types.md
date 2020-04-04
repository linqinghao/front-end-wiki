# 变量与类型

## 一、JS 变量在内存中的存储形式

在 JS 中，变量分为**基本类型**和**引用类型**。基本类型是保存在栈内存中的简单数据段，它们的值都有**固定的大小**，保存在**栈空间**，通过**按值访问**。引用类型是保存在堆内存中的对象，**值大小不固定**，栈内存中存放的该对象的访问地址指向堆内存中的对象，JS 中不允许直接访问堆内存中的为位置。因此操作对象时，实际操作对象的引用。

## 二、JS 的数据类型

Javascript 有 8 种数据类型：

- `number` 类型：整数或浮点数。依据 IEEE 754 标准，使用的是 64 位双精度浮点数存储。
- `string` 字符串：由一组 UTF16 编码组成，范围在 0~65536(U+0000 ~U+FFFF)之间。
- `boolean` 布尔值：二元判断，只有`true`和`false`
- `null`: 无、未知
- `undefined`: 表示未定义。不是保留字，内层作用域可以被覆写。
- `symbol`: 用于唯一的标识符。
- `object` 对象：一般是键值对的形式。
- `BigInt`：可以表示任意大的整数。

::: tip 提示
`function` 是一种数据类型吗？
根据 spec 规范，它不是。虽然 `typeof function() {}; // function`，但是`typeof`是一个运算符，其返回值不能作为 js 类型系统的依据。`function`比较特殊，它同样具有`object`的特性。
:::

## 三、基本类型的拆箱与装箱操作

### **装箱**

装箱，是指将基本类型转换为对应的引用类型的操作。分为**显式装箱**和**隐式装箱**。

1. 隐式装箱

```js
var s1 = 'alin';
var s2 = s1.substring(2);
```

上述代码的执行步骤：

- 创建 `String`类型的一个实例
- 在实例中调用该方法
- 销毁该实例

2. 显式装箱

通过**基本包装类型对象**对基本类型进行显示装箱。

```js
var str = new String('alin');
```

显式装箱可以对 `new` 出来的对象进行属性和方法的添加。

因为通过 `new` 操作符创建的引用类型的实例，在执行流离开当前作用域之间会一直保留在内存中。

### **拆箱**

拆箱，是指把引用类型转换为基本类型。通过引用类型的 `valueOf()` 和 `toString` 方法实现。

::: tip 提示
在 Javascript 标准中，规定了 `ToPrimitive` 方法，它是对象类型到基本类型转换的实现者。
:::

对象到 `String` 和 `Number` 的转换遵循“先拆箱后转换”的规则。

「拆箱转换」的调用规则及顺序如下：

1. 检查对象是否有用户定义的 `[Symcol.toPrimitive]` 方法，如果有，直接调用。
2. 如果没有，执行原函数内部的 `ToPrimitive`，然后判断传入 `hint` 值，如果其值为 `string`, 顺序调用对象的 `toString` 和 `valueOf` 方法（若 `toString` 方法返回一个基本类型值，则返回，终止运算，否则继续调用 `valueOf` 方法）。
3. 如果传入的 `hint` 值不为 `string`，则可能为 `number` 或者 `default`，均会顺序调用对象的 `valueOf` 和 `toString` 方法（其中 `valueOf` 方法一定会执行，若返回基本类型值，则返回并终止运算，否则继续调用 `toString` 方法）。

```js
const b = {
  [Symbol.toPrimitive](hint) {
    console.log(`hint: ${hint}`);
    return {};
  },
  toString() {
    console.log('toString');
    return 1;
  },
  valueOf() {
    console.log('valueOf');
    return 2;
  },
};
alert(b); // Output: hint: string

b + ''; // Output: hint: default

b + 500; // Output: hint: default

+b; // Output: hint number

b * 1; // Output: hint number
```

`hint`: 取决与上下文，转换具有所谓的“暗示”。

- `string`: 当一个操作期望一个字符串时
- `number`: 当一操作期望一个数字时
- `default`: 少数情况下，当操作者不确定期望的类型时，比如一个 `+` 运算符可用于字符串连接或者数字相加时，或者当一个对象用 `==` 与一个字符串、数字进行比较时。

::: tip 提示
在实践中，为了记录和调试目的，仅实现 `object.toString()` 作为“全捕获”方法通常就够了，这样所有转换都能返回同一种“人类可读”的对象表达方式。
:::

## 四、null 与 undefined 的区别

事实上，两者在使用中并无多大的区别。

```js
null == undefined; // Output: true
null === undefined; // Output: false
```

在相等性检查中，两者是相等的。两者转换为布尔值都是 `false`。

1. null

`null` 表示空值。在内存里表示的就是，栈中的变量没有指向堆中的内存对象。当一个对象被赋值了 `null` 以后，原来的对象在内存中就处于游离状态，GC 会择机回收该对象并释放内存。

::: tip 提示
`typeof null == 'object'`?

`null` 有属于自己的类型 `Null`，而不属于 `Object` 类型，`typeof` 之所以会判定为 Object 类型，是因为 JavaScript 数据类型在底层都是以二进制的形式表示的，二进制的前三位为 0 会被 `typeof` 判断为对象类型，而 `null` 的二进制位恰好都是 0 ，因此，`null` 被误判断为 Object 类型。
:::

2. undefined

`undefined` 表示未定义的原始值。可以看做一个变量的原始状态。下面的这些场景，都会是 `undefined`。

- 变量被声明，但没有被赋值
- 函数定义了形参，但没有传递实参
- 函数没有返回值
- 访问了对象上不存在的属性
- 使用 `void` 对表达式求值

3. 区别

- `null` 表示空值；`undefined` 表示未定义的原始值。
- `null` 转换为 Number 类型时为 0；`undefined`则是 NaN。
- 两者不全等。

```js
Number(null); // Output: 0
Number(undefine); // Output: NaN
```

::: warning 注意

```js
null > 0; // false
null == 0; // false
null >= 0; // true
```

这是因为相等性检测`==`和普通比较运算符 `>` `<` `>=` `<=` 的逻辑是相互独立的，进行值的比较时，`null` 会被转化为 0，另一方面 `undefined` 和 `null` 在相等性检测中不会进行任何的类型转换，它们有自己独立的比较规则，所以它们除了互等外，不会等于其他任何的值。
:::

## 五、JS 中判断数据类型的几种方式

在 JS 中，常用的数据判断方法可以用`typeof`，`instanceOf`，`constructor`，`Object.protoType.toString.call()`这四种方法。

1. `typeof`

例子：

```js
typeof ''; // string 有效
typeof 1; // number 有效
typeof Symbol(); // symbol 有效
typeof true; // boolean 有效
typeof undefined; // undefined 有效
typeof null; // object 无效
typeof []; // object 无效
typeof new Function(); // function 有效
typeof new Date(); // object 无效
typeof new RegExp(); // object 无效
```

- 对于基本类型，除`null`外，都能返回正确的结果。
- 对于引用类型，除`function`外，一律返回`object`类型。
- 对于`null`，返回`object`类型。
- 对于`function`， 返回`function`类型。

2. `instanceOf`

`instanceOf`原理是判断 A 是否是 B 的实例，检测的是原型。

例子：

```js
[] instanceOf Array; // true
[] indtanceOf Object; // true
new Date() instanceOf Date; // true
function Person() {}
new Person instanceOf Person; // true

[] instanceOf Object; // true
new Date() instanceOf Object; //true
```

`instanceOf` 只能用判断两个对象是否是实例关系，无法判断一个对象实例具体属于哪个类型。其原理是利用原型链，如果在原型链上查找到一致的原型，就会返回真值。

3. `constructor`

当一个函数 F 被定义时，js 引擎为 F 添加了 `prototype` 原型，然后再在 `prototype` 上添加一个 `constructor` 的属性，并让其指向 F 的引用。

例子：

```js
''.constructor == String; // true
new Number(1).constructor == Number; // true
new Function().constructor == Function; // true
[].constructor == Array; // true
document.constructor == HTMLDocument; // ture
```

存在问题：

- `null` 和 `undefined` 是无效的对象，因此不存在 `constructor`。
- 函数的 `construcor` 是不稳定的，可以重写 `prototype`，原有 `constructor` 就会丢失。

4. `toString`方法

`toString` 是 `Object` 的原型方法，调用该方法，默认返回当前对象的 `[[class]]`。

例子：

```js
Object.prototype.toString.call(''); // "[Object String]"
Object.prototype.toString.call(10); // "[Object Number]"
Object.prototype.toString.call(true); // "[Object Boolean]"
Object.prototype.toString.call(Symbol()); // "[Object Symbol]"
Object.prototype.toString.call(undefined); // "[Object Undefined]"
Object.prototype.toString.call(null); // "[Object Null]"
Object.prototype.toString.call(new Function()); // "[Object Function]"
Object.prototype.toString.call([]); // "[Object Array]"
Object.prototype.toString.call(new RegExp()); // "[Object RegExp]"
Object.prototype.toString.call(new Error()); // "[Object Error]"
```

这种方式是最为通用的，能够很好的判断 js 中的数据类型。

## 六、隐式转换

由于 Javascript 是一门弱类型语言，因此在不同类型的变量之间相互运算时常常会发生**隐式转换**。Javascript 中的隐式转换常用的主要有三种： `ToPrimitive`，`ToNumber`，`ToString`。

- `ToPrimitive`： 将引用类型转换原始类型时候会发生调用，上面拆箱中已经介绍过了。
- `ToNumber`：转换为 Number 类型， 常发生在自增、自减、数学运算符等。
- `ToString`：转换为 String 类型，常发生在 + 连接字符串、引用类型比较等。

### ToNumber

![隐式转换-ToNumber-2019-12-17.png](https://allin-bucket.oss-cn-beijing.aliyuncs.com/blog/隐式转换-ToNumber-2019-12-17.png?x-oss-process=style/alin)

### ToString

![隐式转换-ToString-2019-12-17.png](https://allin-bucket.oss-cn-beijing.aliyuncs.com/blog/隐式转换-ToString-2019-12-17.png?x-oss-process=style/alin)

## 七、精度缺失及解决办法

### 双精度浮点数

精度确实并不是语言的问题，而是浮点数存储本身固有的缺陷。浮点数无法很精确表示其数值范围内的所有值，只能精确表示可用科学计数法 `m*2^e` 表示的数值而已，比如 0.5 的科学计数法是 `2^-1`，则可被精确存储了；而 0.1，0.2 则无法被精确存储。

js 是使用 64 位双精度浮点数存储数值的，其采用的是 IEEE754 规范。

![ieee754-2019-12-12.png](https://allin-bucket.oss-cn-beijing.aliyuncs.com/blog/ieee754-2019-12-12.png?x-oss-process=style/alin)

正如上图所示，64 位双精度浮点数是用 1 位符号位 S， 11 位指数 E，52 位有效数字 M 来表示的。并且一个浮点数可以使用公式表示如下：

```
V = (-1)^S * M * 2 ^ E
```

- S：符号位，0 位正数，1 位负数
- M：指有效位数，1 < M < 2
- E：指数位，阶数 = 指数 + 偏置量

### 解决精度缺失的方法

1. 类库

如 `Math.js`等

2. 原生方法`toFixed`

```js
function toFixed(num, s) {
  var timers = Math.pow(10, s);
  var des = num * timers + 0.5;
  des = parseInt(des, 10) / timers;
  return des + '';
}
```

3. ES6

引入 `Number.EPSILON` (2.220446049250313e-16)这么小的量，在于为浮点数设置一个误差范围，如果误差小于 `EPSILON`，则认为结果是可靠的。

4. 放大再缩小

把小数放大为整数（乘），进行算术运算，再缩小为小数（除）。

## 八、instanceOf 实现原理

```js
function instanceof(left, right) {
  // 获得类型的原型
  let prototype = right.prototype;
  // 获得对象的原型
  left = left.__proto__;
  // 判断对象的类型是否等于类型的原型
  while (true) {
    if (left === null) return false;
    if (prototype === left) return true;
    left = left.__proto__;
  }
}
```
