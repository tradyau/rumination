// class MinStack {
//   arr = [];
//   constructor() {
//     this.arr = [];
//   }

//   push(val: number): void {
//     this.arr.push(val);
//   }

//   pop(): void {
//     this.arr.pop();
//   }

//   top(): number {
//     return this.arr[this.arr.length - 1];
//   }

//   getMin(): number {
//     let res = this.arr[0];
//     this.arr.forEach((item) => {
//       res = Math.min(res, item);
//     });
//     return res
//   }
// }

class MinStack {
  arr = [];
  minArr = [];
  constructor() {
    this.arr = [];
    this.minArr = [];
  }

  push(val: number): void {
    this.arr.push(val);
    if (this.arr.length === 1) {
      this.minArr.push(val);
    } else {
      this.minArr.push(Math.min(val, this.minArr[this.minArr.length - 1]));
    }
  }

  pop(): void {
    this.arr.pop();
    this.minArr.pop();
  }

  top(): number {
    return this.arr[this.arr.length - 1];
  }

  getMin(): number {
    return this.minArr[this.minArr.length - 1];
  }
}
