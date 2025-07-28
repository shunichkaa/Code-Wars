// Blobs of various sizes are situated in a room.
// Each blob will move toward the nearest smaller blob until it reaches it and engulfs it.
// After consumption, the larger blob grows in size.
// Your task is to create a class Blobservation (a portmanteau of blob and observation)
// and methods that give information about each blob after an arbitrary number of moves.
// Class Details
// A Blobservation class instance is instantiated with two integer values, h and w, that represent the dimensions of the room.
// The instance methods are as follows: populate
// The populate method is called with an array/list representing a list of blobs.
// Each element is an object/dict (Map<String,Integer> in Java) with the following properties:
// x: vertical position
// y: horizontal position
// size: size of the blob
// This method may be called multiple times on the same class instance
// If a new blob's position is already occupied by an existing blob, the two fuse into a single blob
// If the list input contains any invalid values, discard it entirely and throw an error (do not update/modify the instance)
// move
// The move method may be called with up to one argument — a positive integer representing the number of move iterations (ie. turns) to process.
// If no argument is given, the integer value defaults to 1.
// print_state
// The print_state method is a nullary function that returns an array of the positions and sizes of each blob at the current state
// (Java: a List<List<Integer>> ), sorted in ascending order by x position, then by y. If there are no blobs, return an empty array.
// Blob Movement Behavior
// With each turn, every blob whose size is larger than the smallest blob size value will move to one of the 8 spaces immediately surrounding it
// (Moore neighborhood) in the direction of the nearest target blob with a lower relative size.
// If a target's coordinates differ on both axes, the predatory blob will move diagonally.
// Otherwise, it will move in the cardinal direction of its target
// If multiple targets are at the same movement distance, the blob with the largest size is focused
// If there are multiple targets that have both the largest size and shortest movement distance,
// priority is set in clockwise rotation, starting from the 12 position
// If two blobs pass each other (e.g. swap positions as a result of their movement), they will not fuse
// Blobs of the smallest size remain stationary
// Additional Technical Details
// A blob's initial size will range between 1 and 20
// Multiple blobs occupying the same space will automatically fuse into one
// When a blob consumes another blob, or when two blobs fuse, the remaining blob's size becomes the sum of the two
// The 2nd argument for the class constructor is optional; if omitted, the room defaults to a square, where w == h.
// Room dimensions (h and w) will range between 8 and 50
// Class instances will always be instantiated with valid arguments
// Methods should throw an error if called with invalid arguments
// Boolean values are not to be regarded as valid integers
// Python translation: Use Python 3 only
// Test Example
// The image above shows the state at turn 0 (the initial state), turn 1, and turn 2.
// At T:0, the orange blob at [4,3] with a size of 4 has four different targets of equal movement distance —
// the blobs occupying the green, yellow, and red spaces.
// The adjacent matching-color spaces are the positions it would initially move to in pursuit of each respective target.
// Here it targets the size 3 blob at [7,0].
// At T:1, the size 2 blob that was in the yellow space has consumed the size 1 blob at [6,7] and now has a size of 3
// At T:2, the size 3 blob in the green space has consumed the size 1 blob to become the size 4 blob at [7,2].
// At this point, the two orange blobs will both target the green blob at [4,2] and all size 2 blobs will remain stationary
// const generation0 = [
// {x:0,y:4,size:3},
// {x:0,y:7,size:5},
// {x:2,y:0,size:2},
// {x:3,y:7,size:2},
// {x:4,y:3,size:4},
// {x:5,y:6,size:2},
// {x:6,y:7,size:1},
// {x:7,y:0,size:3},
// {x:7,y:2,size:1}];
// const blobs = new Blobservation(8);
// blobs.populate(generation0);
// blobs.move();
// blobs.print_state(); //[[0,6,5],[1,5,3],[3,1,2],[4,7,2],[5,2,4],[6,7,3],[7,1,3],[7,2,1]]
// blobs.move();
// blobs.print_state(); //[[1,5,5],[2,6,3],[4,2,2],[5,6,2],[5,7,3],[6,1,4],[7,2,4]]
// blobs.move(1000);
// blobs.print_state(); //[[4,3,23]]


class Blobservation {
	constructor(h, w) {
		if (!Number.isInteger(h) || h < 8 || h > 50) throw new Error();
		if (w === undefined) w = h;
		if (!Number.isInteger(w) || w < 8 || w > 50) throw new Error();
		this.h = h;
		this.w = w;
		this.blobs = [];
		this._directionOrder = [
			[-1, 0], [-1, 1], [0, 1], [1, 1],
			[1, 0], [1, -1], [0, -1], [-1, -1]
		];
	}
	populate(arr) {
		if (!Array.isArray(arr)) throw new Error();
		for (const b of arr) {
			if (
				typeof b !== "object" || b === null ||
				!Number.isInteger(b.x) || b.x < 0 || b.x >= this.h ||
				!Number.isInteger(b.y) || b.y < 0 || b.y >= this.w ||
				!Number.isInteger(b.size) || b.size < 1 || b.size > 20
			) throw new Error();
		}
		for (const b of arr) {
			const idx = this.blobs.findIndex(bl => bl.x === b.x && bl.y === b.y);
			if (idx !== -1) {
				this.blobs[idx].size += b.size;
			} else {
				this.blobs.push({ x: b.x, y: b.y, size: b.size });
			}
		}
	}
	move(times = 1) {
		if (!Number.isInteger(times) || times < 1) throw new Error();
		for (let t = 0; t < times; t++) {
			if (this.blobs.length < 2) return;
			const minSize = Math.min(...this.blobs.map(b => b.size));
			if (this.blobs.every(b => b.size === minSize)) return;
			const blobsCopy = this.blobs.map(b => ({ x: b.x, y: b.y, size: b.size }));
			const moves = [];
			for (let i = 0; i < this.blobs.length; i++) {
				const b = this.blobs[i];
				if (b.size === minSize) {
					moves.push({ i, nx: b.x, ny: b.y });
					continue;
				}
				const targets = blobsCopy.filter(tb => tb.size < b.size);
				if (targets.length === 0) {
					moves.push({ i, nx: b.x, ny: b.y });
					continue;
				}
				const dist = (a, c) => Math.max(Math.abs(a.x - c.x), Math.abs(a.y - c.y));
				let minDist = Math.min(...targets.map(tgt => dist(b, tgt)));
				const closest = targets.filter(tgt => dist(b, tgt) === minDist);
				let maxSize = Math.max(...closest.map(c => c.size));
				const biggestClosest = closest.filter(c => c.size === maxSize);
				const getDirIndex = (to) => {
					const dx = Math.sign(to.x - b.x);
					const dy = Math.sign(to.y - b.y);
					for (let idx = 0; idx < this._directionOrder.length; idx++) {
						const [x, y] = this._directionOrder[idx];
						if (x === dx && y === dy) return idx;
					}
					return 0;
				};
				let bestTarget = biggestClosest.reduce((best, curr) =>
						getDirIndex(curr) < getDirIndex(best) ? curr : best
					, biggestClosest[0]);
				let dx = Math.sign(bestTarget.x - b.x);
				let dy = Math.sign(bestTarget.y - b.y);
				moves.push({ i, nx: b.x + dx, ny: b.y + dy });
			}
			for (const m of moves) {
				this.blobs[m.i].x = m.nx;
				this.blobs[m.i].y = m.ny;
			}
			this._mergeBlobs();
		}
	}
	_mergeBlobs() {
		let map = new Map();
		for (const b of this.blobs) {
			const key = `${b.x},${b.y}`;
			if (map.has(key)) {
				map.get(key).size += b.size;
			} else {
				map.set(key, { x: b.x, y: b.y, size: b.size });
			}
		}
		this.blobs = Array.from(map.values());
	}
	print_state() {
		return this.blobs
		.map(b => [b.x, b.y, b.size])
		.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
	}
}