// Task
// For each given a number N, the integer S is called integer square root of N if S x S <= N and (S+1) x (S+1) > N.
//
// 	In other words, S = Math.floor(Math.sqrt(N))
//
// Your task is to calculate the integer square root of a given Number.
//
// 	Note: Input is given in string format. That is, the Number may be very very large ;-)
//
// Example
// For: Number = "4", result = "2".
//
// 	For: Number = "17", result = "4".
//
// 	For: Number = "101", result = "10".
//
// 	For: Number = "23232328323215435345345345343458098856756556809400840980980980980809092343243243243243098799634", result = "152421548093487868711992623730429930751178496967".
//
// 	Input/Output
// 	[input] string Number
// number in decimal form. 0 < Number < 10^100
//
// 	[output] a string
// integer squareroot of Number.
//


function add(a, b) {
	let res = '';
	let carry = 0;
	a = a.split('').reverse();
	b = b.split('').reverse();
	let n = Math.max(a.length, b.length);
	for (let i = 0; i < n; i++) {
		let x = i < a.length ? +a[i] : 0;
		let y = i < b.length ? +b[i] : 0;
		let sum = x + y + carry;
		carry = Math.floor(sum / 10);
		res = (sum % 10) + res;
	}
	if (carry) res = carry + res;
	return res.replace(/^0+/, '') || '0';
}

function subtract(a, b) {
	// a >= b гарантируется
	let res = '';
	let borrow = 0;
	a = a.split('').reverse();
	b = b.split('').reverse();
	for (let i = 0; i < a.length; i++) {
		let x = a[i];
		let y = i < b.length ? +b[i] : 0;
		let diff = x - y - borrow;
		if (diff < 0) {
			diff += 10;
			borrow = 1;
		} else {
			borrow = 0;
		}
		res = diff + res;
	}
	return res.replace(/^0+/, '') || '0';
}

function divideBy2(s) {
	let res = '';
	let carry = 0;
	for (let i = 0; i < s.length; i++) {
		let cur = carry * 10 + (+s[i]);
		res += Math.floor(cur / 2);
		carry = cur % 2;
	}
	return res.replace(/^0+/, '') || '0';
}

function multiply(a, b) {
	let res = Array(a.length + b.length).fill(0);
	for (let i = a.length - 1; i >= 0; i--) {
		for (let j = b.length - 1; j >= 0; j--) {
			let mul = (+a[i]) * (+b[j]) + res[i + j + 1];
			res[i + j + 1] = mul % 10;
			res[i + j] += Math.floor(mul / 10);
		}
	}
	while (res.length > 1 && res[0] === 0) res.shift();
	return res.join('');
}

function compare(a, b) {
	a = a.replace(/^0+/, '') || '0';
	b = b.replace(/^0+/, '') || '0';
	if (a.length > b.length) return 1;
	if (a.length < b.length) return -1;
	for (let i = 0; i < a.length; i++) {
		if (a[i] > b[i]) return 1;
		if (a[i] < b[i]) return -1;
	}
	return 0;
}

function integerSquareRoot(Number) {
	if (Number === '0') return '0';
	let left = '0';
	let right = Number;
	let ans = '0';

	while (compare(left, right) <= 0) {
		let mid = divideBy2(add(left, right));
		let sq = multiply(mid, mid);
		if (compare(sq, Number) <= 0) {
			ans = mid;
			left = add(mid, '1');
		} else {
			right = subtract(mid, '1');
		}
	}

	return ans;
}