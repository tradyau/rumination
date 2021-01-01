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
      console.log(attr);
    });
  }
  compileText(node) {}
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
