const compileUtil = {
  // 根据key获取真正的value
  getValue(expr, vm) {
    return expr.split('.').reduce((data, currentValue) => {
      return data[currentValue];
    }, vm.$date);
  },
  text(node, expr, vm) {
    let value;
    //   判断{{}}的情况
    if (expr.indexOf('{{') !== -1) {
      // 正则匹配，去掉大括号，取到真正的key，再去获取data中的实际值
      value = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
        return this.getValue(args[1], vm);
      });
    } else {
      // 从vm的$data中取到对应的值,通过getValue取到真正的值（解决data中多层对象的嵌套。data.person.fav）
      value = this.getValue(expr, vm);
    }
    // 更新视图
    this.updater.textUpdater(node, value);
  },
  html(node, expr, vm) {
    const value = this.getValue(expr, vm);
    this.updater.htmlUpdater(node, value);
  },
  model(node, expr, vm) {
    const value = this.getValue(expr, vm);
    this.updater.modelUpdater(node, value);
  },
  // 事件
  on(node, expr, vm, eventName) {
    // 根据事件名称获取methods里对应的回调
    let fn = vm.$options.methods && vm.$options.methods[expr];
    // 绑定时间，同时绑定回调方法的this指向vm实例
    node.addEventListener(eventName, fn.bind(vm), false);
  },
  // 绑定属性
  bind() {},
  // 更新数据的方法
  updater: {
    textUpdater(node, value) {
      node.textContent = value;
    },
    htmlUpdater(node, value) {
      node.innerHTML = value;
    },
    modelUpdater(node, value) {
      node.value = value;
    },
  },
};
class Compile {
  constructor(el, vm) {
    // 判断是html代码，还是节点对象
    this.el = this.isElementNode(el) ? el : document.querySelector(el);
    this.vm = vm;
    // 编译器如果每次替换模板语法和实际值时，都渲染页面，就会造成频繁的回流和重绘
    // 需要通过获取文档碎片对象，放入内存中，会减少页面的回流和重绘

    // 1. 获取文档碎片
    const fragment = this.node2Fragment(this.el);

    // 2. 编译模板（计算并替换模板的实际值）
    this.compile(fragment);
    // 3. 将文档碎片追加到el（根元素）上
    this.el.appendChild(fragment);
  }
  // 判断是否是元素节点
  isElementNode(node) {
    return node.nodeType === 1;
  }
  // 将节点转为文档碎片
  node2Fragment(el) {
    // 创建文档碎片
    const f = document.createDocumentFragment();
    // 通关判断当前元素是否有子元素，来遍历el树(只遍历了最外层)，然后添加到文档碎片
    let firstChild;
    while ((firstChild = el.firstChild)) {
      f.appendChild(firstChild);
    }
    return f;
  }
  compile(fragment) {
    // 获取子节点
    const childNodes = fragment.childNodes;
    [...childNodes].forEach((child) => {
      // 判断是元素节点，编译元素节点
      if (this.isElementNode(child)) {
        this.compileElement(child);
      }
      // 文本节点，编译文本节点
      else {
        this.compileText(child);
      }
      // 遍历所有的子节点
      if (child.childNodes && child.childNodes.length) {
        this.compile(child);
      }
    });
  }
  compileElement(node) {
    // 获取元素节点上的属性
    const attributes = node.attributes;
    [...attributes].forEach((attr) => {
      // 结构赋值，拿到属性的名称和属性值
      const { name, value } = attr;
      // 判断属性是否是指令属性
      if (this.isDirectName(name)) {
        // 此时的name为：v-text v-html v-model v-on:click
        // 结构赋值拿到“v-”后的指令内容,此时的directive为：text html model on:click
        const [, directive] = name.split('-');
        // on:click需要进一步处理，继续结构赋值
        // 此时，dirName为：text html model on eventName的值为：click
        const [dirName, eventName] = directive.split(':');
        // 策略模式，针对不同的属性，执行不同的操作，更新视图
        // node: 当前的元素节点
        // value: 属性值
        // vm: 当前实例，主要是为了获取data里的数据
        // eventName: 触发的事件名称（v-on:click）
        compileUtil[dirName](node, value, this.vm, eventName);
        // 删除有指令的标签上的属性
        node.removeAttribute('v-' + directive);
      } else if (this.isEventName(name)) {
        // 处理@click
        let [, eventName] = name.split('@');
        compileUtil['on'](node, value, this.vm, eventName);
      }
    });
  }
  compileText(node) {
    // 使用正则匹配{{}}
    const content = node.textContent;
    if (/\{\{(.+?)\}\}/.test(content)) {
      compileUtil['text'](node, content, this.vm);
    }
  }

  // 判断属性是否是指令属性
  isDirectName(attrName) {
    return attrName.startsWith('v-');
  }

  // 判断是否是@指令属性
  isEventName(attrName) {
    return attrName.startsWith('@');
  }
}

class MVue {
  constructor(options) {
    this.$el = options.el;
    this.$date = options.data;
    this.$options = options;
    if (this.$el) {
      // 实现一个数据观察者
      // 实现一个指令解析器
      new Compile(this.$el, this);
    }
  }
}
