// Your task, is to create a NxN spiral with a given size.
//
// 	For example, spiral with size 5 should look like this:
//
// 00000
// ....0
// 000.0
// 0...0
// 00000
// and with the size 10:
//
// 0000000000
// .........0
// 00000000.0
// 0......0.0
// 0.0000.0.0
// 0.0..0.0.0
// 0.0....0.0
// 0.000000.0
// 0........0
// 0000000000
// Return value should contain array of arrays, of 0 and 1, with the first row being composed of 1s. For example for given size 5 result should be:
//
// 	[[1,1,1,1,1],[0,0,0,0,1],[1,1,1,0,1],[1,0,0,0,1],[1,1,1,1,1]]
// Because of the edge-cases for tiny spirals, the size will be at least 5.
//
// General rule-of-a-thumb is, that the snake made with '1' cannot touch to itself.


function spiralize(n) {
	const spiral = Array.from({ length: n }, () => Array(n).fill(0));
	const directions = [[0,1],[1,0],[0,-1],[-1,0]];
	let dir = 0;
	let r = 0;
	let c = 0;

	spiral[r][c] = 1;

	function isValid(nr, nc) {
		return nr >= 0 && nr < n && nc >= 0 && nc < n && spiral[nr][nc] === 0;
	}

	function willTouchSelf(nr, nc) {
		// Проверяем соседей, кроме клетки, с которой пришли
		const checks = [
			[nr - 1, nc],
			[nr + 1, nc],
			[nr, nc - 1],
			[nr, nc + 1]
		];
		let count = 0;
		for (const [x, y] of checks) {
			if (x >= 0 && x < n && y >= 0 && y < n) {
				if (spiral[x][y] === 1) count++;
			}
		}
		return count > 1;
	}

	while (true) {
		let dr = directions[dir][0];
		let dc = directions[dir][1];
		let nr = r + dr;
		let nc = c + dc;

		if (isValid(nr, nc) && !willTouchSelf(nr, nc)) {
			r = nr;
			c = nc;
			spiral[r][c] = 1;
		} else {
			dir = (dir + 1) % 4;
			dr = directions[dir][0];
			dc = directions[dir][1];
			nr = r + dr;
			nc = c + dc;

			if (isValid(nr, nc) && !willTouchSelf(nr, nc)) {
				r = nr;
				c = nc;
				spiral[r][c] = 1;
			} else {
				break;
			}
		}
	}

	return spiral;
}
