// Pig latin is created by taking all the consonants before the first vowel (for the purposes of this kata, a "vowel" is any letter from the set a, e, i, o, u) of a word and moving them to the back of the word followed by the letters "ay".
//
// "hello" => "ellohay"
// "creating" => "eatingcray"
// If the first letter of the word is a vowel, the string is left the same and the letters "way" are appended to the end.
//
// "algorithm" => "algorithmway"
// If a word has no vowels, just append "ay" to the end of it.
//
// "gym" => "gymay"
// This problem is different from other variations in that it expects casing to remain the same so:
//
// 	"Hello World" => "Ellohay Orldway"
// as well as punctuation (for the purposes of this kata, "punctuation" includes ,, ., !, ?, :, ;).
//
// "Pizza? Yes please!" => "Izzapay? Esyay easeplay!"
// Numbers should be left as-is.
//
// "0875568" => "0875568"
// Your job is to take a string and translate it to Pig Latin. The string will never be undefined but may contain both numbers and letters. A word will never be a combination of numbers and letters. Also, there will never be punctuation at the beginning of a word and the only capital letter in a word will be the first letter meaning there are zero all capitalized words.
//

function translate(str) {
	const vowels = "aeiouAEIOU";
	const punctuation = ",.!?:;";
	return str.split(" ").map(word => {
		if (/^\d+$/.test(word)) return word;

		let endPunct = "";
		while (word.length && punctuation.includes(word[word.length - 1])) {
			endPunct = word[word.length - 1] + endPunct;
			word = word.slice(0, -1);
		}
		if (!word) return endPunct;

		const firstIsVowel = vowels.includes(word[0]);
		let firstVowelIndex = -1;
		for (let i = 0; i < word.length; i++) {
			if (vowels.includes(word[i])) {
				firstVowelIndex = i;
				break;
			}
		}

		if (firstIsVowel) {
			word = word + "way";
		} else if (firstVowelIndex === -1) {
			word = word + "ay";
		} else {
			let head = word.slice(0, firstVowelIndex);
			let tail = word.slice(firstVowelIndex);
			let transformed = tail + head + "ay";
			if (word[0] === word[0].toUpperCase()) {
				transformed = transformed[0].toUpperCase() + transformed.slice(1).toLowerCase();
			} else {
				transformed = transformed.toLowerCase();
			}
			word = transformed;
		}
		return word + endPunct;
	}).join(" ");
}
