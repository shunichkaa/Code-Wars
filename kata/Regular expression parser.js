// Your task is to implement a simple regular expression parser. We will have a parser that outputs the following AST of a regular expression:
//
// 	new Normal(c)          // A character that is not in "()*|."
// new Any()              // Any character
// new ZeroOrMore(regexp) // Zero or more occurances of the same regexp
// new Or(regexp,regexp)  // A choice between 2 regexps
// new Str([regexp])      // A sequence of regexps
// As with the usual regular expressions, Any is denoted by the '.' character, ZeroOrMore is denoted by a subsequent '*' and Or is denoted by '|'. Brackets, ( and ), are allowed to group a sequence of regular expressions into the Str object.
//
// 	Or is not associative, so "a|(a|a)" and "(a|a)|a" are both valid regular expressions, whereas "a|a|a" is not.
//
// 	Operator precedences from highest to lowest are: *, sequencing and |. Therefore the followings hold:
//
// 	"ab*"     -> new Str([ new Normal('a'), new ZeroOrMore(new Normal ('b')) ])
// "(ab)*"   -> new ZeroOrMore(new Str([ new Normal('a'), new Normal('b') ]))
// "ab|a"    -> new Or( new Str([ new Normal('a'), new Normal('b') ]), new Normal ('a') )
// "a(b|a)"  -> new Str([ new Normal('a'), new Or( new Normal('b'), new Normal('a') ) ])
// "a|b*"    -> new Or( new Normal('a'), new ZeroOrMore(new Normal('b')) )
// "(a|b)*"  -> new ZeroOrMore(new Or( new Normal('a'), new Normal('b') ))
// Some examples:
//
// 	"a"          -> new Normal('a')
// "ab"         -> new Str([ new Normal('a'), new Normal('b') ])
// "a.*"        -> new Str([ new Normal('a'), new ZeroOrMore(new Any()) ])
// "(a.*)|(bb)" -> new Or( new Str([ new Normal('a'), new ZeroOrMore(new Any()) ])
// 	, new Str([ new Normal('b'), new Normal('b') ])
// )
// The followings are invalid regexps and the parser should return Nothing in Haskell / 0 in C or C++ / null in JavaScript or C# / None in Python or Rust / new Void() in Java/Void() in Kotlin:
//
// "", ")(", "*", "a(", "()", "a**", etc.
//
// 	Feel free to use any parser combinator libraries available on codewars, or implement the parser "from scratch".
//


function parseRegExp(s) {
	let pos = 0;

	function error() { pos = -1; return null; }
	function peek() { return s[pos]; }
	function eat(c) {
		if (s[pos] === c) { pos++; return true; }
		return false;
	}

	function parseRegex() {
		let left = parseSeqExpr();
		if (pos === -1) return null;
		if (eat('|')) {
			if (left === null) return error();
			let right = parseSeqExpr();
			if (right === null) return error();
			return new Or(left, right);
		}
		return left;
	}

	function parseSeqExpr() {
		const arr = [];
		while (true) {
			const r = parseRepeatExpr();
			if (r === null) break;
			arr.push(r);
		}
		if (arr.length === 0) return null;
		if (arr.length === 1) return arr[0];
		return new Str(arr);
	}

	function parseRepeatExpr() {
		let r = parseAtom();
		if (r === null) return null;
		if (peek() === '*') {
			pos++;
			r = new ZeroOrMore(r);
		}
		return r;
	}

	function parseAtom() {
		if (pos >= s.length) return null;
		const c = peek();

		if (c === '(') {
			pos++;
			const r = parseRegex();
			if (pos === -1 || r === null) return error();
			if (!eat(')')) return error();
			return r;
		}

		if (c === '.') {
			pos++;
			return new Any();
		}

		if (!'()*|.'.includes(c)) {
			pos++;
			return new Normal(c);
		}

		return null;
	}

	const result = parseRegex();

	if (pos !== s.length || pos === -1) return null;

	return result;
}
