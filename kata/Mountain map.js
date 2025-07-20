// Task
// You are given a matrix of numbers. In a mountain matrix the absolute difference between two adjecent (orthogonally or diagonally) numbers is not greater than 1. One change consists of increasing a number of the matrix by 1. Your task is to return the mountain matrix that is obtained from the original with the least amount of changes.
//
// 	Examples
// to_mountain([[2, 2, 1, 2],
// 	[1, 0, 2, 1],
// 	[1, 0, 1, 2],
// 	[1, 2, 2, 1]])
// # returns: [[2, 2, 1, 2],
// #           [1, 1, 2, 1],
// #           [1, 1, 1, 2],
// #           [1, 2, 2, 1]]
//
// to_mountain([[2, 2, 1, 2],
// 	[1, 0, 2, 1],
// 	[1, 0, 1, 2],
// 	[1, 2, 2, 4]])
// # returns: [[2, 2, 1, 2],
// #           [1, 2, 2, 2],
// #           [1, 2, 3, 3],
// #           [1, 2, 3, 4]]
// Constraints
// 0 < len(matrix) <= 100
// 0 < len(matrix[0]) <= 100
// 0 <= n <= 1e9 and n is a integer for each number n in the matrix
// Tests
// 8 fixed tests and 126 random tests
//


function toMountain(mat) {
	const m = mat.length;
	const n = mat[0].length;
	const res = mat.map(row => row.slice());

	const directions = [
		[-1, -1], [-1, 0], [-1, 1],
		[0, -1],           [0, 1],
		[1, -1],  [1, 0],  [1, 1]
	];

	let changed = true;
	while (changed) {
		changed = false;
		for (let i = 0; i < m; i++) {
			for (let j = 0; j < n; j++) {
				let maxNeighbor = -Infinity;
				for (const [dx, dy] of directions) {
					const x = i + dx;
					const y = j + dy;
					if (x >= 0 && x < m && y >= 0 && y < n) {
						maxNeighbor = Math.max(maxNeighbor, res[x][y]);
					}
				}
				if (maxNeighbor !== -Infinity && res[i][j] < maxNeighbor - 1) {
					res[i][j] = maxNeighbor - 1;
					changed = true;
				}
			}
		}
	}

	return res;
}