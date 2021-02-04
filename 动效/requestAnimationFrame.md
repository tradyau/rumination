## requestAnimationFrame

通常用在循环执行动画，相比于 setTimeout 更有优势

### setTimeout

setTimeout 其实就是通过设置一个间隔时间来不断的改变图像的位置，从而达到动画效果的。但利用 seTimeout 实现的动画在某些低端机上会出现卡顿、抖动的现象。

这种现象的产生有两个原因：

- setTimeout 的执行时间并不是确定的。在 Javascript 中， setTimeout 任务被放进了异步队列中，只有当主线程上的任务执行完以后，才会去检查该队列里的任务是否需要开始执行，因此 setTimeout 的实际执行时间一般要比其设定的时间晚一些。

- 刷新频率受屏幕分辨率和屏幕尺寸的影响，因此不同设备的屏幕刷新频率可能会不同，而 setTimeout 只能设置一个固定的时间间隔，这个时间不一定和屏幕的刷新时间相同。以上两种情况都会导致 setTimeout 的执行步调和屏幕的刷新步调不一致，从而引起丢帧现象。

那为什么步调不一致就会引起丢帧呢？
首先要明白，setTimeout 的执行只是在内存中对图像属性进行改变，这个变化必须要等到屏幕下次刷新时才会被更新到屏幕上。如果两者的步调不一致，就可能会导致中间某一帧的操作被跨越过去，而直接更新下一帧的图像。

假设屏幕每隔 16.7ms 刷新一次，而 setTimeout 每隔 10ms 设置图像向左移动 1px， 就会出现如下绘制过程：

- 第 0ms:  屏幕未刷新，等待中，setTimeout 也未执行，等待中；
- 第 10ms:  屏幕未刷新，等待中，setTimeout 开始执行并设置图像属性 left=1px；
- 第 16.7ms:  屏幕开始刷新，屏幕上的图像向左移动了 1px， setTimeout 未执行，继续等待中；
- 第 20ms:  屏幕未刷新，等待中，setTimeout 开始执行并设置 left=2px;
- 第 30ms:  屏幕未刷新，等待中，setTimeout 开始执行并设置 left=3px;
- 第 33.4ms: 屏幕开始刷新，屏幕上的图像向左移动了 3px， setTimeout 未执行，继续等待中；
- ...

从上面的绘制过程中可以看出，屏幕没有更新 left=2px 的那一帧画面，图像直接从 1px 的位置跳到了 3px 的的位置，这就是丢帧现象，这种现象就会引起动画卡顿。

### requestAnimationFrame

与 setTimeout 相比，requestAnimationFrame 最大的优势是由系统来决定回调函数的执行时机。具体一点讲，如果屏幕刷新率是 60Hz,那么回调函数就每 16.7ms 被执行一次，如果刷新率是 75Hz，那么这个时间间隔就变成了 1000/75=13.3ms，换句话说就是，requestAnimationFrame 的步伐跟着系统的刷新步伐走。它能保证回调函数在屏幕每一次的刷新间隔中只被执行一次，这样就不会引起丢帧现象，也不会导致动画出现卡顿的问题。

### 其它优势

- CPU 节能：使用 setTimeout 实现的动画，当页面被隐藏或最小化时，setTimeout 仍然在后台执行动画任务，由于此时页面处于不可见或不可用状态，刷新动画是没有意义的，完全是浪费 CPU 资源。而 requestAnimationFrame 则完全不同，当页面处理未激活的状态下，该页面的屏幕刷新任务也会被系统暂停，因此跟着系统步伐走的 requestAnimationFrame 也会停止渲染，当页面被激活时，动画就从上次停留的地方继续执行，有效节省了 CPU 开销。
- 函数节流：在高频率事件(resize,scroll 等)中，为了防止在一个刷新间隔内发生多次函数执行，使用 requestAnimationFrame 可保证每个刷新间隔内，函数只被执行一次，这样既能保证流畅性，也能更好的节省函数执行的开销。一个刷新间隔内函数执行多次时没有意义的，因为显示器每 16.7ms 刷新一次，多次绘制并不会在屏幕上体现出来。

### demo

主要通过记录当前 timestamp，对比上次记录的时间，达到设定数值的时候就执行更新任务，实现循环。

```js
    data(){
        return {
            id: "",
            interval: 2000,
            lastUpdate: 0
        }
    }
    destroyed() {
        window.cancelAnimationFrame(this.id);
    }

    // methods
    startLoop() {
        this.id = window.requestAnimationFrame(this.loop);
    },
    loop(timeStamp) {
        if (!this.lastUpdate) {
        this.lastUpdate = timeStamp;
        }

        const elapsed = timeStamp - this.lastUpdate;

        if (elapsed > this.interval) {
        console.log(elapsed, this.interval);
        this.lastUpdate = timeStamp;
        }

        this.id = window.requestAnimationFrame(this.loop);
    }
```
