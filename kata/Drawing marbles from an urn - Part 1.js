// Given
// Given two urns urn1 and urn2, a fair coin is tossed. On heads, a marble from urn1 is drawn, on tails one from urn2. The color of this marble is color.
//
// 	Task
// Return the exact probability as a ratio that the marble was drawn from urn1.
//
// 	Input
// urn1: an object depicting an urn where each key is a color (string), and each value the number of marbles of that color (integer)
// urn2: an object depicting an urn where each key is a color (string), and each value the number of marbles of that color (integer)
// color: the color of the marble drawn from the urn that got picked after tossing a coin
// Output
// return the exact probability as ratio that the marble was drawn from urn1 (array with 2 elements; the numerator (big integer) and denominator (big integer))
// Constraints
// the ratio needs to be in compact form: [2, 4] should be [1, 2]
// urn1 and urn2 contain at least 1 marble
// the amount of marbles in both urns are reported before one marble is drawn from one of the urns
// the color is always available as key in both urns
// at least one of both urns has at least one marble of the given color
// the amount of marbles by color is a non-negative integer


function probability(urn1, urn2, color) {
	function total(urn) {
		return Object.values(urn).reduce((a, b) => a + b, 0);
	}

	const u1_total = BigInt(total(urn1));
	const u2_total = BigInt(total(urn2));
	const u1_color = BigInt(urn1[color]);
	const u2_color = BigInt(urn2[color]);

	const numerator = u1_color * u2_total;
	const denominator = u1_color * u2_total + u2_color * u1_total;

	const gcd = (a, b) => b === 0n ? a : gcd(b, a % b);
	const d = gcd(numerator, denominator);

	return [numerator / d, denominator / d];
}