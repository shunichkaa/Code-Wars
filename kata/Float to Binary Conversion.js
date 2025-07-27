// I need you to implement a function called float2bin that converts a float number to the corresponding 32-bit binary value. This involves analysing each part of the input number and appointing each bit of the output accordingly. See visual explanation from wiki below:
//
// 	IEEE754 visual
//
// Rules:
//
// 	The conversion should match the IEEE754 Single precision 32-bit technical standard.
// 	The implementation should be able to handle both Strings ("123", "1.23") and Numbers (123, 1.23) as input.
// 	It should convert both positive and negative numbers.
// 	The output should always be a 32 characters long string, so padding of 0's is necessary if input is not negative.
// The point of this kata is to teach how floats are build on a binary level, so typed arrays are disabled.
// 	Expectations and limitations:
//
// 	The input is valid numbers or strings of numbers.
// 	No weird edge cases are tested.
// 	Since there always is some rounding inaccuracy when working with floats, the last 5 characters in the output will not be checked. This is done using something similar to the approx function in the test fixture.


function float2bin(input) {
	const num = Number(input);
	if (num === 0) return '0'.repeat(32);
	if (isNaN(num)) return '0'.repeat(32);

	const sign = num < 0 ? '1' : '0';
	const absNum = Math.abs(num);

	let exponent;
	let mantissa;

	if (!isFinite(absNum)) {
		exponent = '1'.repeat(8);
		mantissa = '0'.repeat(23);
	} else {

		let e = 0;
		let normalized;

		if (absNum >= 2) {
			e = Math.floor(Math.log2(absNum));
			normalized = absNum / Math.pow(2, e);
		} else if (absNum < 1) {
			e = Math.floor(Math.log2(absNum));
			normalized = absNum / Math.pow(2, e);
		} else {
			e = 0;
			normalized = absNum;
		}

		exponent = (e + 127).toString(2).padStart(8, '0');

		normalized -= 1;

		mantissa = '';
		let frac = normalized;
		for (let i = 0; i < 23; i++) {
			frac *= 2;
			if (frac >= 1) {
				mantissa += '1';
				frac -= 1;
			} else {
				mantissa += '0';
			}
		}
	}

	return sign + exponent + mantissa;
}