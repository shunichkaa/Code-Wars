// In this Kata you must convert integers numbers from and to a negative-base binary system.
//
// 	Negative-base systems can accommodate all the same numbers as standard place-value systems, but both positive and negative numbers are represented without the use of a minus sign (or, in computer representation, a sign bit); this advantage is countered by an increased complexity of arithmetic operations.
//
// 	To help understand, the first eight digits (in decimal) of the Base(-2) system is:
//
// 	[1, -2, 4, -8, 16, -32, 64, -128]
//
// Example conversions:
//
// 	Decimal, negabinary
//
// 6,   '11010'
// -6,  '1110'
// 4,   '100'
// 18,  '10110'
// -11, '110101'


const BASE = -2;

function intToNegabinary(i) {
	if (i === 0) return '0';
	let result = '';

	while (i !== 0) {
		const remainder = ((i % BASE) + 2) % 2;  // Упрощенная обработка остатка
		i = Math.ceil(i / BASE);
		result = remainder + result;
	}
	return result;
}

function negabinaryToInt(s) {
	return [...s].reverse().reduce((sum, bit, i) =>
		sum + parseInt(bit) * Math.pow(BASE, i), 0);
}
