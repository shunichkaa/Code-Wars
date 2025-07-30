// The Challenge
// You'll need to implement a simple lexer type Simplexer, which, when constructed with a given string containing an expression in a simple language,
// transforms that string into a stream of Tokens.
// Simplexer
// Your Simplexer type is created with the expression it should tokenize. It should act like an iterator,
// yielding Token items until there are no more items to yield, at which point it should do whatever the appropriate action is for your chosen language.
// Objects of the Simplexer class are instantiated with a string and must define the next(): Token and the hasNext(): boolean methods.
// Tokens
// Tokens are represented by Token objects, which are preloaded for you and take the following shape:
// 	function Token(text, type) {
// 	Object.defineProperty(this, 'text', {
// 		enumerable: true,
// 		value: text
// 	});
// 		Object.defineProperty(this, 'type', {
// 			enumerable: true,
// 			value: type
// 		});
// 	};
// text is a string, the matched portion of the expression
// type is a string representing the token type (see below)
// Language Grammar
// The language for this task has a simple grammar, consisting of the following constructs and their associated token types:
// 	Type         Construct
// integer:     Any sequence of one or more decimal digits (leading zeroes allowed, no negative numbers)
// boolean:     Any of the following words: [true, false]
// string:      Any sequence of zero or more characters surrounded by "double quotes"
// operator:    Any of the following characters: [+, -, *, /, %, (, ), =]
// keyword:     Any of the following words: if, else, for, while, return, func, break
// whitespace:  Any sequence of the following characters: [' ', '\t', '\n']
// - Consecutive whitespace should be collapsed into a single token
// identifier:  Any sequence of alphanumeric characters, as well as '_' and '$'
// - Must not start with a digit
// - Make sure that keywords and booleans aren't matched as identifiers
// Notes
// Individual constructs are disambiguated by whitespace if necessary, so
// true123 is an identifier, as opposed to boolean followed by integer
// 123true is an integer followed by boolean
// "123"true is a string followed by boolean
// x+y is identifier op identifier
// Any character is permissable between double quotes, including keywords, numbers and arbitrary whitespace, so "true" and "123" are strings.
// The quotes "" are to be included in the Token.
// The input strings are guaranteed to be lexically valid according to the grammar above. Specifically:
// Input will consist only of valid constructs that can be mapped unambiguously to one of the above tokens
// No assumptions need be made regarding the structure of tokens in the input, i.e. syntax.
// Input may be the empty string
// That means the input will not contain any surprising characters, there is no need for error handling, and quotes will always appear in balanced pairs.
// This does not mean that the input needs to make semantic or syntactic sense. For example, if 123) return else"five")( is valid input for this task.
// After all, the job of a lexer is not to interpret the given input, merely transform it into tokens that could then be passed on to e.g. a parser,
// which would then check that the tokens received are syntactically valid and imbue them with semantics.


class Simplexer {
	constructor(buffer) {
		this.buffer = buffer;
		this.pos = 0;

		this.keywords = new Set(['if', 'else', 'for', 'while', 'return', 'func', 'break']);
		this.booleans = new Set(['true', 'false']);
		this.operators = new Set(['+', '-', '*', '/', '%', '(', ')', '=']);
	}

	hasNext() {
		return this.pos < this.buffer.length;
	}

	next() {
		if (!this.hasNext()) throw new Error('No more tokens');

		const str = this.buffer.slice(this.pos);

		const wsMatch = /^[ \t\n]+/.exec(str);
		if (wsMatch) {
			this.pos += wsMatch[0].length;
			return new Token(wsMatch[0], 'whitespace');
		}

		if (str[0] === '"') {
			let endIndex = 1;
			while (endIndex < str.length && str[endIndex] !== '"') {
				endIndex++;
			}
			endIndex++;
			const tokenText = str.slice(0, endIndex);
			this.pos += endIndex;
			return new Token(tokenText, 'string');
		}

		if (this.operators.has(str[0])) {
			this.pos++;
			return new Token(str[0], 'operator');
		}

		const intMatch = /^\d+/.exec(str);
		if (intMatch) {
			this.pos += intMatch[0].length;
			return new Token(intMatch[0], 'integer');
		}

		const idMatch = /^[a-zA-Z_$][a-zA-Z0-9_$]*/.exec(str);
		if (idMatch) {
			const word = idMatch[0];
			this.pos += word.length;
			if (this.keywords.has(word)) return new Token(word, 'keyword');
			if (this.booleans.has(word)) return new Token(word, 'boolean');
			return new Token(word, 'identifier');
		}

		throw new Error('Unexpected character at position ' + this.pos);
	}
}