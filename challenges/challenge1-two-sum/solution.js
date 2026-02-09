/**
 * Two Sum
 *
 * @param {number[]} nums - Array de números enteros
 * @param {number} target - Número objetivo
 * @return {number[]} - Índices de los dos números que suman target
 *
 * Ejemplos:
 * twoSum([2,7,11,15], 9) => [0,1]
 * twoSum([3,2,4], 6) => [1,2]
 * twoSum([3,3], 6) => [0,1]
 */
function twoSum(nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (map.has(complement)) {
      return [map.get(complement), i];
    }

    map.set(nums[i], i);
  }

  return [];
}

module.exports = twoSum;
