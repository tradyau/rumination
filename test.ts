function removeKdigits(num: string, k: number): string {
  let stackArr = [];
  num.split('').forEach((item, index) => {
    let itemNum = parseInt(item);
    if (index === 0) {
      stackArr.push(itemNum);
      return;
    }
    if (k === 0) {
      stackArr.push(itemNum);
      return;
    }
    while (stackArr[stackArr.length - 1] > itemNum && k !== 0) {
      stackArr.pop();
      k--;
    }
    stackArr.push(itemNum);
  });
  if (k > 0) {
    while (k !== 0) {
      stackArr.pop();
      k--;
    }
  }
  while (stackArr[0] === 0 && stackArr.length > 0) {
    stackArr.shift();
  }
  if (stackArr.length === 0) {
    return '0';
  }
  return stackArr.join('');
}
removeKdigits('1432219', 3);
