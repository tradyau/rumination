## transition-group

尝试做一个单行的轮播，用 vue 的 transition-group 监听一个单元素数组，通过数组的变化来实现动画的轮播

```vue
<template>
  <div class="home">
    <!-- <button @click="handleClick">click</button> -->
    <div class="box" :style="`background-image: url(${bgImg})`">
      <transition-group name="text">
        <div v-for="item in currentText" :key="item" class="currentText">
          {{ item }}
        </div>
      </transition-group>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Home',
  components: {},
  data() {
    return {
      currentText: [],
      currentIndex: 0,
      bgImg:
        'http://yun.tuisnake.com/turnCircle_red/da7011e7-0f67-46b7-b206-6baeae37e4c0.png?x-oss-process=image/format,webp',
      msgList: [
        '用户李**1分钟前抽中iPhone12',
        '用户元**1分钟前抽中1.8元红包',
        '用户王**1分钟前抽中1.8元红包',
        '用户赵**1分钟前抽中1000金币',
        '用户蒋**刚刚抽中iPhone12',
        '用户郑**刚刚抽中18元红包',
        '用户孔**刚刚抽中1000金币',
        '用户曹**刚刚抽中18元红包',
        '用户钱**刚刚集齐100元成功提现',
        '用户周**刚刚抽中百万交通意外险',
        '用户何**刚刚抽中iPhone12',
        '用户吕**刚刚抽中1000金币',
        '用户黄**刚刚集齐100元成功提现',
        '用户施**刚刚抽中免费白酒一箱',
        '用户张**刚刚抽中18元红包',
      ],
    };
  },
  mounted() {
    setInterval(() => {
      if (this.currentIndex < this.msgList.length) {
        this.currentText = [];
        this.currentText.push(this.msgList[this.currentIndex]);
        this.currentIndex++;
      } else {
        this.currentIndex = 0;
        this.currentText = [];
        this.currentText.push(this.msgList[this.currentIndex]);
        this.currentIndex++;
      }
    }, 2000);
  },
  methods: {
    // handleClick() {
    //   if (this.currentIndex < this.msgList.length) {
    //     this.currentText = [];
    //     this.currentText.push(this.msgList[this.currentIndex]);
    //     this.currentIndex++;
    //   } else {
    //     this.currentIndex = 0;
    //     this.currentText = [];
    //     this.currentText.push(this.msgList[this.currentIndex]);
    //     this.currentIndex++;
    //   }
    //   console.log(this.currentText);
    // },
  },
};
</script>
<style lang="less" scoped>
@import './Home';
</style>
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
