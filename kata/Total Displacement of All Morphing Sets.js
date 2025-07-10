// Data
// You will be given an array of strings composed of hexatridecimal (base36) digits called data
//
// The array will be of varying lengths.
//
// 	The strings within data will always be of equal length to one another.
//
// 	Strings will always be between 2 and 36 digits long.
//
// 	What is a set?
// 	You will also be given a number n
//
// n is the number of matching digits needed to make a set contained within a string within the data.
//
// 	n will always have a value between 2 and 4.
//
// For example if the string is
//
// 000
// and n = 3
//
// then there is 1 set of 0's within the string at indices [0,1,2]
//
// Sets can be anywhere in the strings. For example:
//
// 	If the string is
//
// 0a00
// and n = 3
//
// there is 1 set of 0's within the string at indices [0,2,3]
//
// All sets count. For example:
//
// 	If the string is
//
// 0000
// and n = 2
//
// there are 6 sets of 0's within the string at indices [0,1], [0,2], [0,3], [1,2], [1,3], and [2,3]
//
// What is a morphing set?
// 	A morphing set is when two adjacent strings in the array have sets of a different digit in the same indices.
//
// 	for example if you have two adjacent strings like so:
//
// 	n = 3
//
//
// data[i] = '000'
// data[i+1] = 'zzz'
// The string at data[i] has a set in indices [0,1,2] and the string at data[i+1] also has a set at indices [0,1,2]
//
// The sets have morphed from 0 to z
//
// Another example:
//
// 	n = 2
// Set 1
// | |
// data[i]   = '1010'
// 	| |
// 	Set 2
//
// Set 1
// | |
// data[i+1] = '3232'
// 	| |
// 	Set 2
// data[i] has a set of 1s at indices 0 and 2. We will call this set 1.
//
// data[i] also has a set of 0s at indices 2, and 3. We'll call this set 2
//
// Betwixt data[i] and data[i+1], set 1 has morphed from 1s to 3s, and set 2 has morphed from 0s, to 2s.
//
// 	What is displacement?
// 	Displacement is the sum of the absolute difference between all of the individual digits of a morphing set.
//
// 	For example;
//
// n = 3
//
// data[i]   = '000'
// data[i+1] = 'zzz'
// There is one morphing set between data[i] and data[i+1]
//
// The set in data[i] is made of 0s and the set in data[i+1] is made of zs. The displacement between the two sets is 105 ( n * 35 ).
//
// 	Another example;
//
// n = 2
//
// data[i]   = '0000'
// data[i+1] = '9999'
// In this case there are 6 morphing sets between data[i] and data[i+1]
//
// Each set is morphing from 0 to 9. Each set has two 0s and two 9s. So the displacement of each morphing set is 18 and there are a total of 6 morphing sets.
//
// 	Bringing the total displacement of morphing sets between these two adjacent strings to 108.
//
// In other words;
//
// if s is the number of morphing digits.
//
// 	and d is the displacement between the individual digits (9 in this case)
//
// and t is the total displacement of morphing sets between these two strings.
//
// then
//
// (s choose n) * d * n = t
//
// Task
// Return the total displacement of all morphing sets within the data
//
// Notes
// For this exercise, hexatridecimal digits will have lower-case letters, with 0 having the value of 0, and z having the value of 35. Digits in ascending order looks like: ('0123456789abcdefghijklmnopqrstuvwxyz')
//
// Input sizes in random tests are up to 1000 strings long so efficiency matters.
//
// 	Keep in mind you are only looking for morphing sets between adjacent strings in the data, not all of the strings.

function calculate(data, n) {
	if (!data || data.length < 2) return 0;

	const numData = data.map(row => row.split('').map(char => parseInt(char, 36)));
	const length = data[0].length;

	function getCombinations(length, n) {
		const result = [];
		const indices = Array(n).fill(0);

		for (let i = 0; i < n; i++) {
			indices[i] = i;
		}

		while (indices[0] <= length - n) {
			result.push([...indices]);

			let pos = n - 1;
			while (pos >= 0 && indices[pos] === length - n + pos) {
				pos--;
			}

			if (pos < 0) break;

			indices[pos]++;
			for (let i = pos + 1; i < n; i++) {
				indices[i] = indices[i - 1] + 1;
			}
		}

		return result;
	}

	const indexCombos = getCombinations(length, n);
	let totalOffset = 0;

	for (let i = 0; i < numData.length - 1; i++) {
		const row1 = numData[i];
		const row2 = numData[i + 1];

		for (const idx of indexCombos) {
			const a1 = row1[idx[0]];
			const a2 = row2[idx[0]];
			let same1 = true;
			let same2 = true;

			for (let j = 1; j < n; j++) {
				if (same1 && row1[idx[j]] !== a1) same1 = false;
				if (same2 && row2[idx[j]] !== a2) same2 = false;

				if (!same1 && !same2) break;
			}

			if (same1 && same2 && a1 !== a2) {
				totalOffset += Math.abs(a1 - a2) * n;
			}
		}
	}

	return totalOffset;
}