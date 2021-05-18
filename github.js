/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    let result = 0
    let leftIndex = 0
    let rightIndex = height.length-1
    while (rightIndex > leftIndex) {
        let currentResult = getValue(leftIndex,rightIndex,height)
        result = Math.max(result,currentResult)
        // 决定水桶容积的是最短的木板，通过判断左右两块木板的高度，从最低的一块开始往中间收紧
        if (height[leftIndex] > height[rightIndex]) {
            rightIndex -- 
        }else{
            leftIndex ++
        }
    }
    return result
};
function getValue(leftIndex,rightIndex,arr) {
    return Math.min(arr[leftIndex],arr[rightIndex])*(rightIndex-leftIndex)
}
