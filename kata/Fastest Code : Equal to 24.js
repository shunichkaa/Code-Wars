// This is the Performance version of simple version. If your code runs more than 7000ms, please optimize your code or try the simple version
//
// Task
// A game I played when I was young: Draw 4 cards from playing cards, use + - * / and () to make the final results equal to 24.
//
// You will coding in function equalTo24. Function accept 4 parameters a b c d(4 numbers), value range is 1-100.
//
// The result is a string such as "2*2*2*3" ,(4+2)*(5-1); If it is not possible to calculate the 24, please return "It's not possible!"
//
// All four cards are to be used, only use three or two cards are incorrect; Use a card twice or more is incorrect too.
//
// 	You just need to return one correct solution, don't need to find out all the possibilities.
//
// The different between "challenge version" and "simple version":
//
// 1) a,b,c,d range:  In "challenge version" it is 1-100,
// 	In "simple version" it is 1-13.
// 2) "challenge version" has 1000 random testcases,
// 	"simple version" only has 20 random testcases.
// 	Some examples:
// 	equalTo24(1,2,3,4) //can return "(1+3)*(2+4)" or "1*2*3*4"
// equalTo24(2,3,4,5) //can return "(5+3-2)*4" or "(3+4+5)*2"
// equalTo24(3,4,5,6) //can return "(3-4+5)*6"
// equalTo24(1,1,1,1) //should return "It's not possible!"
// equalTo24(13,13,13,13) //should return "It's not possible!"


function equalTo24(a, b, c, d) {
	const nums = [a, b, c, d];
	const ops = ['+', '-', '*', '/'];

	// генерируем все перестановки из 4 чисел
	function permute(arr) {
		const res = [];
		const backtrack = (path, used) => {
			if (path.length === 4) return res.push(path.slice());
			for (let i = 0; i < arr.length; i++) {
				if (used[i]) continue;
				used[i] = true;
				path.push(arr[i]);
				backtrack(path, used);
				path.pop();
				used[i] = false;
			}
		};
		backtrack([], []);
		return res;
	}

	// применить оператор
	function apply(a, op, b) {
		if (op === '+') return a + b;
		if (op === '-') return a - b;
		if (op === '*') return a * b;
		if (op === '/') {
			if (Math.abs(b) < 1e-6) return null; // деление на 0
			return a / b;
		}
	}

	// сравнение с допуском
	function is24(x) {
		return Math.abs(x - 24) < 1e-6;
	}

	// все варианты расстановки скобок
	function evaluate(a, b, c, d, op1, op2, op3) {
		const res = [];

		// ((a op1 b) op2 c) op3 d
		const t1 = apply(a, op1, b);
		if (t1 !== null) {
			const t2 = apply(t1, op2, c);
			if (t2 !== null) {
				const t3 = apply(t2, op3, d);
				if (t3 !== null && is24(t3)) {
					res.push(`((${a}${op1}${b})${op2}${c})${op3}${d}`);
				}
			}
		}

		// (a op1 (b op2 c)) op3 d
		const t4 = apply(b, op2, c);
		if (t4 !== null) {
			const t5 = apply(a, op1, t4);
			if (t5 !== null) {
				const t6 = apply(t5, op3, d);
				if (t6 !== null && is24(t6)) {
					res.push(`(${a}${op1}(${b}${op2}${c}))${op3}${d}`);
				}
			}
		}

		// a op1 ((b op2 c) op3 d)
		if (t4 !== null) {
			const t7 = apply(t4, op3, d);
			if (t7 !== null) {
				const t8 = apply(a, op1, t7);
				if (t8 !== null && is24(t8)) {
					res.push(`${a}${op1}((${b}${op2}${c})${op3}${d})`);
				}
			}
		}

		// a op1 (b op2 (c op3 d))
		const t9 = apply(c, op3, d);
		if (t9 !== null) {
			const t10 = apply(b, op2, t9);
			if (t10 !== null) {
				const t11 = apply(a, op1, t10);
				if (t11 !== null && is24(t11)) {
					res.push(`${a}${op1}(${b}${op2}(${c}${op3}${d}))`);
				}
			}
		}

		// (a op1 b) op2 (c op3 d)
		const t12 = apply(a, op1, b);
		const t13 = apply(c, op3, d);
		if (t12 !== null && t13 !== null) {
			const t14 = apply(t12, op2, t13);
			if (t14 !== null && is24(t14)) {
				res.push(`(${a}${op1}${b})${op2}(${c}${op3}${d})`);
			}
		}

		return res;
	}

	const permutations = permute(nums);
	for (const [a, b, c, d] of permutations) {
		for (const op1 of ops) {
			for (const op2 of ops) {
				for (const op3 of ops) {
					const forms = evaluate(a, b, c, d, op1, op2, op3);
					if (forms.length) return forms[0];
				}
			}
		}
	}

	return "It's not possible!";
}