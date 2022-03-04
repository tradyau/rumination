function minRemoveToMakeValid(s: string): string {
  let stack = [];
  let sArr = s.split('');
  sArr.forEach((item, index) => {
    if (item === '(' || item === ')') {
      if (stack.length === 0) {
        stack.push({
          item,
          index,
        });
        return;
      }
      if (item === '(') {
        stack.push({
          item,
          index,
        });
      }
      if (item === ')') {
        if (stack[stack.length - 1].item === '(') {
          stack.pop();
        } else {
          stack.push({
            item,
            index,
          });
        }
      }
    }
  });
  stack.forEach((stackItem, index) => {
    delete sArr[stackItem.index];
  });
  return sArr.join('');
}
minRemoveToMakeValid('lee(t(c)o)de');
