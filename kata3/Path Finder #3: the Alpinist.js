// Task
// You are at start location [0, 0] in mountain area of NxN and you can only move in one of the four cardinal directions (i.e. North, East, South, West). Return minimal number of climb rounds to target location [N-1, N-1]. Number of climb rounds between adjacent locations is defined as difference of location altitudes (ascending or descending).
//
// Location altitude is defined as an integer number (0-9).
//


function pathFinder(area) {
	const grid = area.split('\n').map(row => row.split('').map(Number));
	const N = grid.length;
	if (N === 0) return 0;

	const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
	const costs = Array.from({ length: N }, () => Array(N).fill(Infinity));
	costs[0][0] = 0;

	const priorityQueue = [[0, 0, 0]]; // [cost, x, y]

	while (priorityQueue.length > 0) {
		priorityQueue.sort((a, b) => a[0] - b[0]); // Sort to simulate a priority queue
		const [currentCost, x, y] = priorityQueue.shift();

		if (x === N - 1 && y === N - 1) {
			return currentCost;
		}

		for (const [dx, dy] of directions) {
			const nx = x + dx;
			const ny = y + dy;

			if (nx >= 0 && nx < N && ny >= 0 && ny < N) {
				const newCost = currentCost + Math.abs(grid[x][y] - grid[nx][ny]);
				if (newCost < costs[nx][ny]) {
					costs[nx][ny] = newCost;
					priorityQueue.push([newCost, nx, ny]);
				}
			}
		}
	}

	return costs[N - 1][N - 1];
}