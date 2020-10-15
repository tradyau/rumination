let person = function () {
    this.age = 22
    person.prototype.pAge = 33
    person.prototype.showAge = () => {
        return this.age
    }
    // 这种方式会影响到constructor
    // person.prototype = {
    //     age: 33
    // }
}
let p = new person()
/**
 * 首先区分一下普通对象和函数对象的概念，凡是通过 new Function() 创建的对象都是函数对象
 * 
 * 受之前Java的惯性思维影响，通常认为对象和函数是两回事。但在js中，函数也是对象。也就是说，在js中可以将函数赋值给一个变量，也就是上面person的赋值过程。那这里的person，既是一个函数，也是一个对象。
 * 那么这个变量被赋值了一个对象，这个对象是一个函数，那这个对象就是函数对象。
 * 
 * 到目前为止，产生了两个个东西
 * 1.person：一个被赋值了函数的变量，也就是一个函数对象
 * 2.person的值：是一个函数
 */



console.log(person.prototype);
// person { age: 33, showAge: [Function] }
console.log(p.prototype);
// undefined

/**
 * 原型对象概念：
 * 在js中，每当定义一个对象的时候，会自动生成一些预定义好的属性。当一个函数对象被定义出来的时候，就会有一个prototype属性。
 * 这个属性会指向一个对象，而这个对象我们就称作是这个函数的原型对象。
 * 根据上面的测试，这个原型对象是默认存在的一个空对象，如果给它添加属性，那后面也是可以看到相应的属性的。
 * 
 * 与此同时，作为普通对象的p，是没有prototype属性的
 */

console.log(person.prototype.constructor);
// [Function: person]
console.log(person.prototype.constructor == person);
// true
console.log(p.constructor);
// [Function: person]
console.log(person.prototype.constructor == p.constructor);
// true
/**
 * 原型对象也会自动获得一个constructor属性，也就是构造函数。这个属性是一个指针，指向一开始的这个函数。
 * 
 * 接下来看这个p，因为p是从person上new出来的，也就是说p是person这个函数对象的一个实例。那p上也会自动有一个constructor属性，就指向了p的构造函数，也就是person。
 * 
 * 这个时候发现，虽然两个constructor并不是一回事，但打印出来的东西有点像啊,试一把就发现，两个都是person函数
 * 一边是函数的原型对象，一边是函数的实例，这就可以得出一个结论：原型对象就是这个函数的一个实例。
 * 
 * 不过这个原型对象也是一个普通对象（不是函数对象，名词比较多不要搞混掉），所以它是没有prototype属性的
 * 
 */


console.log(p.age, p.pAge)
// 22 33
console.log(p.showAge())
// 22
/**
 * 这个原型对象有什么用呢，或者说为什么要创造这么一个东西呢
 * 目前看来，对这个原型对象设置一些属性和方法，那么这个函数的实例就也会有这些属性和方法。比如pAge和showAge()方法是写在prototype上，没有直接写在函数里，但是直接调用的时候也会有结果。
 *
 */

console.log(person.__proto__);
// [Function]
console.log(p.__proto__);
// person { pAge: 33, showAge: [Function] }
console.log(p.__proto__ == person.prototype);
//true
/**
 * JS在创建对象的时候，不论是普通对象还是函数对象，都会有一个__proto__属性，这个属性会指向创建它的构造函数的原型对象。
 * 
 * 需要注意的是，这个链接关系是存在于实例和和构造函数的原型对象之间，并不是实例和构造函数直接联系的。
 *
 */

let obj1 = {}
// 等价于
let obj2 = new Object()
console.log(obj1.__proto__);
// {}
/**
 * 这么看来，obj是Object()的一个实例，那Object其实也是有原型对象（Object.prototype），所以普通对象的__proto__，其实就是指向了Object.prototype
 * 同理，Array，Date，Function等也都有自己的原型对象.
 * 
 * 但Function.prototype有点特殊
 */

let mPerson = function () { }
let mP = new mPerson()
// 相当于
let nPerson = new Function()
let nP = new nPerson()
/**
 * 这里可以看出，nPerson是Function()的一个实例，可以等价于Function.prototype。于此同时，它也是一个函数对象，所以Function.prototype也是一个函数对象。
 * 
 */

console.log(Function.prototype);
// [Function]
console.log(Object.__proto__);
// [Function]
console.log(Object.__proto__ == Array.__proto__)
// true
console.log(Object.__proto__ == Function.prototype)
// true
console.log(Function.__proto__ == Function.prototype)
// true
console.log(Function.prototype.__proto__);
// {}
console.log(Object.prototype.__proto__);
// null 这个比较特殊，null是原型链的顶端

/**
 * 所有的构造器(Array,String...)都来自于Function.prototype，甚至包括根构造器Object及Function自身,所以Object.__proto__也就指向了Function.prototype
 * 当然，自定义的构造器，其实也就是自定义的函数对象，__proto__也是指向Function.prototype
 *
 * 那Function.prototype虽然是个函数对象，但它也是一个对象，它的__proto__又指向谁呢?
 * 尝试了之后发现，Function.prototype也只是一个普通对象，那普通对象的__proto__自然也就指向Object.prototype
 *
 * 最后，Object.prototype.__proto__又指向谁呢？结果是null，到头了
 */

/**
 * 原型链能用来干嘛呢？最明显的就是实现继承，也就是函数继承。
 * js中当调用一个对象a的属性时，会先看a本身有没有，没有的话就再往上，通过a.__proto__找到原型对象，看这个原型对象上有没有，没有的话就继续再往上，a.__proto__.__proto去找
 * 实现函数继承有四种方法：
 * 1、创建空函数作架桥函数，将其封装成inherits函数
 * 2、利用create方法， child.prototype=Object.create(parents.prototype)
 * 3、利用_proto_属性， child.prototype._proto_=parents.prototype
 * 4、利用setPrototypeOf方法， child.prototype=Object.setPrototypeOf(parents.prototype)
 */

 /**
  * 参考资料
  * https://www.liaoxuefeng.com/wiki/1022910821149312/1023021997355072
  * https://www.jianshu.com/p/dee9f8b14771
  */