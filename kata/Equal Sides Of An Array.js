// Given an array of integers, find an index N where the sum of integers to the left equals the sum to the right.
// If no such index exists, return -1.
// For example:
// In array {1,2,3,4,3,2,1}, index 3 satisfies because sum of left {1,2,3} equals sum of right {3,2,1}, both 6.
// In array {1,100,50,-51,1,1}, index 1 satisfies because left sum {1} equals right sum {50,-51,1,1}, both 1.
// In array {20,10,-80,10,10,15,35}, index 0 satisfies because left sum {} = 0 and right sum {10,-80,10,10,15,35} = 0.
// Note: array index starts at 0.
// Input: integer array, length between 1 and 999, can contain positive or negative integers.
// Output: lowest index N where left and right sums are equal, or -1 if none found.


function findEvenIndex(arr) {
	const NOT_FOUND = -1;

	const sumArray = (array) => array.reduce((sum, num) => sum + num, 0);

	for (let i = 0; i < arr.length; i++) {
		const leftSum = sumArray(arr.slice(0, i));
		const rightSum = sumArray(arr.slice(i + 1));

		if (leftSum === rightSum) {
			return i;
		}
	}

	return NOT_FOUND;
}