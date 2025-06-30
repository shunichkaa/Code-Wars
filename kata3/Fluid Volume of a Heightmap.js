// Given a height map as a 2D array of integers, return the volume of liquid that it could contain. For example:
//
// 	heightmap:
// 		8 8 8 8 6 6 6 6
// 8 0 0 8 6 0 0 6
// 8 0 0 8 6 0 0 6
// 8 8 8 8 6 6 6 0
//
// filled:
// 	8 8 8 8 6 6 6 6
// 8 8 8 8 6 6 6 6
// 8 8 8 8 6 6 6 6
// 8 8 8 8 6 6 6 0
//
// result: 4*8 + 4*6 = 56
// For this heightmap, you would return 56: were you to pour water over it until it couldn't contain any more, it would look like the second heightmap, taking on 56 units of water in the process.
//
// Water pours off the edges of the heightmap, even when they are negative. It doesn't flow through diagonal cracks (note the lower-right corner of the example). Heightmaps in the test cases will come in many different sizes, and some will be quite large, but they will always be rectangular. Heights may be negative.
//
// Performances requirements:
// 	Think about the efficiency of your solution:
//
// 	100 large random tests, where 120 <= width|height <= 130 and `-50 <= depth <= 150


class MinHeap {
	constructor() {
		this.heap = [];
	}
	size() {
		return this.heap.length;
	}
	swap(i, j) {
		[this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
	}
	push(val) {
		this.heap.push(val);
		this.bubbleUp(this.heap.length - 1);
	}
	bubbleUp(i) {
		while (i > 0) {
			const parent = (i - 1) >> 1;
			if (this.heap[parent][0] <= this.heap[i][0]) break;
			this.swap(i, parent);
			i = parent;
		}
	}
	pop() {
		if (this.heap.length === 0) return null;
		this.swap(0, this.heap.length - 1);
		const val = this.heap.pop();
		this.bubbleDown(0);
		return val;
	}
	bubbleDown(i) {
		const n = this.heap.length;
		while (true) {
			let left = i * 2 + 1, right = i * 2 + 2, smallest = i;
			if (left < n && this.heap[left][0] < this.heap[smallest][0]) smallest = left;
			if (right < n && this.heap[right][0] < this.heap[smallest][0]) smallest = right;
			if (smallest === i) break;
			this.swap(i, smallest);
			i = smallest;
		}
	}
}

const volume = heightMap => {
	const rows = heightMap.length;
	if (rows === 0) return 0;
	const cols = heightMap[0].length;
	if (cols === 0) return 0;

	const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
	const heap = new MinHeap();

	for (let r = 0; r < rows; r++) {
		heap.push([heightMap[r][0], r, 0]);
		heap.push([heightMap[r][cols - 1], r, cols - 1]);
		visited[r][0] = true;
		visited[r][cols - 1] = true;
	}
	for (let c = 1; c < cols - 1; c++) {
		heap.push([heightMap[0][c], 0, c]);
		heap.push([heightMap[rows - 1][c], rows - 1, c]);
		visited[0][c] = true;
		visited[rows - 1][c] = true;
	}

	const directions = [[1,0],[-1,0],[0,1],[0,-1]];
	let water = 0;

	while (heap.size() > 0) {
		const [height, r, c] = heap.pop();

		for (const [dr, dc] of directions) {
			const nr = r + dr;
			const nc = c + dc;
			if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc]) {
				visited[nr][nc] = true;
				const nh = heightMap[nr][nc];
				if (nh < height) {
					water += height - nh;
					heap.push([height, nr, nc]);
				} else {
					heap.push([nh, nr, nc]);
				}
			}
		}
	}

	return water;
};
