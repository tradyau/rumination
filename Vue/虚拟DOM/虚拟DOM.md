## 真实 DOM

先来看看真实的 DOM 流程是怎样的
![DOM](https://zbd-image.oss-cn-hangzhou.aliyuncs.com/rumination/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20201020162213.png)

1. 生成 DOM 树：用 HTML 分析器（HTML Parsee），分析 HTML 文档，生成一个 DOM 树（DOM Tree）
2. 生成样式表：用 css 分析器，解析 css 文件和直接写在标签上的样式，生成页面的样式表。
3. 构建 render 树：将 DOM 树和样式表结合起来，生成一个 Attachment。每个 DOM 节点都有 attach 方法，接受样式信息，返回一个 render 对象，最终构建出一个 render 树
4. 确定节点坐标：根据 render 树的结构，确定每个节点在显示器上显示的坐标位置。
5. 绘制页面：调用每个节点的 paint 方法，将页面显示出来

几个注意的地方：

1. DOM 树的构建是文档加载完成开始的？ 构建 DOM 树是一个渐进过程，为达到更好的用户体验，渲染引擎会尽快将内容显示在屏幕上，它不必等到整个 HTML 文档解析完成之后才开始构建 render 树和布局。
2. Render 树是 DOM 树和 CSS 样式表构建完毕后才开始构建的？ 这三个过程在实际进行的时候并不是完全独立的，而是会有交叉，会一边加载，一边解析，以及一边渲染。
3. CSS 的解析注意点？ CSS 的解析是从右往左逆向解析的，嵌套标签越多，解析越慢。
4. JS 操作真实 DOM 的代价？我们在直接操作 DOM 的时候，频繁地修改 DOM 结构会导致浏览器频繁地进行上述的渲染步骤，导致很多次的渲染其实是无用的，因此非常浪费性能。

## 虚拟 DOM 的优点

为了避免频繁地直接操作 DOM，虚拟 DOM 应运而生。主要的思路可以理解为，用 JS 模拟出 DOM 树，将多次 DOM 操作用 JS 计算完毕，再一次性 attach 到 DOM 树上。在内存中操作 JS 效率肯定远高于浏览器重新渲染 DOM 树，所以性能提升也会相当明显。

## 自己试试

知道了虚拟 DOM 的原理，可以尝试一下看自己能不能简单用 Demo 展示这个思路。

```html
<div id="virtual-dom">
  <p>Virtual DOM</p>
  <ul id="list">
    <li class="item">Item 1</li>
    <li class="item">Item 2</li>
    <li class="item">Item 3</li>
  </ul>
  <div>Hello World</div>
</div>
```

这是一段包含了普通文本、列表、div 的 HTML。
虚拟 DOM 的第一步是用 js 模拟出 DOM 树结构。DOM 节点一般有三个基本属性：元素名称，元素的属性，元素所包含的子元素。我们用一个函数对象来模拟一个 DOM 元素，然后再写一个函数，通过返回这个函数对象的实例，来代表创建了一个 DOM 节点。

```js
/**
 * Element virdual-dom 对象定义
 * @param {String} tagName - dom 元素名称
 * @param {Object} props - dom 属性
 * @param {Array<Element|String>} - 子节点
 */
function Element(tagName, props, children) {
  this.tagName = tagName;
  this.props = props;
  this.children = children;
  // dom 元素的 key 值，用作唯一标识符
  if (props.key) {
    this.key = props.key;
  }
  var count = 0;
  children.forEach(function (child, i) {
    if (child instanceof Element) {
      count += child.count;
    } else {
      children[i] = '' + child;
    }
    count++;
  });
  // 子元素个数
  this.count = count;
}

function createElement(tagName, props, children) {
  return new Element(tagName, props, children);
}

module.exports = createElement;
```

根据我们的设计，上面的那段 dom 树就是

```js
var el = require('./element.js');
var ul = el('div', { id: 'virtual-dom' }, [
  el('p', {}, ['Virtual DOM']),
  el('ul', { id: 'list' }, [
    el('li', { class: 'item' }, ['Item 1']),
    el('li', { class: 'item' }, ['Item 2']),
    el('li', { class: 'item' }, ['Item 3']),
  ]),
  el('div', {}, ['Hello World']),
]);
```

下一步就是将这个 js 模拟的 dom 树，真实得变成 dom 节点，添加到页面上

```js
/**
 * render 将virdual-dom 对象渲染为实际 DOM 元素
 */
Element.prototype.render = function () {
  var el = document.createElement(this.tagName);
  var props = this.props;
  // 设置节点的DOM属性
  for (var propName in props) {
    var propValue = props[propName];
    el.setAttribute(propName, propValue);
  }

  var children = this.children || [];
  children.forEach(function (child) {
    var childEl =
      child instanceof Element
        ? child.render() // 如果子节点也是虚拟DOM，递归构建DOM节点
        : document.createTextNode(child); // 如果字符串，只构建文本节点
    el.appendChild(childEl);
  });
  return el;
};
```

```js
ulRoot = ul.render();
document.body.appendChild(ulRoot);
```

这样，页面里就有了真正的 dom 结构

## DOM diff
