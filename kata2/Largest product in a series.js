// Complete the method so that it'll find the greatest product of five consecutive digits in the given string of digits.
//
// For example: the greatest product of five consecutive digits in the string "123834539327238239583" is 3240.
//
// The input string always has more than five digits.
//
// 	Adapted from Project Euler.

function greatestProduct(input) {
	let maxProduct = 0;
	for (let i = 0; i <= input.length - 5; i++) {
		let product = 1;
		for (let j = 0; j < 5; j++) {
			product *= Number(input[i + j]);
		}
		if (product > maxProduct) maxProduct = product;
	}
	return maxProduct;
}
