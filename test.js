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

// person2.say();
// // 报错

Function.prototype.myBind = function (context) {
  // let self = this;
  let arg = [...arguments].slice(1);
  let fn = Symbol();
  context[fn] = this;
  return function () {
    let newArg = [...arguments];
    context[fn](...arg.concat(newArg));
    // self.apply(context, arg.concat(newArg));
  };
};

person.say.myBind(person2, 33)(190);
// bb 33 190

// person.say.myApply(person2, [18]);
// // bb 18
