// A binary operation op is called associative if
//
// 	op(a, op(b, c)) = op(op(a, b), c)
//
// 	for example:
//
// (1 + 2) + 8 = 1 + (2 + 8)
// (A * B) * C = A * (B * C) where A, B, C are matrices with sizes N x M, M x K, K x L
//
// Task
// Inputs:
//
// 	arr - array of objects with type T and size n (1..100 000)
// op - associative operation (T, T) -> T
// ranges - array of boundaries represented as [start, end] and size m (1..100 000)
// For each range you need to find the result of applying op to all elements between the boundaries (start inclusive, end exclusive).
//
// for example:
//
// 	arr = [1, 0, 7, 8, 1]
// range = [1, 4]
// op = +
//
// 	result = 0 + 7 + 8 = 15
// Output:
//
// 	Array of results for the respective ranges.
// 	Notes
// The time complexity is expected to be O((n + m) * log n) * T(op) or better.
// 	Start always less than end.
// 	Start and end always in range from 0 to n.


function computeRanges(arr, op, ranges) {
	const n = arr.length
	const tree = Array(2 * n)

	// Строим дерево отрезков
	for (let i = 0; i < n; i++) tree[n + i] = arr[i]
	for (let i = n - 1; i > 0; i--) tree[i] = op(tree[2 * i], tree[2 * i + 1])

	const query = (l, r) => {
		let resLeft = null, resRight = null
		l += n
		r += n
		while (l < r) {
			if (l % 2) {
				resLeft = resLeft === null ? tree[l] : op(resLeft, tree[l])
				l++
			}
			if (r % 2) {
				r--
				resRight = resRight === null ? tree[r] : op(tree[r], resRight)
			}
			l >>= 1
			r >>= 1
		}
		if (resLeft === null) return resRight
		if (resRight === null) return resLeft
		return op(resLeft, resRight)
	}

	return ranges.map(([l, r]) => query(l, r))
}