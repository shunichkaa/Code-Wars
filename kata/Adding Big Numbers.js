// We need to sum big numbers and we require your help.
//
// 	Write a function that returns the sum of two numbers. The input numbers are strings and the function must return a string.
//
// 	Example
// add("123", "321"); -> "444"
// add("11", "99");   -> "110"
// Notes
// The input numbers are big.
// 	The input is a string of only digits
// The numbers are positives


function add(a, b) {
	let carry = 0;
	let result = '';

	let i = a.length - 1;
	let j = b.length - 1;

	while (i >= 0 || j >= 0 || carry) {
		const digitA = i >= 0 ? +a[i] : 0;
		const digitB = j >= 0 ? +b[j] : 0;

		const sum = digitA + digitB + carry;
		carry = Math.floor(sum / 10);
		result = (sum % 10) + result;

		i--;
		j--;
	}

	return result;
}
