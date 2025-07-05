// Note: This kata is the improved/corrected version of this one.
// 	I'm not the original author but, while the former has quit codewars without correcting the bugs in his kata and letting it inconsistent with the description, the latter took a lot of time to debug the thing and improve it (the original algorithm didn't have full coverage), so I published it on my side (and that will make the maintenance easier...).
//
// Enjoy!
//
//
// 	I don't even know what they look like.
// Furling... Sounds cute and fuzzy to me.
//
// - Jonas Quinn and Jack O'Neill, "Paradise Lost".
//
// Previously on Stargate SG-1
// Arriving on P4F-976, SG-1 finally come into contact with the Furlings, one of the four great races within the Milky Way. After several days of deliberation with the Furling Directorate, the Tauri finally have access to the knowledge they have been searching for.
//
// The Furlings, having provided assistance with the Ancient's expansion into the Milky Way, have extensive knowledge of the Stargate Network and it's components. One such component, the Dial Home Device, has caused many disasters at Stargate Command through it's absence. Thankfully, the Furlings have all the necessary blueprints for it's construction, and have handed copies over to the Tauri. After beginning mass production of the control crystals necessary for it's function, Stargate Command has hit a snag. The Ancients had designed the control crystals to function if their inner pathways are as efficient as possible - essentially, the pathways must choose the shortest path between two nodes. Stargate Command has turned to you - a software engineer - to fix their problems.
//
//
// Your Mission
// Given a string containing the current state of the control crystals inner pathways (labeled as "X") and its gaps (labeled as "."), generate the shortest path from the start node (labeled as "S") to the goal node (labeled as "G") and return the new pathway (labeled with "P" characters).
// If no solution is possible, return the string "Oh for crying out loud..." (in frustration).
//
//
// The Rules
// Nodes labeled as "X" are not traversable.
// 	Nodes labeled as "." are traversable.
// 	A pathway can be grown in eight directions (up, down, left, right, up-left, up-right, down-left, down-right), so diagonals are possible.
// 	Nodes labeled "S" and "G" are not to be replaced with "P" in the case of a solution.
// 	The shortest path is defined as the path with the shortest euclidean distance going from one node to the next.
// 	If several paths are possible with the same shortest distance, return any one of them.
// 	Note that the mazes won't always be squares.
//
//
// Example #1: Valid solution
// 	.S...             .SP..
// XXX..             XXXP.
// 	.X.XX      =>     .XPXX
// ..X..             .PX..
// G...X             G...X
//
// Example #2: No solution
// S....
// XX...
// ...XX      =>     "Oh for crying out loud..."
// 	.XXX.
// 	XX..G
//
//
// Note: Your solution will have to be efficient because it will have to deal with a lot of maps and big ones.
// 	Caracteristics of the random tests:
//
// 	map sizes from 3x3 to 73x73 (step is 5 from one size to the other, mazes won't always be squares)
// 20 random maps for each size.
// 	Overall, 311 tests to pass with the fixed ones.


function wire_DHD_SG1(existingWires) {
	if (typeof existingWires === 'string') {
		existingWires = existingWires.split('\n');
	}

	const grid = existingWires.map(row => row.split(''));
	const rows = grid.length;
	const cols = grid[0].length;

	let start = null;
	let goal = null;

	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			if (grid[r][c] === 'S') start = [r, c];
			else if (grid[r][c] === 'G') goal = [r, c];
		}
	}
	if (!start || !goal) return "Oh for crying out loud...";

	const directions = [
		[-1, 0], [1, 0], [0, -1], [0, 1],
		[-1, -1], [-1, 1], [1, -1], [1, 1]
	];

	function heuristic([r, c]) {
		return Math.sqrt((r - goal[0]) ** 2 + (c - goal[1]) ** 2);
	}

	function posKey([r, c]) {
		return `${r},${c}`;
	}

	const openSet = new Map();
	openSet.set(posKey(start), {
		pos: start,
		g: 0,
		f: heuristic(start),
		parent: null
	});

	const closedSet = new Set();

	while (openSet.size > 0) {
		let currentKey, currentNode, minF = Infinity;
		for (let [key, node] of openSet) {
			if (node.f < minF) {
				minF = node.f;
				currentKey = key;
				currentNode = node;
			}
		}

		if (currentKey === posKey(goal)) {
			let pathPos = [];
			let node = currentNode;
			while (node) {
				pathPos.push(node.pos);
				node = node.parent;
			}
			pathPos.reverse();

			for (let i = 1; i < pathPos.length - 1; i++) {
				const [r, c] = pathPos[i];
				grid[r][c] = 'P';
			}

			return grid.map(row => row.join('')).join('\n');
		}

		openSet.delete(currentKey);
		closedSet.add(currentKey);

		for (let [dr, dc] of directions) {
			let nr = currentNode.pos[0] + dr;
			let nc = currentNode.pos[1] + dc;

			if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
			if (grid[nr][nc] === 'X') continue;

			let neighborKey = posKey([nr, nc]);
			if (closedSet.has(neighborKey)) continue;

			let dist = (dr === 0 || dc === 0) ? 1 : Math.SQRT2;
			let tentativeG = currentNode.g + dist;

			if (!openSet.has(neighborKey) || tentativeG < openSet.get(neighborKey).g) {
				openSet.set(neighborKey, {
					pos: [nr, nc],
					g: tentativeG,
					f: tentativeG + heuristic([nr, nc]),
					parent: currentNode
				});
			}
		}
	}

	return "Oh for crying out loud...";
}
