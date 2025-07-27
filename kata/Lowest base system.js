// Your task is determine the lowest number base system in which the input n ( base 10 ), expressed in this number base system, is all 1s in its digits.
//
// 	See some examples:
//
// 	7 in base 2 is 111 - fits! answer is 2
//
// 21 in base 2 is 10101 - contains 0, does not fit
// 21 in base 3 is 210 - contains 0 and 2, does not fit
// 21 in base 4 is 111 - contains only 1 it fits! answer is 4
//
// n is always less than Number.MAX_SAFE_INTEGER or equivalent.


function getMinBase(n) {
	if (n === 1) return 2;

	for (let k = 64; k >= 2; k--) {
		let low = 2;
		let high = Math.pow(n, 1 / (k - 1)) + 1;

		while (low <= high) {
			const mid = Math.floor((low + high) / 2);
			let sum = 1;
			let term = 1;

			for (let i = 1; i < k; i++) {
				term *= mid;
				sum += term;

				if (sum > n) break;
			}

			if (sum === n) return mid;
			else if (sum < n) low = mid + 1;
			else high = mid - 1;
		}
	}
	return n - 1;
}