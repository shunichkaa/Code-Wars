// Given a 2D array and a number of generations, compute n timesteps of Conway's Game of Life.
// The rules of the game are:
// Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
// Any live cell with more than three live neighbours dies, as if by overcrowding.
// Any live cell with two or three live neighbours lives on to the next generation.
// Any dead cell with exactly three live neighbours becomes a live cell.
// Each cell's neighborhood is the 8 cells immediately around it (i.e. Moore Neighborhood).
// The universe is infinite in both the x and y dimensions and all cells are initially dead - except for those specified in the arguments.
// The return value should be a 2d array cropped around all of the living cells.
// (If there are no living cells, then return \[\[]].)
// For illustration purposes, 0 and 1 will be represented as ░░ and ▓▓ blocks respectively (PHP: plain black and white squares).
// You can take advantage of the htmlize function to get a text representation of the universe, e.g.:
// console.log(htmlize(cells));


function getGeneration(cells, generations) {
	let liveCells = new Set();

	for (let y = 0; y < cells.length; y++) {
		for (let x = 0; x < cells[y].length; x++) {
			if (cells[y][x] === 1) {
				liveCells.add(`${x},${y}`);
			}
		}
	}

	const neighbors = [
		[-1,-1], [0,-1], [1,-1],
		[-1, 0],         [1, 0],
		[-1, 1], [0, 1], [1, 1]
	];

	for (let gen = 0; gen < generations; gen++) {
		const counts = new Map();

		liveCells.forEach(cell => {
			const [x, y] = cell.split(',').map(Number);

			neighbors.forEach(([dx, dy]) => {
				const nx = x + dx;
				const ny = y + dy;
				const key = `${nx},${ny}`;
				counts.set(key, (counts.get(key) || 0) + 1);
			});
		});

		const newLiveCells = new Set();

		counts.forEach((count, cell) => {
			const isAlive = liveCells.has(cell);
			if ((isAlive && (count === 2 || count === 3)) || (!isAlive && count === 3)) {
				newLiveCells.add(cell);
			}
		});

		liveCells = newLiveCells;
	}

	if (liveCells.size === 0) return [[]];

	let xs = [], ys = [];
	liveCells.forEach(cell => {
		const [x, y] = cell.split(',').map(Number);
		xs.push(x);
		ys.push(y);
	});

	const minX = Math.min(...xs);
	const maxX = Math.max(...xs);
	const minY = Math.min(...ys);
	const maxY = Math.max(...ys);

	const result = [];
	for (let y = minY; y <= maxY; y++) {
		const row = [];
		for (let x = minX; x <= maxX; x++) {
			row.push(liveCells.has(`${x},${y}`) ? 1 : 0);
		}
		result.push(row);
	}

	return result;
}