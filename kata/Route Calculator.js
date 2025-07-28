// This calculator takes values that could be written in a browsers route path as a single string. It then returns the result as a number (or an error message).
//
// Route paths use the '/' symbol so this can't be in our calculator. Instead we are using the '$' symbol as our divide operator.
//
// You will be passed a string of any length containing numbers and operators:
//
// 	'+' = add
// '-' = subtract
// '*' = multiply
// '$' = divide
// Your task is to break the string down and calculate the expression using this order of operations. (division => multiplication => subtraction => addition)
//
// If you are given an invalid input (i.e. any character except .0123456789+-*$) you should return the error message:'400: Bad request'
//
// Remember:
// 	The number of operations isn't limited
// Order of operations is imperative
// No eval or equivalent functions
// convert the number to floats, not to integers
// Examples:
//
// 	calculate('1+1')     => '2'
// calculate('10$2')    => '5'
// calculate('1.5*3')   => '4.5'
//
// calculate('5+5+5+5') => '20'
//
// calculate('1000$2.5$5+5-5+6$6') =>'81'
//
// calculate('10-9p')   =>  '400: Bad request'
// Further Notes - Parameters outside of this challenge:
// 	Brackets e.g. 10*(1+2)
// Square root, log, % or any other operators
// Unary minus (10*-1)
// Bad mathematical input (10**$10 or 5+5$)
// You may have to deal with floats


function calculate(sum) {
	if (/[^0-9+\-*.$]/.test(sum)) return '400: Bad request';

	const nums = sum.split(/[\+\-\*\$]/).map(Number);
	const ops = sum.split('').filter(c => '+-*$'.includes(c));

	if (nums.length !== ops.length + 1) return '400: Bad request';

	function applyOp(a, b, op) {
		if (op === '+') return a + b;
		if (op === '-') return a - b;
		if (op === '*') return a * b;
		if (op === '$') return a / b;
	}

	function processOps(nums, ops, targetOps) {
		let i = 0;
		while (i < ops.length) {
			if (targetOps.includes(ops[i])) {
				if (ops[i] === '$' && nums[i + 1] === 0) return null;
				const res = applyOp(nums[i], nums[i + 1], ops[i]);
				nums.splice(i, 2, res);
				ops.splice(i, 1);
			} else {
				i++;
			}
		}
	}

	for (const opGroup of [['$'], ['*'], ['-'], ['+']]) {
		const res = processOps(nums, ops, opGroup);
		if (res === null) return '400: Bad request';
	}

	return nums[0];
}