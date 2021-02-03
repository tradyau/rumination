## transition-group

尝试做一个单行的轮播，用 vue 的 transition-group 监听一个单元素数组，通过数组的变化来实现动画的轮播

```html
<div class="box" :style="`background-image: url(${bgImg})`">
  <transition-group name="text">
    <div v-for="item in currentText" :key="item" class="currentText">
      {{ item }}
    </div>
  </transition-group>
</div>
```

```css
.box {
  width: 485px;
  height: 46px;
  overflow: hidden;
}
.currentText {
  line-height: 46px;
  height: 46px;
  color: #fff;
}
.text-enter-active {
  animation: text-in 0.5s;
}
.text-leave-active {
  animation: text-out 0.5s;
}
.text-move {
  transition: all 0.5s;
}
@keyframes text-in {
  0% {
    transform: translateY(-200%);
  }
  100% {
    transform: translateY(-100%);
  }
}
@keyframes text-out {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100%);
  }
}
```

写代码过程中，在定义动画的 keyframes 的时候，transform 调整了很久，原本以为单个元素轮播，一边插入一边移出， translateY 会基于当前的位置做位移。也就是说，动画轮播的时候始终以中心的元素位置作为基点。
但实际开发中发现，当使用 transition-group 的时候，基点是以新加入的元素位置为基点。而且会先新加入元素，后移除元素，所以位置就会变掉。在开发中需要注意一下。

ps：transition 还没有尝试，后续补充。
