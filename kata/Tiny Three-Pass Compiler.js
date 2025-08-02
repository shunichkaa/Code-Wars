// You are writing a three-pass compiler for a simple programming language into a small assembly language.
//
// 	The programming language has this syntax:
//
// 	function   ::= '[' arg-list ']' expression
//
// arg-list   ::= /* nothing */
// | variable arg-list
//
// expression ::= term
// 	| expression '+' term
// | expression '-' term
//
// term       ::= factor
// 	| term '*' factor
// | term '/' factor
//
// factor     ::= number
// 	| variable
// 	| '(' expression ')'
// Variables are strings of alphabetic characters. Numbers are strings of decimal digits representing integers. So, for example, a function which computes a2 + b2 might look like:
//
// 	[ a b ] a*a + b*b
// A function which computes the average of two numbers might look like:
//
// 	[ first second ] (first + second) / 2
// You need write a three-pass compiler. All test cases will be valid programs, so you needn't concentrate on error-handling.
//
// The first pass will be the method pass1 which takes a string representing a function in the original programming language and will return a (JSON) object that represents that Abstract Syntax Tree. The Abstract Syntax Tree must use the following representations:
//
// { 'op': '+', 'a': a, 'b': b }    // add subtree a to subtree b
// { 'op': '-', 'a': a, 'b': b }    // subtract subtree b from subtree a
// { 'op': '*', 'a': a, 'b': b }    // multiply subtree a by subtree b
// { 'op': '/', 'a': a, 'b': b }    // divide subtree a from subtree b
// { 'op': 'arg', 'n': n }          // reference to n-th argument, n integer
// { 'op': 'imm', 'n': n }          // immediate value n, n integer
// Note: arguments are indexed from zero. So, for example, the function
//
// [ x y ] ( x + y ) / 2 would look like:
//
// { 'op': '/', 'a': { 'op': '+', 'a': { 'op': 'arg', 'n': 0 },
// 	'b': { 'op': 'arg', 'n': 1 } },
// 	'b': { 'op': 'imm', 'n': 2 } }
// The second pass of the compiler will be called pass2. This pass will take the output from pass1 and return a new Abstract Syntax Tree (with the same format) with all constant expressions reduced as much as possible. So, if for example, the function is [ x ] x + 2*5, the result of pass1 would be:
//
// { 'op': '+', 'a': { 'op': 'arg', 'n': 0 },
// 	'b': { 'op': '*', 'a': { 'op': 'imm', 'n': 2 },
// 	'b': { 'op': 'imm', 'n': 5 } } }
// This would be passed into pass2 which would return:
//
// { 'op': '+', 'a': { 'op': 'arg', 'n': 0 },
// 	'b': { 'op': 'imm', 'n': 10 } }
// The third pass of the compiler is pass3. The pass3 method takes in an Abstract Syntax Tree and returns an array of strings. Each string is an assembly directive. You are working on a small processor with two registers (R0 and R1), a stack, and an array of input arguments. The result of a function is expected to be in R0. The processor supports the following instructions:
//
// 	"IM n"     // load the constant value n into R0
// "AR n"     // load the n-th input argument into R0
// "SW"       // swap R0 and R1
// "PU"       // push R0 onto the stack
// "PO"       // pop the top value off of the stack into R0
// "AD"       // add R1 to R0 and put the result in R0
// "SU"       // subtract R1 from R0 and put the result in R0
// "MU"       // multiply R0 by R1 and put the result in R0
// "DI"       // divide R0 by R1 and put the result in R0
// So, one possible return value from pass3 given the Abstract Syntax Tree shown above from pass2 is:
//
// 	[ "IM 10", "SW", "AR 0", "AD" ]
// Here is a simulator for the target machine. It takes an array of assembly instructions and an array of arguments and returns the result.
//
// 	function simulate(asm, args) {
// 	var r0 = undefined;
// 	var r1 = undefined;
// 	var stack = [];
// 	asm.forEach(function (instruct) {
// 		var match = instruct.match(/(IM|AR)\s+(\d+)/) || [ 0, instruct, 0 ];
// 		var ins = match[1];
// 		var n = match[2] | 0;
//
// 		if (ins == 'IM')   { r0 = n; }
// 		else if (ins == 'AR') { r0 = args[n]; }
// 		else if (ins == 'SW') { var tmp = r0; r0 = r1; r1 = tmp; }
// 		else if (ins == 'PU') { stack.push(r0); }
// 		else if (ins == 'PO') { r0 = stack.pop(); }
// 		else if (ins == 'AD') { r0 += r1; }
// 		else if (ins == 'SU') { r0 -= r1; }
// 		else if (ins == 'MU') { r0 *= r1; }
// 		else if (ins == 'DI') { r0 /= r1; }
// 	});
// 	return r0;
// }


function Compiler () {}

Compiler.prototype.compile = function (program) {
	return this.pass3(this.pass2(this.pass1(program)));
};

Compiler.prototype.tokenize = function (program) {
	var regex = /\s*([-+*/\(\)\[\]]|[A-Za-z]+|[0-9]+)\s*/g;
	return program.replace(regex, ":$1").substring(1).split(':').map(tok => {
		return isNaN(tok) ? tok : tok|0;
	});
};

Compiler.prototype.pass1 = function (program) {
	var tokens = this.tokenize(program);
	var pos = 0;

	// Парсим функцию: [ arg-list ] expression
	if (tokens[pos] !== '[') throw "Expected [";
	pos++;

	var args = [];
	while (pos < tokens.length && tokens[pos] !== ']') {
		if (typeof tokens[pos] !== 'string' || !/^[A-Za-z]+$/.test(tokens[pos])) throw "Invalid arg";
		args.push(tokens[pos]);
		pos++;
	}
	if (tokens[pos] !== ']') throw "Expected ]";
	pos++;

	// Создадим мапу arg -> index
	var argMap = {};
	args.forEach((a,i)=>argMap[a]=i);

	// Парсим expression
	function parseExpression() {
		var node = parseTerm();
		while (pos < tokens.length && (tokens[pos] === '+' || tokens[pos] === '-')) {
			var op = tokens[pos++];
			var right = parseTerm();
			node = { op: op, a: node, b: right };
		}
		return node;
	}

	function parseTerm() {
		var node = parseFactor();
		while (pos < tokens.length && (tokens[pos] === '*' || tokens[pos] === '/')) {
			var op = tokens[pos++];
			var right = parseFactor();
			node = { op: op, a: node, b: right };
		}
		return node;
	}

	function parseFactor() {
		var t = tokens[pos++];
		if (typeof t === 'number') {
			return { op: 'imm', n: t };
		}
		if (typeof t === 'string') {
			if (t === '(') {
				var expr = parseExpression();
				if (tokens[pos++] !== ')') throw "Expected )";
				return expr;
			}
			// variable
			if (t in argMap) {
				return { op: 'arg', n: argMap[t] };
			}
			throw "Unknown variable " + t;
		}
		throw "Unexpected token";
	}

	var ast = parseExpression();
	if (pos !== tokens.length) throw "Extra tokens";

	return ast;
};

Compiler.prototype.pass2 = function (ast) {
	// Рекурсивно упрощаем константы
	function fold(node) {
		if (!node) return node;
		if (node.op === 'imm' || node.op === 'arg') return node;

		var a = fold(node.a);
		var b = fold(node.b);

		if (a.op === 'imm' && b.op === 'imm') {
			var res;
			switch(node.op) {
				case '+': res = a.n + b.n; break;
				case '-': res = a.n - b.n; break;
				case '*': res = a.n * b.n; break;
				case '/':
					if (b.n === 0) throw "Divide by zero";
					res = Math.floor(a.n / b.n); // integer division
					break;
				default: throw "Unknown op " + node.op;
			}
			return { op: 'imm', n: res };
		}
		return { op: node.op, a: a, b: b };
	}

	return fold(ast);
};

Compiler.prototype.pass3 = function (ast) {
	var code = [];

	// Рекурсивная генерация кода для узла ast.
	// Результат должен быть в R0.
	// Используем стек для вложенных выражений.

	function gen(node) {
		if (node.op === 'imm') {
			code.push("IM " + node.n);
			return;
		}
		if (node.op === 'arg') {
			code.push("AR " + node.n);
			return;
		}
		// Вычисляем левый операнд
		gen(node.a);
		code.push("PU");  // сохраняем R0 в стек
		// Вычисляем правый операнд
		gen(node.b);
		code.push("SW");  // поменять R0 и R1 (теперь R1 = правый операнд, R0 = левый операнд)
		code.push("PO");  // забираем левый операнд обратно в R0

		switch (node.op) {
			case '+': code.push("AD"); break;
			case '-': code.push("SU"); break;
			case '*': code.push("MU"); break;
			case '/': code.push("DI"); break;
			default: throw "Unknown op " + node.op;
		}
	}

	gen(ast);
	return code;
};