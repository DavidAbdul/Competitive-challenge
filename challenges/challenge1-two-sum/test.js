const twoSum = require('./solution');
const { runTest } = require('../../utils/testRunner');

const testCases = [
    {
        name: 'Ejemplo 1: [2,7,11,15], target = 9',
        input: [[2, 7, 11, 15], 9],
        expected: [0, 1],
        validator: (result, expected) => {
            if (!Array.isArray(result) || result.length !== 2) return false;
            const [i, j] = result;
            const nums = [2, 7, 11, 15];
            return nums[i] + nums[j] === 9;
        }
    },
    {
        name: 'Ejemplo 2: [3,2,4], target = 6',
        input: [[3, 2, 4], 6],
        expected: [1, 2],
        validator: (result, expected) => {
            if (!Array.isArray(result) || result.length !== 2) return false;
            const [i, j] = result;
            const nums = [3, 2, 4];
            return nums[i] + nums[j] === 6;
        }
    },
    {
        name: 'Ejemplo 3: [3,3], target = 6',
        input: [[3, 3], 6],
        expected: [0, 1],
        validator: (result, expected) => {
            if (!Array.isArray(result) || result.length !== 2) return false;
            const [i, j] = result;
            const nums = [3, 3];
            return nums[i] + nums[j] === 6;
        }
    },
    {
        name: 'Array grande',
        input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 19],
        expected: [8, 9],
        validator: (result, expected) => {
            if (!Array.isArray(result) || result.length !== 2) return false;
            const [i, j] = result;
            const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            return nums[i] + nums[j] === 19;
        }
    },
    {
        name: 'Números negativos',
        input: [[-1, -2, -3, -4, -5], -8],
        expected: [2, 4],
        validator: (result, expected) => {
            if (!Array.isArray(result) || result.length !== 2) return false;
            const [i, j] = result;
            const nums = [-1, -2, -3, -4, -5];
            return nums[i] + nums[j] === -8;
        }
    }
];

module.exports = { testCases, solution: twoSum };
