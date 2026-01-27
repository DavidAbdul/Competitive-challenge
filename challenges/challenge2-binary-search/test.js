const binarySearch = require('./solution');

const testCases = [
    {
        name: 'Ejemplo 1: Encontrar 9 en [-1,0,3,5,9,12]',
        input: [[-1, 0, 3, 5, 9, 12], 9],
        expected: 4,
        validator: (result, expected) => result === expected
    },
    {
        name: 'Ejemplo 2: Buscar 2 (no existe) en [-1,0,3,5,9,12]',
        input: [[-1, 0, 3, 5, 9, 12], 2],
        expected: -1,
        validator: (result, expected) => result === expected
    },
    {
        name: 'Ejemplo 3: Array de un elemento [5], target = 5',
        input: [[5], 5],
        expected: 0,
        validator: (result, expected) => result === expected
    },
    {
        name: 'Buscar primer elemento',
        input: [[1, 2, 3, 4, 5], 1],
        expected: 0,
        validator: (result, expected) => result === expected
    },
    {
        name: 'Buscar último elemento',
        input: [[1, 2, 3, 4, 5], 5],
        expected: 4,
        validator: (result, expected) => result === expected
    },
    {
        name: 'Buscar elemento del medio',
        input: [[1, 2, 3, 4, 5, 6, 7], 4],
        expected: 3,
        validator: (result, expected) => result === expected
    },
    {
        name: 'Array grande',
        input: [Array.from({length: 1000}, (_, i) => i * 2), 500],
        expected: 250,
        validator: (result, expected) => result === expected
    },
    {
        name: 'Target no existe en array grande',
        input: [Array.from({length: 1000}, (_, i) => i * 2), 501],
        expected: -1,
        validator: (result, expected) => result === expected
    }
];

module.exports = { testCases, solution: binarySearch };
