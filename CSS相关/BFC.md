### 常见的定位方案

定位方案是控制元素的布局，有三种常见方案:

- **普通流 (normal flow)**
  在普通流中，元素按照其在 HTML 中的先后位置至上而下布局，在这个过程中，行内元素水平排列，直到当行被占满然后换行，块级元素则会被渲染为完整的一个新行，除非另外指定，否则所有元素默认都是普通流定位，也可以说，普通流中元素的位置由该元素在 HTML 文档中的位置决定。

- **浮动 (float)**
  在浮动布局中，元素首先按照普通流的位置出现，然后根据浮动的方向尽可能的向左边或右边偏移，其效果与印刷排版中的文本环绕相似。

- **绝对定位 (absolute positioning)**
  在绝对定位布局中，元素会整体脱离普通流，因此绝对定位元素不会对其兄弟元素造成影响，而元素具体的位置由绝对定位的坐标决定。

### BFC

具有 BFC 特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，并且 BFC 具有普通容器所没有的一些特性。

通俗一点来讲，可以把 BFC 理解为一个封闭的大箱子，箱子内部的元素无论如何翻江倒海，都不会影响到外部。

### 触发 BFC

只要元素满足下面任一条件即可触发 BFC 特性：

- body 根元素
- 浮动元素：float 除 none 以外的值
- 绝对定位元素：position (absolute、fixed)
- display 为 inline-block、table-cells、flex
- overflow 除了 visible 以外的值 (hidden、auto、scroll)

### BFC 特性

#### 同一个 BFC 下外边距会发生折叠

```html
<html>
  <head>
    <style type="text/css">
      div {
        width: 100px;
        height: 100px;
        background: lightblue;
        margin: 100px;
      }
    </style>
  </head>
  <body>
    <div></div>
    <div></div>
  </body>
</html>
```

从效果上看，因为两个 div 元素都处于同一个 BFC 容器下 (这里指 body 元素) 所以第一个 div 的下边距和第二个 div 的上边距发生了重叠，所以两个盒子之间距离只有 100px，而不是 200px。

如果想要避免外边距的重叠，可以将其放在不同的 BFC 容器中。

#### BFC 可以包含浮动的元素（清除浮动）

浮动的元素会脱离普通文档流，来看下下面一个例子

```html
<div style="border: 1px solid #000;">
  <div style="width: 100px;height: 100px;background: #eee;float: left;"></div>
</div>
```

![BFC](https://zbd-image.oss-cn-hangzhou.aliyuncs.com/rumination/v2-371eb702274af831df909b2c55d6a14b_1440w.png)

如果使触发容器的 BFC，那么容器将会包裹着浮动元素。

```html
<div style="border: 1px solid #000;overflow: hidden">
  <div style="width: 100px;height: 100px;background: #eee;float: left;"></div>
</div>
```

![BFC](https://zbd-image.oss-cn-hangzhou.aliyuncs.com/rumination/v2-cc8365db5c9cc5ca003ce9afe88592e7_1440w.png)

#### BFC 可以阻止元素被浮动元素覆盖

这个不用多说了，如果设置了 float 导致盖住了另一个元素，可以设法触发另一个元素的 BFC，样式独立之后就不会被覆盖了。同时也可以通过这种方法，实现水平方向自动填充的弹性布局。

```html
<html>
  <head>
    <style type="text/css"></style>
  </head>
  <body>
    <div
      style="height: 100px; width: 100px; float: left; background: lightblue"
    >
      我是一个左浮动的元素
    </div>
    <div style="height: 200px; background: #eee; overflow: hidden">
      我是一个没有设置浮动, 触发 BFC 之后就可以自动填充了
    </div>
  </body>
</html>
```
