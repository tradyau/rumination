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
};

person.say.myCall(person2, 18);
// bb 18
