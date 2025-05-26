// Create a function that takes a positive integer and returns the next bigger number that can be formed by rearranging its digits. For example:
//
// 	12 ==> 21
// 513 ==> 531
// 2017 ==> 2071
// If the digits can't be rearranged to form a bigger number, return -1 (or nil in Swift, None in Rust):
//
// 9 ==> -1
// 111 ==> -1
// 531 ==> -1


function nextBigger(n) {
	const digits = n.toString().split('');
	const lastIndex = digits.length - 1;

	let pivotIndex = lastIndex - 1;
	while (pivotIndex >= 0 && digits[pivotIndex] >= digits[pivotIndex + 1]) {
		pivotIndex--;
	}

	if (pivotIndex === -1) {
		return -1;
	}

	let swapIndex = lastIndex;
	while (digits[swapIndex] <= digits[pivotIndex]) {
		swapIndex--;
	}

	swapElements(digits, pivotIndex, swapIndex);

	const leftPart = digits.slice(0, pivotIndex + 1);
	const rightPart = digits.slice(pivotIndex + 1).sort();

	return parseInt(leftPart.concat(rightPart).join(''));
}

function swapElements(array, index1, index2) {
	[array[index1], array[index2]] = [array[index2], array[index1]];
}