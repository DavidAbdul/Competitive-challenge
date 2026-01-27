/**
 * Definition for singly-linked list node
 * @typedef {Object} ListNode
 * @property {number} val
 * @property {ListNode|null} next
 */

class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

/**
 * Linked List Cycle
 * 
 * @param {ListNode} head - Head de la linked list
 * @return {boolean} - true si hay un ciclo, false en caso contrario
 * 
 * Ejemplos:
 * hasCycle([3,2,0,-4] con ciclo en posición 1) => true
 * hasCycle([1,2] con ciclo en posición 0) => true
 * hasCycle([1] sin ciclo) => false
 */
function hasCycle(head) {
    // ESCRIBE TU CÓDIGO AQUÍ
    
}

module.exports = { hasCycle, ListNode };
