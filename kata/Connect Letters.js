// Task
// Write a function which accepts a string consisting only of 'A', 'B', 'X' and 'Y',
// and returns the maximum possible number of pairwise connections that can be made.
// Rules
// You can connect A with B or B with A or X with Y or Y with X.
// Each letter can participate in such connection only once.
// You're not allowed to switch directions of connections.
// Connections must NOT cross.
// This implies that these types of connections are not allowed:
// A X B Y
// |_|_| |
// |___|
// Now, you might be thinking you can avoid crossing connections by drawing them like this:
// _____
// |   |
// A X B Y
// |____|
// Nope, you're not allowed to switch the directions (Rule 3).
// Example:
// In both cases, maximum is 3:
// B X A B A Y B A
// | |_|   | |_|
// |_______|
// or
// B X A B A Y B A
// |   |_| |   |_|
// |_______|
// Bounds
// Bounds: 0 < length of string < 690
// Expected time complexity:
// O (size(string)ˆ3)


function connect(s) {
	const n = s.length;
	const dp = Array.from({ length: n }, () => Array(n).fill(0));
	const canPair = (a, b) =>
		(a === 'A' && b === 'B') || (a === 'B' && b === 'A') ||
		(a === 'X' && b === 'Y') || (a === 'Y' && b === 'X');

	for (let len = 2; len <= n; len++) {
		for (let i = 0; i + len - 1 < n; i++) {
			const j = i + len - 1;
			dp[i][j] = dp[i + 1][j]; // пропускаем s[i]
			for (let k = i + 1; k <= j; k++) {
				if (canPair(s[i], s[k])) {
					const left = (k - 1 >= i + 1) ? dp[i + 1][k - 1] : 0;
					const right = (k + 1 <= j) ? dp[k + 1][j] : 0;
					dp[i][j] = Math.max(dp[i][j], left + 1 + right);
				}
			}
		}
	}

	return n ? dp[0][n - 1] : 0;
}