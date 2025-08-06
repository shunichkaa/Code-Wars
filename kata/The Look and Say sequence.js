// From Wikipedia:
//
// 	In mathematics, the look-and-say sequence is the sequence of integers beginning as follows:
//
// 	1, 11, 21, 1211, 111221, 312211, …
// To generate a member of the sequence from the previous member, read off the digits of the previous member, counting the number of digits in groups of the same digit. For example:
//
// 	1 is read off as "one 1" or 11.
// 11 is read off as "two 1s" or 21.
// 21 is read off as "one 2, then one 1" or 1211.
// 1211 is read off as "one 1, then one 2, then two 1s" or 111221.
// 111221 is read off as "three 1s, then two 2s, then one 1" or 312211.
// Your mission is to write a function which, given an integer "n" as parameter, returns a comma separated list of the first "n" terms of the sequence. For 0, negative, or NaN parameters, -1 shall be returned.
//
// 	For example:
//
// 	getLines(2);  //  "1,11"
// getLines(3);  //  "1,11,21"
// getLines(5);  //  "1,11,21,1211,111221"


function getLines(line) {
	if (typeof line !== 'number' || line <= 0 || isNaN(line)) {
		return -1;
	}

	const result = [];
	let current = "1";

	for (let i = 0; i < line; i++) {
		result.push(current);

		let next = "";
		let count = 1;

		for (let j = 1; j <= current.length; j++) {
			if (current[j] === current[j - 1]) {
				count++;
			} else {
				next += count + current[j - 1];
				count = 1;
			}
		}

		current = next;
	}

	return result.join(",");
}