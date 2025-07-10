// Your task in order to complete this Kata is to write a function which calculates the area covered by a union of rectangles.
// 	Rectangles can have non-empty intersection, in this way simple solution: Sall = S1 + S2 + ... + Sn-1 + Sn (where n - the quantity of rectangles) will not work.
//
// 	Preconditions
// each rectangle is represented as: [x0, y0, x1, y1]
// (x0, y0) - coordinates of the bottom left corner
// (x1, y1) - coordinates of the top right corner
// xi, yi - positive integers or zeroes (0, 1, 2, 3, 4..)
// sides of rectangles are parallel to coordinate axes
// your input data is array of rectangles
// Requirements
// Number of rectangles in one test (not including simple tests) range from 3000 to 15000. There are 10 tests with such range. So, your algorithm should be optimal.
// 	Sizes of the rectangles can reach values like 1e6.
// 	Example
//
// There are three rectangles:
//
// 	R1: [3,3,8,5], with area 10
// R2: [6,3,8,9], with area 12
// R3: [11,6,14,12], with area 18
// R1 and R2 are overlapping (2x2), the grayed area is removed from the total area
// Hence the total area is 10 + 12 + 18 - 4 = 36
//
// Note: expected time complexity: something around O(N²), but with a good enough constant factor. If you think about using something better, try this kata instead: Total area covered by more rectangles
//


function calculate(recs) {
	const events = []
	const ySet = new Set()

	for (const [x1, y1, x2, y2] of recs) {
		events.push([x1, y1, y2, 1])  // +1: левая граница
		events.push([x2, y1, y2, -1]) // -1: правая граница
		ySet.add(y1)
		ySet.add(y2)
	}

	const yVals = [...ySet].sort((a, b) => a - b)
	const yIndex = new Map(yVals.map((y, i) => [y, i]))

	const count = Array(yVals.length).fill(0)
	const segLen = () => {
		let sum = 0
		for (let i = 0; i < yVals.length - 1; i++) {
			if (count[i] > 0) sum += yVals[i + 1] - yVals[i]
		}
		return sum
	}

	events.sort((a, b) => a[0] - b[0])
	let prevX = 0
	let area = 0

	for (const [x, y1, y2, delta] of events) {
		area += segLen() * (x - prevX)
		prevX = x

		const i1 = yIndex.get(y1)
		const i2 = yIndex.get(y2)
		for (let i = i1; i < i2; i++) count[i] += delta
	}

	return area
}