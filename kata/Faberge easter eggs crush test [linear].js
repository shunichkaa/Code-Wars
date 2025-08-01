// This is the SUPER performance version of This kata.
//
// 	You task is exactly the same as that kata. But this time, you should output result % 998244353, or otherwise the result would be too large.
//
// 	Data range
// sometimes
// n <= 80000
// m <= 100000
// while sometimes
// 	n <= 3000
// m <= 2^200
// There are 150 random tests. You will need more than just a naive linear algorithm for this task :D
//


const mo = 998244353n;
let arr = [0n, 1n]
for(let i = 2n; i < 80001n; i++) arr.push((mo - mo / i) * arr[mo % i] % mo)

function height(n, m) {
	let [a, b] = [0n, 1n]
	for(let i = 1n; i <= n; i++){
		b = b * (m - i + 1n) * arr[i] % mo
		a = (a + b) % mo
	}
	return a
}