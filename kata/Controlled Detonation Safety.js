// Context
// The Explosive Ordinance Disposal Unit of your country has found a small mine field near your town, and is planning to perform a controlled detonation of all of the mines. They have tasked you to write an algorithm that helps them find all safe spots in the area, as they want to build a temporal base in the area where all workers can rest safely.
//
// 	All mines they found are of a special kind, as they only release explosive charge in four straight lines, each pointing at a different cardinal point (north, south, east and west). However, the charge stops spreading when it crosses a tree in its path because the charge is not strong enough to burn them.
//
// 	In the following diagram, M represents a mine, C represents the explosive charge released after its detonation, and T are the trees in the area:
//
// 	. . . . . . .    . . . . . . .
// . . . T . . .    . . . T . . .
// 	. . . . . . .    . . . C . . .
// 	. . T M . . . => . . T M C C C
// 	. . . . . . .    . . . C . . .
// 	. . . . . . .    . . . C . . .
// 	. . . T . . .    . . . T . . .
// 	Task
// Write an algorithm that, given a mine field represented as an array of arrays of size M * N, returns an array of all safe positions where workers can build their temporal base. As in the previous model, 'M' represents mines, 'T' represents trees, and '.' represents empty spaces where explosive charge can spread. The positions in the array should be in "reading order" (from left to right, and from up to down).
//
// For example:
//
// 	[
// 		['.', '.', '.', '.', 'M'],                      . . . . M                           C C C C M
// 	['.', 'M', '.', 'T', '.'],                      . M . T .                           C M C T C
// 	['.', '.', 'T', '.', '.'],   ==[represents]=>   . . T . .   ==[after explosion]=>   . C T . C
// 	['.', '.', 'M', '.', 'T'],                      . . M . T                           C C M C T
// 	['.', '.', '.', '.', '.']                       . . . . .                           . C C . .
// ]
// This should return one of the two following arrays, depending on the language. Check sample test cases for more information. Also, trees don't count as safe positions.
//
// 	[(2,0), (2,3), (4,0), (4,3), (4,4)] //For Python
// 	[[2,0], [2,3], [4,0], [4,3], [4,4]] //For JS and other languages
// Return an empty array if there are no safe positions.
//
// 	Note
// Mines will not stop explosive charge from spreading as trees do, and explosive charge won't erase mines it finds in its path. Make sure you never override any mines in the field.


function safe_mine_field(mine_field) {
	if (!Array.isArray(mine_field) || mine_field.length === 0 || !Array.isArray(mine_field[0])) {
		return [];
	}

	const rows = mine_field.length;
	const cols = mine_field[0].length;
	const grid = mine_field.map(row => [...row]);
	const dirs = [
		[-1, 0],
		[1, 0],
		[0, -1],
		[0, 1]
	];

	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			if (grid[r][c] === 'M') {
				for (let [dr, dc] of dirs) {
					let nr = r + dr;
					let nc = c + dc;
					while (
						nr >= 0 && nr < rows &&
						nc >= 0 && nc < cols &&
						grid[nr][nc] !== 'T'
						) {
						if (grid[nr][nc] === '.') {
							grid[nr][nc] = 'C';
						}
						nr += dr;
						nc += dc;
					}
				}
			}
		}
	}

	const result = [];
	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			if (grid[r][c] === '.') {
				result.push([r, c]);
			}
		}
	}

	return result;
}