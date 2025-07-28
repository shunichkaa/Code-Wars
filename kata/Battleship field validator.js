// Write a method that takes a field for well-known board game "Battleship" as an argument
// and returns true if it has a valid disposition of ships, false otherwise.
// Argument is guaranteed to be 10*10 two-dimension array.
// Elements in the array are numbers, 0 if the cell is free and 1 if occupied by ship.
// Battleship (also Battleships or Sea Battle) is a guessing game for two players.
// Each player has a 10x10 grid containing several "ships" and objective is to destroy enemy's forces by targetting individual cells on his field.
// The ship occupies one or more cells in the grid.
// Size and number of ships may differ from version to version. In this kata we will use Soviet/Russian version of the game.
// Before the game begins, players set up the board and place the ships accordingly to the following rules:
// There must be single battleship (size of 4 cells), 2 cruisers (size 3), 3 destroyers (size 2) and 4 submarines (size 1).
// Any additional ships are not allowed, as well as missing ships.
// Each ship must be a straight line, except for submarines, which are just single cell.
// The ship cannot overlap or be in contact with any other ship, neither by edge nor by corner.
// This is all you need to solve this kata.
// If you're interested in more information about the game, visit this link.


function validateBattlefield(field) {
	const N = 10;
	const shipsCount = {4:0, 3:0, 2:0, 1:0};
	const visited = Array.from({length: N}, () => Array(N).fill(false));

	function isValidCoord(r, c) {
		return r >= 0 && r < N && c >= 0 && c < N;
	}

	function getNeighbors(r, c) {
		const neighbors = [];
		for(let dr = -1; dr <= 1; dr++) {
			for(let dc = -1; dc <= 1; dc++) {
				if(dr === 0 && dc === 0) continue;
				let nr = r + dr;
				let nc = c + dc;
				if(isValidCoord(nr, nc)) neighbors.push([nr, nc]);
			}
		}
		return neighbors;
	}

	function checkNoTouch(shipCells) {
		for (const [r, c] of shipCells) {
			const neighbors = getNeighbors(r, c);
			for (const [nr, nc] of neighbors) {
				if (field[nr][nc] === 1 && !shipCells.some(([sr, sc]) => sr === nr && sc === nc)) {
					return false;
				}
			}
		}
		return true;
	}

	function findShip(r, c) {
		const cells = [[r, c]];
		visited[r][c] = true;

		// определим направление корабля
		let horizontal = (c + 1 < N && field[r][c + 1] === 1);
		let vertical = (r + 1 < N && field[r + 1][c] === 1);
		if (horizontal && vertical) return null; // неправильная форма корабля

		if (horizontal) {
			let nc = c + 1;
			while (nc < N && field[r][nc] === 1 && !visited[r][nc]) {
				visited[r][nc] = true;
				cells.push([r, nc]);
				nc++;
			}
		} else if (vertical) {
			let nr = r + 1;
			while (nr < N && field[nr][c] === 1 && !visited[nr][c]) {
				visited[nr][c] = true;
				cells.push([nr, c]);
				nr++;
			}
		}
		return cells;
	}

	for (let r = 0; r < N; r++) {
		for (let c = 0; c < N; c++) {
			if (field[r][c] === 1 && !visited[r][c]) {
				const ship = findShip(r, c);
				if (!ship) return false;
				if (!checkNoTouch(ship)) return false;

				shipsCount[ship.length] = (shipsCount[ship.length] || 0) + 1;
			}
		}
	}

	return shipsCount[4] === 1 &&
		shipsCount[3] === 2 &&
		shipsCount[2] === 3 &&
		shipsCount[1] === 4;
}