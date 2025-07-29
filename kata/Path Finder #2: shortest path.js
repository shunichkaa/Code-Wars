// Task
// You are at position [0, 0] in maze NxN and you can only move in one of the four cardinal directions (i.e. North, East, South, West).
// Return the minimal number of steps to exit position [N-1, N-1] if it is possible to reach the exit from the starting position.
// Otherwise, return false.
// Empty positions are marked ..
// Walls are marked W. Start and exit positions are guaranteed to be empty in all test cases.


function pathFinder(maze) {
	const grid = maze.split('\n').map(row => row.split(''));
	const N = grid.length;
	const visited = Array.from({ length: N }, () => Array(N).fill(false));
	const queue = [[0, 0, 0]]; // [row, col, steps]
	const dirs = [
		[0, 1],  // East
		[1, 0],  // South
		[0, -1], // West
		[-1, 0]  // North
	];

	while (queue.length) {
		const [x, y, steps] = queue.shift();

		if (x === N - 1 && y === N - 1) return steps;
		if (visited[x][y]) continue;
		visited[x][y] = true;

		for (const [dx, dy] of dirs) {
			const nx = x + dx;
			const ny = y + dy;

			if (
				nx >= 0 && nx < N &&
				ny >= 0 && ny < N &&
				!visited[nx][ny] &&
				grid[nx][ny] === '.'
			) {
				queue.push([nx, ny, steps + 1]);
			}
		}
	}

	return false;
}