// You are given an array(list) strarr of strings and an integer k.
// Your task is to return the first longest string consisting of k consecutive strings taken in the array.
// Examples:
// strarr = \["tree", "foling", "trashy", "blue", "abcdef", "uvwxyz"], k = 2
// Concatenate the consecutive strings of strarr by 2, we get:
// treefoling   (length 10)  concatenation of strarr\[0] and strarr\[1]
// folingtrashy (length 12)  concatenation of strarr\[1] and strarr\[2]
// trashyblue   (length 10)  concatenation of strarr\[2] and strarr\[3]
// blueabcdef   (length 10)  concatenation of strarr\[3] and strarr\[4]
// abcdefuvwxyz (length 12)  concatenation of strarr\[4] and strarr\[5]
// Two strings are the longest: "folingtrashy" and "abcdefuvwxyz".
// The first that came is "folingtrashy" so
// longest\_consec(strarr, 2) should return "folingtrashy".
// In the same way:
// longest\_consec(\["zone", "abigail", "theta", "form", "libe", "zas", "theta", "abigail"], 2) --> "abigailtheta"
// n being the length of the string array, if n = 0 or k > n or k <= 0 return "" (return Nothing in Elm, "nothing" in Erlang).
// Note
// consecutive strings : follow one after another without an interruption


function longestConsec(strarr, k) {
	if (!isValidInput(strarr, k)) return '';
	let longest = '';
	for (let i = 0; i <= strarr.length - k; i++) {
		const consecutive = strarr.slice(i, i + k).join('');
		if (consecutive.length > longest.length) {
			longest = consecutive;
		}
	}
	return longest;
}
const isValidInput = (arr, k) => k > 0 && arr.length >= k;