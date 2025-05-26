// Sum all the numbers of a given array ( cq. list ), except the highest and the lowest element ( by value, not by index! ).
// The highest or lowest element respectively is a single element at each edge, even if there are more than one with the same value.
// 	Mind the input validation.
// If an empty value ( null, None, Nothing, nil etc. ) is given instead of an array, or the given array is an empty list or a list with only 1 element, return 0.


function sumArray(array) {
	if (!array || array.length <=1) return 0;
	const max = Math.max(...array);
	const min = Math.min(...array);
	return array.reduce((a, b) => a + b) - max - min;
}