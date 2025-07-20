// Same task as Total area covered by rectangles but now there are more rectangles.
//
// 	Task
// Write a function calculate that, given a list of rectangles, finds the area of their union.
//
// 	Each rectangle is represented by four integers [x0, y0, x1, y1], where (x0, y0) is the lower-left corner and (x1, y1) is the upper-right corner. The origin (0, 0) is bottom left. For the representation used for your language, see the example tests.
//
// 	See linked kata for a more detailed example.
//
// 	Constraints
// Performance requirement: Number of rectangles n ≥ 0:
// For JavaScript: 10 tests with n ≤ 5000, and 10 tests with n ≤ 20,000
// For Python: 10 tests with n ≤ 1500, and 7 tests with n ≤ 8000
// Coordinates: 0 ≤ xi, yi ≤ 1,000,000


function calculate(recs) {
	if (!recs.length) return 0;

	const events = [];
	const yCoords = new Set();

	for (const [x1, y1, x2, y2] of recs) {
		events.push([x1, y1, y2, 1]);  // вход
		events.push([x2, y1, y2, -1]); // выход
		yCoords.add(y1);
		yCoords.add(y2);
	}

	const yList = Array.from(yCoords).sort((a, b) => a - b);
	const yMap = new Map();
	yList.forEach((y, i) => yMap.set(y, i));

	const seg = Array(yList.length * 4).fill(0);      // покрытие
	const count = Array(yList.length * 4).fill(0);    // количество перекрытий

	function update(node, l, r, ul, ur, val) {
		if (ur <= l || r <= ul) return;
		if (ul <= l && r <= ur) {
			count[node] += val;
		} else {
			const mid = (l + r) >> 1;
			update(node * 2, l, mid, ul, ur, val);
			update(node * 2 + 1, mid, r, ul, ur, val);
		}

		if (count[node] > 0) {
			seg[node] = yList[r] - yList[l];
		} else if (r - l === 1) {
			seg[node] = 0;
		} else {
			seg[node] = seg[node * 2] + seg[node * 2 + 1];
		}
	}

	events.sort((a, b) => a[0] - b[0]);

	let prevX = events[0][0];
	let area = 0;

	for (const [x, y1, y2, type] of events) {
		const width = x - prevX;
		const height = seg[1];
		area += width * height;

		update(1, 0, yList.length - 1, yMap.get(y1), yMap.get(y2), type);
		prevX = x;
	}

	return area;
}