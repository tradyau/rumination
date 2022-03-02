function removeDuplicateLetters(s: string): string {
  let baseArr = s.split('');
  let leftArr = s.split('');
  let stack = [];

  let popStack = (stack, item, leftArr) => {
    if (stack.length === 0) {
      stack.push(item);
      return;
    }
    if (stack.includes(item)) {
      return;
    }
    if (item < stack[stack.length - 1]) {
      if (leftArr.includes(stack[stack.length - 1])) {
        stack.pop();
      } else {
        stack.push(item);
        return;
      }
      popStack(stack, item, leftArr);
    }
    if (item === stack[stack.length - 1]) {
      stack.pop();
      popStack(stack, item, leftArr);
    }
    if (item > stack[stack.length - 1]) {
      stack.push(item);
      return;
    }
  };

  baseArr.forEach((item, index) => {
    leftArr.shift();
    if (stack.length === 0) {
      stack.push(item);
      return;
    }
    popStack(stack, item, leftArr);
  });
  return stack.join('');
}

removeDuplicateLetters('abacb');
