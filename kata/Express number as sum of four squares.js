// Recently you had a quarrel with your math teacher. Not only that nerd demands knowledge of all the theorems, but he turned to be an constructivist devotee! After you recited by heart Lagranges theorem of sum of four squares, he now demands a computer program to obtain such a decomposition, so that to see that you really understand a topic. What a downer!
//
// 	You remember well the theorem. Any positive integer can be decomposed into a sum of four squares of integers. Seems not too hard... But after a quarrel, your teacher wants blood. Apparently he will test your program on extremely huge numbers... And your program better finished working before the break - you don't want to get F, do you?
//
// Tip: random tests feature 20 numbers as high as 2^128 and 20 number as high as 2^1024.
//


function fourSquares(n) {

	// based on: sympy, gmpy2 and solutions on various other kata's

	function isqrt(n) {
		if (n < 2n) return n;
		if (n < 16n) return BigInt(Math.floor(Math.sqrt(Number(n))));
		if (n < (1n << 52n)) return BigInt(Math.floor(Math.sqrt(Number(n) + 0.5)));
		let e = BigInt(n.toString(16).length << 2);
		let q = ((e + 2n) / 4n);
		let h = q * 2n;
		let x1 = (isqrt(n >> h) + 1n) << q;
		let x0 = -1n;
		while ((x0 !== x1 && x0 !== (x1 - 1n))) {
			x0 = x1;
			x1 = ((n / x0) + x0) >> 1n;
		}
		return x0;
	}

	function powMod(n, p, m) {
		let r = 1n;
		n = n % m;
		while (p > 0n) {
			if (p & 1n) r = r * n % m;
			p /= 2n;
			n = n * n % m;
		}
		return r;
	}

	function rand(b) {
		if (b <= BigInt(Number.MAX_SAFE_INTEGER)) {
			return BigInt(Math.floor(Math.random() * Number(b)));
		} else {
			const p = isqrt(b);
			return rand(p) * rand(p);
		}
	}

	function randRange(a, b) {
		return rand(b - a) + a;
	}

	function asc(a, b) {
		return a < b ? -1 : a > b ? 1 : 0;
	}

	function abs(n) {
		return n < 0n ? -n : n;
	}

	function remove(n, a) {
		let k = 0n;
		while (n % a == 0n) {
			n = n / a;
			k = k + 1n;
		}
		return [n, k];
	}

	function millerRabinTest(n, cycles = 10) {
		if (n < 2n || n % 2n == 0n || n % 3n == 0) {
			return n == 2n || n == 3n;
		} else if (n == 3215031751n /* pseudo prime */) {
			return false;
		} else {
			const bases = [];
			if (n < 25000000000n /* easy threshold */) {
				bases.push(...[2n, 3n, 5n, 7n].filter(a => a < n));
			} else {
				for (let i = 0; i < cycles; i++) {
					bases.push(randRange(2n, n));
				}
			}
			let r = 0n, d = n - 1n;
			while (d % 2n == 0n) {
				d /= 2n;
				r += 1n;
			}
			for (let a of bases) {
				let x = powMod(a, d, n);
				if (x == 1n || x + 1n == n) {
					continue;
				} else {
					let m = r - 1n, o = false;
					while (m >= 1n) {
						m -= 1n;
						x = powMod(x, 2n, n);
						if (x + 1n == n) {
							o = true;
							break;
						}
					}
					if (!o) return false;
				}
			}
			return true;
		}
	}

	function isPrime(n) {
		return millerRabinTest(n);
	}

	function nextPrime(n) {
		if (n < 2n) return 2n;
		if (n == 2n) return 3n;
		do {
			n += 2n;
		} while (!isPrime(n));
		return n;
	}

	function jacobi(a, n) {
		a %= n;
		let res = 1n;
		while (a != 0n) {
			while (a % 2n == 0n) {
				a /= 2n;
				let n8 = n % 8n;
				if (n8 == 3n || n8 == 5n) {
					res = -res;
				}
			}
			[a, n] = [n, a];
			if (a % 4n == 3n && n % 4n == 3n) {
				res = -res;
			}
			a %= n;
		}
		return n == 1n ? res : 0n;
	}

	function primeAsSumOfTwoSquares(p) {
		if (p % 4n != 1n || !isPrime(p)) {
			return;
		}
		let b = 7n;
		if (p % 8n == 5n) {
			// Legendre symbol (2/p) == -1 if p % 8 in [3, 5]
			b = 2n;
		} else if (p % 12n == 5n) {
			// Legendre symbol (3/p) == -1 if p % 12 in [5, 7]
			b = 3n;
		} else if (p % 5n == 2n || p % 5n == 3n) {
			// Legendre symbol (5/p) == -1 if p % 5 in [2, 3]
			b = 5n;
		} else {
			while (jacobi(b, p) == 1n) {
				b = nextPrime(b);
			}
		}
		b = powMod(b, p >> 2n, p);
		let a = p;
		while (b ** 2n > p) {
			[a, b] = [b, a % b];
		}
		return [a % b, b];
	}

	function sumOfThreeSquares(n) {
		// https://math.stackexchange.com/questions/483101/rabin-and-shallit-algorithm/651425#651425
		// discusses these numbers (except for 1, 2, 3) as the exceptions of H&L's conjecture that
		// Every sufficiently large number n is either a square or the sum of a prime and a square.
		const special = {1: [0, 0, 1], 2: [0, 1, 1], 3: [1, 1, 1], 10: [0, 1, 3], 34: [3, 3, 4],
			58: [0, 3, 7], 85: [0, 6, 7], 130: [0, 3, 11], 214: [3, 6, 13], 226: [8, 9, 9],
			370: [8, 9, 15], 526: [6, 7, 21], 706: [15, 15, 16], 730: [0, 1, 27],
			1414: [6, 17, 33], 1906: [13, 21, 36], 2986: [21, 32, 39], 9634: [56, 57, 57]};
		if (n < 0n) {
			return;
		}
		if (n == 0n) {
			return [0n, 0n, 0n];
		}
		let v;
		[n, v] = remove(n, 4n);
		v = 1n << v;
		if (n % 8n == 7n) {
			return;
		} else if (Number(n) in special) {
			return special[Number(n)].map(i => BigInt(i) * v);
		}
		let s = isqrt(n);
		if (s ** 2n == n) {
			return [0n, 0n, v * s];
		}
		if (n % 8n == 3n) {
			if (s % 2n == 0n) {
				s -= 1n;
			}
			for (let x = s; x > -1n; x -= 2n) {
				let N = (n - x ** 2n) / 2n;
				if (isPrime(N)) {
					// n % 8 == 3 and x % 2 == 1 => N % 4 == 1
					let [y, z] = primeAsSumOfTwoSquares(N);
					return [v * x, v * (y + z), v * abs(y - z)].sort(asc);
				}
			}
		}
		// assert n % 4 in [1, 2]
		if (((n % 2n) ^ (s % 2n)) == 0n) {
			s -= 1n;
		}
		for (let x = s; x > -1n; x -= 2n) {
			let N = n - x ** 2n;
			if (isPrime(N)) {
				// assert N % 4 == 1
				let [y, z] = primeAsSumOfTwoSquares(N);
				return [v * x, v * y, v * z].sort(asc);
			}
		}
	}

	function sumOfFourSquares(n) {
		if (n < 0n) {
			return;
		} else if (n == 0n) {
			return [0n, 0n, 0n, 0n];
		}
		// remove factors of 4 since a solution in terms of 3 squares is
		// going to be returned; this is also done in sum_of_three_squares,
		// but it needs to be done here to select d
		let v, d;
		[n, v] = remove(n, 4n);
		v = 1n << v;
		if (n % 8n == 7n) {
			d = 2n;
			n = n - 4n;
		} else if (n % 8n == 2n || n % 8n == 6n) {
			d = 1n;
			n = n - 1n;
		} else {
			d = 0n;
		}
		let [x, y, z] = sumOfThreeSquares(n);
		return [v * d, v * x, v * y, v * z].sort(asc);
	}

	return sumOfFourSquares(n);
}