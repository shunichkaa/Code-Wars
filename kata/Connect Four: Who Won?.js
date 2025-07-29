// Connect Four is a game in which two players take turns dropping red or yellow colored discs into a vertically suspended 7 x 6 grid.
// Discs fall to the bottom of the grid, occupying the next available space.
// 	A player wins by connecting four of their discs horizontally, vertically or diagonally.
// 	Given a multidimensional array representing a Connect Four board, your task is to create a function which can determine who won the game.
// 	Your connectFour function will be passed an array matrix similar to this:
// [['-','-','-','-','-','-','-'],
// 	['-','-','-','-','-','-','-'],
// 	['-','-','-','R','R','R','R'],
// 	['-','-','-','Y','Y','R','Y'],
// 	['-','-','-','Y','R','Y','Y'],
// 	['-','-','Y','Y','R','R','R']];
// 'R' represents a red disc
// 'Y' represents a yellow disc
// '-' represents an unoccupied space
// In this example the red player won by making a horizontal line of 4 red discs.
// 	If the red player won, your connectFour function should return 'R'. If the yellow player won, it should return 'Y'.
// 	If the board is full and no one won it should return 'draw'. If the game is still in progress it should return 'in progress'.


function connectFour(board) {
	const rows = board.length;
	const cols = board[0].length;
	const directions = [
		[0, 1],  // горизонталь вправо
		[1, 0],  // вертикаль вниз
		[1, 1],  // диагональ вниз-вправо
		[1, -1]  // диагональ вниз-влево
	];

	function checkWin(r, c) {
		const player = board[r][c];
		if (player === '-') return null;

		for (const [dr, dc] of directions) {
			let count = 1;
			for (let step = 1; step < 4; step++) {
				const nr = r + dr * step;
				const nc = c + dc * step;
				if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) break;
				if (board[nr][nc] !== player) break;
				count++;
			}
			if (count === 4) return player;
		}
		return null;
	}

	let hasEmpty = false;

	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			if (board[r][c] === '-') {
				hasEmpty = true;
				continue;
			}
			const winner = checkWin(r, c);
			if (winner) return winner;
		}
	}

	return hasEmpty ? 'in progress' : 'draw';
}