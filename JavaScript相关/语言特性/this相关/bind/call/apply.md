## bind call apply

在 js 中，bind,call,apply 是 Function 对象自带的三个方法，主要用来改变函数的 this 指向。
这三个函数的第一个参数都是 this 指向的对象，后续参数为函数的参数。
call 和 apply 会立即调用，bind 会返回这个函数，以便之后调用。

### call

定义：调用一个对象的一个方法，以另一个对象替换当前对象。
说明： call 方法可以用来代替另一个对象调用一个方法。call 方法可将一个函数的对象上下文从初始的上下文改变为由 thisObj 指定的新对象。
thisObj 的取值有以下 4 种情况：

- 不传，或者传 null,undefined， 函数中的 this 指向 window 对象
- 传递另一个函数的函数名，函数中的 this 指向这个函数的引用
- 传递字符串、数值或布尔类型等基础类型，函数中的 this 指向其对应的包装对象，如 String、Number、Boolean
- 传递一个对象，函数中的 this 指向这个对象

```js
function a() {
  console.log(this); //输出函数a中的this对象
}

function b() {}

var c = { name: 'call' }; //定义对象c

a.call(); //window
a.call(null); //window
a.call(undefined); //window
a.call(1); //Number
a.call(''); //String
a.call(true); //Boolean
a.call(b); //function b(){}
a.call(c); //Object

function eat(x, y) {
  console.log(x + y);
}
function drink(x, y) {
  console.log(x - y);
}
eat.call(drink, 3, 2);
// 输出：5

function Animal() {
  this.name = 'animal';
  this.showName = function () {
    console.log(this.name);
  };
}
function Dog() {
  this.name = 'dog';
}
var animal = new Animal();
var dog = new Dog();

animal.showName.call(dog);
// 输出：dog
```

一句话概括，call 方法可以理解为把函数绑定到“第一个入参的对象”上执行，这个对象可以是普通对象，也可以是函数对象，这个地方就很容易搞混。**即便绑定到了一个函数对象上，会被执行的还是调用了 call 的这个函数。**

### apply

对于 apply、call 二者而言，作用完全一样，只是接受参数的方式不太一样。call 需要把参数按顺序传递进去，而 apply 则是把参数放在数组里。

```js
function class1(args1, args2) {
  this.name = function () {
    console.log(args, args);
  };
}
function class2() {
  var args1 = '1';
  var args2 = '2';
  class1.call(this, args1, args2);
  /*或*/
  class1.apply(this, [args1, args2]);
}

var c = new class2();
c.name();

// 输出：1 2
```

在 JavaScript 中，某个函数的参数数量是不固定的，因此要说适用条件的话，当你的参数是明确知道数量时用 call ；而不确定的时候用 apply，然后把参数 push 进数组传递进去。当参数数量不确定时，函数内部也可以通过 arguments 这个类数组对象来遍历所有的参数。

### bind

bind 方法会创建一个新函数，称为绑定函数，当调用这个绑定函数时，绑定函数会以创建它时传入 bind 方法的第一个参数作为 this，传入 bind 方法的第二个以及以后的参数加上绑定函数运行时本身的参数按照顺序作为原函数的参数来调用原函数。

```js
var bar = function () {
  console.log(this.x);
};
var foo = {
  x: 3,
};
bar();
bar.bind(foo)();
/*或*/
var func = bar.bind(foo);
func();

// 输出：
// undefined
// 3
```

理解起来并不难，需要注意的是 bind 返回的是一个函数，并不会立即执行
