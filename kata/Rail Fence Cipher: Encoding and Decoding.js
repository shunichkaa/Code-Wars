// Create two functions to encode and then decode a string using the Rail Fence Cipher. This cipher is used to encode a string by placing each character successively in a diagonal along a set of "rails". First start off moving diagonally and down. When you reach the bottom, reverse direction and move diagonally and up until you reach the top rail. Continue until you reach the end of the string. Each "rail" is then read left to right to derive the encoded string.
//
// 	For example, the string "WEAREDISCOVEREDFLEEATONCE" could be represented in a three rail system as follows:
//
// 	W       E       C       R       L       T       E
// E   R   D   S   O   E   E   F   E   A   O   C
// A       I       V       D       E       N
// The encoded string would be:
//
// 	WECRLTEERDSOEEFEAOCAIVDEN
// Write a function/method that takes 2 arguments, a string and the number of rails, and returns the ENCODED string.
//
// 	Write a second function/method that takes 2 arguments, an encoded string and the number of rails, and returns the DECODED string.
//
// 	For both encoding and decoding, assume number of rails >= 2 and that passing an empty string will return an empty string.
//
// 	Note that the example above excludes the punctuation and spaces just for simplicity. There are, however, tests that include punctuation. Don't filter out punctuation as they are a part of the string.
//


function encodeRailFenceCipher(str, rails) {
	if (!str) return "";
	const arr = Array.from({ length: rails }, () => []);
	let row = 0, down = true;
	for (const ch of str) {
		arr[row].push(ch);
		if (rails === 1) continue;
		if (down) {
			if (row === rails - 1) {
				down = false; row--;
			} else row++;
		} else {
			if (row === 0) {
				down = true; row++;
			} else row--;
		}
	}
	return arr.flat().join("");
}

function decodeRailFenceCipher(str, rails) {
	if (!str) return "";
	const len = str.length;
	const railLens = Array(rails).fill(0);
	let row = 0, down = true;
	for (let i = 0; i < len; i++) {
		railLens[row]++;
		if (rails === 1) continue;
		if (down) {
			if (row === rails - 1) {
				down = false; row--;
			} else row++;
		} else {
			if (row === 0) {
				down = true; row++;
			} else row--;
		}
	}
	const railsArr = [];
	let pos = 0;
	for (let i = 0; i < rails; i++) {
		railsArr[i] = str.slice(pos, pos + railLens[i]).split('');
		pos += railLens[i];
	}
	let result = "";
	row = 0; down = true;
	for (let i = 0; i < len; i++) {
		result += railsArr[row].shift();
		if (rails === 1) continue;
		if (down) {
			if (row === rails - 1) {
				down = false; row--;
			} else row++;
		} else {
			if (row === 0) {
				down = true; row++;
			} else row--;
		}
	}
	return result;
}