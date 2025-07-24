// Simpler Interactive interpreter (or REPL)
// You will create an interpreter which takes inputs described below and produces outputs, storing state in between each input. This is a simplified version of the Simple Interactive Interpreter kata with functions removed, so if you have fun with this kata, check out its big brother to add functions into the mix.
//
// 	If you're not sure where to start with this kata, check out ankr's Evaluate Mathematical Expression kata.
//
// 	Note that the eval command has been disabled.
//
// 	Concepts
// The interpreter will take inputs in the language described under the language header below. This section will give an overview of the language constructs.
//
// 	Variables
// Any identifier which is not a keyword will be treated as a variable. If the identifier is on the left hand side of an assignment operator, the result of the right hand side will be stored in the variable. If a variable occurs as part of an expression, the value held in the variable will be substituted when the expression is evaluated.
//
// 	Variables are implicitly declared the first time they are assigned to.
//
// 	Example: Initializing a variable to a constant value and using the variable in another expression (Each line starting with a '>' indicates a separate call to the input method of the interpreter, other lines represent output)
//
// >x = 7
// 7
// >x + 6
// 13
// Referencing a non-existent variable will cause the interpreter to throw an error. The interpreter should be able to continue accepting input even after throwing.
//
// 	Example: Referencing a non-existent variable
//
// >y + 7
// ERROR: Invalid identifier. No variable with name 'y' was found."
// Assignments
// An assignment is an expression that has an identifier on left side of an = operator, and any expression on the right. Such expressions should store the value of the right hand side in the specified variable and return the result.
//
// 	Example: Assigning a constant to a variable
//
// x = 7
// 7
// In this kata, all tests will contain only a single assignment. You do not need to consider chained or nested assignments.
//
// 	Operator Precedence
// Operator precedence will follow the common order. There is a table in the Language section below that explicitly states the operators and their relative precedence.
//
// 	Name conflicts
// Because variables are declared implicitly, no naming conflicts are possible. variable assignment will always overwrite any existing value.
//
// 	Input
// Input will conform to the expression production in the grammar below.
//
// 	Output
// Output for a valid expression will be the result of the expression.
//
// 	Output for input consisting entirely of whitespace will be an empty string (null in case of Java).
//
// All other cases will throw an error.
//
// 	Language
// Grammar
// This section specifies the grammar for the interpreter language in EBNF syntax
//
// expression      ::= factor | expression operator expression
// factor          ::= number | identifier | assignment | '(' expression ')'
// assignment      ::= identifier '=' expression
//
// operator        ::= '+' | '-' | '*' | '/' | '%'
//
// identifier      ::= letter | '_' { identifier-char }
// identifier-char ::= '_' | letter | digit
//
// number          ::= { digit } [ '.' digit { digit } ]
//
// letter          ::= 'a' | 'b' | ... | 'y' | 'z' | 'A' | 'B' | ... | 'Y' | 'Z'
// digit           ::= '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
// Operator Precedence
// The following table lists the language's operators grouped in order of precedence. Operators within each group have equal precedence.
//
// Category	Operators
// Multiplicative	*, /, %
// Additive	+, -
// 	Assignment	=


class Interpreter {
	constructor() {
		this.vars = {};
	}

	static tokenize(program) {
		const regex = /\s*([-+*\/%=\(\)]|[A-Za-z_][A-Za-z0-9_]*|[0-9]*\.?[0-9]+)\s*/g;
		let tokens = [];
		let match;
		while ((match = regex.exec(program)) !== null) {
			tokens.push(match[1]);
		}
		return tokens;
	}

	input(expr) {
		if (!expr.trim()) return '';

		this.tokens = Interpreter.tokenize(expr);
		this.pos = 0;

		const result = this.parseExpression();

		if (this.pos < this.tokens.length) {
			throw new Error('Unexpected token: ' + this.tokens[this.pos]);
		}

		return result;
	}

	peek() {
		return this.tokens[this.pos];
	}

	consume(expected) {
		if (this.tokens[this.pos] === expected) {
			this.pos++;
			return true;
		}
		return false;
	}

	parseExpression(minPrecedence = 0) {
		let left = this.parseFactor();

		while (true) {
			let op = this.peek();
			let precedence = Interpreter.getPrecedence(op);
			if (precedence === undefined || precedence < minPrecedence) break;

			this.pos++;

			let right = this.parseExpression(precedence + 1);

			left = this.applyOp(op, left, right);
		}

		return left;
	}

	parseFactor() {
		let token = this.peek();

		// assignment: identifier = expression
		if (this.isIdentifier(token)) {
			// Lookahead for assignment
			if (this.tokens[this.pos + 1] === '=') {
				let varName = token;
				this.pos += 2; // skip identifier and =
				let val = this.parseExpression();
				this.vars[varName] = val;
				return val;
			}
		}

		if (this.consume('(')) {
			let val = this.parseExpression();
			if (!this.consume(')')) {
				throw new Error('Expected )');
			}
			return val;
		}

		if (this.isNumber(token)) {
			this.pos++;
			return Number(token);
		}

		if (this.isIdentifier(token)) {
			if (!(token in this.vars)) {
				throw new Error(`ERROR: Invalid identifier. No variable with name '${token}' was found.`);
			}
			this.pos++;
			return this.vars[token];
		}

		throw new Error(`Unexpected token: ${token}`);
	}

	isNumber(token) {
		return /^(\d+(\.\d*)?|\.\d+)$/.test(token);
	}

	isIdentifier(token) {
		return /^[A-Za-z_][A-Za-z0-9_]*$/.test(token);
	}

	applyOp(op, left, right) {
		switch (op) {
			case '+': return left + right;
			case '-': return left - right;
			case '*': return left * right;
			case '/': return left / right;
			case '%': return left % right;
			default:
				throw new Error('Unknown operator: ' + op);
		}
	}

	static getPrecedence(op) {
		if (op === '=' ) return 1; // assignment handled separately
		if (op === '+' || op === '-') return 2;
		if (op === '*' || op === '/' || op === '%') return 3;
		return undefined;
	}
}