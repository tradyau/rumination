/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  if (!root) return [];
  let resultList = []
  let stepList = []
  stepList.push(root)
  function loop (stepList) {
    let newStepList = []
    let valList = []
    for (const item of stepList) {
      if (item.left) {
        newStepList.push(item.left)
      }
      if (item.right) {
        newStepList.push(item.right)
      }
      valList.push(item.val)
    }
    resultList.push(valList)
    if (newStepList.length > 0) {
      loop(newStepList)
    }
  }
  loop(stepList)
  return resultList
};
