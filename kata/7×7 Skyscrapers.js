// In a grid of 7 by 7 squares you want to place a skyscraper in each square with only some clues:
//
// 	The height of the skyscrapers is between 1 and 7
// No two skyscrapers in a row or column may have the same number of floors
// A clue is the number of skyscrapers that you can see in a row or column from the outside
// Higher skyscrapers block the view of lower skyscrapers located behind them
// Can you write a program that can solve this puzzle in time?
//
// 	This kata is based on 4 By 4 Skyscrapers and 6 By 6 Skyscrapers by FrankK. By now, examples should be superfluous; you should really solve Frank's kata first, and then probably optimise some more. A naive solution that solved a 4×4 puzzle within 12 seconds might need time somewhere beyond the Heat Death of the Universe for this size. It's quite bad.
//
// 	Task
// Create
//
// function solvePuzzle(clues)
// Clues are passed in as an Array(28) of integers.
// 	The return value is an Array(7) of Array(7) of integers.
//
// 	All puzzles have one possible solution.
// 	All this is the same as with the earlier kata.
//
// 	Caveat: The tests for this kata have been tailored to run in ~10 seconds with the JavaScript reference solution. You'll need to do better than that! Please note the performance tag.
//
// Conceptis Puzzles have heaps of these puzzles, from 4×4 up to 7×7 and unsolvable within CodeWars time constraints. Old puzzles from there were used for the tests. They also have lots of other logic, numbers and mathematical puzzles, and their puzzle user interface is generally nice, very nice.
//


const permute = (input) => {
	if (input.length === 1) return [input];

	let result = [];
	for (let i = 0; i < input.length; i++) {
		const current = input[i];
		const remaining = input.slice(0, i).concat(input.slice(i + 1));
		const permuted = permute(remaining);
		for (let j = 0; j < permuted.length; j += 1) {
			result.push([current].concat(permuted[j]));
		}
	}

	return result;
}

const getBackup = (assumptions) => {
	const backup = {};

	for (let i = 0; i < 7; i += 1) {
		const newAssumptions = [];

		for (let j = 0; j < assumptions[i].length; j += 1) {
			newAssumptions.push([...assumptions[i][j]]);
		}

		backup[i] = newAssumptions;
	}

	return backup;
}

const countVisible = (line) => {
	let max = 0;
	let visible = 0;

	for (let i = 0; i < line.length; i += 1) {
		if (line[i] > max) {
			visible += 1;
			max = line[i];
		}
	}

	return visible;
}

const isValidLine = (line, clue) => clue > 0 ? countVisible(line) === clue : true;

const classify = (lines, { colClues, rowClues }) => {
	const rowCandidates = {};
	const colCandidates = {};

	for (let i = 0; i < 7; i += 1) {
		const tempRow = [];
		const tempColumn = [];

		for (let j = 0; j < lines.length; j += 1) {
			const isValidRow = isValidLine(lines[j], rowClues[i][0]);
			const isValidColum = isValidLine(lines[j], colClues[i][0]);
			const isValidRowReversed = isValidLine([...lines[j]].reverse(), rowClues[i][1]);
			const isValidColumReversed = isValidLine([...lines[j]].reverse(), colClues[i][1]);

			if (isValidRow && isValidRowReversed) tempRow.push(lines[j]);
			if (isValidColum && isValidColumReversed) tempColumn.push(lines[j]);
		}

		rowCandidates[i] = tempRow;
		colCandidates[i] = tempColumn;
	}

	return { rows: rowCandidates, columns: colCandidates };
}

const findOverlaps = (rows, columns) => {
	for (let i = 0; i < 7; i += 1) {
		for (let j = 0; j < 7; j += 1) {
			const overlaps = [];

			for (let k = 0; k < rows[i].length; k += 1) {
				overlaps.push(rows[i][k][j]);
			}

			columns[j] = columns[j].filter(line => overlaps.includes(line[i]));
		}
	}
}

const forceRandomAssumption = (rows, columns) => {
	for (let i = 0; i < 7; i += 1) {
		if (rows[i].length > 1) {
			for (let j = 0; j < rows[i].length; j += 1) {
				const rowsBackup = getBackup(rows);
				const colsBackup = getBackup(columns);

				rows[i] = [rows[i][j]];
				while (Object.values(rows).some(row => row.length > 1)) {
					findOverlaps(rows, columns);
					findOverlaps(columns, rows);
				}

				if (Object.values(rows).every(row => row.length === 1)) return rows;

				rows = rowsBackup;
				columns = colsBackup;
			}
		}
	}
}

const solvePuzzle = cluesRaw => {
	const top = cluesRaw.slice(0, 7);
	const right = cluesRaw.slice(7, 14);
	const bottom = cluesRaw.slice(14, 21).reverse();
	const left = cluesRaw.slice(21, 28).reverse();

	const colClues = top.map((clue, i) => [clue, bottom[i]]);
	const rowClues = left.map((clue, i) => [clue, right[i]]);

	const allCombinations = permute([1, 2, 3, 4, 5, 6, 7]);

	let { rows, columns } = classify(allCombinations, { colClues, rowClues });

	let attempt = 0;
	while (Object.values(rows).some(row => row.length !== 1)) {
		if (attempt > 10) {
			rows = forceRandomAssumption(rows, columns);
			break;
		}
		findOverlaps(rows, columns);
		findOverlaps(columns, rows);
		attempt += 1;
	}

	return Object.values(rows).map(options => options[0]);
}