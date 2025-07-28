// Introduction
// The goal of this kata is to check whether a network of water pipes is leaking anywhere.
// Task
// Create a function which accepts a map input and validates if water is leaking anywhere.
// In case water is leaking return false.
// In case the pipe network is correct -- i.e. there are no leaks anywhere -- return true.
// There can be multiple water sources.
// All pipes which are directed outside of the map are connected to a water source, and you need to check them for leaks.
// For example, in the map below:
// 	╋━━┓
//      ┃..┃
//      ┛..┣
// The water sources (marked with +) are:
// 	+
// 		+ ╋━━┓
//      ┃..┃
//    + ┛..┣ +
// 	+
// This map shows a correct pipe network. It's not leaking anywhere.
// A leaking pipeline example:
// The leak is marked by the arrow pointing to the top left-hand corner of the map:
// 	--> ...┏ +
//      ┃..┃
//    + ┛..┣ +
// 	+
// A leak may involve a pipe pointing to an empty cell in the map, like this: ━━..
// It may also involve a pipe pointing to another pipe that does not point back, like this: ━━┗
// There can be also 'old pipes` on the map which are not connected to water sources.
// You should ignore such pipes.
// ....
// .┛┛.
// ....
// There are two old pipes not connected to a water source.
// Water is not leaking, so the function should return true.
// Leaking.png
// Notes
// Check the test cases for more samples
// Unicode UTF-8 characters used for pipes:
// ┗ - 9495 - BOX DRAWINGS HEAVY UP AND RIGHT
// ┓ - 9491 - BOX DRAWINGS HEAVY DOWN AND LEFT
// ┏ - 9487 - BOX DRAWINGS HEAVY DOWN AND RIGHT
// ┛ - 9499 - BOX DRAWINGS HEAVY UP AND LEFT
// ━ - 9473 - BOX DRAWINGS HEAVY HORIZONTAL
// ┃ - 9475 - BOX DRAWINGS HEAVY VERTICAL
// ┣ - 9507 - BOX DRAWINGS HEAVY VERTICAL AND RIGHT
// ┫ - 9515 - BOX DRAWINGS HEAVY VERTICAL AND LEFT
// ┳ - 9523 - BOX DRAWINGS HEAVY DOWN AND HORIZONTAL
// ┻ - 9531 - BOX DRAWINGS HEAVY UP AND HORIZONTAL
// ╋ - 9547 - BOX DRAWINGS HEAVY VERTICAL AND HORIZONTAL


function checkPipe(map) {
	const rows = map.length;
	const cols = map[0].length;

	const pipes = {
		'┗': ['up', 'right'],
		'┓': ['down', 'left'],
		'┏': ['down', 'right'],
		'┛': ['up', 'left'],
		'━': ['left', 'right'],
		'┃': ['up', 'down'],
		'┣': ['up', 'right', 'down'],
		'┫': ['up', 'left', 'down'],
		'┳': ['left', 'right', 'down'],
		'┻': ['left', 'right', 'up'],
		'╋': ['up', 'down', 'left', 'right']
	};

	const directions = {
		up: [-1, 0],
		down: [1, 0],
		left: [0, -1],
		right: [0, 1]
	};

	const opposite = {
		up: 'down',
		down: 'up',
		left: 'right',
		right: 'left'
	};

	function inBounds(r, c) {
		return r >= 0 && r < rows && c >= 0 && c < cols;
	}

	const visited = Array.from({ length: rows }, () => Array(cols).fill(false));

	function canGoOutside(r, c, dir) {
		const [dr, dc] = directions[dir];
		const nr = r + dr;
		const nc = c + dc;
		return !inBounds(nr, nc);
	}

	function dfs(r, c) {
		visited[r][c] = true;
		const pipe = map[r][c];
		const outs = pipes[pipe];
		if (!outs) return true;

		for (const dir of outs) {
			const [dr, dc] = directions[dir];
			const nr = r + dr;
			const nc = c + dc;

			if (!inBounds(nr, nc)) continue;

			const nextPipe = map[nr][nc];
			if (!pipes[nextPipe]) return false;

			if (!pipes[nextPipe].includes(opposite[dir])) return false;

			if (!visited[nr][nc]) {
				if (!dfs(nr, nc)) return false;
			}
		}
		return true;
	}

	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			if (pipes[map[r][c]]) {
				const pipeDirs = pipes[map[r][c]];
				const onBorder = r === 0 || r === rows - 1 || c === 0 || c === cols - 1;
				if (onBorder) {
					const source = pipeDirs.some(dir => canGoOutside(r, c, dir));
					if (source && !visited[r][c]) {
						if (!dfs(r, c)) return false;
					}
				}
			}
		}
	}
	return true;
}