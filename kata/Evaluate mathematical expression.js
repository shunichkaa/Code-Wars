// Instructions
// Given a mathematical expression as a string you must return the result as a number.
//
// 	Numbers
// Number may be both whole numbers and/or decimal numbers. The same goes for the returned result.
//
// 	Operators
// You need to support the following mathematical operators:
//
// 	Multiplication *
// 	Division / (as floating point division)
// Addition +
// Subtraction -
// Operators are always evaluated from left-to-right, and * and / must be evaluated before + and -.
//
// Parentheses
// You need to support multiple levels of nested parentheses, ex. (2 / (2 + 3.33) * 4) - -6
//
// Whitespace
// There may or may not be whitespace between numbers and operators.
//
// 	An addition to this rule is that the minus sign (-) used for negating numbers and parentheses will never be separated by whitespace. I.e all of the following are valid expressions.
//
// 1-1    // 0
// 1 -1   // 0
// 1- 1   // 0
// 1 - 1  // 0
// 1- -1  // 2
// 1 - -1 // 2
// 1--1   // 2
//
// 6 + -(4)   // 2
// 6 + -( -4) // 10
// And the following are invalid expressions
//
// 1 - - 1    // Invalid
// 1- - 1     // Invalid
// 6 + - (4)  // Invalid
// 6 + -(- 4) // Invalid
// Validation
// You do not need to worry about validation - you will only receive valid mathematical expressions following the above rules.
//
// 	Restricted APIs
// NOTE: Both eval and Function are disabled.


const calc = function (expression) {
	const tokens = tokenize(expression);
	const [result] = parseExpression(tokens);
	return result;
};

function tokenize(expr) {
	const tokens = [];
	const regex = /\s*([()+\-*/]|\d+(?:\.\d+)?|\.\d+)\s*/g;
	let match;

	while ((match = regex.exec(expr)) !== null) {
		tokens.push(match[1]);
	}

	return tokens;
}

function parseExpression(tokens) {
	const output = [];

	const apply = () => {
		let b = output.pop();
		let op = output.pop();
		let a = output.pop();
		output.push(applyOp(a, op, b));
	};

	const precedence = { '+': 1, '-': 1, '*': 2, '/': 2 };

	const ops = [];
	const values = [];

	const nextValue = () => {
		let token = tokens.shift();
		if (token === '(') {
			const [value] = parseExpression(tokens);
			return value;
		}

		if (token === '-') {
			if (tokens[0] === '(' || /^[\d.]/.test(tokens[0])) {
				const val = nextValue();
				return -val;
			}
		}

		return parseFloat(token);
	};

	let current = nextValue();

	while (tokens.length) {
		let token = tokens[0];

		if (token === ')') {
			tokens.shift();
			break;
		}

		if (['+', '-', '*', '/'].includes(token)) {
			let op = tokens.shift();

			while (
				ops.length &&
				precedence[ops[ops.length - 1]] >= precedence[op]
				) {
				let right = current;
				let operator = ops.pop();
				let left = values.pop();
				current = applyOp(left, operator, right);
			}

			values.push(current);
			ops.push(op);
			current = nextValue();
		} else {
			break;
		}
	}

	while (ops.length) {
		let right = current;
		let operator = ops.pop();
		let left = values.pop();
		current = applyOp(left, operator, right);
	}

	return [current, tokens];
}

function applyOp(a, op, b) {
	a = parseFloat(a);
	b = parseFloat(b);
	switch (op) {
		case '+': return a + b;
		case '-': return a - b;
		case '*': return a * b;
		case '/': return a / b;
	}
}