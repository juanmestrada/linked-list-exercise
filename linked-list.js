/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    // create new node
    const newNode = new Node(val);

    // if no head exist, update head and tail to newNode
    if(!this.head) {
      this.head = newNode;
      this.tail = newNode;
    }

    // push newNode to end of list
    this.tail.next = newNode;

    // update new tail node 
    this.tail = newNode;

    // increment list length
    this.length++;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    // create new node
    const newNode = new Node(val);

    // if no head exists, update head and tail to newNode
    if(!this.head){
      this.head = newNode;
      this.tail = newNode;
    }

    // set newNode.next to point to current head
    newNode.next = this.head;

    // update new head
    this.head = newNode;

    // increment length
    this.length++;
  }

  /** pop(): return & remove last item. */

  pop() {
    // throw error if list is empty
    if(this.length === 0) throw new Error("List is empty");

    // list contains single node
    if(this.length === 1) {
      let tmp = this.tail.val;
      
      this.head = null;
      this.tail = null;
      this.length--;
      return tmp;
    }

    // set slow pointer to current head, eventually points to node before tail
    let slow = this.head;

    // set fast pointer to one node ahead of slow, eventually points to tail
    let fast = slow.next;

    // while node exist after fast pointer, update slow to slow.next
    while(fast.next !== null){
      slow = slow.next;
    }

    // create pointer to tail node value before deletion
    let tempVal = fast.val;

    // remove pointer to last node
    slow.next = null;

    // update new tail
    this.tail = slow;

    // decrement list length
    this.length--;

    // return pointer to last node value
    return tempVal;
  }
  
  /** shift(): return & remove first item. */

  shift() {
    // throw error if list is empty
    if(!this.head) throw new Error("List is empty");

    // create pointer to head.val
    let tmpVal = this.head.val;

    // update head to head.next
    this.head = this.head.next;

    // if list contains single node, also update tail
    if(this.length === 1) this.tail = this.head;

    // decrement length
    this.length--;

    // return tempVal pointer with previous head.val
    return tmpVal;
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    // index of idx is invalid
    if(idx >= this.length || idx < 0) throw new Error("Invalid index");
    
    // set pointer to start at head
    let currNode = this.head;

    // counter to reach idx
    let counter = 0;

    // traverse through list as long as there are still nodes and idx (this.length - 1) has not been found
    while(currNode && counter < idx){
      counter++;
      currNode = currNode.next;
    }

    return currNode.val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    // index of idx is invalid
    if(idx >= this.length || idx < 0) throw new Error("Invalid index");

    // set pointer to start at head
    let currNode = this.head;

    // counter to reach idx
    let counter = 0;

    // traverse through list as long as there are still nodes and idx (this.length - 1) has not been found
    while(currNode && counter < idx){
      counter++;
      currNode = currNode.next;
    }

    // update value of node at index (idx)
    currNode.val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    // index of idx is invalid
    if(idx > this.length || idx < 0) throw new Error("Invalid index");

    // insert node at head 
    if (idx === 0) return this.unshift(val);
    // insert node at tail
    if (idx === this.length) return this.push(val);

    // pointer for node at index (idx) before insert position
    let prev = this.head;
    let counter = 0;

    while(prev.next && counter < --idx){
      prev = prev.next;
      counter++;
    }

    // create new node
    const newNode = new Node(val);

    //insert new node between prev and prev.next
    newNode.next = prev.next;
    prev.next = newNode;

    this.length++;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    // index of idx is invalid
    if(idx >= this.length || idx < 0) throw new Error("Invalid index");

    // remove node at head position
    if(idx === 0){
      let tmpVal = this.head.val;

      // update new head
      this.head = null;

      // update tail if list contains single node
      if(this.length === 1) this.tail = this.head;

      // decrement list length
      this.length--;

      return tmpVal;
    }

    // get node before node to be removed
    let prev = this.head;
    let counter = 0;

    while(prev.next && counter < --idx){
      prev = prev.next;
      counter++;
    }

    // remove node at tail position
    if(idx === this.length - 1) {
      // create pointer to tail value before deletion
      const tmpVal = prev.next.val;

      prev.next = null;
      
      // update new tail
      this.tail = prev;

      // decrement list length
      this.length--;

      return val;
    }

    // node to be removed is not at head or tail position

    // create pointer to node value before deletion
    const tmpVal = prev.next.val;

    // create link between prev node and node to be deleted .next
    prev.next = prev.next.next;

    // decrement list length
    this.length--;

    return tmpVal;
  }

  /** average(): return an average of all values in the list */

  average() {
    // list is empty
    if (this.length === 0) return 0;

    let currNode = this.head;

    // sum of node values
    let total = 0;

    // update total for every node
    while(currNode){
      total += currNode.val;

      currNode = currNode.next;
    }

    // return average 
    return total / this.length;
  }
}

module.exports = LinkedList;
