// Write a function that will solve a 9x9 Sudoku puzzle. The function will take one argument consisting of the 2D puzzle array, with the value 0 representing an unknown square.
//
// 	The Sudokus tested against your function will be "easy" (i.e. determinable; there will be no need to assume and test possibilities on unknowns) and can be solved with a brute-force approach.
//
// 	For Sudoku rules, see the Wikipedia article.
//
// 	var puzzle = [
// 	[5,3,0,0,7,0,0,0,0],
// 	[6,0,0,1,9,5,0,0,0],
// 	[0,9,8,0,0,0,0,6,0],
// 	[8,0,0,0,6,0,0,0,3],
// 	[4,0,0,8,0,3,0,0,1],
// 	[7,0,0,0,2,0,0,0,6],
// 	[0,6,0,0,0,0,2,8,0],
// 	[0,0,0,4,1,9,0,0,5],
// 	[0,0,0,0,8,0,0,7,9]];
//
// sudoku(puzzle);
// /* Should return
// [[5,3,4,6,7,8,9,1,2],
// [6,7,2,1,9,5,3,4,8],
// [1,9,8,3,4,2,5,6,7],
// [8,5,9,7,6,1,4,2,3],
// [4,2,6,8,5,3,7,9,1],
// [7,1,3,9,2,4,8,5,6],
// [9,6,1,5,3,7,2,8,4],
// [2,8,7,4,1,9,6,3,5],
// [3,4,5,2,8,6,1,7,9]]

function sudoku(puzzle) {
	function isValid(board, row, col, num) {
		for (let i = 0; i < 9; i++) {
			if (board[row][i] === num) return false;
			if (board[i][col] === num) return false;
			const boxRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
			const boxCol = 3 * Math.floor(col / 3) + (i % 3);
			if (board[boxRow][boxCol] === num) return false;
		}
		return true;
	}

	function solve(board) {
		for (let r = 0; r < 9; r++) {
			for (let c = 0; c < 9; c++) {
				if (board[r][c] === 0) {
					for (let n = 1; n <= 9; n++) {
						if (isValid(board, r, c, n)) {
							board[r][c] = n;
							if (solve(board)) return true;
							board[r][c] = 0;
						}
					}
					return false;
				}
			}
		}
		return true;
	}

	solve(puzzle);
	return puzzle;
}
