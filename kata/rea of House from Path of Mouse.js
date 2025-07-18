//
// Above: An overhead view of the house in one of the tests. The green outline indicates the path taken by K
//
// A mouse named K has found a new home on Ash Tree Lane. K wants to know the size of the interior of the house (which consists of just one room). K is able to measure precise distances in any direction he runs. But K is wary of open spaces and will only run alongside walls, as mice tend to do. In this house the walls always connect at right angles.
//
// 	K's plan is to run alongside the walls, traversing the entire perimeter of the room, starting and ending at K's mousehole. K memorizes the path as an alternating sequence of distance traveled and directional turn. Your task is to write a function that will find the area of the house interior when given K's path.
//
// Input
// Your function will receive a string as an argument. The string will consist of turns (L or R, for left and right, respectively) and positive integers, in an alternating sequence. L/R represents the turn direction made by K, and the integers mark the number of distance units to move forward.
//
// 	Output
// Your function should return an integer representing the area of the house, based on K's path. If K's path is not a valid path, return null or None.
//
// 	Invalid Paths
// A path is invalid if it meets any of the following criteria:
//
// 	the path intersects/overlaps itself (with the exception of the mousehole when completing the loop); see examples of path fragments below
// the path doesn't complete the loop back to the mousehole
// the mousehole is located along the straight path of a wall (K's mousehole must be located at a convex/concave corner position to be valid)
// Invalidating overlap path fragment examples
//
// Example A: Perpendicular intersection ...5L2L3L4...
// Example B: Point of overlap ...2L2R3R2R3L2...
// Example C: Parallel overlap ...4L2R2R3R4R1L2...
// Test Example
//
// The circled K and green arrow indicate the starting position and direction as given in the example test below
// mousePath('4R2L1R5R9R4R4L3') // 49
// Additional Details
// K's path will always consist of fewer than 500 turns
// The area of the house (when valid) will always be less than 2**32
// Full Test Suite: 12 fixed tests and 150 random tests
// Use Python 3+ for the Python translation
// For JavaScript, most built-in prototypes are frozen, except Array and Function
// All inputs will be of valid type and pattern (that is, it will alternate between distance moved and directional turn)
// NOTE: the random test generator may, on very rare occasions, throw an error (around 0.01% of the time, based on my observation); if you get an error pointing to the random test function, try running your solution again.
// 	This kata was inspired by Kafka and Danielewski
// If you enjoyed this kata, be sure to check out my other katas


function mousePath(s) {
	const moves = s.match(/\d+|[LR]/g);
	if (!moves) return null;

	const dirs = [
		[0, 1],   // up
		[1, 0],   // right
		[0, -1],  // down
		[-1, 0]   // left
	];

	let dir = 0;
	let x = 0, y = 0;
	const points = [[0, 0]];
	const segments = [];

	for (let i = 0; i < moves.length; i += 2) {
		const dist = +moves[i];
		const turn = moves[i + 1];

		const [dx, dy] = dirs[dir];
		const nx = x + dx * dist;
		const ny = y + dy * dist;

		const seg = [ [x, y], [nx, ny] ];

		// Check for intersections with previous segments (excluding the last one)
		for (let j = 0; j < segments.length - 1; j++) {
			if (intersect(segments[j], seg)) return null;
		}

		segments.push(seg);
		x = nx;
		y = ny;
		points.push([x, y]);

		dir = turn === 'L' ? (dir + 3) % 4 : (dir + 1) % 4;
	}

	// Path must end at the start
	if (x !== 0 || y !== 0) return null;

	// Mousehole must be a corner
	const p0 = points[0], p1 = points[1], pn = points[points.length - 2];
	const v1 = [p1[0] - p0[0], p1[1] - p0[1]];
	const v2 = [pn[0] - p0[0], pn[1] - p0[1]];
	if (v1[0] * v2[0] + v1[1] * v2[1]) return null; // not perpendicular

	return Math.abs(shoelace(points)) / 2;
}

function shoelace(pts) {
	let sum = 0;
	for (let i = 0; i < pts.length - 1; i++) {
		const [x1, y1] = pts[i];
		const [x2, y2] = pts[i + 1];
		sum += (x1 * y2 - x2 * y1);
	}
	return sum;
}

// Axis-aligned segments intersection
function intersect(a, b) {
	const [[x1, y1], [x2, y2]] = a;
	const [[x3, y3], [x4, y4]] = b;

	// Normalize
	const [ax1, ax2] = [Math.min(x1, x2), Math.max(x1, x2)];
	const [ay1, ay2] = [Math.min(y1, y2), Math.max(y1, y2)];
	const [bx1, bx2] = [Math.min(x3, x4), Math.max(x3, x4)];
	const [by1, by2] = [Math.min(y3, y4), Math.max(y3, y4)];

	if (x1 === x2 && x3 === x4) { // both vertical
		if (x1 !== x3) return false;
		return overlap(ay1, ay2, by1, by2);
	}

	if (y1 === y2 && y3 === y4) { // both horizontal
		if (y1 !== y3) return false;
		return overlap(ax1, ax2, bx1, bx2);
	}

	// One vertical, one horizontal
	if (x1 === x2 && y3 === y4) {
		return between(x1, bx1, bx2) && between(y3, ay1, ay2);
	}

	if (y1 === y2 && x3 === x4) {
		return between(x3, ax1, ax2) && between(y1, by1, by2);
	}

	return false;
}

function overlap(a1, a2, b1, b2) {
	return Math.max(a1, b1) < Math.min(a2, b2);
}

function between(val, a, b) {
	return val > Math.min(a, b) && val < Math.max(a, b);
}