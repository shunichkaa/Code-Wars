// Description
// Given a Crossword puzzle:
//
// 	puzzle=
// 		w
// c???s
// 		? ?
// 			d ?
// 				c???s
// 					d
// 				And some words:
//
// 	words=["cross","sword","cross","word"]
// Please fill all words in the puzzle.
//
// 	w
// cross
// r w
// d o
// cross
// d
// Rule1: You can only fill words from left to right or from top to bottom. For example: "w??d" can be "word" or "wind" or "wood", but "draw"(from right to left is "ward")
//
// Rule2: If two or more words can be filled in different places, you should compare the cross-point coordinates, according to the order from top left to bottom right, and then fill the word in lexicographic order.
//
// 	For example:
//
// 	puzzle=
//
// 		h
// 			?   h??e
// 				?   ?
// 					e???t
//
// 						words=["have","hate","hot","elect"]
//
// 					The output should be:
// 	h
// a   hate
// v   o
// elect
// As you can see, hate and have can be exchange with each other, the result would still be valid. But according to the rule2, hate should be filled first, because its cross-point coordinates(character h, between word hate and hot) is on the top. the cross-point coordinates of have(character e, between word have and elect) is on the bottom.
//
// 	Rule3: If two similar words crossing at the same location, fill horizontally first, then vertically. For example:
//
// 	puzzle:
//
// 		f  m??e
// 	?  ?  ?
// 			?  ?  ?
// 				m??e  ?
// 						?
// 							?
// 							words = ["film","make","mine","more","eraser"]
//
// 							result should be
// 				f  make
// 			i  i  r
// 	l  n  a
// more  s
// e
// r
// If no rule2 and rule3 exist, we can get 6 solutions, because these are three similar words: make,mine and more, so we need rule2 and rule3 at this moment ;-)
//
// First fill in make on the top horizontally, then fill in mine vertically, then fill in more on the bottom.
//
// 	Of course,
//
// 	Task
// Complete function crossWord that accepts 2 arguments puzzle and words. Returns the result in as per the rules above. puzzle is given by a string, all rows are separated by "\n". words is a string array.
//
// 	Note:
//
// You can assume that there is at least one solution for each puzzle, and all the words should be used.
//
// 	The maximum possible dimension of puzzle is 100 x 100.
//
// 3 <= words.length <= 20, the elements of words can be the same.
//
// 	The puzzle is always be a shape of rectangular. That is, there are some whitespaces at the end of some lines.

function crossWord(puzzle, words) {
	const grid = puzzle.split('\n').map(row => row.split(''));
	const height = grid.length;
	const width = Math.max(...grid.map(row => row.length));

	// Приведение всех строк к одинаковой длине (чтобы прямоугольник)
	grid.forEach(row => {
		while (row.length < width) row.push(' ');
	});

	const slots = [];

	function findSlots() {
		// Горизонтальные
		for (let r = 0; r < height; r++) {
			let c = 0;
			while (c < width) {
				while (c < width && grid[r][c] === ' ') c++;
				let start = c;
				while (c < width && grid[r][c] !== ' ') c++;
				if (c - start >= 2) {
					slots.push({ r, c: start, len: c - start, dir: 'H' });
				}
			}
		}

		// Вертикальные
		for (let c = 0; c < width; c++) {
			let r = 0;
			while (r < height) {
				while (r < height && grid[r][c] === ' ') r++;
				let start = r;
				while (r < height && grid[r][c] !== ' ') r++;
				if (r - start >= 2) {
					slots.push({ r: start, c, len: r - start, dir: 'V' });
				}
			}
		}
	}

	function canPlace(word, slot) {
		for (let i = 0; i < word.length; i++) {
			const [r, c] = slot.dir === 'H' ? [slot.r, slot.c + i] : [slot.r + i, slot.c];
			const ch = grid[r][c];
			if (ch !== '?' && ch !== word[i]) return false;
		}
		return true;
	}

	function placeWord(word, slot) {
		const backup = [];
		for (let i = 0; i < word.length; i++) {
			const [r, c] = slot.dir === 'H' ? [slot.r, slot.c + i] : [slot.r + i, slot.c];
			backup.push(grid[r][c]);
			grid[r][c] = word[i];
		}
		return backup;
	}

	function restoreWord(slot, backup) {
		for (let i = 0; i < backup.length; i++) {
			const [r, c] = slot.dir === 'H' ? [slot.r, slot.c + i] : [slot.r + i, slot.c];
			grid[r][c] = backup[i];
		}
	}

	function getCrossPoints(slot) {
		const points = [];
		for (let i = 0; i < slot.len; i++) {
			const [r, c] = slot.dir === 'H' ? [slot.r, slot.c + i] : [slot.r + i, slot.c];
			if (grid[r][c] !== '?') points.push(r * 100 + c); // уникальный индекс
		}
		return points.length > 0 ? Math.min(...points) : Infinity;
	}

	findSlots();

	function dfs(idx, used, remaining) {
		if (remaining.length === 0) return true;
		const candidates = [];

		for (let i = 0; i < slots.length; i++) {
			if (used.has(i)) continue;
			for (let j = 0; j < remaining.length; j++) {
				const word = remaining[j];
				const slot = slots[i];
				if (slot.len !== word.length) continue;
				if (!canPlace(word, slot)) continue;

				candidates.push({
					slotIdx: i,
					wordIdx: j,
					word,
					slot,
					cross: getCrossPoints(slot),
					dir: slot.dir
				});
			}
		}

		candidates.sort((a, b) => {
			if (a.cross !== b.cross) return a.cross - b.cross;
			if (a.dir !== b.dir) return a.dir === 'H' ? -1 : 1;
			return a.word.localeCompare(b.word);
		});

		for (const cand of candidates) {
			const backup = placeWord(cand.word, cand.slot);
			used.add(cand.slotIdx);
			const nextRemaining = [...remaining];
			nextRemaining.splice(cand.wordIdx, 1);
			if (dfs(idx + 1, used, nextRemaining)) return true;
			restoreWord(cand.slot, backup);
			used.delete(cand.slotIdx);
		}

		return false;
	}

	dfs(0, new Set(), words);

	return grid.map(row => row.join('')).join('\n');
}
