// Linked Lists - Insert Nth
//
// Implement a function which inserts a new node at any index within a list.
//
// 	Given a list, an index n in the range 0..length, and a data element, insert a node in list at index n containing data. Your function should return the head of the list.
//
// //    list            n data
// (1 -> 2 -> 3 -> null, 0, 7) ==> 7 -> 1 -> 2 -> 3 -> null
// (1 -> 2 -> 3 -> null, 1, 7) ==> 1 -> 7 -> 2 -> 3 -> null
// (1 -> 2 -> 3 -> null, 3, 7) ==> 1 -> 2 -> 3 -> 7 -> null
// You must throw/raise an exception (specifically ArgumentOutOfRangeException in C#, InvalidArgumentException in PHP) if the index is too large.
//
// The Node class is pre-written for you in the initial code, expect in PHP and Swift where it is preloaded for you in another file.


class Node {
	constructor(data) {
		this.data = data;
		this.next = null;
	}
}

function insertNth(head, index, data) {
	if (index < 0) throw new RangeError('Index out of range');

	const newNode = new Node(data);

	if (index === 0) {
		newNode.next = head;
		return newNode;
	}

	let current = head;
	let currentIndex = 0;

	while (current !== null && currentIndex < index - 1) {
		current = current.next;
		currentIndex++;
	}

	if (current === null) throw new RangeError('Index out of range');

	newNode.next = current.next;
	current.next = newNode;

	return head;
}