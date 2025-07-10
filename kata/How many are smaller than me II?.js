// This is a hard version of How many are smaller than me?. If you have troubles solving this one, have a look at the easier kata first.
//
// 	Write
//
// function smaller(arr)
// that given an array arr, you have to return the amount of numbers that are smaller than arr[i] to the right.
//
// 	For example:
//
// 	smaller([5, 4, 3, 2, 1]) === [4, 3, 2, 1, 0]
// smaller([1, 2, 0]) === [1, 1, 0]
// Note
// Your solution will be tested against inputs with up to 100_000 elements

function smaller(arr) {
	const n = arr.length;
	if (n === 0) return [];

	// Сжатие значений (coordinate compression)
	const sorted = Array.from(new Set(arr)).sort((a, b) => a - b);
	const ranks = new Map();
	for (let i = 0; i < sorted.length; i++) {
		ranks.set(sorted[i], i + 1);
	}

	// Fenwick Tree (BIT)
	class FenwickTree {
		constructor(size) {
			this.size = size;
			this.tree = new Array(size + 1).fill(0);
		}
		update(i, delta) {
			while (i <= this.size) {
				this.tree[i] += delta;
				i += i & (-i);
			}
		}
		query(i) {
			let sum = 0;
			while (i > 0) {
				sum += this.tree[i];
				i -= i & (-i);
			}
			return sum;
		}
	}

	const fenw = new FenwickTree(sorted.length);
	const result = new Array(n);

	for (let i = n - 1; i >= 0; i--) {
		const rank = ranks.get(arr[i]);
		result[i] = fenw.query(rank - 1);
		fenw.update(rank, 1);
	}

	return result;
}
