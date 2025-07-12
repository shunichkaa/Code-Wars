// Given positive integers a and b as strings, evaluate a / b and return the quotient and the remainder as strings in the form [quotient, remainder].
//
// 	a and b can be very large (at the order of 10^150 to 10^200)
// As usual, your result should not have leading 0s
// require is disabled in JavaScript. Do it yourself ;-)

function compareStrings(a, b) {
	if (a.length > b.length) return 1;
	if (a.length < b.length) return -1;
	for (let i = 0; i < a.length; i++) {
		if (a[i] > b[i]) return 1;
		if (a[i] < b[i]) return -1;
	}
	return 0;
}

function subtractStrings(a, b) {
	let res = '';
	let carry = 0;
	a = a.split('').map(Number);
	b = b.padStart(a.length, '0').split('').map(Number);
	for (let i = a.length - 1; i >= 0; i--) {
		let diff = a[i] - b[i] - carry;
		if (diff < 0) {
			diff += 10;
			carry = 1;
		} else {
			carry = 0;
		}
		res = diff.toString() + res;
	}
	return res.replace(/^0+/, '') || '0';
}

function multiplyStringByDigit(num, digit) {
	if (digit === 0) return '0';
	let carry = 0;
	let res = '';
	for (let i = num.length - 1; i >= 0; i--) {
		let prod = Number(num[i]) * digit + carry;
		carry = Math.floor(prod / 10);
		res = (prod % 10) + res;
	}
	if (carry) res = carry + res;
	return res;
}

function divideStrings(a, b) {
	if (b === '0') throw new Error("Division by zero");
	if (compareStrings(a, b) < 0) return ['0', a.replace(/^0+/, '') || '0'];
	if (b === '1') return [a.replace(/^0+/, '') || '0', '0'];

	let quotient = '';
	let remainder = '';

	for (let i = 0; i < a.length; i++) {
		remainder += a[i];
		remainder = remainder.replace(/^0+/, '') || '0';

		// Найти max digit q, что b * q <= remainder
		let low = 0, high = 9, q = 0;
		while (low <= high) {
			let mid = Math.floor((low + high) / 2);
			let product = multiplyStringByDigit(b, mid);
			if (compareStrings(product, remainder) <= 0) {
				q = mid;
				low = mid + 1;
			} else {
				high = mid - 1;
			}
		}

		quotient += q.toString();

		if (q !== 0) {
			remainder = subtractStrings(remainder, multiplyStringByDigit(b, q));
		}
	}

	quotient = quotient.replace(/^0+/, '') || '0';
	remainder = remainder.replace(/^0+/, '') || '0';

	return [quotient, remainder];
}
