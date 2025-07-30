// You have the following lattice points with their corresponding coordinates and each one with an specific colour.
// Point   [x ,  y]     Colour
// ----------------------------
// A     [ 3, -4]     Blue
// B     [-7, -1]     Red
// C     [ 7, -6]     Yellow
// D     [ 2,  5]     Yellow
// E     [ 1, -5]     Red
// F     [-1,  4]     Red
// G     [ 1,  7]     Red
// H     [-3,  5]     Red
// I     [-3, -5]     Blue
// J     [ 4,  1]     Blue
// We want to count the triangles that have the three vertices with the same colour.
// The following picture shows the distribution of the points in the plane with the required triangles.
// source: imgur.com
// The input that we will have for the field of lattice points described above is:
// 	[[[3, -4], "blue"],  [[-7, -1], "red"], [[7, -6], "yellow"], [[2, 5], "yellow"],
// 	[[1, -5], "red"],   [[-1, 4], "red"],  [[1, 7], "red"],     [[-3, 5], "red"],
// 	[[-3, -5], "blue"], [[4, 1], "blue"] ]
// We see the following result from it:
// Colour   Amount of Triangles       Triangles
// Yellow         0                    -------
// Blue             1                      AIJ
// Red            10                   BEF,BEG,BEH,BFG,BFH,BGH,EFG,EFH,EHG,FGH
// As we have 5 different points in red and each combination of 3 points that are not aligned.
// We need a code that may give us the following information in order:
// 1) Total given points
// 2) Total number of colours
// 3) Total number of possible triangles
// 4) and 5) The colour (or colours, sorted alphabetically) with the highest amount of triangles
// In Python our function will work like:
// [10, 3, 11, ["red",10]]) == count_col_triang([[[3, -4], "blue"],  [[-7, -1], "red"], [[7, -6], "yellow"], [[2, 5], "yellow"],
// [[1, -5], "red"],   [[-1, 4], "red"],  [[1, 7], "red"],     [[-3, 5], "red"],
// [[-3, -5], "blue"], [[4, 1], "blue"] ])
// In the following case we have some points that are aligned and we have less triangles that can be formed:
// [10, 3, 7, ["red", 6]] == count_col_triang([[[3, -4], "blue"],  [[-7, -1], "red"], [[7, -6], "yellow"], [[2, 5], "yellow"],
// [[1, -5], "red"],   [[1, 1], "red"],   [[1, 7], "red"],     [[1, 4], "red"],
// [[-3, -5], "blue"], [[4, 1], "blue"] ])
// Just to see the change with the previous case we have this:
// source: imgur.com
// In the special case that the list of points does not generate an even single triangle, the output will be like this case:
// [9, 3, 0, []] == count_col_triang([[[1, -2], "red"], [[7, -6], "yellow"], [[2, 5], "yellow"], [[1, -5], "red"],
// [[1, 1], "red"],   [[1, 7], "red"],     [[1, 4], "red"],    [[-3, -5], "blue"],
// [[4, 1], "blue"] ])
// It will be this case:
// source: imgur.com
// If in the result we have two or more colours with the same maximum amount of triangles, the last list should be like (e.g)
// [35, 6, 35, ["blue", "red", "yellow", 23]]     # having the names of the colours sorted alphabetically
// For the condition of three algined points A, B, C, you should know that the the following determinant should be 0.
// | xA    yA    1|
// | xB    yB    1|    = 0
// | xC    yC    1|
// Assumptions:
// In the list you have unique points, so a point can have only one colour.
// All the inputs are valid


function countColTriang(pointsList) {
	const pointsByColor = {};

	for (const [coords, color] of pointsList) {
		if (!pointsByColor[color]) pointsByColor[color] = [];
		pointsByColor[color].push(coords);
	}

	const totalPoints = pointsList.length;
	const colors = Object.keys(pointsByColor);
	const totalColors = colors.length;

	function collinear(a, b, c) {
		const [x1, y1] = a;
		const [x2, y2] = b;
		const [x3, y3] = c;
		return (x1*(y2 - y3) - y1*(x2 - x3) + (x2*y3 - y2*x3)) === 0;
	}

	let totalTriangles = 0;
	const trianglesCountByColor = {};

	for (const color of colors) {
		const pts = pointsByColor[color];
		const n = pts.length;
		if (n < 3) {
			trianglesCountByColor[color] = 0;
			continue;
		}

		let count = 0;
		for (let i = 0; i < n - 2; i++) {
			for (let j = i + 1; j < n - 1; j++) {
				for (let k = j + 1; k < n; k++) {
					if (!collinear(pts[i], pts[j], pts[k])) {
						count++;
					}
				}
			}
		}
		trianglesCountByColor[color] = count;
		totalTriangles += count;
	}

	if (totalTriangles === 0) return [totalPoints, totalColors, 0, []];

	const maxCount = Math.max(...Object.values(trianglesCountByColor));
	const maxColors = Object.entries(trianglesCountByColor)
	.filter(([, cnt]) => cnt === maxCount)
	.map(([c]) => c)
	.sort();

	return [totalPoints, totalColors, totalTriangles, [...maxColors, maxCount]];
}