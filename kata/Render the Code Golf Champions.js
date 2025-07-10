// Everybody loves to code golf. Well, maybe not everybody, but some people do. This kata is not directed to such people.
//
// 	Task
// Given a bunch of user submissions to a code golf kata, and a minimum amount of submissions required to process the input, render a string containing information about the code golf champions.
//
// 	Code Golf Champion
//
// A code golf champion is a user that at any given moment holds the record (shortest code length), with that moment starting when at least "minimum submission count" submissions have been submitted, as we don't want early birds to take credit just because there aren't enough submissions yet.
//
// 	Input
//
// submissions
//
// An array containing the user submissions to a code golf kata, in chronological order of submission timestamp, oldest first. Each user submission is a (2-)tuple consisting of two elements: the name of the user (string), and the length of the code (integer). An example of two submissions: [["Tim",45], ["Jeff",42]].
//
// 	minimum submission count
//
// An integer representing the minimum amount of submissions required to start tracking code golf champions: 1 <= minimum submission count. If there are fewer submissions than this parameter, there can be no result outputted. While the number of submissions is within this parameter, we don't start tracking champions just yet. From the moment we hit this threshold, the users with the current best code lengths are the initial champions.
//
// Output
//
// A string representing information about the code golf champions. If the number of submissions is smaller than "minimum submission count", return an empty string. In other cases, the expected output is a ;  delimited string concatenating information about each champion, in order of best code length of any of the submissions of the respective user. On tie, order on user that first submitted a submission of that code length.
//
// 	Note that not all users are champions. Only those that at some point after "minimum submission count" submissions to the kata have held or still hold the record. This means, once "minimum submission count" submissions have been submitted, we start with the current record holder(s) as first champions.
//
// 	For each champion, render the user name, concatenated with  -  and then the code lengths of all submissions of that user that at some point were a record in the kata, in ascending order, delimited by , . If for some code lengths, the user made multiple submissions that were a record at the time of submission, show them as one code length, with the number of such submissions between parentheses.
//
// 	A note about whitespace: use a blank space after each , after each ; around each - and before each (.
//
// 	examples output
//
// • "Joanne - 22" -> Joanne is the only champion, with a record submission of code length 22
//
// • "Joanne - 22, 23" -> Joanne is the only champion, with a record submission of code length 22, but also had at one point a record submission of length 23
//
// • "Mark - 21; Joanne - 22, 23 (2)" -> Mark is the current champion, with a record submission of length 21. Joanne at some point had a record submission of length 22, and 2 record submissions of length 23 before that.
//
// 	Example Tests
// These tests are available in the sample test cases, among others.
//
// // too few submissions
// renderChampions([["Tim",45], ["Jeff",42]], 3) -> ""
//
// // Joanne has the record of length 22, but also had the record of 23 after 1 submission
// renderChampions([["Joanne",23], ["Joanne",22]], 1) -> "Joanne - 22, 23"
//
// // Joanne has the record of length 22, which is the best result after 2 submissions
// renderChampions([["Joanne",23], ["Joanne",22]], 2) -> "Joanne - 22"
//
// // Jane has the record of length 34, but John had the record of length 35 after 1 submission
// renderChampions([["John",35], ["Jane",34]], 1) -> "Jane - 34; John - 35"
//
// // Jane has the record of length 34, as John's attempt was in the initial 2 submissions and got overshadowed by Jane's attempt
// renderChampions([["John",35], ["Jane",34]], 2) -> "Jane - 34"
//
// // John has the record of length 114, but he also has 2 record submissions of length 117, note that his 3th 117 does not count, as a better record was made by Jane in between of length 115.
// renderChampions([["Jane",118], ["John",117], ["John",117], ["Jane",115], ["John",117], ["John",114]], 2) -> "John - 114, 117 (2); Jane - 115"

function renderChampions(sub, minimumSub) {
	if (sub.length < minimumSub) {
		return "";
	}
	let start = sub.slice(0, minimumSub).sort((a, b) => a[1] - b[1]);
	let smallest = start[0][1];
	let champs = sub
	.filter((a) => {
		if (a[1] <= smallest) {
			smallest = a[1];
			return true;
		}
		return false;
	})
	.sort((a, b) => a[1] - b[1]);
	let obj = {};
	champs.forEach((v) => {
		if (v[0] in obj) {
			obj[v[0]].push(v[1]);
		} else {
			obj[v[0]] = new Array();
			obj[v[0]].push(v[1]);
		}
	});
	const asArray = Object.entries(obj);
	return asArray
	.map(([key, value]) => [key, value.sort((a, b) => (a > b ? 1 : -1))])
	.map(([key, value]) => [
		key,
		value.map((x) => {
			let count = 0;
			value.forEach((v) => v === x && count++);
			if (count > 1) {
				return `${x} (${count})`;
			}
			return x;
		}),
	])
	.map(([key, value]) => [
		key,
		[...new Set(value)].map((x, i) => (i > 0 ? ` ${x}` : x)),
	])
	.map((x) => x.join(" - "))
	.join("; ");
}