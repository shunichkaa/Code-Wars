// The purpose of this kata is to write a program that can do some algebra.
//
// 	Write a function expand that takes in an expression with a single, one character variable, and expands it. The expression is in the form (ax+b)^n where a and b are integers which may be positive or negative, x is any single character variable, and n is a natural number. If a = 1, no coefficient will be placed in front of the variable. If a = -1, a "-" will be placed in front of the variable.
//
// 	The expanded form should be returned as a string in the form ax^b+cx^d+ex^f... where a, c, and e are the coefficients of the term, x is the original one character variable that was passed in the original expression and b, d, and f, are the powers that x is being raised to in each term and are in decreasing order.
//
// 	If the coefficient of a term is zero, the term should not be included. If the coefficient of a term is one, the coefficient should not be included. If the coefficient of a term is -1, only the "-" should be included. If the power of the term is 0, only the coefficient should be included. If the power of the term is 1, the caret and power should be excluded.
//
// 	Examples:
// expand("(x+1)^2");      // returns "x^2+2x+1"
// expand("(p-1)^3");      // returns "p^3-3p^2+3p-1"
// expand("(2f+4)^6");     // returns "64f^6+768f^5+3840f^4+10240f^3+15360f^2+12288f+4096"
// expand("(-2a-4)^0");    // returns "1"
// expand("(-12t+43)^2");  // returns "144t^2-1032t+1849"
// expand("(r+0)^203");    // returns "r^203"
// expand("(-x-1)^2");     // returns "x^2+2x+1"

function expand(expr) {
	if (expr === '') return '';
	const match = expr.match(/^\(([-+]?\d*)([a-z])([+-]\d+)\)\^(\d+)$/);
	if (!match) return '';
	let [, a, x, b, n] = match;
	n = +n;
	if (n === 0) return '1';

	a = a === '' ? 1 : a === '-' ? -1 : +a;
	b = +b;

	const pow = (base, exp) => {
		let res = 1n, B = BigInt(base), E = BigInt(exp);
		while (E > 0n) {
			if (E % 2n === 1n) res *= B;
			B *= B;
			E /= 2n;
		}
		return res;
	};

	const comb = (n, k) => {
		let res = 1n;
		for (let i = 1n; i <= k; i++) {
			res = res * BigInt(n) / i;
			n--;
		}
		return res;
	};

	let terms = [];
	for (let k = 0; k <= n; k++) {
		const c = comb(BigInt(n), BigInt(k)) * pow(a, n - k) * pow(b, k);
		if (c === 0n) continue;

		const powX = n - k;
		let coeff = c.toString();

		if (powX === 0) {
			terms.push(coeff);
		} else {
			if (coeff === '1') coeff = '';
			else if (coeff === '-1') coeff = '-';

			if (powX === 1) terms.push(`${coeff}${x}`);
			else terms.push(`${coeff}${x}^${powX}`);
		}
	}

	return terms
	.map((term, i) => {
		if (i === 0) return term;
		return term.startsWith('-') ? term : '+' + term;
	})
	.join('');
}
