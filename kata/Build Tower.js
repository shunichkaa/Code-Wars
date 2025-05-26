// Build Tower
// Build a pyramid-shaped tower, as an array/list of strings, given a positive integer number of floors. A tower block is represented with "*" character.
//
// 	For example, a tower with 3 floors looks like this:
//
// [
// 	"  *  ",
// 	" *** ",
// 	"*****"
// ]
// And a tower with 6 floors looks like this:
//
// [
// 	"     *     ",
// 	"    ***    ",
// 	"   *****   ",
// 	"  *******  ",
// 	" ********* ",
// 	"***********"
// ]



function towerBuilder(nFloors) {
	const ASTERISK = '*';
	const SPACE = ' ';

	function createTowerRow(rowNumber, totalRows) {
		const spaces = SPACE.repeat(totalRows - rowNumber);
		const asterisks = ASTERISK.repeat(2 * rowNumber - 1);
		return spaces + asterisks + spaces;
	}

	const tower = [];
	for (let i = 1; i <= nFloors; i++) {
		tower.push(createTowerRow(i, nFloors));
	}

	return tower;
}
