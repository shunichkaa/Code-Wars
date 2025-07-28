// In mathematics, a Diophantine equation is a polynomial equation, usually with two or more unknowns,
// such that only the integer solutions are sought or studied.
// In this kata we want to find all integers x, y (x >= 0, y >= 0) solutions of a diophantine equation of the form:
// x² − 4y² = n
// (where the unknowns are x and y; and n is a given positive number) in decreasing order of the positive x.
// If there is no solution return [] or "[]" or "".
// Examples:
// 90005 --> [[45003, 22501], [9003, 4499], [981, 467], [309, 37]]
// 90002 --> []
// Hint: x² − 4y² = (x − 2y) ⋅ (x + 2y)


function solequa(n) {
	const result = [];
	for (let a = 1; a * a <= n; a++) {
		if (n % a === 0) {
			const b = n / a;
			const x = (a + b) / 2;
			const y = (b - a) / 4;
			if (Number.isInteger(x) && Number.isInteger(y) && x >= 0 && y >= 0) {
				result.push([x, y]);
			}
		}
	}
	result.sort((p1, p2) => p2[0] - p1[0]);
	return result;
}