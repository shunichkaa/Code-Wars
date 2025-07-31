// Write a function which makes a list of strings representing all of the ways you can balance n pairs of parentheses
//
// Examples
// balancedParens(0) => [""]
// balancedParens(1) => ["()"]
// balancedParens(2) => ["()()","(())"]
// balancedParens(3) => ["()()()","(())()","()(())","(()())","((()))"]


function balancedParens(n) {
	const result = [];
	function backtrack(str = '', open = 0, close = 0) {
		if (str.length === 2 * n) {
			result.push(str);
			return;
		}
		if (open < n) backtrack(str + '(', open + 1, close);
		if (close < open) backtrack(str + ')', open, close + 1);
	}
	backtrack();
	return result;
}