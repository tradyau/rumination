### this.$set() 和 Vue.set()

#### this.$set()

在我们使用 vue 进行开发的过程中，可能会遇到一种情况：当生成 vue 实例后，当再次给数据赋值时，有时候并不会自动更新到视图上去； 当我们去看 vue 文档的时候，会发现有这么一句话：**如果在实例创建之后添加新的属性到实例上，它不会触发视图更新。**
如下代码，给 student 对象新增 age 属性

```js
data () {
  return {
    student: {
      name: '',
      sex: ''
    }
  }
}
mounted () { // ——钩子函数，实例挂载之后
  this.student.age = 24
}

```

此时的 age 就不是动态响应的，因为 Vue.js 在初始化实例时将属性转为 getter/setter，所以属性必须在 data 对象上才能让 Vue.js 转换它，才能让它是响应的。age 是后面添加的，自然不会经过设置 getter/setter 的过程，所以就丢失了动态响应。

正确写法

```js
mounted () {
  this.$set(this.student,"age", 24)
}
```

#### Vue.set()

**Vue 不允许动态添加根级响应式属性**

```js
const app = new Vue({
  data: {
    a: 1,
  },
  // render: h => h()
}).$mount('#app1');

Vue.set(app.data, 'b', 2);
```

这种情况下是会报错，想要添加就必须套一层

```js
var vm=new Vue({
    el:'#test',
    data:{
        //data中已经存在info根属性
        info:{
            name:'小明';
        }
    }
});
//给info添加一个性别属性
Vue.set(vm.info,'sex','男');
```

#### Vue.set()和 this.$set()实现原理

结果我们发现 Vue.set()和 this.$set()这两个api的实现原理基本一模一样，都是使用了set函数。set函数是从 ../observer/index 文件中导出的，区别在于Vue.set()是将set函数绑定在Vue构造函数上，this.$set()是将 set 函数绑定在 Vue 原型上。
