// Task:
// You are given a 2D string array, 10 rows and 10 columns, find out the longest string chain.
// A chain is defined as:
// All the characters in the chain are the same and they are the neighborhood of each others.
// The neighborhood means the Von Neumann neighborhood (up, down, left and right).
// What's the string chain?
// In order to facilitate the observation and description of the problem
// I used a 5x5 array for example:
// a a a d d
// b b a c c
// b b a c c
// b b a a a
// b b b b b
// In this array, have 4 string chains, chain 1-4 like this:
// 1 1 1 2 2
// 4 4 1 3 3
// 4 4 1 3 3
// 4 4 1 1 1
// 4 4 4 4 4
// So the longest string chain is 4th chain, it has 11 elements
// We should return the coordinate of this string chain, follow the order from left to right, from top to bottom.
// result is a 2D array:
// [[1,0],[1,1],[2,0],[2,1],[3,0],[3,1],[4,0],[4,1],[4,2],[4,3],[4,4]]
// See test cases for more examples.
// Other instructions
// 1. In order to make the kata more simple, the array contains only 4 letters(abcd).
// 2. If there is more than one chains have same length, return the first one(follow the order from left to right, from top to bottom.)
// 3 . As a good programmer, you should not modify the original array.


function findChain(arr) {
	const rows = arr.length;
	const cols = arr[0].length;
	const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
	const directions = [[1,0],[-1,0],[0,1],[0,-1]];

	let longestChain = [];
	let longestLength = 0;

	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			if (!visited[i][j]) {
				const char = arr[i][j];
				const stack = [[i,j]];
				const chain = [];
				visited[i][j] = true;

				while (stack.length) {
					const [x,y] = stack.pop();
					chain.push([x,y]);

					for (const [dx, dy] of directions) {
						const nx = x + dx, ny = y + dy;
						if (
							nx >= 0 && nx < rows && ny >= 0 && ny < cols &&
							!visited[nx][ny] && arr[nx][ny] === char
						) {
							visited[nx][ny] = true;
							stack.push([nx, ny]);
						}
					}
				}

				if (chain.length > longestLength) {
					longestLength = chain.length;
					longestChain = chain;
				}
			}
		}
	}

	longestChain.sort((a, b) => a[0] - b[0] || a[1] - b[1]);

	return longestChain;
}