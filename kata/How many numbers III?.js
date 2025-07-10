// We want to generate all the numbers of three digits where:
//
// 	the sum of their digits is equal to 10
// their digits are in increasing order (the numbers may have two or more equal contiguous digits)
// The numbers that fulfill these constraints are: [118, 127, 136, 145, 226, 235, 244, 334]. There are 8 numbers in total with 118 being the lowest and 334 being the greatest.
//
// 	Task
// Implement a function which receives two arguments:
//
// 	the sum of digits (sum)
// the number of digits (count)
// This function should return three values:
//
// 	the total number of values which have count digits that add up to sum and are in increasing order
// the lowest such value
// the greatest such value
// Note: if there are no values which satisfy these constaints, you should return an empty value (refer to the examples to see what exactly is expected).
//
// Examples
// findAll(10, 3)  =>  [8, "118", "334"]
// findAll(27, 3)  =>  [1, "999", "999"]
// findAll(84, 4)  =>  []
// Features of the random tests:
//
// 	Number of tests: 112
// Sum of digits value between 20 and 65
// Amount of digits between 2 and 17

function findAll(sum, count) {
	const results = [];

	function backtrack(pos, startDigit, currSum, currDigits) {
		if (pos === count) {
			if (currSum === sum) results.push(currDigits.join(''));
			return;
		}

		// Если первая цифра — минимум 1, остальные >= startDigit
		const minDigit = pos === 0 ? 1 : startDigit;

		for (let d = minDigit; d <= 9; d++) {
			if (currSum + d > sum) break;
			backtrack(pos + 1, d, currSum + d, [...currDigits, d]);
		}
	}

	backtrack(0, 0, 0, []);

	if (results.length === 0) return [];

	return [results.length, results[0], results[results.length - 1]];
}
