// Task
// We define the weakness of number n as the number of positive integers smaller than n that have more divisors than n. It follows that the weaker the number, the greater overall weakness it has.
//
// 	For the given integer n, you need to answer two questions:
//
// 	what is the weakness of the weakest numbers in the range [1, n]?
// 	how many numbers in the range [1, n] have this weakness?
// 	Return the answer as a tuple ( where applicable: array ) of two elements, where the first element is the answer to the first question, and the second element is the answer to the second question.
//
// 	Example
// For n = 9, the output should be [2, 2]
//
// Here are the number of divisors and the specific weaknesses of each number in range [1, 9]:
//
// 1: d(1) = 1, weakness(1) = 0;
// 2: d(2) = 2, weakness(2) = 0;
// 3: d(3) = 2, weakness(3) = 0;
// 4: d(4) = 3, weakness(4) = 0;
// 5: d(5) = 2, weakness(5) = 1;
// 6: d(6) = 4, weakness(6) = 0;
// 7: d(7) = 2, weakness(7) = 2;
// 8: d(8) = 4, weakness(8) = 0;
// 9: d(9) = 3, weakness(9) = 2.
// As you can see, the maximum weakness is 2, and there are 2 numbers with that weakness.
//
// 	Input/Output
// 	[input] integer n
// Constraints: 1 ≤ n ≤ 1000
// 	[output] a pair of integers ( see example tests what encoding is actually required )
// the weakness of the weakest number, and the number of integers in range [1, n] with this weakness


function weakNumbers(n) {
	const divisorsCount = new Array(n + 1).fill(0);

	for (let i = 1; i <= n; i++) {
		for (let j = i; j <= n; j += i) {
			divisorsCount[j]++;
		}
	}

	const weaknesses = new Array(n + 1).fill(0);

	for (let i = 1; i <= n; i++) {
		let count = 0;
		for (let j = 1; j < i; j++) {
			if (divisorsCount[j] > divisorsCount[i]) count++;
		}
		weaknesses[i] = count;
	}

	const maxWeakness = Math.max(...weaknesses.slice(1));
	const countMax = weaknesses.slice(1).filter(w => w === maxWeakness).length;

	return [maxWeakness, countMax];
}