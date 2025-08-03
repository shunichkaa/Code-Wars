// Gigi is a clever monkey, living in the zoo, his teacher (animal keeper) recently taught him some knowledge of "0".
//
// 	In Gigi's eyes, "0" is a character contains some circle (maybe one, maybe two).
//
// So, a is a "0",b is a "0",6 is also a "0"，and 8 have two "0" ,etc...
//
// Now, write some code to count how many "0"s in the text.
//
// 	Let us see who is smarter? You ? or monkey?
//
// 	Input always be a string (including words numbers and symbols)，You don't need to verify it, but pay attention to the difference between uppercase and lowercase letters.
//
// Here is a table of characters：
//
// Number of zeros	Characters
// 1	abdegopq069DOPQR     () <-- A pair of braces as a zero
// 2	%&B8
// Output will be a number of "0".
//


function countzero(s) {
	const zeroMap = {
		'a':1,'b':1,'d':1,'e':1,'g':1,'o':1,'p':1,'q':1,'0':1,'6':1,'9':1,
		'D':1,'O':1,'P':1,'Q':1,'R':1,
		'%':2,'&':2,'B':2,'8':2
	};
	let count = 0;
	for (let i = 0; i < s.length; i++) {
		if (s[i] === '(' && s[i+1] === ')') {
			count += 1;
			i++; // пропускаем ')'
		} else if (zeroMap[s[i]]) {
			count += zeroMap[s[i]];
		}
	}
	return count;
}