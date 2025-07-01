// Divide numbers as strings
//
// Input can be integer, negative, zero, or decimal in string format.
// 	Input may be very large.
// 	Input won't have leading or trailing zeroes.
// Result should be returned as strings without leading or trailing zeroes.
// 	Recurring results should be to 20 decimal places. i.e. 1/3 should return 0.33333333333333333333. Just stop computing when your result gets to 20 decimal places. (i.e. no need to compute to 21 decimal places and round to 20 decimal places).
// If divisor is zero, throw Error (Exception in PHP).
// 0.00000000000000000000 is just 0.
// You may first attempt Voile's Divide integers as strings as an appetizer.
//
// Note: bignumber.js is not allowed and your code length should be less than or equal to 6000 symbols.
//

function divide(dividend, divisor) {
	return (dividend / divisor).toFixed(20);
}