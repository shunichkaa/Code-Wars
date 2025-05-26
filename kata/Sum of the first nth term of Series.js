// Your task is to write a function which returns the n-th term of the following series, which is the sum of the first n terms of the sequence (n is the input parameter).
// Rules
// You need to round the answer to 2 decimal places and return it as String.
//
// 	If the given value is 0 then it should return "0.00".
//
// 	You will only be given Natural Numbers as arguments.

const SeriesSum = n => n ? (Array(n).fill().reduce((sum, _, i) => sum + 1 / (1 + i * 3), 0)).toFixed(2) : "0.00";