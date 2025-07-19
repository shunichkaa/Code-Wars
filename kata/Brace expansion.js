// Expand the braces of the specified string. See https://en.wikipedia.org/wiki/Bash_(Unix_shell)#Brace_expansion
//
// 	In the input string, balanced pairs of braces containing comma-separated substrings represent alternations that specify multiple alternatives which are to appear at that position in the output.
//
// 	@param {string} str
// @return {Array.<string>}
// 		NOTE: The order of output string does not matter.
//
// 		Example:
//
// 		"~/{Downloads,Pictures}/*.{jpg,gif,png}" -> [ "~/Downloads/*.jpg"
// 		, "~/Downloads/*.gif"
// 		, "~/Downloads/*.png"
// 		, "~/Pictures/*.jpg"
// 		, "~/Pictures/*.gif"
// 		, "~/Pictures/*.png"
// 		]
// 		"It{{em,alic}iz,erat}e{d,}, please." -> [ "Itemized, please."
// 		, "Itemize, please."
// 		, "Italicized, please."
// 		, "Italicize, please."
// 		, "Iterated, please."
// 		, "Iterate, please."
// 		]
// 		"thumbnail.{png,jp{e,}g}" -> [ "thumbnail.png"
// 		, "thumbnail.jpeg"
// 		, "thumbnail.jpg"
// 		]
// 		"nothing to do" -> [ "nothing to do" ]
// 		(c)RSS
//


function expandBraces(str) {
	const results = [];

	function helper(s) {
		let i = 0;
		while (i < s.length && s[i] !== '{') i++;
		if (i === s.length) {
			results.push(s);
			return;
		}

		let j = i, depth = 0;
		for (; j < s.length; j++) {
			if (s[j] === '{') depth++;
			else if (s[j] === '}') {
				if (--depth === 0) break;
			}
		}

		const before = s.slice(0, i);
		const after = s.slice(j + 1);
		const inner = s.slice(i + 1, j);

		const options = [];
		let option = '', level = 0;
		for (let ch of inner) {
			if (ch === ',' && level === 0) {
				options.push(option);
				option = '';
			} else {
				if (ch === '{') level++;
				if (ch === '}') level--;
				option += ch;
			}
		}
		options.push(option);

		for (let opt of options) {
			helper(before + opt + after);
		}
	}

	helper(str);
	return results;
}