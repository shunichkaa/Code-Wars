// A Knight's Tour
// A knight's tour is a sequence of moves of a knight on a chessboard such that the knight visits every square only once.
// https://en.wikipedia.org/wiki/Knight%27s_tour
// Traditional chess boards are 8x8 grids, but for this kata we are interested in generating tours for any square board sizes.
// You will be asked to find a knight's path for any NxN board from any start position.
// I have provided a tool to visualize the output of your code at the following link: http://jsfiddle.net/7sbyya59/2/
// EDIT: The expected output is a 2D array (n x 2) comprised of the [x,y] coordinates of the Knight's path taken in sequential order. (e.g. [[2,3],[4,4],...,[x,y]])
// All test cases will have a passing solution.
// -dg


function knights_tour(start, size) {
	const moves = [
		[2, 1], [1, 2], [-1, 2], [-2, 1],
		[-2, -1], [-1, -2], [1, -2], [2, -1]
	];

	const board = Array.from({ length: size }, () => Array(size).fill(false));
	const path = [];

	function isValid(x, y) {
		return x >= 0 && y >= 0 && x < size && y < size && !board[x][y];
	}

	// Счётчик доступных ходов из позиции (x,y)
	function countNextMoves(x, y) {
		return moves.reduce((count, [dx, dy]) => {
			const nx = x + dx;
			const ny = y + dy;
			return count + (isValid(nx, ny) ? 1 : 0);
		}, 0);
	}

	function dfs(x, y, step) {
		board[x][y] = true;
		path.push([x, y]);

		if (step === size * size) return true;

		// Генерируем варианты ходов и сортируем по эвристике Варнсдорфа
		const nextMoves = moves
		.map(([dx, dy]) => [x + dx, y + dy])
		.filter(([nx, ny]) => isValid(nx, ny))
		.sort((a, b) => countNextMoves(a[0], a[1]) - countNextMoves(b[0], b[1]));

		for (const [nx, ny] of nextMoves) {
			if (dfs(nx, ny, step + 1)) return true;
		}

		// Откат, если не удалось найти путь дальше
		board[x][y] = false;
		path.pop();
		return false;
	}

	dfs(start[0], start[1], 1);
	return path;
}