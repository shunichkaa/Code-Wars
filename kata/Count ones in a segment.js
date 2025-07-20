// Given two numbers: 'left' and 'right' (1 <= 'left' <= 'right' <= 200000000000000) return sum of all '1' occurencies in binary representations of numbers between 'left' and 'right' (including both)
//
// Example:
// 	countOnes 4 7 should return 8, because:
// 4(dec) = 100(bin), which adds 1 to the result.
// 5(dec) = 101(bin), which adds 2 to the result.
// 6(dec) = 110(bin), which adds 2 to the result.
// 7(dec) = 111(bin), which adds 3 to the result.
// 	So finally result equals 8.
// WARNING: Segment may contain billion elements, to pass this kata, your solution cannot iterate through all numbers in the segment!
//


function countOnesUpTo(n) {
	if (n < 0) return 0;
	n = BigInt(n);
	let count = 0n;
	for (let i = 0n; i < 60n; i++) {
		const blockSize = 1n << (i + 1n);
		const fullBlocks = (n + 1n) / blockSize;
		const remainder = (n + 1n) % blockSize;
		const halfBlock = blockSize >> 1n;
		const onesInFullBlocks = fullBlocks * halfBlock;
		const onesInRemainder = remainder > halfBlock ? remainder - halfBlock : 0n;
		count += onesInFullBlocks + onesInRemainder;
	}
	return Number(count);
}

function countOnes(left, right) {
	return countOnesUpTo(right) - countOnesUpTo(left - 1);
}