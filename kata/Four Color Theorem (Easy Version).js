// If you like more challenges, here is a harder verion of this Kata.
// Four Color Theorem
// In mathematics, the four color theorem, or the four color map theorem, states that,
// given any separation of a plane into contiguous regions, producing a figure called a map,
// no more than four colors are required to color the regions of the map so that no two adjacent regions have the same color.
// Adjacent means that two regions share a common boundary curve segment, not merely a corner where three or more regions meet.
// It was the first major theorem to be proved using a computer.
// Fig. 1: A four-coloring of a map of the states of the United States (ignoring lakes).
// While every planar map can be colored with four colors, it is NP-complete in complexity to decide
// whether an arbitrary planar map can be colored with just three colors.[1]
// For some cases, even three colors are not required, for example two colors are enough to distinguish the squares on a chessboard.
// Task
// Find the minimum amount of colors needed to fill a map with no neighboring territories having the same color.
// Input
// The test map will be inputed as a string. For example the map below has 9 different territories.
// It needs 3 colors to seperate them. Usually there is more than one way to color a map.
// A possible color pattern for the map below is:
// Color 1: A, C, D, H
// Color 2: B, b, E
// Color 3: F, G
// `
// AABBCC
// AABBCC
// bbDDEF
// bbDDGH
// `
// Input Notes:
// The territory names are case sensitive, B and b are different territories;
// Territories are considered adjacent only if they share an edge, A is adjacent to B, but Not D;
// One territory is always connected, there are no discrete islands;
// Chars of ASCII 33~126 will be used (see...no 32)
// Inputs are always rectangular, ignore tailing spaces if any
// Output
// The output should be an int, which is the minimum amount of colors needed to fill the map.
// More about the tests:
// There are 45 fixed tests and 200 random tests.
// Fixed tests are not necessarily easier, they include some special cases.
// Please do Not Hard Code them;
// Maps can be big. If we call the sample input above a 6x4 = 24 pixel map, a large map in random tests could have about 5,000 pixels;
// All tests will have no more than 10 territories;
// There are no oceans or seas which need a certain color, i.e. blue;
// Some maps have one territory only;
// The oldie but goodie: you will find more in sample tests.
// Here are more examples:
// Input strings:
// 1) "ABCD"   2) """    3) """
// AAA       AAAA
// ABC       ACCA
// DBC       DBCA
// """       """
// A is adjacent to B; B is adjacent to C; C is adjacent to D; Your code should return 2;
// A is adjacent to all the other 3, but C is not touching D; Your code should return 3;
// B is not adjacent to A anymore; Your code should return 2;
// Fig. 2: The minimum amount of colors needed to fill a map
// 	[1] Dailey, D. P. (1980), "Uniqueness of colorability and colorability of planar 4-regular graphs are NP-complete",
// 	Discrete Mathematics, 30 (3): 289–293
// AlgorithmsGraph Theory


function color(testmap) {
	const rows = testmap.trim().split('\n').map(l => l.trimEnd());
	const height = rows.length;
	const width = rows[0].length;

	const territories = new Set();
	for (const row of rows) {
		for (const ch of row) {
			territories.add(ch);
		}
	}
	const nodes = Array.from(territories);
	const n = nodes.length;

	const idx = new Map();
	nodes.forEach((v, i) => idx.set(v, i));

	const graph = Array.from({length: n}, () => new Set());

	for (let r = 0; r < height; r++) {
		for (let c = 0; c < width; c++) {
			const cur = rows[r][c];
			const curIdx = idx.get(cur);

			if (r + 1 < height) {
				const down = rows[r+1][c];
				if (down !== cur) {
					graph[curIdx].add(idx.get(down));
					graph[idx.get(down)].add(curIdx);
				}
			}
			if (c + 1 < width) {
				const right = rows[r][c+1];
				if (right !== cur) {
					graph[curIdx].add(idx.get(right));
					graph[idx.get(right)].add(curIdx);
				}
			}
		}
	}

	function canColor(k) {
		const colors = new Array(n).fill(0);

		function dfs(v = 0) {
			if (v === n) return true;
			for (let c = 1; c <= k; c++) {
				let ok = true;
				for (const nei of graph[v]) {
					if (colors[nei] === c) {
						ok = false;
						break;
					}
				}
				if (ok) {
					colors[v] = c;
					if (dfs(v + 1)) return true;
					colors[v] = 0;
				}
			}
			return false;
		}
		return dfs();
	}

	for (let k = 1; k <= 4; k++) {
		if (canColor(k)) return k;
	}

	return 4;
}