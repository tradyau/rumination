## 手写 bind

首先我们先运行一下官方的 bind

```js
let person = {
  name: 'aa',
  say(age, height) {
    console.log(this.name, age, height);
  },
};
let person2 = {
  name: 'bb',
};

person.say(22, 180);
// aa 22 180

person.say.bind(person2, 33)(190);
// bb 33 190
```

我们自己实现 bind 时，主要思路和 call、apply 基本一致，也是给 Function.prototype 上定义方法
同样，有几个问题是要解决的

- 返回的是一个函数，而且改变了 this
- 能接受多个函数
- 支持柯里化形式传参（`f(1)(2)`）

这个就不逐步分析了，直接贴结果

```js
let person = {
  name: 'aa',
  say(age, height) {
    console.log(this.name, age, height);
  },
};
let person2 = {
  name: 'bb',
};

person.say(22, 180);
// aa 22 180

person.say.bind(person2, 33)(190);
// bb 33 190

Function.prototype.myBind = function (context) {
  // let self = this;
  let arg = [...arguments].slice(1);
  let fn = Symbol();
  context[fn] = this;
  return function () {
    let newArg = [...arguments];
    context[fn](...arg.concat(newArg));
    // 可以用apply偷懒
    // self.apply(context, arg.concat(newArg));
  };
};

person.say.myBind(person2, 33)(190);
// bb 33 190
```
