// Write a function that takes an array of numbers and returns the sum of the numbers. The numbers can be negative or non-integer. If the array does not contain any numbers then you should return 0.Assumptions
// You can assume that you are only given numbers.
// 	You cannot assume the size of the array.
// 	You can assume that you do get an array and if the array is empty, return 0.
// We're testing basic loops and math operations. This is for beginners who are just learning loops and math operations.
// Advanced users may find this extremely easy and can easily write this in one line.

function sum (numbers) {
	if (numbers.length === 0) return 0;
	else return numbers.reduce((a, b) => a + b);
}