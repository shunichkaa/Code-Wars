// In the great kata Catch the Bus, we were asked to calculate the probability of a boy missing his bus. The technical assumption was that the arrival times of the bus and the boy to the station followed independent uniform distributions.
//
// 	In this kata we repeat the exercise, but assume that the arrival times follow independent normal distributions. Specifically, the bus's arrival time is normally distributed with mean m1 and standard deviation s1 > 0, and the boy's arrival time is normally distributed with mean m2 and standard deviation s2 > 0.
//
// Calculate the probability of the boy missing the bus, i.e., that he arrives to the station later than the bus. Your answer should be accurate to within 0.0001 (i.e., within 0.01 percentage points).
//
// For example, if m1 = 3, s1 = 2, m2 = 4 and s2 = 3, the boy will miss the bus about 60.92% of the time, which is intuitive as on average he arrives later than the bus (m2 > m1).
//


function catchTheBus(m1, s1, m2, s2) {
	function phi(x) {
		return 0.5 * (1 + erf(x / Math.sqrt(2)));
	}

	function erf(x) {
		const sign = x >= 0 ? 1 : -1;
		x = Math.abs(x);

		const a1 =  0.254829592;
		const a2 = -0.284496736;
		const a3 =  1.421413741;
		const a4 = -1.453152027;
		const a5 =  1.061405429;
		const p  =  0.3275911;

		const t = 1 / (1 + p * x);
		const y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

		return sign * y;
	}

	const meanDiff = m1 - m2;
	const stdDiff = Math.sqrt(s1 * s1 + s2 * s2);
	const z = meanDiff / stdDiff;

	return 1 - phi(z);
}
