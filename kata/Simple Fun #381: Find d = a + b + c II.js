// If you have an infinitely fast computer, let the algorithm go to hell!
//
// 	But, do you have a computer like above? If no, please learn something about the algorithm ;-)
//
// Task
// You are given a sorted integer array arr. It contains several uniq integers(negative, positive, or zero).
//
// Your task is to find the largest d such that a + b + c = d, where a, b, c, and d are distinct elements of arr. If no such an element d found, return null.
//
// 	Still not understand the task? Look at the following example ;-)
//
// Example
// For arr = [2,3,5,7,12], the output should be 12.
//
// 12 = 2 + 3 + 7
// For arr = [2,16,64,256,1024], the output should be null.
//
// 	No such an element d found.
//
// 	For arr = [-100,-1,0,7,101], the output should be 0.
//
// 0 = -100 + -1 + 101
// Note
// 3 < arr.length <= 1000
//
// -10^8 <= arr[i] <= 10^8
//
// In order to avoid timeout, be aware of the code's performance ;-)
//
// Happy Coding ^_^
//



function findD(arr) {
	const n = arr.length;
	for (let i = n - 1; i >= 0; i--) {
		const d = arr[i];
		for (let a = 0; a < n; a++) {
			if (a === i) continue;
			let left = 0;
			let right = n - 1;
			while (left < right) {
				if (left === i || left === a) {
					left++;
					continue;
				}
				if (right === i || right === a) {
					right--;
					continue;
				}
				if (left >= right) break;

				const sum = arr[a] + arr[left] + arr[right];
				if (sum === d) return d;
				else if (sum < d) left++;
				else right--;
			}
		}
	}
	return null;
}
