// To give credit where credit is due: This problem was taken from the ACMICPC-Northwest Regional Programming Contest. Thank you problem writers.
//
// 	You are helping an archaeologist decipher some runes. He knows that this ancient society used a Base 10 system, and that they never start a number with a leading zero. He's figured out most of the digits as well as a few operators, but he needs your help to figure out the rest.
//
// The professor will give you a simple math expression, of the form
//
// 	[number][op][number]=[number]
// He has converted all of the runes he knows into digits. The only operators he knows are addition (+),subtraction(-), and multiplication (*), so those are the only ones that will appear. Each number will be in the range from -1000000 to 1000000, and will consist of only the digits 0-9, possibly a leading -, and maybe a few ?s. If there are ?s in an expression, they represent a digit rune that the professor doesn't know (never an operator, and never a leading -). All of the ?s in an expression will represent the same digit (0-9), and it won't be one of the other given digits in the expression. No number will begin with a 0 unless the number itself is 0, therefore 00 would not be a valid number.
//
// 	Given an expression, figure out the value of the rune represented by the question mark. If more than one digit works, give the lowest one. If no digit works, well, that's bad news for the professor - it means that he's got some of his runes wrong. output -1 in that case.
//
// Complete the method to solve the expression to find the value of the unknown rune. The method takes a string as a paramater repressenting the expression and will return an int value representing the unknown rune or -1 if no such rune exists.



function solveExpression(exp) {
	let ops = ['+', '-', '*'];
	let opIndex = -1, opChar = '';
	for (let i = 1; i < exp.length; i++) {
		if (ops.includes(exp[i])) {
			opIndex = i;
			opChar = exp[i];
			break;
		}
	}
	if (opIndex === -1) return -1;

	let left = exp.slice(0, opIndex);
	let right = exp.slice(opIndex + 1);
	let eqIndex = right.indexOf('=');
	if (eqIndex === -1) return -1;

	let num2 = right.slice(0, eqIndex);
	let res = right.slice(eqIndex + 1);

	let knownDigits = new Set(exp.replace(/\?/g, '').match(/\d/g) || []);
	let questionCount = (exp.match(/\?/g) || []).length;
	if (questionCount === 0) return -1;

	function validNumber(s) {
		if (s.length === 0) return false;
		if (s[0] === '-') s = s.slice(1);
		if (s.length === 0) return false;
		if (s.length > 1 && s[0] === '0') return false;
		return /^\d+$/.test(s);
	}

	function replaceQ(s, digit) {
		return s.replace(/\?/g, digit);
	}

	for (let d = 0; d <= 9; d++) {
		let digit = d.toString();
		if (knownDigits.has(digit)) continue;

		let L = replaceQ(left, digit);
		let N2 = replaceQ(num2, digit);
		let R = replaceQ(res, digit);

		if (!validNumber(L) || !validNumber(N2) || !validNumber(R)) continue;

		let nL = parseInt(L, 10);
		let nN2 = parseInt(N2, 10);
		let nR = parseInt(R, 10);

		let ok = false;
		if (opChar === '+') ok = (nL + nN2 === nR);
		else if (opChar === '-') ok = (nL - nN2 === nR);
		else if (opChar === '*') ok = (nL * nN2 === nR);

		if (ok) return d;
	}
	return -1;
}
