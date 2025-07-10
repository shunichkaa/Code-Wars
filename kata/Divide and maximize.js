// Your friend has a list of k numbers: [a1, a2, a3, ... ak].
//
// 	He is allowed to do an operation which consists of three steps:
//
// 	select two numbers: ai and aj (ai % 2 = 0)
// replace ai with ai / 2
// 	replace aj with aj * 2
// 	Help him to find the maximum sum of list elements that is possible to achieve by using this operation (possibly multiple times).
// Return this sum modulo 1_000_000_007, because it can be quite big.
//
// 	Input
// List of k elements: [a1, a2, a3, ..., ak]; k < 10**4
// All numbers are positive and smaller than 10**9
//
// Output
// Maximum sum after some operations (modulo 1_000_000_007)


const MOD = 1000000007n;

function powMod(base, exp, mod) {
	let result = 1n;
	let b = base % mod;
	let e = BigInt(exp);

	while (e > 0n) {
		if (e & 1n) {
			result = (result * b) % mod;
		}
		b = (b * b) % mod;
		e >>= 1n;
	}
	return result;
}

function divideAndMultiply(...numbers) {
	if (numbers.length === 1 && Array.isArray(numbers[0])) {
		numbers = numbers[0];
	}
	if (numbers.length === 0) return 0;

	let arr = numbers.map(x => BigInt(x));
	let totalShifts = 0n;
	let maxOdd = 0n;
	let sumOthers = 0n;

	for (let num of arr) {
		let shifts = 0n;
		while (num % 2n === 0n) {
			num /= 2n;
			shifts++;
		}
		totalShifts += shifts;
		if (num > maxOdd) {
			maxOdd = num;
		}
		sumOthers = (sumOthers + num) % MOD;
	}

	sumOthers = (sumOthers - maxOdd + MOD) % MOD;
	let maxOddShifted = (maxOdd * powMod(2n, totalShifts, MOD)) % MOD;

	return (sumOthers + maxOddShifted) % MOD;
}