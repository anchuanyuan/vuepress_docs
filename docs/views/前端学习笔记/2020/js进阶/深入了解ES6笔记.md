---
title: JS进阶01-深入理解ES2015
date: 2020-09-20
sidebarDepth: 4
tags:
    - JS进阶
categories:
    - 前端学习笔记
---

# 深入学习ES6

什么是ES6？什么是ES2015？它们是什么关系呢？

ES2015是ECMAScript 2015的简称，ECMA又是欧洲计算机制造者协会的简称，ECMAScript代表 JavaScript 这门语言所遵循的规范。2011 年，ECMAScript 5.1 版发布后，就开始制定 6.0 版了，直到2015年ES6.0才正式出炉。因此，ES6 这个词的原意，就是指 JavaScript 语言在ES5.1后的下一个版本ES6.0。

标准委员会决定，标准在每年的 6 月份正式发布一次，作为当年的正式版本。这样一来，就不需要以前的版本号了，只要用年份标记就可以了。(ES2015、ES2016.....)

所以，ES6 既是一个历史名词，也是一个泛指，含义是 5.1 版以后的 JavaScript 的下一代标准，涵盖了 ES2015、ES2016、ES2017 等等，而 ES2015 则是正式名称，特指该年发布的正式版本的语言标准。

ES6代表着 JS 这门语言最新的标准，是非常有必要学习的。目前以Chrome为首的现代浏览器已经基本实现了ES6的大多数新特性，即使在不支持ES6的浏览器上，开发者也可以通过转译工具如`Babel`将ES6代码转译为ES5代码来实现兼容。

本课程的学习目标

掌握ES6中进阶的内容包括： `Symbol`、 `Set和WeakSet`、 `Map和WeakMap`、 `Proxy`、 `Reflect`、 `Iterator`、 `Generator函数`、 `async函数`的概念、用法和用途

## Symbol

### 概述

ES6 引入了一种新的原始数据类型`Symbol`，表示**独一无二的值**。它是 JavaScript 语言的第七种数据类型，前六种是：`undefined`、`null`、`Boolean`、`String`、`Number`、`Object`

直接调用`Symbol`函数即可生成一个Symbol，注意`Symbol`函数前不能使用`new`命令，否则会报错。

`Symbol`函数可以接受一个字符串作为参数，表示对 Symbol 的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分。

```javascript
let s1 = Symbol('foo');
let s2 = Symbol('bar');

s1 // Symbol(foo)
s2 // Symbol(bar)
```

注意，`Symbol`函数的参数只是表示对当前 Symbol 值的描述，因此相同参数的`Symbol`函数的返回值是不相等的。

```javascript
// 没有参数的情况
let s1 = Symbol();
let s2 = Symbol();

s1 === s2 // false

// 有参数的情况
let s1 = Symbol('foo');
let s2 = Symbol('foo');

s1 === s2 // false
```

### Symbol作为属性

 Symbol 值可以作为标识符，用于对象的属性名，由于每一个 Symbol 值都是不相等的，这意味着就能保证不会出现同名的属性，能防止某一个键被不小心改写或覆盖的情况。

注意，在对象的内部，使用 Symbol 值定义属性时，Symbol 值必须放在方括号之中。

```javascript
let mySymbol = Symbol();

// 第一种写法
let a = {};
a[mySymbol] = 'Hello!';

// 第二种写法
let a = {
  [mySymbol]: 'Hello!'
};

// 第三种写法
let a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });

// 以上写法都得到同样结果
a[mySymbol] // "Hello!"
```

Symbol 作为属性名，该属性不会出现在`for...in`、`for...of`循环中，也不会被`Object.keys()`、`Object.getOwnPropertyNames()`、`JSON.stringify()`返回。但是，有一个`Object.getOwnPropertySymbols`方法，可以获取指定对象的所有 Symbol 属性名。

### Symbol.for

有时，我们希望重新使用同一个 Symbol 值，`Symbol.for`方法可以做到这一点。它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。如果有，就返回这个 Symbol 值，否则就新建并返回一个以该字符串为名称的 Symbol 值。

```javascript
let s1 = Symbol.for('foo');
let s2 = Symbol.for('foo');

s1 === s2 // true
```

`Symbol.for()`与`Symbol()`这两种写法，都会生成新的 Symbol。它们的区别是，前者会被登记在全局环境中供搜索，后者不会。`Symbol.for()`不会每次调用就返回一个新的 Symbol 类型的值，而是会先检查给定的`key`是否已经存在，如果不存在才会新建一个值。比如，如果你调用`Symbol.for("cat")`30 次，每次都会返回同一个 Symbol 值，但是调用`Symbol("cat")`30 次，会返回 30 个不同的 Symbol 值。

### 内置Symbol

除了定义自己使用的 Symbol 值以外，ES6 还提供了 11 个内置的 Symbol 值，指向语言内部使用的方法。

- `Symbol.hasInstance`
- `Symbol.isConcatSpreadable`
- `Symbol.species`
- `Symbol.match`
- `Symbol.replace`
- `Symbol.search`
- `Symbol.split`
- `Symbol.toPrimitive`
- `Symbol.toStringTag`
- `Symbol.unscopables`
- `Symbol.iterator`，对象的`Symbol.iterator`属性，指向该对象的默认生成`遍历器`的方法。



### 实例：

#### 消除魔术字符串

```javascript
function getArea(shape, options) {
  let area = 0;

  switch (shape) {
    case 'Triangle': // 魔术字符串
      area = .5 * options.width * options.height;
      break;
    /* ... more code ... */
  }

  return area;
}

getArea('Triangle', { width: 100, height: 100 }); // 魔术字符串
```

上面代码中，字符串`Triangle`就是一个魔术字符串。它多次出现，与代码形成“强耦合”，不利于将来的修改和维护。

常用的消除魔术字符串的方法，就是把它写成一个变量。

```javascript
const shapeType = {
  triangle: 'Triangle'
};

function getArea(shape, options) {
  let area = 0;
  switch (shape) {
    case shapeType.triangle:
      area = .5 * options.width * options.height;
      break;
  }
  return area;
}

getArea(shapeType.triangle, { width: 100, height: 100 });
```

但是如果没有办法保证有人写了一句

```javascript
const shapeType = {
  triangle: 'Triangle',
  rectangle:'Triangle'
};
```

接下来一旦出现bug会很难调试

如果仔细分析，可以发现`shapeType.triangle`等于哪个值并不重要，只要确保不会跟其他`shapeType`属性的值冲突即可。因此，这里就很适合改用 Symbol 值。

```javascript
const shapeType = {
  triangle: Symbol(),
  rectangle:Symbol()
};
```

#### 实现私有属性

第一种方式：用一个字符串或者下划线的方式

```javascript
var Person = (function() {
    let _name = `_name`
    // 或者 let name = 'shfjkshfkjsjkf'
    function Person(name) {
        this[_name] = name;
    }

    Person.prototype.getName = function() {
        return this[_name];
    };

    return Person;
}());
```

缺点很显然，不是真正的私有，依然可以遍历



第二种方式：闭包

```javascript
var Person = (function() {
    function Person(name) {
        this.getName = function() {
            return name;
        };
    }

    return Person;
}());
```

真的私有了，但是仍然存在缺点：实例无法共享方法，浪费内存空间

第三种方式：使用`Symbol`

```javascript
var Person = (function() {
    var nameSymbol = Symbol('name');

    function Person(name) {
        this[nameSymbol] = name;
    }

    Person.prototype.getName = function() {
        return this[nameSymbol];
    };

    return Person;
}());
```

缺陷：仍然会被`Object.getOwnPropertySymbols`获取到属性，进而修改该属性对应的值

## Set和WeakSet

### Set

ES6 提供了新的数据结构 `Set`。它类似于数组，但是成员的值都是唯一的，**没有重复的值**。需要记录不同成员的又不希望重复记录的情况下可以用到`Set`

如何生成Set：

```javascript
let set1 = new Set()
let set2 = new Set([1,2,3])
```

Set 实例的属性：

- `Set.prototype.size`：返回`Set`实例的成员总数。

Set 实例的方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）。

四个操作方法：

- `Set.prototype.add(value)`：添加某个值，返回 Set 结构本身。
- `Set.prototype.delete(value)`：删除某个值，返回一个布尔值，表示删除是否成功。
- `Set.prototype.has(value)`：返回一个布尔值，表示该值是否为`Set`的成员。
- `Set.prototype.clear()`：清除所有成员，没有返回值。

由于Set中值不会重复，可以用来Set来做数组去重

四个遍历方法：

- `Set.prototype.keys()`：返回键名遍历器
- `Set.prototype.values()`：返回键值遍历器
- `Set.prototype.entries()`：返回键值对遍历器
- `Set.prototype.forEach()`：使用回调函数遍历每个成员

注意：Set实例中key和value是一样的，所以`keys()`和`values()`这两个方法的结果是一样的

#### 实例

Set中查找某个值是否已经存在的时间复杂度是O(1)，而数组的`indexOf`方法时间复杂度是O(n)，又由于Set中值不会重复，所以可以使用Set做数组去重：

```javascript
//使用indexOf 缺点：时间复杂度O(n^2)性能低下, NaN要做特殊处理
function deduplicate1(arr) {
  let temp =[]
  for (let i = 0; i < arr.length; i++) {
    if(temp.indexOf(arr[i]) === -1){
      temp.push(arr[i])
    }
  }
  return temp
}

//使用对象解决性能问题 但是数组里不能有对象，null，undefined，Boolean值，也无法区分字符串和数字
function deduplicate2(arr) {
  let temp = {}
  for (let i = 0; i < arr.length; i++) {
    if(!temp[arr[i]]){
      temp[arr[i]] = true
    }
  }
  return Object.keys(temp)
}

//使用Set来去重
function deduplicate3(arr) {
  let temp = [...(new Set(arr))]
  return temp
}
```

### WeakSet

`WeakSet` 结构与 `Set` 类似，也是不重复的值的集合。但是，它与 `Set` 有两个区别。

- `WeakSet` 的成员只能是对象，而不能是其他类型的值。

- `WeakSet` 中的对象都是弱引用

如果一个对象没有任何引用，那么此对象会尽快被垃圾回收，释放掉它占用的内存。

即垃圾回收机制不考虑 `WeakSet` 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 `WeakSet` 之中。

`WeakSet` 结构有以下三个方法。

- `WeakSet.prototype.add(value)`：向 WeakSet 实例添加一个新成员。
- `WeakSet.prototype.delete(value)`：清除 WeakSet 实例的指定成员。
- `WeakSet.prototype.has(value)`：返回一个布尔值，表示某个值是否在` WeakSet` 实例之中。

**`WeakSet` 不能遍历**，是因为成员都是弱引用，随时可能消失。

示例：

```javascript
let div = document.querySelector('div')
let set = new Set()
set.add(div)
//...some code
document.body.removeChild(div)
div = null //dom对象仍在内存中，因为Set中仍然引用此对象
```



```javascript
let div = document.querySelector('div')
let weakset = new WeakSet()
weakset.add(div)
//...some code
document.body.removeChild(div)
div = null //dom对象的已经没有引用，将被垃圾回收机制回收
```



## Map和WeakMap

### Map

JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），但是传统上只能用字符串当作键。这给它的使用带来了很大的限制。

为了解决这个问题，ES6 提供了 Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键，是一种更完善的 Hash 结构实现。

生成Map实例：

```javascript
const map1 = new Map();
const map2 = new Map([
  ['name', '张三'],
  ['title', 'Author']
]);
```

Map 实例的属性：

- `Map.prototype.size`：返回`Map`实例的成员总数。

Map实例的方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）。

四个操作方法：

- `Map.prototype.set(key,value)`：设置键名`key`对应的键值为`value`，然后返回整个 Map 结构。如果`key`已经有值，则键值会被更新，否则就新生成该键。
- `Map.prototype.get(key)`：读取`key`对应的键值，如果找不到`key`，返回`undefined`。
- `Map.prototype.has(key)`：返回一个布尔值，表示某个键是否在当前 Map 对象之中。
- `Map.prototype.delete(key)`：删除某个键，返回`true`。如果删除失败，返回`false`。
- `Map.prototype.clear()`：清除所有成员，没有返回值。

四个遍历方法：

- `Map.prototype.keys()`：返回键名遍历器
- `Map.prototype.values()`：返回键值遍历器
- `Map.prototype.entries()`：返回键值对遍历器
- `Map.prototype.forEach()`：使用回调函数遍历每个成员

#### 实例1：扩展对象

当我们有一系列对象，想记录每个对象一种属性。假设有100只鸡，需要记录每只鸡的重量，有两种思路：

1. 想办法用笔写到鸡身上
2. 记录到一个本本上

```javascript
class Chicken {
}
// 100只鸡
let chickenList = []
for (let i = 0; i < 100; i++) {
  chickenList.push(new Chicken())
}
                   
// 方法1:记录到鸡身上
chickenList.forEach(function(chicken, index){
	chicken.weight = getWeight(chicken);
});

// 方法2:记录到本本上
let notebook = [];
chickenList.forEach(function(chicken, index){
	notebook[index] = getWeight(chicken);
});
```

第1种思路存在以下问题：

1. 破坏了鸡的卖相，有时候这是很严重的事情，比如你想把一只5斤的鸡当成6斤卖出去，结果鸡身上直接写“我只有5斤”（修改了原有对象，可能导致意外的行为）
2. 可能碰到一些战斗鸡，一个字都写不上去（对象冻结了或者有不可覆盖的属性）
3. 可能写到一些本来就写了字的地方，导致根本看不清（与对象原有属性冲突）

再看第2种方法，存在以下问题：

1. 本本无法和鸡精准地一一对应，只能靠一些索引或者标记（例如给每只鸡起一个名字）去（不可靠）地记录对应关系（无法精准地对比到是哪一个对象）

这时候就可以使用`Map`扩展对象

```js
// 记录到另一个本本上
let notebook = new Map();
chickenList.forEach(function(chicken, index){
	notebook.set(chicken, getWeight(chicken));
});
```

#### 实例2：完善私有属性的实现

回顾之前的`Symbol`实现的私有属性的版本里，仍然存在着可以被特殊api遍历的缺陷。

基于`Map`的解决思路：

用一个闭包内的`Map`来扩展每个生成的对象

```javascript
var Person = (function() {
  var map = new Map();

  function Person(name) {
    map.set(this,name);
  }

  Person.prototype.getName = function() {
    return map.get(this);
  };

  return Person;
}());
```

### WeakMap

与之前介绍的`WeakSet`  类似，`WeakMap`与 `Map` 有两个区别。

- `WeakMap`的键只能是对象，而不能是其他类型的值。
- `WeakMap` 中对键的引用是弱引用

同样地，**`WeakMap` 不能遍历**，是因为成员都是弱引用，随时可能消失。

`WeakMap`只有四个方法可用：`get()`、`set()`、`has()`、`delete()`。

注意：`WeakMap` 弱引用的只是键名，而不是键值。键值依然是正常引用。

```javascript
const wm = new WeakMap();
let key = {};
let obj = {foo: 1};

wm.set(key, obj);
obj = null;
wm.get(key)
```

#### 实例：完善私有属性的实现

前面基于`Map`的实现还存在一个问题：

当`Person`实例的外部引用消除时，闭包中的`Map`仍然有`Person`实例作为键的引用，`Person`实例不会被垃圾回收，必须等到所有的`Person`实例的外部引用消除，`Map`所在的闭包也会消除,最后`Person`实例才会被垃圾回收

为了解决这个问题，使用`WeakMap`进一步完善：

```javascript
var Person = (function() {
  var wm = new WeakMap();

  function Person(name) {
    wm.set(this,name);
  }

  Person.prototype.getName = function() {
    return wm.get(this);
  };

  return Person;
}());
```



## Proxy

在ES6之前`Object.defineProperty`可以拦截对象属性的读取和修改操作，Proxy 可以理解成比这个API更强大的，在目标对象之前架设一层的“拦截”。外界对该Proxy对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。

注意：只有对生成的 Proxy 实例操作才能起到拦截的作用

生成Proxy实例：

```javascript
var proxy = new Proxy(target, handler);
```

- target ：需要代理的对象
- handler ：拦截函数的集合

如果handler是空对象则代表任何操作都不会拦截

```javascript
let obj = {}

/*handler为空对象*/
let proxy = new Proxy(obj, {});
proxy.a = 1
//obj.a  //1
```

对属性的读取进行拦截：

```javascript
var proxy = new Proxy({}, {
  get: function(target, property) {
    return 35;
  }
});

proxy.time // 35
proxy.name // 35
proxy.title // 35
```

下面是 Proxy 支持的拦截操作一览，一共 13 种。

- **get(target, propKey, receiver)**：拦截对象属性的读取，比如`proxy.foo`和`proxy['foo']`。
- **set(target, propKey, value, receiver)**：拦截对象属性的设置，比如`proxy.foo = v`或`proxy['foo'] = v`，返回一个布尔值。
- **has(target, propKey)**：拦截`propKey in proxy`的操作，返回一个布尔值。
- **deleteProperty(target, propKey)**：拦截`delete proxy[propKey]`的操作，返回一个布尔值。
- **ownKeys(target)**：拦截`Object.getOwnPropertyNames(proxy)`、`Object.getOwnPropertySymbols(proxy)`、`Object.keys(proxy)`、`for...in`循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而`Object.keys()`的返回结果仅包括目标对象自身的可遍历属性。
- **getOwnPropertyDescriptor(target, propKey)**：拦截`Object.getOwnPropertyDescriptor(proxy, propKey)`，返回属性的描述对象。
- **defineProperty(target, propKey, propDesc)**：拦截`Object.defineProperty(proxy, propKey, propDesc）`、`Object.defineProperties(proxy, propDescs)`，返回一个布尔值。
- **getPrototypeOf(target)**：拦截`Object.getPrototypeOf(proxy)`，返回一个对象。
- **setPrototypeOf(target, proto)**：拦截`Object.setPrototypeOf(proxy, proto)`，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
- **apply(target, object, args)**：拦截 Proxy 实例作为函数调用的操作，比如`proxy(...args)`、`proxy.call(object, ...args)`、`proxy.apply(...)`。
- **construct(target, args)**：拦截 Proxy 实例作为构造函数调用的操作，比如`new proxy(...args)`。
- **isExtensible(target)**：拦截`Object.isExtensible(proxy)`，返回一个布尔值。
- **preventExtensions(target)**：拦截`Object.preventExtensions(proxy)`，返回一个布尔值。

Proxy给了开发者拦截语言默认行为的权限，可以不改变原有对象或函数的情况下，轻松运用在很多场景。例如：统计函数调用次数，实现响应式数据观测（Vue 3.0），实现不可变数据（Immutable）等等

## Reflect

`Reflect`是 ES6 为了操作对象而提供的新 API。ES6把原先版本中很多语言层面的API，比如`Object.defineProperty` `delete` `in`等集中在了`Reflect`的静态方法上，引入`Reflect`的目的有这样几个。

（1） 将`Object`对象的一些明显属于语言内部的方法（比如`Object.defineProperty`），放到`Reflect`对象上。现阶段，某些方法同时在`Object`和`Reflect`对象上部署，未来的新方法将只部署在`Reflect`对象上。也就是说，从`Reflect`对象上可以拿到语言内部的方法。

（2） 修改某些`Object`方法的返回结果，让其变得更合理。

```javascript
// 老写法
try {
  Object.defineProperty(target, property, attributes);
  // success
} catch (e) {
  // failure
}

// 新写法
if (Reflect.defineProperty(target, property, attributes)) {
  // success
} else {
  // failure
}
```

（3）将命令式操作转变为函数调用，避免更多的保留字占用。比如`name in obj`和`delete obj[name]`，对应`Reflect.has(obj, name)`和`Reflect.deleteProperty(obj, name)`

```javascript
// 老写法
'assign' in Object // true

// 新写法
Reflect.has(Object, 'assign') // true
```

（4）`Reflect`对象的方法与`Proxy`对象的方法一一对应，想要调用默认行为，直接在`Reflect`上调用同名方法，简单可靠，省去人工写默认行为的代码。

```javascript
let proxy = new Proxy({}, {
  set: function(target, name, value, receiver) {
    var success = Reflect.set(target, name, value, receiver);
    if (success) {
      console.log('property ' + name + ' on ' + target + ' set to ' + value);
    }
    return success;
  }
});
```

`Reflect`对象一共有 13 个静态方法。

- Reflect.apply(target, thisArg, args)
- Reflect.construct(target, args)
- Reflect.get(target, name, receiver)
- Reflect.set(target, name, value, receiver)
- Reflect.defineProperty(target, name, desc)
- Reflect.deleteProperty(target, name)
- Reflect.has(target, name)
- Reflect.ownKeys(target)
- Reflect.isExtensible(target)
- Reflect.preventExtensions(target)
- Reflect.getOwnPropertyDescriptor(target, name)
- Reflect.getPrototypeOf(target)
- Reflect.setPrototypeOf(target, prototype)

上面这些方法的作用，与`Proxy`对象`handler`的方法是一一对应的。

## Iterator

`Iterator`（遍历器、迭代器） 是一个对象，`Iterator`对象需要包含一个`next`方法，该方法返回一个对象，此对象有两个属性，一个`value`表示当前结果，一个`done`表示是否可以继续迭代

```javascript
let it = makeIterator();

function makeIterator() {
  let nextIndex = 0;
  return {
    next: function() {
      return nextIndex < 5 ?
      {value: nextIndex++, done: false} :
      {value: undefined, done: true};
    }
  };
}
```

ES6 规定，如果数据结构的`Symbol.iterator`属性是一个方法，该方法返回`Iterator`对象，就可以认为此数据结构是“可遍历的”（iterable）

```typescript
interface Iterable {
  [Symbol.iterator]() : Iterator,
}

interface Iterator {
  next(value?: any) : IterationResult,
}

interface IterationResult {
  value: any,
  done: boolean,
}
```

实例：

```javascript
let obj = {
  [Symbol.iterator]:makeIterator
}
```

ES6中以下场合会默认调用 `Iterator` 接口（即`Symbol.iterator`方法），

- `for...of`循环
- 数组解构
- 扩展运算符
- `yield*`
- 其他隐式调用的地方，例如 `new Set(['a','b'])`,`Promise.all()`等

ES6中以下数据结构默认为可遍历对象，即默认部署了`Symbol.iterator`属性

- Array
- Map
- Set
- String
- 函数的 arguments 对象
- NodeList 对象

## Generator函数

### 基本概念

Generator(生成器) 函数是 ES6 提供的一种**异步编程解决方案**，并且Generator函数的行为与传统函数完全不同。

#### 定义Generator函数

```javascript
function* f() {
    
}
```

形式上，Generator 函数是一个普通函数，但是有两个特征。一是，`function`关键字与函数名之间有一个星号；二是，函数体内部可以使用`yield`关键字，定义不同的内部状态（`yield`在英语里的意思就是“产出”）。

#### 执行Generator函数

执行 Generator 函数，函数本身不会执行，而是会返回一个`遍历器对象`，同时该对象也是`可遍历的`，因为在其原型链上也具有`Symbol.iterator`方法，并且改方法返回的对象就是该遍历器对象自身

```javascript
function* f() {
  console.log(1)
}
let a = f()
a[Symbol.iterator]() === a // true
```

因此，Generator函数返回的对象也可以被遍历，相当于每次调用此对象`next()`的`value`来作为遍历结果

只有执行了该遍历器对象的`next()`方法，Generator函数才会执行：

```javascript
function* f() {
   console.log(1)
}
let a = f()
a.next() // 打印1 返回{value:undefined,done:true}
```

#### yield 和 yield*

Generator函数中可以使用`yield`关键字来定义函数返回的遍历器对象每次`next()`后的`value`

```javascript
function* f() {  
    yield 1
}
let a = f()
a.next()  // 返回 {value: 1, done: false}
```

并且a每次执行`next()`，都会在下一个`yield`处暂停，直到后面没有`yield`关键字，则执行剩余代码，并且返回`done:true`：

```javascript
function* f() {
  console.log('step1')
  yield 1
  console.log('step2');   
  yield 2
  console.log('step3');
}
let a = f()
a.next() // 打印step1  返回 {value: 1, done: false}
a.next() // 打印step2  返回 {value: 2, done: false}
a.next() // 打印step3  返回 {value: undefined, done: true}
```

`yield`本身没有返回值，`yield`的返回值是**下一次**`next()`函数传入的值。

所以`next()`方法的作用有两个

1. 执行本次`yield`到下一个`yield`之间的代码
2. 将形参的值传给本次`yield`的返回值

`next()`和`yield`实现了函数内外控制权的转移。

```javascript
function* f() {  
    console.log('start');  
    let result = yield 1  
    console.log('result:',result);
}
let a = f()
```

`yield*` 等同于遍历某个对象，并且`yield`每个结果

```javascript
function* f() {  
    yield 'start'  
    yield* [1, 2, 3]  
    /*等同于*/  
    // for(let value of [1,2,3]){  
    //   yield value  
    // }  
    yield 'end'
}
let a = f()
a.next() // 返回 {value: 'start', done: false}
a.next() // 返回 {value: 1, done: false}
a.next() // 返回 {value: 2, done: false}
a.next() // 返回 {value: 3, done: false}
a.next() // 返回 {value: 'end', done: false}
a.next() // 返回 {value: undefined, done: true}
```

### Generator函数配合自动执行器

#### 直接循环存在的问题

Generator函数是一种新的异步编程解决方案，但是每次手动调用`next()`很麻烦，如果我们写一个循环来执行`next()`呢？

```javascript
function* f() {
  yield 1
  console.log('完成1');
  yield 2
  console.log('完成2');
}
let it = f()
let done = false
while (!done){
  done = it.next().done
}
```

看似是没有问题，但是如果`yield`后面本身就是一个异步操作，就会有问题

```javascript
function* f() {
  yield readFile(file1)
  console.log('耶，完成了1');
  yield readFile(file2)
  console.log('耶，完成了2');
}
let it = f()
let done = false
while (!done){
  done = it.next().done
}
//耶，完成了1
//耶，完成了2
```

如果我们的需求是让异步操作执行完毕后再执行`yield`后面的代码，那么上述执行顺序就不符合需求。验证：

```javascript
function* f() {
  yield readFile(file1,function (err,data) {
    console.log('读取到数据1：' + data)
  })
  console.log('耶，完成了1');
  yield readFile(file2,function (err,data) {
    console.log('读取到数据2：' + data)
  })
  console.log('耶，完成了2');
}

let it = f()
let done = false
while (!done){
  done = it.next().done
}
//耶，完成了1
//耶，完成了2
//读取到数据1：111
//读取到数据2：222
```

#### Thunk函数

在 JavaScript 语言中，Thunk 函数是指将多参数函数，将其替换成一个只接受回调函数作为参数的单参数函数。

```javascript
// Thunk版本的readFile（单参数版本）
const {readFile} = require('fs')
const path = require('path')
const file1 = path.join(__dirname,'./text/1.txt')
const file2 = path.join(__dirname,'./text/2.txt')
let Thunk = function (fileName) {
  return function (callback) {
    return readFile(fileName, callback);
  };
};

let readFileThunk = Thunk(file1);
readFileThunk(function(err,data){
  console.log(String(data));
});
```

> 有一个`thunkify`库可以方便的将`api`变成`Thunk`函数

#### 自动执行器

写一个自动执行器`run`函数，每次将`it.next()`的逻辑封装到`nextStep()`中，并且将`nextStep`作为回调函数传给Thunk化后的读取文件函数。

```javascript
// Thunk版本的readFile（单参数版本）
const {readFile} = require('fs')
const path = require('path')
const file1 = path.join(__dirname, './text/1.txt')
const file2 = path.join(__dirname, './text/2.txt')
let Thunk = function (fileName) {
  return function (callback) { //result.value
    return readFile(fileName, callback);
  };
};

function* f() {
  let data1 = yield Thunk(file1)
  console.log('耶，完成了1,数据是' + data1);
  let data2 = yield Thunk(file2)
  console.log('耶，完成了2,数据是' + data2);
}

function run(f) {
  let it = f();

  function nextStep(err, data) {
    var result = it.next(data);
    if (result.done) return;
    result.value(nextStep);  //执行readFile，并且把nextStep作为回调传入
  }

  nextStep();
}

run(f)
```

如此一来，基于自动执行器，只要异步操作是Thunk函数或者返回Promise的情况下，写异步逻辑在形式上就如同写同步逻辑一样，非常简洁。

#### co模块

co模块是对一个封装的更好的自动执行器，它支持`yield`的类型，不光包含thunk函数，还有Promise对象，数组，对象，甚至Generator函数

```javascript
const { promisify } = require("util");
const path = require('path')
const file1 = path.join(__dirname, './text/1.txt')
const file2 = path.join(__dirname, './text/2.txt')
const readFileP = promisify(readFile)
let Thunk = function (fileName) {
  return function (callback) { //result.value
    return readFile(fileName, callback);
  };
};

/*Thunk*/
function* f() {
  let data1 = yield Thunk(file1)
  console.log('耶，完成了1,数据是' + data1);
  let data2 = yield Thunk(file2)
  console.log('耶，完成了2,数据是' + data2);
}

/*Promise*/
function* f() {
  let data1 = yield readFileP(file1)
  console.log('耶，完成了1,数据是' + data1);
  let data2 = yield readFileP(file2)
  console.log('耶，完成了2,数据是' + data2);
}
/*数组（并发）*/
function* f() {
  let data = yield [readFileP(file1),readFileP(file2)]
  console.log('耶，完成了,数据是' + data);
}

/*对象（并发）*/
function* f() {
  let data = yield {data1:readFileP(file1),data2:readFileP(file2)}
  console.log('耶，完成了,数据是' + JSON.stringify(data));
}

/*Generator函数*/
function* f() {
  function* f1() {
    return yield {data1:readFileP(file1),data2:readFileP(file2)}
  }
  let data = yield f1()
  console.log('耶，完成了,数据是' + JSON.stringify(data));
}
co(f)
```

经过一个co模块执行后的Generator函数会返回一个Promise对象：

```javascript
co(f).then(()=>{
  console.log('co执行完毕');
})
```



## async函数

### 基本概念

`async` 函数是什么？一句话，它就是 Generator 函数的语法糖。

将上一章的代码改成 async 函数的版本：

```javascript
const { promisify } = require("util");
const path = require('path')
const file1 = path.join(__dirname, './text/1.txt')
const file2 = path.join(__dirname, './text/2.txt')
const readFileP = promisify(readFile)

function* f() {
  let data1 = yield readFileP(file1)
  console.log('耶，完成了1,数据是' + data1);
  let data2 = yield readFileP(file2)
  console.log('耶，完成了2,数据是' + data2);
}

//async函数的版本
async function f() {
  let data1 = await readFileP(file1)
  console.log('耶，完成了1,数据是' + data1);
  let data2 = await readFileP(file2)
  console.log('耶，完成了2,数据是' + data2);
}

```

比较后就会发现，`async`函数的版本就是将 Generator 函数的星号（`*`）替换成`async`，将`yield`替换成`await`。

### 定义async函数

使用async关键字定义一个async函数：

```javascript
async function f() {
  let data1 = await readFileP(file1)
  console.log('耶，完成了1,数据是' + data1);
  let data2 = await readFileP(file2)
  console.log('耶，完成了2,数据是' + data2);
}
```

### 执行async函数

执行`async`函数则相当于执行了一个**自动运行**的Generator函数，`async`函数如果返回的结果不是Promise,则会运行结果包装成一个Promise返回：

```javascript
async function f() {
  console.log(1);
}
f().then(()=>{
  console.log(2);
})

async function f() {
  console.log(1);
  return 'done'
}

f().then(value => {
  console.log(value);
})
```

### await关键字

与`yield`类似，`async`函数中可以使用`await`关键字，`await`关键字后面一般会写一个Promise实例，`async`函数执行的过程中，每次遇到`await`关键字，会将**控制权转回外部环境**。

1. 如果`await`后面是Promise实例，则会等到该 Promise实例被resolve后，才会把本次`await`到下次`await`之间的代码推到`MircoTask（微任务）`中等待执行，并且`await`的返回值是该Promise实例resolve的值
2. 如果`await`后面不是Promise实例，则会立即将本次`await`到下次`await`之间的代码推到`MircoTask（微任务）`中等待执行，并且`await`的返回值是等于`await`后面表达式的值：

```javascript
async function f() {
  let data = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('a')
    }, 2000)
  })
  console.log(data);
}

//f()
//console.log('end')
```

如果`await`后面不是Promise 实例

```javascript
async function f() {
  let data = await 'a'
  console.log(data);
}
f()
console.log('end'); 
//end
//a
```

### async函数的错误处理

如果Promise被reject或抛出错误，await之后的代码不会执行，因此，需要使用`try..catch`对`await`进行错误捕捉：

```javascript
async function f() {
  try {
    let data = await new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('123')
      }, 2000)
    })
    //后续代码无法执行
    console.log('done');
  }catch (e) {
    console.log('发生错误：',e);
  }
}
f()
```

### async函数处理并发异步任务

如果，`async`函数中的每个`await`都是等到前面`await` resolve后才会执行，如果想并发执行，可以使用`Promise.all`:

```javascript
/*并发处理异步*/
async function f() {
  let time1 = new Date()
  let [data1,data2] = await Promise.all([
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('123')
      }, 2000)
    }),
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('123')
      }, 3000)
    })
  ])
  console.log(data1,data2,'用时：'+ (new Date() - time1));
}
f()
```

### async函数与Promise的对比

用`async`函数写异步逻辑相比Promise会更加简洁，在处理不同异步结果相互依赖，错误处理，if...else分支等情况时更加简便：

```javascript
const {readFile} = require('fs')
const { promisify } = require("util");
const path = require('path')
const file1 = path.join(__dirname, './text/1.txt')
const file2 = path.join(__dirname, './text/2.txt')
const file3 = path.join(__dirname, './text/3.txt')
const readFileP = promisify(readFile)

function f1() {
  readFileP(file1).then(data1 =>{
    console.log('耶，完成了1,数据是' + data1);
    return readFileP(file2)
  }).then(data2 => {
    console.log('耶，完成了1,数据是' + data2);
    return readFileP(file3)
  }).then(data3 => {
    console.log('耶，完成了1,数据是' + data3);
  })
}

async function f2() {
  let data1 = await readFileP(file1)
  console.log('耶，完成了1,数据是' + data1);
  let data2 = await readFileP(file2)
  console.log('耶，完成了2,数据是' + data1 + data2);
  let data3 = await readFileP(file3)
  console.log('耶，完成了2,数据是' + data1 + data2 + data3);

}
f()
```


















