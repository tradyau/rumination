class Watcher {
  // 传入vm,expr，获取旧的属性值,最后传入cb进行回调
  constructor(vm, expr, cb) {
    this.vm = vm;
    this.expr = expr;
    this.cb = cb;
    this.oldVal = this.getOldVal();
  }
  // 判断新值和旧值，不同的话就调用updater更新视图
  update() {
    let newVal = compileUtil.getValue(this.expr, this.vm);
    if (newVal !== this.oldVal) {
      this.cb(newVal);
    }
  }
  // 获取data中对应的旧值
  getOldVal() {
    Dep.target = this;
    // 此时会调用到劫持的getter
    let oldVal = compileUtil.getValue(this.expr, this.vm);
    Dep.target = null;
    return oldVal;
  }
}
class Dep {
  constructor() {
    this.subs = [];
  }
  // 收集观察者,可以理解为，页面上每有一个调用该属性的地方，就会有一个观察者
  // dep会将所有的观察者收集起来，然后在属性值变动的时候，去通知所有观察者，进而更新视图
  addSub(watcher) {
    this.subs.push(watcher);
  }
  // 通知观察者去更新
  notify() {
    this.subs.forEach((w) => {
      w.update();
    });
  }
}

class Observer {
  constructor(data) {
    this.observe(data);
  }
  observe(data) {
    if (data && typeof data === 'object') {
      // 遍历data，去劫持各个属性
      Object.keys(data).forEach((key) => {
        this.defineReactive(data, key, data[key]);
      });
    }
  }
  defineReactive(data, key, value) {
    // 递归调用observe(),确保遍历到对象嵌套时的每一个属性
    this.observe(value);

    const dep = newDep();
    // 劫持属性
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: false,
      get() {
        // 渲染视图的时候会调用get，订阅数据变化时，往Dep中添加观察者
        Dep.target && dep.addSub(Dep.target);
        return value;
      },
      set: (newVal) => {
        // 新的值也要设置劫持
        this.observe(newVal);
        if (newVal !== value) {
          value = newVal;
          // 通知dep，去通知watcher
          dep.notify()
        }
      },
    });
  }
}
