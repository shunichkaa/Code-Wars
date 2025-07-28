// Problem Description
// Let's imagine a function F(n), which is defined over the integers in the range of 1 <= n <= max_n, and 0 <= F(n) <= max_fn for every n.
// There are (1 + max_fn) ** max_n possible definitions of F in total.
// Out of those definitions, how many Fs satisfy the following equations?
// Since your answer will be very large, please give your answer modulo 12345787.
// F(n) + F(n + 1) <= max_fn for 1 <= n < max_n
// F(max_n) + F(1) <= max_fn
// Constraints
// 1 <= max_n <= 100
// 1 <= max_fn <= 5
// The inputs will be always valid integers.
// Examples
// # F(1) + F(1) <= 1, F(1) = 0
// circular_limited_sums(1, 1) == 1
// # F = (0, 0), (0, 1), (1, 0)
// circular_limited_sums(2, 1) == 3
// # F = (0, 0, 0), (0, 0, 1), (0, 1, 0), (1, 0, 0)
// circular_limited_sums(3, 1) == 4
// # F = (0, 0, 0, 0), (0, 0, 0, 1), (0, 0, 1, 0), (0, 1, 0, 0),
// # (0, 1, 0, 1), (1, 0, 0, 0), (1, 0, 1, 0)
// circular_limited_sums(4, 1) == 7
// # F = (0), (1)
// circular_limited_sums(1, 2) == 2
// # F = (0, 0), (0, 1), (0, 2), (1, 0), (1, 1), (2, 0)
// circular_limited_sums(2, 2) == 6
// # F = (0, 0, 0), (0, 0, 1), (0, 0, 2), (0, 1, 0), (0, 1, 1),
// # (0, 2, 0), (1, 0, 0), (1, 0, 1), (1, 1, 0), (1, 1, 1), (2, 0, 0)
// circular_limited_sums(3, 2) == 11
// circular_limited_sums(4, 2) == 26
// Acknowledgement
// This problem was designed as a hybrid of Project Euler #209:
// Circular Logic and Project Euler #164: Numbers for which no three consecutive digits have a sum greater than a given value.
// An even more challenging version of this problem: Insane Circular Limited Sums
// If you enjoyed this Kata, please also have a look at my other Katas!


function circularLimitedSums(maxN, maxFn) {
	const MOD = 12345787;

	if (maxN === 1) {
		let count = 0;
		for (let v = 0; v <= maxFn; v++) {
			if (v + v <= maxFn) count++;
		}
		return count % MOD;
	}

	let result = 0;

	for (let s = 0; s <= maxFn; s++) {
		let dp = Array.from({ length: maxN }, () => Array(maxFn + 1).fill(0));
		dp[0][s] = 1;

		for (let i = 1; i < maxN; i++) {
			for (let v = 0; v <= maxFn; v++) {
				if (dp[i - 1][v] === 0) continue;
				for (let u = 0; u <= maxFn; u++) {
					if (v + u <= maxFn) {
						dp[i][u] = (dp[i][u] + dp[i - 1][v]) % MOD;
					}
				}
			}
		}

		for (let x = 0; x <= maxFn; x++) {
			if (x + s <= maxFn) {
				result = (result + dp[maxN - 1][x]) % MOD;
			}
		}
	}

	return result;
}