// Prerequirements
//
// This kata is the second part of the Barista Problem. I strongly encourage you to solve that one first.
//
// 	Context
//
// You got your RAISE!! YAY!!
// 	But now, time has passed, and a position has opened up for Barista Manager.
//
// 	Description
//
// In order to be promoted to the rank of manager, you must prove that you have the skills required, such as managing more than one coffee machine. So your boss gives you access to a number of coffee machines that all require the same amount of time to clean. Like before, ignore the time taken to write down the orders and focus only on the time needed to clean the machines and the time needed to brew each coffee.
//
// 	Task
//
// Given a list of orders and a number of coffee machines, you must return the minimum time needed for all of the customers to wait for their coffee, so the sum of all the waiting times.
//
// 	Note that
//
// Some customers may ask you for just a glass of water, so that means that the time you would need to "brew" their "coffee" is 0. Also, you do not need to clean anything in this case. The time you need to fill up the glass of water is also insignificant in comparison to brewing a coffee. Water is free in this cafetaria. :)
// The cleaning time for all coffee machines is 2 minutes.
// 	These coffee machines include a self-cleaning system, so they can all begin cleaning themselves immediately after a coffee is made.
// 	The time you need to walk from a coffee machine to another one, or with the coffee cup to a customer, is insignificant.
// 	You only have access to these machines, so you can brew up to second parameter coffees at the same time.
// 	If you receive the following orders [2,3,4] and you have 2 coffee machines, you could choose to brew the third and the second coffee first, so the third customer has to wait 4 minutes, and the second one has to wait 3 minutes. After that you clean the first (or the second) coffee machine, which that takes 2 minutes. Let's say that you choose to clean the first coffee machine so that means that the first customer has to wait 3 minutes for the second customer's coffee + 2 minutes for the cleaning + 2 minutes for his coffee to finish brewing. In total that would add up to 14 minutes. This is not necessarily the minimum time needed.
// 	There may be no orders, which means that you will have to repeat the contest another day.
// 	The number of coffee machines will always be smaller than or equal to the number of all of the orders you receive (water glasses included) (your boss won't give you more than you can actually use, nor read the orders themselves, just count them :) ).
// There is also a person hired to clean all the coffee machines after you go home, so they are all clean the next day.
// 	You choose in what order you brew the coffees.
// 	Examples
//
// 	[0,0,1] , 1 => 1
// 	[2,3,4] , 1 => 22
// 	[2,3,4] , 2 => 13
// 	[2,3,4] , 3 => 9
// Limits
//
// 0 <= number of orders <= 30
// 0 <= size of orders <= 40
// 0 <= coffee machines <= number of orders
// Special Thanks to the great Discord community for helping with the creation of this kata and also to the programmers that helped a lot in the " discuss " section.
//


function barista(coffees, cMachines) {
	if (cMachines === 0) return 0;

	// Filter out 0s (water orders) and sort the remaining in ascending order
	const coffeeOrders = coffees.filter(time => time > 0).sort((a, b) => a - b);
	if (coffeeOrders.length === 0) return 0;

	// Initialize a min-heap to track machine availability times
	const heap = new MinHeap();
	// Initially, all machines are available at time 0
	for (let i = 0; i < cMachines && i < coffeeOrders.length; i++) {
		heap.push(0);
	}

	let totalTime = 0;

	for (const coffeeTime of coffeeOrders) {
		const availableTime = heap.pop();
		const startTime = availableTime;
		const endTime = startTime + coffeeTime;
		totalTime += endTime;
		const nextAvailableTime = endTime + 2; // cleaning time
		heap.push(nextAvailableTime);
	}

	return totalTime;
}

// MinHeap implementation for JavaScript
class MinHeap {
	constructor() {
		this.heap = [];
	}

	push(value) {
		this.heap.push(value);
		this.bubbleUp(this.heap.length - 1);
	}

	pop() {
		const min = this.heap[0];
		const end = this.heap.pop();
		if (this.heap.length > 0) {
			this.heap[0] = end;
			this.sinkDown(0);
		}
		return min;
	}

	bubbleUp(index) {
		const element = this.heap[index];
		while (index > 0) {
			const parentIndex = Math.floor((index - 1) / 2);
			const parent = this.heap[parentIndex];
			if (element >= parent) break;
			this.heap[index] = parent;
			this.heap[parentIndex] = element;
			index = parentIndex;
		}
	}

	sinkDown(index) {
		const length = this.heap.length;
		const element = this.heap[index];
		while (true) {
			let leftChildIndex = 2 * index + 1;
			let rightChildIndex = 2 * index + 2;
			let leftChild, rightChild;
			let swap = null;

			if (leftChildIndex < length) {
				leftChild = this.heap[leftChildIndex];
				if (leftChild < element) {
					swap = leftChildIndex;
				}
			}
			if (rightChildIndex < length) {
				rightChild = this.heap[rightChildIndex];
				if (
					(swap === null && rightChild < element) ||
					(swap !== null && rightChild < leftChild)
				) {
					swap = rightChildIndex;
				}
			}
			if (swap === null) break;
			this.heap[index] = this.heap[swap];
			this.heap[swap] = element;
			index = swap;
		}
	}
}