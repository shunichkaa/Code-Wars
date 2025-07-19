// Mahjong Series
// Mahjong is based on draw-and-discard card games that were popular in 18th and 19th century China and some are still popular today.
//
// 	In each deck, there are three different suits numbered 1 to 9, which are called Simple tiles. To simplify the problem, we talk about only one suit of simple tiles in this kata (and that's what the term Pure Hand means). Note that there are EXACTLY 4 identical copies of each kind of tiles in a deck.
//
// In each of Mahjong games, each of the 4 players around the table has 13 tiles. They take turns drawing a tile from the tile walls and then discarding one of the tiles from their hands. One wins the game if that player holds a combination of tiles as defined below:
//
// 	A regular winning hand consists of 4 Melds and 1 Pair. Each meld of tiles can be 3 identical or consecutive tiles of a suit, e.g. 222 or 456.
//
// t2t2t2
//
// t4t5t6
//
// Now let's consider a hand of 1113335557779.
//
// t1t1t1t3t3t3t5t5t5t7t7t7t9
//
// In this hand, there are already 4 melds (each of 3 identical tiles), leaving a 9 alone. So we need another 9 to form a pair.
//
// 	t1t1t1
//
// t3t3t3
//
// t5t5t5
//
// t7t7t7
//
// t9t9
//
// Additionally, there is another option. Regardless of the 3 melds ahead (111, 333, 555), drawing an 8 produces 77789, which gives a pair of 7's and a meld (789). Therefore, the required tiles to win with 1113335557779 are 8 and 9.
//
// t1t1t1
//
// t3t3t3
//
// t5t5t5
//
// t7t7
//
// t7t8t9
//
// Now Sakura wonders which tiles will form a hand with 13 tiles of the same suit (Pure Hand). Can you help her?
//
// 	Task
// 	Complete a function to work out all the optional tiles to form a regular winning hand with the given tiles.
//
// 	Input
//
// A string of 13 non-zero digits in non-decreasing order, denoting different tiles of a suit.
// 	Output
//
// A string of unique non-zero digits in ascending order.
// 	Examples
// "1335556789999" => ""
// (None of the tiles in a deck makes up a winning hand)
// "1113335557779" => "89"
// ("8" => "111 333 555 77 789",
// 	"9" => "111 333 555 777 99")
// "1223334455678" => "258"
// ("2" => "123 22 345 345 678",
// 	"5" => "123 234 345 55 678",
// 	"8" => "123 234 345 678 88")


function solution(tiles) {
	// Подсчёт количества каждой плитки 1..9
	const counts = Array(10).fill(0);
	for (const c of tiles) counts[+c]++;

	const result = [];

	for (let tile = 1; tile <= 9; tile++) {
		if (counts[tile] === 4) continue; // нельзя добавить, превышение
		counts[tile]++;
		if (canWin(counts)) result.push(tile);
		counts[tile]--;
	}

	return result.join('');
}

function canWin(counts) {
	// Найти пару
	for (let i = 1; i <= 9; i++) {
		if (counts[i] >= 2) {
			counts[i] -= 2;
			if (canFormSets(counts, 4)) {
				counts[i] += 2;
				return true;
			}
			counts[i] += 2;
		}
	}
	return false;
}

// Проверить, можно ли разбить на n сэтов
function canFormSets(counts, setsLeft) {
	if (setsLeft === 0) {
		// Все сеты сформированы, проверим, что все плитки использованы
		for (let i = 1; i <= 9; i++) {
			if (counts[i] !== 0) return false;
		}
		return true;
	}

	// Найдем первую плитку, которая ещё осталась
	let i = 1;
	while (i <= 9 && counts[i] === 0) i++;
	if (i > 9) return false; // плитки закончились, но setsLeft не 0 - ошибка

	// Попробуем взять три одинаковых плитки i
	if (counts[i] >= 3) {
		counts[i] -= 3;
		if (canFormSets(counts, setsLeft - 1)) {
			counts[i] += 3;
			return true;
		}
		counts[i] += 3;
	}

	// Попробуем взять последовательные i, i+1, i+2
	if (i + 2 <= 9 && counts[i + 1] > 0 && counts[i + 2] > 0) {
		counts[i]--;
		counts[i + 1]--;
		counts[i + 2]--;
		if (canFormSets(counts, setsLeft - 1)) {
			counts[i]++;
			counts[i + 1]++;
			counts[i + 2]++;
			return true;
		}
		counts[i]++;
		counts[i + 1]++;
		counts[i + 2]++;
	}

	return false;
}
