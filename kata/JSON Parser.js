// JSON is a simple data-interchange format that is based on a simplified version of JavaScript's object notation. The official website has a great description of the language.
//
// For the purposes of this kata we will use a simplified version of JSON. Specifically, you may ignore numbers with exponents and strings with Unicode and escape sequences. The updated parts of the specification are as follows
//
// string
// ""
// " chars "
// chars
// char
// char chars
// char
// any-character-except-"
// number
// int
// int frac
// int
// digit
// digit1-9 digits
// - digit
// - digit1-9 digits
// frac
// 	. digits
// digits
// digit
// digit digits
// The rest of the specification is the same as JSON
//
// object
// {}
// { members }
// members
// pair
// pair , members
// pair
// string : value
// array
// 	[]
// 	[ elements ]
// elements
// value
// value , elements
// value
// string
// number
// object
// array
// true
// false
// null
// Your task is to implement a function that, given a string, either returns a JavaScript value that is equivalent to the string or throws an error. For example, parse("123") === 123 and parse('{"a":[1,2]}') === { a: [1, 2] }
//
// Your implementation will be tested against invalid inputs.
//
// 	JSON.parse and eval have been disabled in this kata.


function parse(str) {
	let i = 0;

	function error(msg) {
		throw new SyntaxError(msg + " at position " + i);
	}

	function skipWhitespace() {
		while (/\s/.test(str[i])) i++;
	}

	function parseValue() {
		skipWhitespace();
		if (str[i] === '{') return parseObject();
		if (str[i] === '[') return parseArray();
		if (str[i] === '"') return parseString();
		if (str[i] === '-' || isDigit(str[i])) return parseNumber();
		if (str.startsWith("true", i)) {
			i += 4;
			return true;
		}
		if (str.startsWith("false", i)) {
			i += 5;
			return false;
		}
		if (str.startsWith("null", i)) {
			i += 4;
			return null;
		}
		error("Unexpected token");
	}

	function isDigit(ch) {
		return ch >= '0' && ch <= '9';
	}

	function parseString() {
		if (str[i] !== '"') error("Expected '\"'");
		i++; // skip "
		let result = "";
		while (i < str.length && str[i] !== '"') {
			if (str[i] === '\n' || str[i] === '\r') error("Unexpected line break in string");
			// В задаче не нужно поддерживать escape-последовательности, поэтому просто копируем символы
			result += str[i++];
		}
		if (str[i] !== '"') error("Unterminated string");
		i++; // skip closing "
		return result;
	}

	function parseNumber() {
		let start = i;
		if (str[i] === '-') i++;
		if (!isDigit(str[i])) error("Invalid number");

		if (str[i] === '0') {
			i++;
		} else {
			while (isDigit(str[i])) i++;
		}

		if (str[i] === '.') {
			i++;
			if (!isDigit(str[i])) error("Invalid fractional part");
			while (isDigit(str[i])) i++;
		}

		// Экспоненты не поддерживаем (по условию)

		let numStr = str.slice(start, i);
		let num = Number(numStr);
		if (isNaN(num)) error("Invalid number");
		return num;
	}

	function parseArray() {
		if (str[i] !== '[') error("Expected '['");
		i++; // skip [
		skipWhitespace();
		let arr = [];
		if (str[i] === ']') {
			i++;
			return arr; // empty array
		}
		while (true) {
			let val = parseValue();
			arr.push(val);
			skipWhitespace();
			if (str[i] === ',') {
				i++;
				skipWhitespace();
				continue;
			} else if (str[i] === ']') {
				i++;
				break;
			} else {
				error("Expected ',' or ']'");
			}
		}
		return arr;
	}

	function parseObject() {
		if (str[i] !== '{') error("Expected '{'");
		i++; // skip {
		skipWhitespace();
		let obj = {};
		if (str[i] === '}') {
			i++;
			return obj; // empty object
		}
		while (true) {
			skipWhitespace();
			if (str[i] !== '"') error("Expected string key");
			let key = parseString();
			skipWhitespace();
			if (str[i] !== ':') error("Expected ':' after key");
			i++; // skip :
			let val = parseValue();
			obj[key] = val;
			skipWhitespace();
			if (str[i] === ',') {
				i++;
				continue;
			} else if (str[i] === '}') {
				i++;
				break;
			} else {
				error("Expected ',' or '}'");
			}
		}
		return obj;
	}

	skipWhitespace();
	let result = parseValue();
	skipWhitespace();
	if (i !== str.length) error("Unexpected trailing characters");
	return result;
}
