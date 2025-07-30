// The emperor of an archipelago nation has asked you to design a network of bridges to connect all the islands of his country together.
// But he wants to make the bridges out of gold.
// To see if he can afford it, he needs you to find the shortest total bridge length that can connect all the islands.
// Each island's bridges will begin at the same point (the centre of the island), so that all the bridges connect to each other.
// As your input, you will be provided with the Cartesian coordinates of the centre of each island as a array of [x, y] arrays –
// for example, an island at [1, 1] is 1 metre north of an island at [1, 0].
// Your function should return the minimum total bridge length, in metres, that can connect all the islands.
// Be warned – this country has a lot of islands, so your algorithm must be fast enough to calculate the bridge lengths for 15,000 islands without timing out.
// The values of x and y may be any real numbers from -10,000 to 10,000.


function bridge(islands) {
	const n = islands.length;
	const dist = new Array(n).fill(Infinity);
	const used = new Array(n).fill(false);
	dist[0] = 0;
	let result = 0;

	for (let i = 0; i < n; i++) {
		let u = -1;
		let minDist = Infinity;
		for (let j = 0; j < n; j++) {
			if (!used[j] && dist[j] < minDist) {
				minDist = dist[j];
				u = j;
			}
		}

		used[u] = true;
		result += minDist;

		for (let v = 0; v < n; v++) {
			if (!used[v]) {
				const dx = islands[u][0] - islands[v][0];
				const dy = islands[u][1] - islands[v][1];
				const d = Math.sqrt(dx*dx + dy*dy);
				if (d < dist[v]) dist[v] = d;
			}
		}
	}

	return result;
}