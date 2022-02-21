/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
  let result = []
  const map = { '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl', '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz' };
  let digitsArr = digits.split('')
  let preArr = []
  digitsArr.forEach((item,index)=>{
    preArr.push(map[item].split(''))
  })


  let str = ''
  let loop = function(arr,index){
    console.log(arr,index)

    arr[index].forEach((item,mIndex) => {
      str+=item
      index++
      if (arr.length>index) {
        loop(arr,index++)
      }else{
        result.push(str)
        str = ''
      }
    });
  }
  loop(preArr,0)
  console.log(result)
  
  // console.log(result)
};
letterCombinations("23")


