// I have a cat and a dog.
// I got them at the same time as kitten/puppy. That was humanYears years ago.
// Return their respective ages now as [humanYears, catYears, dogYears]
// NOTES:
// humanYears >= 1
// humanYears are whole numbers only
// Cat Years: 15 cat years for first year, +9 for second year, +4 for each year after that
// Dog Years: 15 dog years for first year, +9 for second year, +5 for each year after that


var humanYearsCatYearsDogYears = function(humanYears) {
	if (humanYears <= 0) return [0, 0, 0];

	let catYears = 15;
	let dogYears = 15;

	if (humanYears >= 2) {
		catYears += 9;
		dogYears += 9;

		if (humanYears > 2) {
			catYears += (humanYears - 2) * 4;
			dogYears += (humanYears - 2) * 5;
		}
	}

	return [humanYears, catYears, dogYears];
}