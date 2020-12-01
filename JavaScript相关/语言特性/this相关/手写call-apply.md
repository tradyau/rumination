### 手写 call

先写两个对象出来备用

```js
let person = {
  name: 'aa',
  say() {
    console.log(this.name);
  },
};
let person2 = {
  name: 'bb',
};

person.say();
// aa

person.say.call(person2);
// bb

person2.say();
// 报错
```

调用原生的 call 是没问题的。观察一下直接调用的报错，`person2.say is not a function`，那 person2 如果有 say 这个方法，岂不是就可以了？

```js
function myCall(context) {
  // context就是我想绑定到的this，由于myCall是被一个函数对象调用的，所以this就是要执行的函数，那只需要把这个函数定义到context上就可以了
  console.log(context);
  console.log(this);
  context.say = this;
  // call方法会立即执行，所以这里要直接调用一下
  context.say();
}
```

那怎么让想要执行的方法调用 myCall 呢？直接写到 Function 的 prototype 上好了，和原生的 call 一样。
复习一下：当一个函数被 new 出来，它同时也是一个函数对象，他的`__proto__`就指向他的构造函数的原型对象（prototype）,即 Function.prototype
所以上面的代码修改下

```js
Function.prototype.myCall = function (context) {
  // context就是我想绑定到的this，由于myCall是被一个函数对象调用的，所以this就是要执行的函数，那只需要把这个函数定义到context上就可以了
  console.log(context);
  // { name: 'bb' }

  console.log(this);
  // [Function: say]

  context.newFn = this;
  // call方法会立即执行，所以这里要直接调用一下。
  context.newFn();
};

person.say.myCall(person2);
// bb
```

这样看来 myCall 就可以正常工作了。但是很明显，这个只是原理上通了，还有很多真正的问题要解决。

- **call 是可以不传参数的，默认绑定到 window 上。而且还可以传多个参数，除了 context，后面的参数都是函数的入参。**

  这个简单，判断一下 context 是否存在，不存在就换成 window

  ```js
  Function.prototype.myCall = function (context) {
    // 判断context
    context = context || window;
    context.newFn = this;
    context.newFn();
  };
  ```

- **给 context 绑定并立即执行的方法，必须是唯一的，不能影响到 context 自身的方法。**
  假如上面我们的例子里，person2 正好有个已经定义过的 newFn 方法，那我们的 myCall 就受影响了。
  怎么办呢？es6 里推出了 symbol ，定义中**一个 symbol 值能作为对象属性的标识符**，好像正好可以解决这个问题？
  ```js
  Function.prototype.myCall = function (context) {
    context = context || window;
    // 用Symbol解决属性唯一的问题
    let fn = Symbol();
    context[fn] = this;
    context[fn]();
    delete context[fn];
  };
  ```
- **除了 context，call 还需要绑定很多参数进去，作为调用时的参数**
  这个其实也不复杂，用 arguments 取到参数，传给 context 去执行就好
  ```js
  Function.prototype.myCall = function (context) {
    context = context || window;
    let fn = Symbol();
    context[fn] = this;
    // 获取剩余参数
    let arg = [...arguments].slice(1);
    context[fn](...arg);
    delete context[fn];
  };
  ```

至此，我们的手写 call 就完成了，贴一下完整代码

```js
let person = {
  name: 'aa',
  say(age) {
    console.log(this.name, age);
  },
};
let person2 = {
  name: 'bb',
};

person.say(22);
// aa 22

person.say.call(person2, 33);
// bb 33

// person2.say();
// // 报错

Function.prototype.myCall = function (context) {
  context = context || window;
  let fn = Symbol();
  context[fn] = this;
  let arg = [...arguments].slice(1);
  context[fn](...arg);
  delete context[fn];
};

person.say.myCall(person2, 18);
// bb 18
```

### 手写 apply

call 已经实现了，apply 也没什么难度，只要把传参的方式改一下就好了,直接上代码

```js
let person = {
  name: 'aa',
  say(age) {
    console.log(this.name, age);
  },
};
let person2 = {
  name: 'bb',
};

person.say(22);
// aa 22

person.say.apply(person2, [33]);
// bb 33

// person2.say();
// // 报错

Function.prototype.myApply = function (context, arr) {
  context = context || window;
  let fn = Symbol();
  context[fn] = this;
  context[fn](...arr);
  delete context[fn];
};

person.say.myApply(person2, [18]);
// bb 18
```
