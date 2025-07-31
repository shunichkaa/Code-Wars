// Note: Libraries are disabled for this kata.
// Doing arithmetic with big numbers is impossible to do with regular integer types.
// In JavaScript (which represents numbers as 64-bit floats), anything beyond 2^53-1 becomes increasingly less accurate.
// For example, 12345678901234567890 becomes 12345678901234567000— off by 890.
// For this reason, the only way of accurately representing such large integers is as strings.
// You must write two functions, bigAdd and bigSub, which will both take two arguments.
// These two arguments will either be a valid representation of an integer as a string (negative or positive, no leading zeros), or a regular number.
// They will return the correct answer as a string, bigAdd summing the two values, and bigSub subtracting the second value from the first.
// For example:
// bigAdd(1, "123456789012345678901234567890") === "123456789012345678901234567891";
// bigSub("123456789012345678901234567890", 1) === "123456789012345678901234567889";
// Remember, the values could be negative, and so the calculations should be made accordingly.
// bigAdd(-1, "123456789012345678901234567890") === "123456789012345678901234567889";
// bigSub("123456789012345678901234567890", -1) === "123456789012345678901234567891";


function normalizeInput(n) {
	return typeof n === 'number' ? n.toString() : n;
}

function removeLeadingZeros(s) {
	return s.replace(/^(-?)0+(?!$)/, '$1');
}

function compareAbs(a, b) {
	if (a.length !== b.length) return a.length - b.length;
	return a.localeCompare(b);
}

function addStrings(a, b) {
	let carry = 0, res = '';
	a = a.split('').reverse();
	b = b.split('').reverse();
	const len = Math.max(a.length, b.length);

	for (let i = 0; i < len; i++) {
		const sum = (+a[i] || 0) + (+b[i] || 0) + carry;
		res = (sum % 10) + res;
		carry = Math.floor(sum / 10);
	}
	if (carry) res = carry + res;
	return res;
}

function subStrings(a, b) {
	let res = '', borrow = 0;
	a = a.split('').reverse();
	b = b.split('').reverse();

	for (let i = 0; i < a.length; i++) {
		let diff = (+a[i]) - (+b[i] || 0) - borrow;
		if (diff < 0) {
			diff += 10;
			borrow = 1;
		} else {
			borrow = 0;
		}
		res = diff + res;
	}

	return removeLeadingZeros(res);
}

function bigAdd(a, b) {
	a = normalizeInput(a);
	b = normalizeInput(b);

	const negA = a[0] === '-';
	const negB = b[0] === '-';

	a = negA ? a.slice(1) : a;
	b = negB ? b.slice(1) : b;

	if (negA === negB) {
		const sum = addStrings(a, b);
		return (negA ? '-' : '') + removeLeadingZeros(sum);
	}

	const cmp = compareAbs(a, b);
	if (cmp === 0) return '0';
	if (cmp > 0) {
		const diff = subStrings(a, b);
		return (negA ? '-' : '') + diff;
	} else {
		const diff = subStrings(b, a);
		return (negB ? '-' : '') + diff;
	}
}

function bigSub(a, b) {
	b = normalizeInput(b);
	if (b[0] === '-') {
		return bigAdd(a, b.slice(1));
	} else {
		return bigAdd(a, '-' + b);
	}
}