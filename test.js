let arr = ['aa', 'bb', 'cc', 'dd', 'ee'];
let arr2 = [1, 2, 3, 4];
let result = '';
console.log(
  
);
arr.reduce((data, current) => {
  console.log(data);
  result += current;
  return data;
}, arr2);
console.log(result);
