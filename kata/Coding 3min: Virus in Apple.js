// This is the simple version of Shortest Code series. If you need some challenges, please try the challenge version
//
// Task
// Your apple has a virus, and the infection is spreading.
//
// 	The apple is a two-dimensional array, containing strings "V" (virus) and "A" (uninfected parts). For each hour, the infection spreads one space up, down, left and right.
//
// 	Input: 2D array apple and number n (n >= 0).
//
// 	Output: 2D array showing the apple after n hours.
// This is the simple version of Shortest Code series. If you need some challenges, please try the challenge version

// Task
// Your apple has a virus, and the infection is spreading.

// The apple is a two-dimensional array, containing strings "V" (virus) and "A" (uninfected parts). For each hour, the infection spreads one space up, down, left and right.

// Input: 2D array apple and number n (n >= 0).

// Output: 2D array showing the apple after n hours.
function sc(apple, n) {
	const rows = apple.length;
	const cols = apple[0].length;
	let infected = new Set();

	// Initialize infected positions
	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			if (apple[r][c] === 'V') infected.add(r + ',' + c);
		}
	}

	const directions = [[1,0],[-1,0],[0,1],[0,-1]];

	for (let hour = 0; hour < n; hour++) {
		let newInfected = new Set(infected);
		for (let pos of infected) {
			const [r, c] = pos.split(',').map(Number);
			for (let [dr, dc] of directions) {
				let nr = r + dr, nc = c + dc;
				if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && apple[nr][nc] === 'A') {
					newInfected.add(nr + ',' + nc);
				}
			}
		}
		infected = newInfected;
	}

	// Build result
	let result = apple.map(row => row.slice());
	for (let pos of infected) {
		const [r, c] = pos.split(',').map(Number);
		result[r][c] = 'V';
	}

	return result;
}