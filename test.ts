function asteroidCollision(asteroids: number[]): number[] {
  let stack = [];

  function getResult(a, b): number | null {
    if (Math.abs(a) > Math.abs(b)) {
      return 1;
    }
    if (Math.abs(a) < Math.abs(b)) {
      return 0;
    }
    if (Math.abs(a) === Math.abs(b)) {
      return null;
    }
  }

  function stackHit(stack: number[], item: number) {
    if (stack.length === 0) {
      stack.push(item);
      return;
    }
    if (item < 0) {
      if (stack[stack.length - 1] < 0) {
        stack.push(item);
        return;
      }
      if (stack[stack.length - 1] > 0) {
        if (getResult(stack[stack.length - 1], item) === 1) {
          return;
        }
        if (getResult(stack[stack.length - 1], item) === 0) {
          stack.pop();
          stackHit(stack, item);
          return;
        }
        if (getResult(stack[stack.length - 1], item) === null) {
          stack.pop();
          return;
        }
      }
    }
    if (item > 0) {
      stack.push(item);
      return;
    }
  }
  asteroids.forEach((item, index) => {
    stackHit(stack, item);
  });
  return stack;
}
