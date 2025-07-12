// Mahjong Series
// Mahjong is based on draw-and-discard card games that were popular in 18th and 19th century China and some are still popular today.
//
// 	In each deck, there are three different suits numbered 1 to 9, which are called Simple tiles. They are Circles (denoted by [1-9]p), Bamboo (denoted by [1-9]s), and Characters (denoted by [1-9]m).
//
// Circles:
// 	1p2p3p4p5p6p7p8p9p
//
// Bamboo:
// 	1s2s3s4s5s6s7s8s9s
//
// Characters:
// 	1m2m3m4m5m6m7m8m9m
//
// Moreover, there is another suit named Honor tiles. It includes Wind tiles (namely East, South, West, North, denoted by [1-4]z) and Dragon tiles (namely Red, Green, White, denoted by [5-7]z).
//
// East Wind	South Wind	West Wind	North Wind	Red Dragon	Green Dragon	White Dragon
// 1z
//
// 2z
//
// 3z
//
// 4z
//
// 5z
//
// 6z
//
// 7z
//
// Note that there are EXACTLY 4 identical copies of each kind of tiles in a deck.
//
// 	In each of Mahjong games, each of the 4 players around the table has 13 tiles. They take turns drawing a tile from the tile walls and then discarding one of the tiles from their hands. One wins the game if that player holds a defined combination of tiles.
//
// 	A regular winning hand consists of 4 Melds and 1 Pair. Each meld of tiles can be 3 identical copies of a tile (e.g. 1p 1p 1p, 2d 2d 2d) or 3 consecutive tiles of a Simple suit (e.g. 6m 7m 8m or 4s 5s 6s).
//
// 1p1p1p
//
// 2d2d2d
//
// 6m7m8m
//
// 4s5s6s
//
// Here is an example of regular winning hands.
//
// 3p4p4p5p5p6p7p7p7p9p9p2s3s4s
//
// There are some special combinations of tiles that also win you the game. One of them is called Seven-pairs. As the name suggests, it consists of 7 pairs, each consisting of 2 tiles with identical patterns. One of winning hands with Seven-pairs is like the one shown below. For the current task, we'll use MCR rules, so two pairs formed with the same 4 tiles are allowed (meaning: 4 * 2s == 2 pairs for example).
//
// 2p2p7p7p1s1s4m4m7m7m2w2w3d3d
//
// Task
// Work out all tiles that can make up a winning hand with the given 13 tiles. Remember that a winning hand may be regular or in a form of Seven-pairs.
//
// 	Input
//
// A string denoting 13 tiles to be computed, in the order of Circles ([1-9]p), Bamboo ([1-9]s), Characters ([1-9]m), and Honors ([1-7]z). The tiles are space-separated.
// 	Output
//
// A string consisting of the tiles that can form a winning hand with given ones, in the order of Circles ([1-9]p), Bamboo ([1-9]s), Characters ([1-9]m), and Honors ([1-7]z).
// Example
// "2p 2p 3p 3p 4p 4p 5p 5p 7m 7m 8m 8m 8m" => "2p 5p 7m 8m"
// (2p => (2p 2p 2p) (3p 4p 5p) (3p 4p 5p) (7m 7m) (8m 8m 8m),
// 5p => (2p 3p 4p) (2p 3p 4p) (5p 5p 5p) (7m 7m) (8m 8m 8m),
// 7m => (2p 2p) (3p 4p 5p) (3p 4p 5p) (7m 7m 7m) (8m 8m 8m),
// 8m => (2p 2p) (3p 3p) (4p 4p) (5p 5p) (7m 7m) (8m 8m) (8m 8m) )


function solution(tiles) {
	const allTiles = [];
	for (let i = 1; i <= 9; i++) allTiles.push(i + 'p');
	for (let i = 1; i <= 9; i++) allTiles.push(i + 's');
	for (let i = 1; i <= 9; i++) allTiles.push(i + 'm');
	for (let i = 1; i <= 7; i++) allTiles.push(i + 'z');

	const hand = tiles.split(' ');
	if (hand.length !== 13) return '';

	// Подсчёт количества каждого тайла
	function countTiles(arr) {
		const cnt = {};
		allTiles.forEach(t => cnt[t] = 0);
		for (const t of arr) cnt[t]++;
		return cnt;
	}

	// Проверка на семипары
	// При MCR 4 одинаковых считаются за 2 пары
	function isSevenPairs(counts) {
		let pairs = 0;
		for (const t of allTiles) {
			const c = counts[t];
			pairs += Math.floor(c / 2);
		}
		return pairs === 7;
	}

	// Проверка стандартной выигрышной руки (4 сета + 1 пара)
	// Рекурсивно удаляем сеты
	// Сет - 3 одинаковых или 3 последовательных простых тайла (p,s,m)
	function canFormSets(counts) {
		// Сначала ищем пару
		for (const t of allTiles) {
			if (counts[t] >= 2) {
				counts[t] -= 2;
				if (canFormFourSets(counts)) {
					counts[t] += 2;
					return true;
				}
				counts[t] += 2;
			}
		}
		return false;
	}

	function canFormFourSets(counts) {
		// Проверяем, можно ли разбить оставшиеся 12 тайлов на 4 сета
		// Если все нули - успех
		if (Object.values(counts).every(c => c === 0)) return true;

		// Найдем первый тайл с count>0
		let tile = null;
		for (const t of allTiles) {
			if (counts[t] > 0) {
				tile = t;
				break;
			}
		}
		if (!tile) return true; // Все нули

		const c = counts[tile];
		const suit = tile.slice(-1);
		const num = parseInt(tile);

		// Попытка 3 одинаковых
		if (c >= 3) {
			counts[tile] -= 3;
			if (canFormFourSets(counts)) {
				counts[tile] += 3;
				return true;
			}
			counts[tile] += 3;
		}

		// Попытка последовательных (если простой тайл)
		if (suit === 'p' || suit === 's' || suit === 'm') {
			// проверяем num, num+1, num+2
			const t2 = (num + 1) + suit;
			const t3 = (num + 2) + suit;
			if (num <= 7 && counts[t2] > 0 && counts[t3] > 0) {
				counts[tile]--;
				counts[t2]--;
				counts[t3]--;
				if (canFormFourSets(counts)) {
					counts[tile]++;
					counts[t2]++;
					counts[t3]++;
					return true;
				}
				counts[tile]++;
				counts[t2]++;
				counts[t3]++;
			}
		}

		return false;
	}

	const result = [];

	for (const tile of allTiles) {
		if (hand.filter(t => t === tile).length === 4) continue; // не может быть больше 4 тайлов одного вида

		const newHand = hand.slice();
		newHand.push(tile);

		const counts = countTiles(newHand);

		if (isSevenPairs(counts) || canFormSets(counts)) {
			result.push(tile);
		}
	}

	return result.join(' ');
}
