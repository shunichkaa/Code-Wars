// For very large words, you'll run into number precision issues in JS (if the word's position is greater than 2^53). For the JS tests with large positions, there's some leeway (.000000001%). If you feel like you're getting it right for the smaller ranks, and only failing by rounding on the larger, submit a couple more times and see if it takes.
//
// 	Python, Java and Haskell have arbitrary integer precision, so you must be precise in those languages (unless someone corrects me).
//
// C# is using a long, which may not have the best precision, but the tests are locked so we can't change it.
//
// Sample words, with their rank:
// 	ABAB = 2
// AAAB = 1
// BAAA = 4
// QUESTION = 24572
// BOOKKEEPER = 10743


function listPosition(word) {
	const n = word.length;
	const freq = {};
	for (let ch of word) freq[ch] = (freq[ch] || 0) + 1;

	const factorial = [1];
	for (let i = 1; i <= n; i++) factorial[i] = factorial[i - 1] * i;

	function permutationsCount(freq) {
		let length = 0;
		for (let k in freq) length += freq[k];
		let res = factorial[length];
		for (let k in freq) {
			res /= factorial[freq[k]];
		}
		return res;
	}

	let rank = 1;

	for (let i = 0; i < n; i++) {
		for (let c = 65; c <= 90; c++) {
			const ch = String.fromCharCode(c);
			if (ch === word[i]) break;
			if (freq[ch] > 0) {
				freq[ch]--;
				rank += permutationsCount(freq);
				freq[ch]++;
			}
		}
		freq[word[i]]--;
	}

	return rank;
}