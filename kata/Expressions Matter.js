// Given three integers a, b, c, return the largest number obtained by inserting +, *, and parentheses () without reordering operands.
// Numbers are positive (1 ≤ a, b, c ≤ 10).
// Example cases:
// expressionsMatter(1, 2, 3) → 9 // (1+2)*3
// expressionsMatter(1, 1, 1) → 3 // 1+1+1
// expressionsMatter(9, 1, 1) → 18 // 9*(1+1)
// All possible expressions to check:
// a+b+c
// a*b*c
// a+b*c
// a*b+c
// (a+b)*c
// a*(b+c)


function expressionMatter(a, b, c) {
	const expressions = [
		a * (b + c),
		a * b * c,
		a + b * c,
		(a + b) * c,
		a + b + c
	];

	return Math.max(...expressions);
}