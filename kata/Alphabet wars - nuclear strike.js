// Introduction
// There is a war and nobody knows - the alphabet war!
// The letters hide in their nuclear shelters. The nuclear strikes hit the battlefield and killed a lot of them.
// Task
// Write a function that accepts battlefield string and returns letters that survived the nuclear strike.
// The battlefield string consists of only small letters, #,[ and ].
// The nuclear shelter is represented by square brackets [].
// The letters inside the square brackets represent letters inside the shelter.
// The # means a place where nuclear strike hit the battlefield. I
// f there is at least one # on the battlefield, all letters outside of shelter die.
// When there is no any # on the battlefield, all letters survive (but do not expect such scenario too often ;-P ).
// The shelters have some durability.
// When 2 or more # hit close to the shelter, the shelter is destroyed and all letters inside evaporate.
// The 'close to the shelter' means on the ground between the shelter and the next shelter (or beginning/end of battlefield).
// The below samples make it clear for you.
// Example
// abde[fgh]ijk     => "abdefghijk"  (all letters survive because there is no # )
// ab#de[fgh]ijk    => "fgh" (all letters outside die because there is a # )
// ab#de[fgh]ij#k   => ""  (all letters dies, there are 2 # close to the shellter )
// ##abde[fgh]ijk   => ""  (all letters dies, there are 2 # close to the shellter )
// ##abde[fgh]ijk[mn]op => "mn" (letters from the second shelter survive, there is no # close)
// #ab#de[fgh]ijk[mn]op => "mn" (letters from the second shelter survive, there is no # close)
// #abde[fgh]i#jk[mn]op => "mn" (letters from the second shelter survive, there is only 1 # close)
// [a]#[b]#[c]  => "ac"
// [a]#b#[c][d] => "d"
// [a][b][c]    => "abc"
// ##a[a]b[c]#  => "c"


function alphabetWar(battlefield) {
	let shelters = [];
	let shelterStart = -1;

	for (let i = 0; i < battlefield.length; i++) {
		if (battlefield[i] === '[') {
			shelterStart = i;
		} else if (battlefield[i] === ']' && shelterStart !== -1) {
			shelters.push({
				start: shelterStart,
				end: i,
				content: battlefield.slice(shelterStart + 1, i)
			});
			shelterStart = -1;
		}
	}

	if (!battlefield.includes('#')) {
		let result = '';
		let lastEnd = 0;

		for (let shelter of shelters) {
			result += battlefield.slice(lastEnd, shelter.start).replace(/[\[\]]/g, '');
			result += shelter.content;
			lastEnd = shelter.end + 1;
		}

		result += battlefield.slice(lastEnd).replace(/[\[\]]/g, '');
		return result;
	}

	let result = '';

	for (let i = 0; i < shelters.length; i++) {
		const shelter = shelters[i];
		const prevEnd = i > 0 ? shelters[i-1].end : -1;
		const nextStart = i < shelters.length - 1 ? shelters[i+1].start : battlefield.length;

		const segmentBefore = battlefield.slice(prevEnd + 1, shelter.start);
		const segmentAfter = battlefield.slice(shelter.end + 1, nextStart);

		const hashCount = (segmentBefore.match(/#/g) || []).length +
			(segmentAfter.match(/#/g) || []).length;

		if (hashCount < 2) {
			result += shelter.content;
		}
	}

	return result;
}