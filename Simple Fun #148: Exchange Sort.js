// Task
// Sorting is one of the most basic computational devices used in Computer Science.
//
// 	Given a sequence (length ≤ 1000) of 3 different key values (7, 8, 9), your task is to find the minimum number of exchange operations necessary to make the sequence sorted.
//
// 	One operation is the switching of 2 key values in the sequence.
//
// 	Example
// For sequence = [7, 7, 8, 8, 9, 9], the result should be 0.
//
// It's already a sorted sequence.
//
// For sequence = [9, 7, 8, 8, 9, 7], the result should be 1.
//
// We can switching sequence[0] and sequence[5].
//
// 	For sequence = [8, 8, 7, 9, 9, 9, 8, 9, 7], the result should be 4.
//
// We can:
//
// 	[8, 8, 7, 9, 9, 9, 8, 9, 7]
// switching sequence[0] and sequence[3]
// --> [9, 8, 7, 8, 9, 9, 8, 9, 7]
// switching sequence[0] and sequence[8]
// --> [7, 8, 7, 8, 9, 9, 8, 9, 9]
// switching sequence[1] and sequence[2]
// --> [7, 7, 8, 8, 9, 9, 8, 9, 9]
// switching sequence[5] and sequence[7]
// --> [7, 7, 8, 8, 8, 9, 9, 9, 9]
// So 4 is the minimum number of operations for the sequence to become sorted.
//
// 	Input/Output
// 	[input] integer array sequence
// The Sequence.
//
// 	[output] an integer
// the minimum number of operations.


function exchangeSort(sequence) {
	const n = sequence.length;

	const count7 = sequence.filter(x => x === 7).length;
	const count8 = sequence.filter(x => x === 8).length;
	const count9 = n - count7 - count8;

	const seg7 = sequence.slice(0, count7);
	const seg8 = sequence.slice(count7, count7 + count8);
	const seg9 = sequence.slice(count7 + count8);

	function countInSegment(seg) {
		let c7 = 0, c8 = 0, c9 = 0;
		for (const val of seg) {
			if (val === 7) c7++;
			else if (val === 8) c8++;
			else c9++;
		}
		return [c7, c8, c9];
	}

	const [a, b, c] = countInSegment(seg7);
	const [d, e, f] = countInSegment(seg8);
	const [g, h, i] = countInSegment(seg9);

	const exchange_7_8 = Math.min(b, d);
	const exchange_7_9 = Math.min(c, g);
	const exchange_8_9 = Math.min(f, h);

	const b2 = b - exchange_7_8;
	const d2 = d - exchange_7_8;

	const c2 = c - exchange_7_9;
	const g2 = g - exchange_7_9;

	const f2 = f - exchange_8_9;
	const h2 = h - exchange_8_9;

	const leftover = b2 + d2 + c2 + g2 + f2 + h2;

	return exchange_7_8 + exchange_7_9 + exchange_8_9 + 2 * (leftover / 3);
}