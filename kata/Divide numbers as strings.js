// Divide numbers as strings
//
// Input can be integer, negative, zero, or decimal in string format.
// 	Input may be very large.
// 	Input won't have leading or trailing zeroes.
// Result should be returned as strings without leading or trailing zeroes.
// 	Recurring results should be to 20 decimal places. i.e. 1/3 should return 0.33333333333333333333. Just stop computing when your result gets to 20 decimal places. (i.e. no need to compute to 21 decimal places and round to 20 decimal places).
// If divisor is zero, throw Error (Exception in PHP).
// 0.00000000000000000000 is just 0.
// You may first attempt Voile's Divide integers as strings as an appetizer.
//
// Note: bignumber.js is not allowed and your code length should be less than or equal to 6000 symbols.
//

function largeDiv(a, b) {
	if (b === '0') throw new Error('Division by zero');

	let sign = (a[0] === '-') ^ (b[0] === '-') ? '-' : '';
	a = a.replace('-', '');
	b = b.replace('-', '');

	let [ai, ad = ''] = a.split('.');
	let [bi, bd = ''] = b.split('.');
	ad = ad.padEnd(20, '0');
	bd = bd.padEnd(20, '0');

	let scale = ad.length - bd.length;
	let dividend = ai + ad + '0'.repeat(20);
	let divisor = bi + bd;

	if (scale > 0) divisor += '0'.repeat(scale);
	else dividend += '0'.repeat(-scale);

	dividend = dividend.replace(/^0+/, '') || '0';
	divisor = divisor.replace(/^0+/, '') || '0';

	const compare = (a, b) => {
		a = a.replace(/^0+/, '');
		b = b.replace(/^0+/, '');
		if (a.length !== b.length) return a.length - b.length;
		return a.localeCompare(b);
	};

	const subtract = (a, b) => {
		let res = '', carry = 0;
		a = a.split('').map(Number);
		b = b.padStart(a.length, '0').split('').map(Number);
		for (let i = a.length - 1; i >= 0; i--) {
			let d = a[i] - b[i] - carry;
			if (d < 0) d += 10, carry = 1;
			else carry = 0;
			res = d + res;
		}
		return res.replace(/^0+/, '') || '0';
	};

	const multiply = (num, x) => {
		let res = '', carry = 0;
		for (let i = num.length - 1; i >= 0; i--) {
			let p = +num[i] * x + carry;
			res = (p % 10) + res;
			carry = (p / 10) | 0;
		}
		return (carry ? carry : '') + res;
	};

	let res = '', rem = '';
	for (let digit of dividend) {
		rem += digit;
		rem = rem.replace(/^0+/, '') || '0';
		if (compare(rem, divisor) < 0) {
			res += '0';
			continue;
		}
		let l = 0, r = 10;
		while (l < r) {
			let m = ((l + r) / 2) | 0;
			if (compare(multiply(divisor, m), rem) <= 0) l = m + 1;
			else r = m;
		}
		res += l - 1;
		rem = subtract(rem, multiply(divisor, l - 1));
	}

	res = res.replace(/^0+/, '') || '0';
	let point = res.length - 20;
	res = point <= 0 ? '0.' + '0'.repeat(-point) + res : res.slice(0, point) + '.' + res.slice(point);
	res = res.replace(/\.?0+$/, '') || '0';

	return sign && res !== '0' ? sign + res : res;
}
