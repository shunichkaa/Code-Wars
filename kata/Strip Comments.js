// Complete the solution so that it strips all text that follows any of a set of comment markers passed in.
// Any whitespace at the end of the line should also be stripped out.
// Example:
// Given an input string of:
// apples, pears # and bananas
// grapes
// bananas !apples
// The output expected would be:
// apples, pears
// grapes
// bananas


function solution(text, markers) {
	return text
	.split('\n')
	.map(line => {
		let idx = line.length;
		for (const marker of markers) {
			const i = line.indexOf(marker);
			if (i !== -1 && i < idx) idx = i;
		}
		return line.slice(0, idx).trimEnd();
	})
	.join('\n');
}