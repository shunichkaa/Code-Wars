// TODO
// Multiply two numbers! Simple!
//
// 	Rules
// The arguments are passed as strings.
// 	The numbers will be very large
// The arguments can be negative, in decimals, and might have leading and trailing zeros. e.g. "-01.300"
// Answer should be returned as string
// The returned answer should not have leading or trailing zeroes (when applicable) e.g. "0123" and "1.100" are wrong, they should be "123" and "1.1"
// Zero should not be signed and "-0.0" should be simply returned as "0".

function multiply(num1, num2) {
	const sign1 = num1.trim().startsWith('-') ? -1 : 1;
	const sign2 = num2.trim().startsWith('-') ? -1 : 1;
	const sign = sign1 * sign2;

	num1 = num1.replace(/^[-+]/, '');
	num2 = num2.replace(/^[-+]/, '');

	const normalize = (str) => {
		if (!str.includes('.')) {
			return str.replace(/^0+/, '') || '0';
		}
		let [intPart, decPart] = str.split('.');
		intPart = intPart.replace(/^0+/, '') || '0';
		decPart = decPart.replace(/0+$/, '');
		if (decPart === '') return intPart;
		return intPart + '.' + decPart;
	};

	num1 = normalize(num1);
	num2 = normalize(num2);

	if (num1 === '0' || num2 === '0') return '0';

	const getDecimalPlaces = (str) => (str.includes('.') ? str.length - str.indexOf('.') - 1 : 0);

	const dec1 = getDecimalPlaces(num1);
	const dec2 = getDecimalPlaces(num2);
	const totalDec = dec1 + dec2;

	const n1 = num1.replace('.', '');
	const n2 = num2.replace('.', '');

	function multiplyStrings(a, b) {
		const res = Array(a.length + b.length).fill(0);
		for (let i = a.length - 1; i >= 0; i--) {
			for (let j = b.length - 1; j >= 0; j--) {
				const mul = (+a[i]) * (+b[j]) + res[i + j + 1];
				res[i + j + 1] = mul % 10;
				res[i + j] += Math.floor(mul / 10);
			}
		}
		while (res[0] === 0) res.shift();
		return res.length ? res.join('') : '0';
	}

	let product = multiplyStrings(n1, n2);

	if (totalDec > 0) {
		if (product.length <= totalDec) {
			product = '0'.repeat(totalDec - product.length + 1) + product;
		}
		const pos = product.length - totalDec;
		product = product.slice(0, pos) + '.' + product.slice(pos);
	}

	product = normalize(product);

	if (product === '0') return '0';

	return sign === -1 ? '-' + product : product;
}