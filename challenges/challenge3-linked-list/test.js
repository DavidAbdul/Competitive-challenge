const { hasCycle, ListNode } = require('./solution');

/**
 * Helper function to create a linked list with a cycle
 */
function createLinkedList(values, pos) {
    if (values.length === 0) return null;
    
    const head = new ListNode(values[0]);
    let current = head;
    let cycleNode = null;
    
    if (pos === 0) cycleNode = head;
    
    for (let i = 1; i < values.length; i++) {
        current.next = new ListNode(values[i]);
        current = current.next;
        
        if (i === pos) {
            cycleNode = current;
        }
    }
    
    if (pos !== -1 && cycleNode !== null) {
        current.next = cycleNode;
    }
    
    return head;
}

const testCases = [
    {
        name: 'Ejemplo 1: [3,2,0,-4] con ciclo en posición 1',
        input: [createLinkedList([3, 2, 0, -4], 1)],
        expected: true,
        validator: (result, expected) => result === expected
    },
    {
        name: 'Ejemplo 2: [1,2] con ciclo en posición 0',
        input: [createLinkedList([1, 2], 0)],
        expected: true,
        validator: (result, expected) => result === expected
    },
    {
        name: 'Ejemplo 3: [1] sin ciclo',
        input: [createLinkedList([1], -1)],
        expected: false,
        validator: (result, expected) => result === expected
    },
    {
        name: 'Lista vacía',
        input: [null],
        expected: false,
        validator: (result, expected) => result === expected
    },
    {
        name: 'Lista sin ciclo [1,2,3,4,5]',
        input: [createLinkedList([1, 2, 3, 4, 5], -1)],
        expected: false,
        validator: (result, expected) => result === expected
    },
    {
        name: 'Lista con ciclo al inicio',
        input: [createLinkedList([1, 2, 3, 4, 5], 0)],
        expected: true,
        validator: (result, expected) => result === expected
    },
    {
        name: 'Lista con ciclo al final',
        input: [createLinkedList([1, 2, 3, 4, 5], 4)],
        expected: true,
        validator: (result, expected) => result === expected
    }
];

module.exports = { testCases, solution: hasCycle };
