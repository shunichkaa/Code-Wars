// In this kata, your task is to create all permutations of a non-empty input string and remove duplicates, if present.
//
// 	Create as many "shufflings" as you can!
//
// 	Examples:
//
// With input 'a':
// Your function should return: ['a']
//
// With input 'ab':
// Your function should return ['ab', 'ba']
//
// With input 'abc':
// Your function should return ['abc','acb','bac','bca','cab','cba']
//
// With input 'aabb':
// Your function should return ['aabb', 'abab', 'abba', 'baab', 'baba', 'bbaa']
// Note: The order of the permutations doesn't matter.
//

function permutations(str) {
	const result = new Set();

	function backtrack(path, used) {
		if (path.length === str.length) {
			result.add(path);
			return;
		}

		for (let i = 0; i < str.length; i++) {
			if (used[i]) continue;
			used[i] = true;
			backtrack(path + str[i], used);
			used[i] = false;
		}
	}

	backtrack('', Array(str.length).fill(false));
	return [...result];
}
