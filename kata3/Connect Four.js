// Connect Four
// Take a look at wiki description of Connect Four game:
//
// 	Wiki Connect Four
//
// The grid is 6 row by 7 columns, those being named from A to G.
//
// 	You will receive a list of strings showing the order of the pieces which dropped in columns:
//
// piecesPositionList = ["A_Red",
// 	"B_Yellow",
// 	"A_Red",
// 	"B_Yellow",
// 	"A_Red",
// 	"B_Yellow",
// 	"G_Red",
// 	"B_Yellow"]
// The list may contain up to 42 moves and shows the order the players are playing.
//
// 	The first player who connects four items of the same color is the winner.
//
// 	You should return "Yellow", "Red" or "Draw" accordingly.


function whoIsWinner(piecesPositionList){
	const rows = 6, cols = 7;
	const board = Array.from({length: rows}, () => Array(cols).fill(null));
	const colMap = { A:0, B:1, C:2, D:3, E:4, F:5, G:6 };

	for (const move of piecesPositionList) {
		const [colChar, color] = move.split('_');
		const col = colMap[colChar];

		let row;
		for (let r = rows - 1; r >= 0; r--) {
			if (!board[r][col]) {
				row = r;
				board[row][col] = color;
				break;
			}
		}

		if (checkWin(row, col, color)) return color;
	}

	return "Draw";

	function checkWin(r, c, color) {
		const directions = [
			[0,1], [1,0], [1,1], [1,-1]
		];

		for (const [dr, dc] of directions) {
			let count = 1;
			for (const dir of [1, -1]) {
				let nr = r + dr * dir;
				let nc = c + dc * dir;
				while (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc] === color) {
					count++;
					nr += dr * dir;
					nc += dc * dir;
				}
			}
			if (count >= 4) return true;
		}
		return false;
	}
}