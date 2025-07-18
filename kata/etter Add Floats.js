// Write a function that returns the sum of the passed arguments. The input arguments may be Numbers and/or String representations of numbers. The function must return a String.
//
// 	Example
//
// add(123, "321") === "444";
// add("1234567890.0987654321", "8765432109.9012345678") === "9999999999.9999999999";
// add("1.2.3", 1.23); === NaN;
// add(0.1, 0.0001) === "0.1001";
// Notes
//
// The input numbers may be very very big and/or very very small. Addition must be exact - no floating point errors. The numbers are all positive and base 10. Some arguments may not be numbers. In these cases, return NaN. Remove trailing zeros and decimal point if possible.


function add(...args) {
	const isValidNumber = s => /^(\d+(\.\d+)?|\.\d+)$/.test(s);

	let maxDecimals = 0;
	const numbers = [];

	for (const arg of args) {
		const str = typeof arg === 'number' || typeof arg === 'string' ? String(arg).trim() : null;
		if (!str || !isValidNumber(str)) return "NaN";

		const [intPart, fracPart = ''] = str.split('.');
		maxDecimals = Math.max(maxDecimals, fracPart.length);
		numbers.push({ intPart, fracPart });
	}

	const normalize = ({ intPart, fracPart }) => intPart + fracPart.padEnd(maxDecimals, '0');
	const total = numbers
	.map(normalize)
	.reduce((acc, val) => {
		let carry = 0;
		let res = '';
		const a = acc.padStart(Math.max(acc.length, val.length), '0');
		const b = val.padStart(Math.max(acc.length, val.length), '0');
		for (let i = a.length - 1; i >= 0; i--) {
			const sum = parseInt(a[i]) + parseInt(b[i]) + carry;
			res = (sum % 10) + res;
			carry = Math.floor(sum / 10);
		}
		if (carry > 0) res = carry + res;
		return res;
	});

	let integerPart = total.slice(0, total.length - maxDecimals) || '0';
	let decimalPart = total.slice(-maxDecimals).replace(/0+$/, '');

	integerPart = integerPart.replace(/^0+(?!$)/, '');

	return maxDecimals && decimalPart ? `${integerPart}.${decimalPart}` : integerPart;
}