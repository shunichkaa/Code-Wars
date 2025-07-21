// Whitespace
// Your objective with this kata is to implement an interpreter for the Whitespace language using the following description as a guide.
//
// 	Whitespace is an esoteric programming language that uses only three characters:
//
// 	[space] or " " (ASCII 32)
// [tab] or "\t" (ASCII 9)
// [line-feed] or "\n" (ASCII 10)
// All other characters may be used for comments. The interpreter ignores them.
//
// 	Whitespace is an imperative, stack-based programming language, including features such as subroutines.
//
// 	Each command in whitespace begins with an Instruction Modification Parameter (IMP).
//
// 	IMPs
// 	[space]: Stack Manipulation
// 	[tab][space]: Arithmetic
// 	[tab][tab]: Heap Access
// 	[tab][line-feed]: Input/Output
// 	[line-feed]: Flow Control
// There are two types of data a command may be passed: numbers and labels.
//
// 	Parsing Numbers
// Numbers begin with a [sign] symbol. The sign symbol is either [tab] -> negative, or [space] -> positive.
//
// 	Numbers end with a [terminal] symbol: [line-feed].
//
// 	Between the sign symbol and the terminal symbol are binary digits [space] -> binary-0, or [tab] -> binary-1.
//
// The binary digits are ordered from most-significant to least-significant.
//
// 	A number expression [sign][terminal] will be treated as zero.
//
// 	The expression of just [terminal] should throw an error. (The original Haskell implementation is inconsistent about this.)
//
// Parsing Labels
// Labels begin with any number of [tab] and [space] characters.
//
// 	Labels end with a terminal symbol: [line-feed].
//
// 	Unlike with numbers, the expression of just [terminal] is valid.
//
// 	Labels must be unique.
//
// 	A label may be declared either before or after a command that refers to it.
//
// 	Input/Output
// As stated earlier, there commands may read data from input or write to output.
//
// 	Parsing Input
// Whitespace will accept input either characters or integers. Due to the lack of an input stream mechanism, the input will be passed as a string to the interpreter function.
//
// Reading a character involves simply taking a character from the input stream.
//
// 	Reading an integer involves parsing a decimal or hexadecimal number (prefixed by 0x) from the current position of the input stream, up to and terminated by a line-feed character. Octal numbers (prefixed by 0) and binary numbers (prefixed by 0b) may optionally be supported, but aren't tested.
//
// The original implementation being in Haskell has stricter requirements for parsing an integer.
//
// 	The Javascript and Coffeescript implementations will accept any number that can be parsed by the parseInt function as a single parameter.
//
// 	The Python implementations will accept any number that can be parsed by the int function as a single parameter.
//
// 	The Java implementations will use an InputStream instance for input. For InputStream use readLine if the program requests a number and read if the program expects a character.
//
// 	An error should be thrown if the input ends before the program is exited. (This is a non-issue for the original Haskell implementation, as it expects user input)
//
// Writing Output
// For a number, append the output string with the number's string value.
//
// For a character, simply append the output string with the representative ASCII character.
//
// 	The Java implementations will support an optional OutputStream for output. If an OutputStream is provided, it should be flushed before and after code execution and filled as code is executed. The output string should be returned in any case.
//
// Commands
// Notation: n specifies the parameter, [number] or [label].
//
// 	Errors should be thrown for undefined/invalid numbers, labels, and heap addresses, or if there are logically not enough items on the stack to complete an operation (unless otherwise specified). In addition, an error should be thrown for unclean termination (not explicitly exiting the program).
//
// IMP [space] - Stack Manipulation
// 	[space] (number): Push n onto the stack.
// 	[tab][space] (number): Duplicate the nth value from the top of the stack and push onto the stack, n=0 is the top value on the stack.
// 	[tab][line-feed] (number): Discard the top n values below the top of the stack from the stack. (For n<**0** or **n**>=stack.length, remove everything but the top value.)
// [line-feed][space]: Duplicate the top value on the stack.
// 	[line-feed][tab]: Swap the top two value on the stack.
// 	[line-feed][line-feed]: Discard the top value on the stack.
// 	IMP [tab][space] - Arithmetic
// 	[space][space]: Pop a and b, then push b+a.
// 	[space][tab]: Pop a and b, then push b-a.
// 	[space][line-feed]: Pop a and b, then push b*a.
// 	[tab][space]: Pop a and b, then push b/a*. If a is zero, throw an error.
// *Note that the result is defined as the floor of the quotient.
// 	[tab][tab]: Pop a and b, then push b%a*. If a is zero, throw an error.
// *Note that the result is defined as the remainder after division and sign (+/-) of the divisor (a).
// IMP [tab][tab] - Heap Access
// 	[space]: Pop a and b, then store a at heap address b.
// 	[tab]: Pop a and then push the value at heap address a onto the stack.
// 	IMP [tab][line-feed] - Input/Output
// 	[space][space]: Pop a value off the stack and output it as a character.
// 	[space][tab]: Pop a value off the stack and output it as a number.
// 	[tab][space]: Read a character from input, a, Pop a value off the stack, b, then store the ASCII value of a at heap address b.
// 	[tab][tab]: Read a number from input, a, Pop a value off the stack, b, then store a at heap address b.
// 	IMP [line-feed] - Flow Control
// 	[space][space] (label): Mark a location in the program with label n.
// 	[space][tab] (label): Call a subroutine with the location specified by label n.
// 	[space][line-feed] (label): Jump unconditionally to the position specified by label n.
// 	[tab][space] (label): Pop a value off the stack and jump to the label specified by n if the value is zero.
// 	[tab][tab] (label): Pop a value off the stack and jump to the label specified by n if the value is less than zero.
// 	[tab][line-feed]: Exit a subroutine and return control to the location from which the subroutine was called.
// 	[line-feed][line-feed]: Exit the program.
// 	Notes
// Subroutines
// Subroutines in the context of Whitespace begin with a label ([space][space]), and end with an exit statement ([tab][line-feed]). Calling a subroutine ([space][tab] (label)) means completing all operations called within that subroutine and then after executing the exit statement within its own context, returning to the context which called the subroutine and continuing onto the next statement in that context.
//
// 	Division and modulo
// Whitespace expects floored division and modulo
//
// In Javascript and Coffeescript, the modulus operator is implemented differently than it was in the original Whitespace interpreter. Whitespace was influenced by having been originally implemented in Haskell. Javascript and Coffeescript also lack integer division operations. You need to pay a little extra attention in regard to the implementation of integer division and the modulus operator (See: floored division in the Wikipedia article "Modulo operation"
// Java defines methods for floor division and modulo in Math class. The methods differ from the traditional / and % operators.
// 	There is no difference between Whitespace and Python in regard to the standard implementation of integer division and modulo operations.


function whitespace(code, input) {
	return (new Whitespace(code, input)).interpret();
}

var Whitespace = function (code, input) {
	this.code = code.replace(/[^ \t\n]/g, '').replace(/ /g, 's').replace(/\t/g, 't').replace(/\n/g, 'n');;
	this.input = input;
	this.stack = [];
	this.output = '';
	this.heap = {};
	this.labels = {};
	this.cursor = 0;
	this.subroutinestack = [];
}

Whitespace.prototype.interpret = function() {
	this.codearray = this.code.match(/ss[st]*n|sts[st]*n|stn[st]*n|sns|snt|snn|tsss|tsst|tssn|tsts|tstt|tts|ttt|tnss|tnst|tnts|tntt|nss[st]*n|nst[st]*n|nsn[st]*n|nts[st]*n|ntt[st]*n|ntn|nnn/g);
	if (this.code != this.codearray.join('')) { throw "Invalid code"; }
	if (this.codearray.indexOf('ssn') > -1 || this.codearray.indexOf('stsn') > -1 || this.codearray.indexOf('stnn') > -1) {
		throw "Invalid number format: there must be at least one bit before terminal";
	}
	for (var i = 0; i < this.codearray.length; i++) {
		if (this.codearray[i].indexOf('nss') === 0) {
			if (this.labels[this.codearray[i].slice(3)]) { throw "Non-unique label at " + i + ": " + this.codearray[i]; }
			this.labels[this.codearray[i].slice(3)] = i;
		}
	}
	this.exit = false;
	while (this.cursor < this.codearray.length && !this.exit) {
		var command = this.codearray[this.cursor];
		command = command.match(/^(ss|sts|stn|nss|nst|nsn|nts|ntt)(.*n)/) || command;
		if (typeof(command) === "object") { this[command[1]](command[2]); }
		else { this[command](); }
		this.cursor++;
	}
	if (!this.exit) { throw "Bad exit"; }
	return this.output;
}

Whitespace.prototype.ss   = function(n) { this.stack.push(this.parseNumber(n)); }

Whitespace.prototype.sts  = function(n) {
	n = this.parseNumber(n);
	if (n < 0 || n > this.stack.length - 1) { throw "Failure to copy item at nonexisting index"; }
	var item = this.stack.length - n - 1;
	this.stack.push(this.stack[item]);
}

Whitespace.prototype.stn = function(n) {
	n = this.parseNumber(n);
	if (n < 0 || n > this.stack.length) { this.stack = [this.stack.pop()]; }
	else {
		var top = this.stack.pop();
		this.stack = this.stack.slice(0, this.stack.length - n);
		this.stack.push(top);
	}
}

Whitespace.prototype.sns = function() {
	if (!this.stack.length) { throw "Failed to run sns() with empty stack"; }
	this.stack.push(this.stack[this.stack.length - 1]);
}

Whitespace.prototype.snt = function() {
	this.stack = this.stack.concat([this.stack.pop(), this.stack.pop()]);
}

Whitespace.prototype.snn = function() {
	if (!this.stack.length) { throw "Failed to run snn() with empty stack"; }
	this.stack.pop();
}

Whitespace.prototype.tsss = function() {
	if (this.stack.length < 2) { throw "Failed to do arithmetics with less than 2 values in stack"; }
	var a = this.stack.pop(),
		b = this.stack.pop();
	this.stack.push(b + a);
}

Whitespace.prototype.tsst = function() {
	if (this.stack.length < 2) { throw "Failed to do arithmetics with less than 2 values in stack"; }
	var a = this.stack.pop(),
		b = this.stack.pop();
	this.stack.push(b - a);
}

Whitespace.prototype.tssn = function() {
	if (this.stack.length < 2) { throw "Failed to do arithmetics with less than 2 values in stack"; }
	var a = this.stack.pop(),
		b = this.stack.pop();
	this.stack.push(b * a);
}

Whitespace.prototype.tsts = function() {
	if (this.stack.length < 2) { throw "Failed to do arithmetics with less than 2 values in stack"; }
	var a = this.stack.pop(),
		b = this.stack.pop();
	if (!a) { throw "Attempt to divide by zero"; }
	this.stack.push(Math.floor(b/a));
}

Whitespace.prototype.tstt = function() {
	if (this.stack.length < 2) { throw "Failed to do arithmetics with less than 2 values in stack"; }
	var a = this.stack.pop(),
		b = this.stack.pop();
	if (!a) { throw "Attempt to modulo by zero"; }
	this.stack.push(b - Math.floor(b/a) * a);
}

Whitespace.prototype.tts = function() {
	if (this.stack.length < 2) { throw "Stack too short for tts() heap operation"; }
	var a = this.stack.pop(),
		b = this.stack.pop();
	this.heap[b] = a;
}

Whitespace.prototype.ttt = function() {
	var a = this.stack.pop();
	if (this.heap[a] === undefined) { throw "Failure to read from undefined heap address"; }
	this.stack.push(this.heap[a]);
}

Whitespace.prototype.tnss = function() {
	if(!this.stack.length) { throw "Failure to output from empty stack at tnst()";}
	this.output += String.fromCharCode(this.stack.pop());
}

Whitespace.prototype.tnst = function() {
	if(!this.stack.length) { throw "Failure to output from empty stack at tnst()";}
	this.output += this.stack.pop();
}

Whitespace.prototype.tnts = function() {
	if (!this.input.length) { throw "Failure to read character from input"; }
	else {
		var a = this.input[0];
		this.input = this.input.slice(1);
	}
	if (!this.stack.length) { throw "Failure to read heap address from empty stack at tnts()"; }
	else {
		this.heap[this.stack.pop()] = a.charCodeAt();
	}
}

Whitespace.prototype.tntt = function() {
	if (!this.input.length) { throw "Failure to read number from input"; }
	else {
		var arr = this.input.split('\n');
		var a = arr[0];
		this.input = arr.slice(1).join('\n');
	}
	if (!this.stack.length) { throw "Failure to read heap address from empty stack at tntt()"; }
	else {
		this.heap[this.stack.pop()] = parseInt(a);
	}
}

Whitespace.prototype.nss = function(l) { }

Whitespace.prototype.nst = function(l) {
	this.subroutinestack.push(this.cursor);
	this.cursor = this.labels[l];
}

Whitespace.prototype.nsn = function(l) {
	this.cursor = this.labels[l];
}

Whitespace.prototype.nts = function(l) {
	if (!this.stack.length) { throw "Failure to pop condition for jump from stack: empty stack"; }
	if (!this.stack.pop()) { this.cursor = this.labels[l]; }
}

Whitespace.prototype.ntt = function(l) {
	if (!this.stack.length) { throw "Failure to pop condition for jump from stack: empty stack"; }
	if (this.stack.pop() < 0) { this.cursor = this.labels[l]; }
}

Whitespace.prototype.ntn = function() {
	this.cursor = this.subroutinestack.pop();
}

Whitespace.prototype.nnn = function() {
	this.exit = true;
}

Whitespace.prototype.parseNumber = function(codedNumber) {
	var n = parseInt(codedNumber.slice(1, -1).replace(/s/g, '0').replace(/t/g, '1') || '0', 2)
	if (codedNumber[0] === 't') { n = -n; }
	return n;
}