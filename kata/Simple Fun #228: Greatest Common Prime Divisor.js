// Input/Output
// 	[input] integer a
//
// 2 ≤ a ≤ 1000
//
// 	[input] integer b
//
// 2 ≤ b ≤ 1000
//
// 	[output] an integer
//
// GCPD of a and b or -1 if it doesn't exist.
//
// Example
// For a = 12 and b = 18, the output should be 3
//
// For a = 12 and b = 13, the output should be -1
//


function greatestCommonPrimeDivisor(a, b) {
	function isPrime(n) {
		if (n < 2) return false;
		for (let i = 2; i * i <= n; i++) {
			if (n % i === 0) return false;
		}
		return true;
	}

	let gcd = 1;
	// Найдём все общие делители
	for (let i = 2; i <= Math.min(a, b); i++) {
		if (a % i === 0 && b % i === 0 && isPrime(i)) {
			gcd = i > gcd ? i : gcd;
		}
	}

	return gcd === 1 ? -1 : gcd;
}