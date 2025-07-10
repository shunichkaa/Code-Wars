// In this Kata, you will be given boolean values and boolean operators. Your task will be to return the number of arrangements that evaluate to True.
//
// 	t,f will stand for true, false and the operators will be Boolean AND (&), OR (|), and XOR (^).
//
// For example, solve("tft","^&") = 2, as follows:
//
// 	"((t ^ f) & t)" = True
// "(t ^ (f & t))" = True
// Notice that the order of the boolean values and operators does not change. What changes is the position of braces.
//
// 	More examples in the test cases.
//
// 	Good luck!
//


function solve(s, ops) {
	const n = s.length;
	const memo = new Map();

	function countWays(i, j) {
		const key = i + ',' + j;
		if (memo.has(key)) return memo.get(key);

		if (i === j) {
			const val = s[i] === 't' ? { true: 1, false: 0 } : { true: 0, false: 1 };
			memo.set(key, val);
			return val;
		}

		let waysTrue = 0;
		let waysFalse = 0;

		for (let k = i; k < j; k++) {
			const left = countWays(i, k);
			const right = countWays(k + 1, j);
			const op = ops[k];

			let totalTrue = 0;
			let totalFalse = 0;

			if (op === '&') {
				totalTrue = left.true * right.true;
				totalFalse = (left.true * right.false) + (left.false * right.true) + (left.false * right.false);
			} else if (op === '|') {
				totalTrue = (left.true * right.true) + (left.true * right.false) + (left.false * right.true);
				totalFalse = left.false * right.false;
			} else if (op === '^') {
				totalTrue = (left.true * right.false) + (left.false * right.true);
				totalFalse = (left.true * right.true) + (left.false * right.false);
			}

			waysTrue += totalTrue;
			waysFalse += totalFalse;
		}

		const result = { true: waysTrue, false: waysFalse };
		memo.set(key, result);
		return result;
	}

	return countWays(0, n - 1).true;
}
