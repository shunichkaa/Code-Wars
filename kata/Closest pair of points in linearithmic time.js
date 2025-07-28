// Given a number of points on a plane, your task is to find two points with the smallest distance between them in linearithmic O(n log n) time.
// Example
// 1  2  3  4  5  6  7  8  9
// 1
// 2    . A
// 3                . D
// 4                   . F
// 5             . C
// 7                . E
// 8    . B
// 9                   . G
// For the plane above, the input will be:
// \[
//  \[2,2], // A
//  \[2,8], // B
//  \[5,5], // C
//  \[6,3], // D
//  \[6,7], // E
//  \[7,4], // F
//  \[7,9]  // G
// ]
// => closest pair is: \[\[6,3],\[7,4]] or \[\[7,4],\[6,3]]
// (both answers are valid)
// The two points that are closest to each other are D and F.
// Expected answer should be an array with both points in any order.
// Goal
// The goal is to come up with a function that can find two closest points for any arbitrary array of points, in a linearithmic time.
// Note: for compatibility reasons, your function will be called with one additional parameter, a distance calculation function.
// However you can completely ignore it, and you do not have to account for it - it's there only to keep compatibility with old solutions.


function closestPair(points) {
	if (points.length < 2) return null;

	const Px = points.slice().sort((a,b) => a[0] - b[0]);

	function dist(a, b) {
		const dx = a[0] - b[0], dy = a[1] - b[1];
		return Math.sqrt(dx*dx + dy*dy);
	}

	function recursive(Px) {
		const n = Px.length;
		if (n <= 3) {
			let minDist = Infinity;
			let pair = null;
			for (let i = 0; i < n; i++) {
				for (let j = i+1; j < n; j++) {
					const d = dist(Px[i], Px[j]);
					if (d < minDist) {
						minDist = d;
						pair = [Px[i], Px[j]];
					}
				}
			}
			return pair;
		}

		const mid = Math.floor(n/2);
		const midX = Px[mid][0];

		const leftPair = recursive(Px.slice(0, mid));
		const rightPair = recursive(Px.slice(mid));

		const leftDist = dist(...leftPair);
		const rightDist = dist(...rightPair);

		let d = leftDist < rightDist ? leftDist : rightDist;
		let bestPair = leftDist < rightDist ? leftPair : rightPair;

		const strip = [];
		for (const p of Px) {
			if (Math.abs(p[0] - midX) < d) strip.push(p);
		}

		strip.sort((a,b) => a[1] - b[1]);

		for (let i = 0; i < strip.length; i++) {
			for (let j = i+1; j < strip.length && (strip[j][1] - strip[i][1]) < d; j++) {
				const distCur = dist(strip[i], strip[j]);
				if (distCur < d) {
					d = distCur;
					bestPair = [strip[i], strip[j]];
				}
			}
		}
		return bestPair;
	}

	return recursive(Px);
}