// Task
// A domino is a rectangular block with 2 units wide and 1 unit high.
// A domino can be placed on a grid in two ways: horizontal or vertical.
// ## or #
// #
// You have infinitely many dominoes, and you want to fill a board that is N units wide and M units high, but with random holes:
// 	<---   N   --->
// ###########..## ^
// ###.########### |
// ########.###### M
// #.#########..## |
// #####..####.### v
// The task is to find the maximum number of dominoes you can fit on the given grid.
// The input is given as a rectangular 2D array with boolean values.
// For Example, if the given grid looks like follows (# is a grid cell, . is a hole):
// #..
// ##.
// ###
// Then the input to the function will be:
// grid = [
// 		[true, false, false],
// 		[true, true,  false],
// 		[true, true,  true ]]
// And the result should be 2, since you can only fit 2 dominoes on this grid, despite the area being 6.
// Watch out for corner cases.
// Examples
// input = format(`###
//                 ###
//                 ###`)
// maxDominoTiling(input) == 4
// input = format(`#..
//                 ##.
//                 ###`)
// maxDominoTiling(input) == 2
// input = format(`###.
//                 ####
//                 ####
//                 .###`)
// maxDominoTiling(input) == 6
// Constraints
// 1 <= M, N <= 100
// grid is a rectangular 2D array.
// 	grid[i][j] == true or false
// All inputs are valid.
// The grid may have multiple connected components.


function maxDominoTiling(grid) {
	const M = grid.length;
	const N = grid[0].length;
	const dx = [1, 0];
	const dy = [0, 1];

	const color = Array.from({ length: M }, () => Array(N).fill(-1));
	let leftNodes = [];
	let idx = 0;

	for (let i = 0; i < M; i++) {
		for (let j = 0; j < N; j++) {
			if (grid[i][j]) color[i][j] = (i + j) % 2;
		}
	}

	const graph = {};
	for (let i = 0; i < M; i++) {
		for (let j = 0; j < N; j++) {
			if (color[i][j] !== 0) continue;
			const u = i * N + j;
			graph[u] = [];
			for (let d = 0; d < 2; d++) {
				let ni = i + dy[d];
				let nj = j + dx[d];
				if (ni < M && nj < N && color[ni][nj] === 1) {
					const v = ni * N + nj;
					graph[u].push(v);
				}
				ni = i - dy[d];
				nj = j - dx[d];
				if (ni >= 0 && nj >= 0 && color[ni][nj] === 1) {
					const v = ni * N + nj;
					graph[u].push(v);
				}
			}
		}
	}

	const matchR = {};
	function bpm(u, seen) {
		for (let v of graph[u] || []) {
			if (seen.has(v)) continue;
			seen.add(v);
			if (matchR[v] === undefined || bpm(matchR[v], seen)) {
				matchR[v] = u;
				return true;
			}
		}
		return false;
	}

	let result = 0;
	for (let u in graph) {
		if (bpm(+u, new Set())) result++;
	}
	return result;
}