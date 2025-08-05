// Task
// You are given two strings s and t of the same length, consisting of uppercase English letters. Your task is to find the minimum number of "replacement operations" needed to get some anagram of the string t from the string s. A replacement operation is performed by picking exactly one character from the string s and replacing it by some other character.
//
// 	About anagram: А string x is an anagram of a string y if one can get y by rearranging the letters of x. For example, the strings "MITE" and "TIME" are anagrams, so are "BABA" and "AABB", but "ABBAC" and "CAABA" are not.
//
// 	Example
// For s = "AABAA" and t = "BBAAA", the output should be 1;
//
// For s = "OVGHK" and t = "RPGUC", the output should be 4.
//
// Input/Output
// 	[input] string s
//
// Constraints: 5 ≤ s.length ≤ 35.
//
// 	[input] string t
//
// Constraints: t.length = s.length.
//
// 	[output] an integer
//
// The minimum number of replacement operations needed to get an anagram of the string t from the string s.


function createAnagram(s, t) {
	const freqS = {};
	const freqT = {};

	for (const ch of s) freqS[ch] = (freqS[ch] || 0) + 1;
	for (const ch of t) freqT[ch] = (freqT[ch] || 0) + 1;

	let replacements = 0;
	for (const ch in freqT) {
		const countS = freqS[ch] || 0;
		if (freqT[ch] > countS) {
			replacements += freqT[ch] - countS;
		}
	}

	return replacements;
}