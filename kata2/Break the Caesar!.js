// The Caesar cipher is a notorious (and notoriously simple) algorithm for encrypting a message: each letter is shifted a certain constant number of places in the alphabet. For example, applying a shift of 5 to the string "Hello, world!" yields "Mjqqt, btwqi!", which is jibberish.
//
// 	In this kata, your task is to decrypt Caesar-encrypted messages using nothing but your wits, your computer, and a set of the 1000 (plus a few) most common words in English in lowercase (made available to you as a preloaded variable named WORDS, which you may use in your code as if you had defined it yourself).
//
// Given a message, your function must return the most likely shift value as an integer.
// 	A few hints:
//
// 	Be wary of punctuation
// Shift values may not be higher than 25

function breakCaesar(st) {
	const alphabet = 'abcdefghijklmnopqrstuvwxyz';
	const wordsSet = new Set(WORDS);

	function shiftChar(c, shift) {
		const lower = c.toLowerCase();
		if (!alphabet.includes(lower)) return c;
		const isUpper = c !== lower;
		const idx = alphabet.indexOf(lower);
		let shiftedIdx = (idx - shift) % 26;
		if (shiftedIdx < 0) shiftedIdx += 26;
		const shiftedChar = alphabet[shiftedIdx];
		return isUpper ? shiftedChar.toUpperCase() : shiftedChar;
	}

	function decode(text, shift) {
		return [...text].map(c => shiftChar(c, shift)).join('');
	}

	function countValidWords(text) {
		const tokens = text.toLowerCase().split(/[^a-z]+/).filter(Boolean);
		let count = 0;
		for (const word of tokens) {
			if (wordsSet.has(word)) count++;
		}
		return count;
	}

	let bestShift = 0;
	let maxMatches = -1;
	for (let shift = 0; shift <= 25; shift++) {
		const decoded = decode(st, shift);
		const matches = countValidWords(decoded);
		if (matches > maxMatches) {
			maxMatches = matches;
			bestShift = shift;
		}
	}
	return bestShift;
}
