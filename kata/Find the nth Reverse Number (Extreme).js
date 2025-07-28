// Reverse Number is a number which is the same when reversed.
// For example, the first 20 Reverse Numbers are:
// 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33, 44, 55, 66, 77, 88, 99, 101
// TASK:
// You need to return the nth reverse number.
// (Assume that reverse numbers start from 0 as shown in the example.)
// NOTES:
// 1 < n <= 100000000000
// You need to use BigInt as return type in JS since it exceeds max integer size.
// If this is too hard, you can try https://www.codewars.com/kata/600bfda8a4982600271d6069
// 	```if:rust
// 1 < n <= 10000000000


function findReverseNumber(n) {
	n = BigInt(n);
	if (n <= 10n) return n - 1n; // 0..9

	n -= 10n;

	let length = 2n;
	while (true) {
		let halfLen = length / 2n;
		let count;

		if (length % 2n === 0n) {
			count = 9n * pow10(halfLen - 1n);
		} else {
			count = 9n * pow10(halfLen);
		}

		if (n <= count) break;

		n -= count;
		length += 1n;
	}

	let halfLen = (length + 1n) / 2n;
	let start = pow10(halfLen - 1n);
	let leftNum = start + (n - 1n);

	let leftStr = leftNum.toString();

	let rightStr;
	if (length % 2n === 0n) {
		rightStr = leftStr.split('').reverse().join('');
	} else {
		rightStr = leftStr.slice(0, -1).split('').reverse().join('');
	}

	return BigInt(leftStr + rightStr);
}

function pow10(exp) {
	if (exp < 0n) return 0n;
	let res = 1n;
	while (exp > 0n) {
		res *= 10n;
		exp--;
	}
	return res;
}