// Your task is to solve N x M Systems of Linear Equations (LS) and to determine the complete solution space.
//
// 	Normally an endless amount of solutions exist, not only one or none like for N x N. You have to handle N unkowns and M equations (N>=1, M>=1) and your result has to display all numbers in 'reduced fraction representation' too (perhaps first you can try my N x N kata). More about LS you can find here or perhaps is already known.
//
// 	First of all two easy examples:
//
// 	1*x1 + 2*x2 + 0*x3 + 0*x4 = 7
// 0*x1 + 3*x2 + 4*x3 + 0*x4 = 8
// 0*x1 + 0*x2 + 5*x3 + 6*x4 = 9
//
// SOL=(97/15; 4/15; 9/5; 0) + q1* (-16/5; 8/5; -6/5; 1)
//
// You can see the dimension of solution space is 1 (it's a line) and q1 is any real number, so we have endless solutions. You can insert every single solution into every equation and all are correctly solved (1*97/15 + 2*4/15 + 0 + 0 =7 for q1=0).
//
// Second example:
//
// 	1*x1 + 5/2*x2 + 1/2*x3 + 0*x4 + 4*x5 = 1/8
// 0*x1 + 5*x2 + 2*x3 - 5/2*x4  + 6*x5 = 2
//
// SOL=(-7/8; 2/5; 0; 0; 0) + q1 * (1/2; -2/5; 1; 0; 0) + q2 * (-5/4; 1/2; 0; 1; 0) + q3 * (-1; -6/5; 0; 0; 1)
//
// Here you can see the dimension of the solution is 3, q1, q2 and q3 are arbitrary real numbers. You can see all resulting numbers are in fraction representation (which is easier to read and handle for pupils/students), whatever the input was.
//
// 	So what is missing?
//
// 	You have to build a function "Solve(input)" (or "solve(input)") which takes the equations as an input string and returns the solution as a string. "\n" (LF) separates equations, " " (SPACE) separates the numbers (like 3 or 4/5, only the coefficients not the xi's), each last number per line is the number behind the = (the equation result, see examples). The result of the function is the solution given as a string. All test examples will be syntactically correct, so you don't need to take care of it.
//
// 	So for the first example you have to call: Solve ("1 2 0 0 7\n0 3 4 0 8\n0 0 5 6 9"). The result of Solve is "SOL=(97/15; 4/15; 9/5; 0) + q1 * (-16/5; 8/5; -6/5; 1)", exactly in this form/syntax. (97/15; 4/15; 9/5; 0) + q1 * (16/5; -8/5; 6/5; -1) is ok too because it produces same solutions.
//
// 	Spaces in your result are allowed, but not necessary. You have to use 'qi' (i from 1 to dimension) standing for the real numbers (the first starting solution- point/vector has no q). If the dimension of the solution is greater than 1, the order of the qi- vectors isn't important (but all indices should be in order, that is, 'q1' first then 'q2', etc.). The fractions have to be reduced as much as possible (but not 4/3 to 1 1/3). If there exists no solution you have to respond with "SOL=NONE". If only one solution exists the response should contain no 'qi'-vectors (e.g.,"SOL=(1; 2; 3)").
//
// One last word to the tests:
// 	The test function checks the syntax of your output, uses some rules for different verifications and after all checks the given equations with your solution and verifies that all equations are satisfied for arbitrary values of qi's. If all things fit together, your solution is accepted! If not, you will get a hint 'why not'...
//
// Hint: don't rely on floating-point numbers to solve this kata. Use exact rational arithmetic.
//
//


class Fraction {
	constructor(n, d = 1) {
		if (typeof n === 'string') {
			if (n.includes('/')) {
				let [num, den] = n.split('/');
				n = BigInt(num);
				d = BigInt(den);
			} else {
				n = BigInt(n);
				d = BigInt(1);
			}
		} else {
			n = BigInt(n);
			d = BigInt(d);
		}
		if (d < 0n) {
			n = -n;
			d = -d;
		}
		const g = Fraction.gcd(n, d);
		this.n = n / g;
		this.d = d / g;
	}

	static gcd(a, b) {
		a = a < 0n ? -a : a;
		b = b < 0n ? -b : b;
		while (b) {
			let t = b;
			b = a % b;
			a = t;
		}
		return a;
	}

	add(fr) {
		return new Fraction(this.n * fr.d + fr.n * this.d, this.d * fr.d);
	}

	sub(fr) {
		return new Fraction(this.n * fr.d - fr.n * this.d, this.d * fr.d);
	}

	mul(fr) {
		return new Fraction(this.n * fr.n, this.d * fr.d);
	}

	div(fr) {
		return new Fraction(this.n * fr.d, this.d * fr.n);
	}

	neg() {
		return new Fraction(-this.n, this.d);
	}

	equals(fr) {
		return this.n === fr.n && this.d === fr.d;
	}

	isZero() {
		return this.n === 0n;
	}

	toString() {
		if (this.d === 1n) return this.n.toString();
		else return `${this.n.toString()}/${this.d.toString()}`;
	}
}

// Парсинг входа
function parseInput(input) {
	const lines = input.trim().split('\n');
	const matrix = [];
	for (const line of lines) {
		const parts = line.trim().split(' ');
		const row = parts.map(x => new Fraction(x));
		matrix.push(row);
	}
	return matrix;
}

// Приведение к ступенчатому виду (Гаусс-Жордан)
function gaussJordan(mat) {
	const n = mat.length;       // количество уравнений
	const m = mat[0].length -1; // количество переменных (без свободного члена)

	let row = 0;
	let col = 0;
	const pivotPos = [];

	while (row < n && col < m) {
		// Найти строку с максимальным ненулевым элементом в col (для устойчивости)
		let sel = -1;
		for (let i = row; i < n; i++) {
			if (!mat[i][col].isZero()) {
				sel = i;
				break;
			}
		}
		if (sel === -1) {
			col++;
			continue;
		}
		// Поменять строки местами
		if (sel !== row) {
			let tmp = mat[sel];
			mat[sel] = mat[row];
			mat[row] = tmp;
		}
		// Нормализуем ведущий элемент
		let pivot = mat[row][col];
		for (let j = col; j <= m; j++) {
			mat[row][j] = mat[row][j].div(pivot);
		}
		// Обнуляем в остальных строках
		for (let i = 0; i < n; i++) {
			if (i !== row && !mat[i][col].isZero()) {
				let factor = mat[i][col];
				for (let j = col; j <= m; j++) {
					mat[i][j] = mat[i][j].sub(factor.mul(mat[row][j]));
				}
			}
		}
		pivotPos.push(col);
		row++;
		col++;
	}
	return pivotPos;
}

// Проверка совместности
function checkNoSolution(mat, pivotPos) {
	const n = mat.length;
	const m = mat[0].length - 1;
	for (let i = 0; i < n; i++) {
		let allZero = true;
		for (let j = 0; j < m; j++) {
			if (!mat[i][j].isZero()) {
				allZero = false;
				break;
			}
		}
		if (allZero && !mat[i][m].isZero()) {
			return true;
		}
	}
	return false;
}

// Построение решения
function buildSolution(mat, pivotPos) {
	const n = mat.length;
	const m = mat[0].length - 1;

	const freeVars = [];
	let pivotSet = new Set(pivotPos);
	for (let j = 0; j < m; j++) {
		if (!pivotSet.has(j)) freeVars.push(j);
	}

	// Базовое решение (при свободных переменных = 0)
	const baseSol = Array(m).fill(new Fraction(0n));
	for (let i = 0; i < pivotPos.length; i++) {
		const col = pivotPos[i];
		baseSol[col] = mat[i][m];
	}

	// Векторы свободных переменных (параметрические решения)
	const paramVectors = [];

	for (let freeVarIndex = 0; freeVarIndex < freeVars.length; freeVarIndex++) {
		const fv = freeVars[freeVarIndex];
		const vec = Array(m).fill(new Fraction(0n));
		vec[fv] = new Fraction(1n);

		// Заполняем остальные по формулам из матрицы
		for (let i = 0; i < pivotPos.length; i++) {
			const pivotCol = pivotPos[i];
			let val = new Fraction(0n);
			if (!mat[i][fv].isZero()) {
				val = mat[i][fv].neg();
			}
			vec[pivotCol] = val;
		}
		paramVectors.push(vec);
	}

	return { baseSol, paramVectors };
}

function formatSolution(baseSol, paramVectors) {
	const fmt = v => v.map(fr => fr.toString()).join('; ');

	if (paramVectors.length === 0) {
		return 'SOL=(' + fmt(baseSol) + ')';
	} else {
		let res = 'SOL=(' + fmt(baseSol) + ')';
		for (let i = 0; i < paramVectors.length; i++) {
			res += ` + q${i + 1} * (` + fmt(paramVectors[i]) + ')';
		}
		return res;
	}
}

function solve(input) {
	const mat = parseInput(input);
	const pivotPos = gaussJordan(mat);

	if (checkNoSolution(mat, pivotPos)) return 'SOL=NONE';

	const { baseSol, paramVectors } = buildSolution(mat, pivotPos);
	return formatSolution(baseSol, paramVectors);
}