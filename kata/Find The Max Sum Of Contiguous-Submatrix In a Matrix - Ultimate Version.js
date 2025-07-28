// Task
// You are given a 2D integer array matrix.
// Your task is to find the max sum value of the contiguous-submatrix in it.
// Example
// For matrix =
// 	[
// 		[1,2,3],
// 		[4,5,6],
// 		[7,8,9]
// 	]
// The output should be 45(the whole 3x3 array)
// For matrix =
// 	[
// 		[-1, -2, -3],
// 		[ 4,  5,  6],
// 		[-7, -8, -9]
// 	]
// The output should be 15(1x3 sub matrix).
// [
// 	[-1, -2, -3],
// 	+-------------+
// 	|[ 4,  5,  6],|
// +-------------+
// 	[-7, -8, -9]
// ]
// For matrix =
// 	[
// 		[-1,  -2, -3],
// 		[-4,   5, -6],
// 		[-7,  -8, -9]
// 	]
// The output should be 5(1x1 sub matrix).
// [
// 	[-1,  -2, -3],
// 	+---+
// 		[-4, | 5 |, -6],
// 	+---+
// 		[-7,  -8, -9]
// ]
// Note
// In the random tests:
// 30 testcases testing with 3 <= matrix.length <= 10.
// 70 testcases testing with matrix.length = 250.
// 	-127 <= matrix[i][j] <= 127
// If you feel this kata is too hard, please try the challenge version or simple version.
// If you feel this kata is too easy.. Hmm.. perhaps you can write a new kata and let me know ;-)
// Happy Coding ^_^


function maxSumOf(matrix) {
	let rows = matrix.length;
	let cols = matrix[0].length;
	if (rows > cols) {
		const transposed = Array.from({ length: cols }, () => new Array(rows));
		for (let i = 0; i < rows; i++)
			for (let j = 0; j < cols; j++) transposed[j][i] = matrix[i][j];
		matrix = transposed;
		[rows, cols] = [cols, rows];
	}

	let maxSum = -Infinity;
	const colSum = new Array(cols).fill(0);

	for (let top = 0; top < rows; top++) {
		colSum.fill(0);
		for (let bottom = top; bottom < rows; bottom++) {
			for (let c = 0; c < cols; c++) colSum[c] += matrix[bottom][c];

			let currentSum = 0;
			for (let c = 0; c < cols; c++) {
				currentSum += colSum[c];
				if (currentSum > maxSum) maxSum = currentSum;
				if (currentSum < 0) currentSum = 0;
			}
		}
	}
	return maxSum;
}