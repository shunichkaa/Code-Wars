// Given an array of integers, arr, find out 2 indices m, n(0<=m<=arr.length-1, 0<=n<=arr.length-1, m<=n), so that as long as all elements in the subarray(from index m to n, indices m and n inclusive) are sorted properly, with this sorted subarray relacing original subarray, the whole array is sorted (no matter ascendingly or descendingly).
//
// The subarray should include the least number of elements, means (n-m) must be of the smallest value, and n should also be the smallest one.
//
// 	The function accept an array of integers, arr, reutrn the subarray's start and end index in array format, [m,n] as a result.
//
// For example, in an array [1,2,3,6,4,4], the SMALLEST(with the least numbers of integers) subarray to be found is [6,4,4], if we sort it to [4,4,6], then replace the original subarray, the whole array now turns to be[1,2,3,4,4,6], which is sorted completely. This subarray begins from index 3, and ends in index 5, so the result is [3,5].
//
// 	If all elements in the array are the same, return array [0,0]. If all elements in the array are already sorted, no matter ascendingly or descendingly, return [0,0] as well.


function findIndexOfSubArray(arr) {
	const n = arr.length;

	// Проверка, все ли элементы равны
	if (arr.every(x => x === arr[0])) return [0, 0];

	// Проверка сортировки по возрастанию
	const ascending = arr.every((v, i, a) => i === 0 || a[i] >= a[i - 1]);
	// Проверка сортировки по убыванию
	const descending = arr.every((v, i, a) => i === 0 || a[i] <= a[i - 1]);

	if (ascending || descending) return [0, 0];

	// Найдём минимальный и максимальный элементы, которые нарушают сортировку по возрастанию
	let startAsc = 0;
	while (startAsc < n - 1 && arr[startAsc] <= arr[startAsc + 1]) startAsc++;

	let endAsc = n - 1;
	while (endAsc > 0 && arr[endAsc] >= arr[endAsc - 1]) endAsc--;

	// Найдём min и max в подмассиве arr[startAsc...endAsc]
	let subMin = Infinity;
	let subMax = -Infinity;
	for (let i = startAsc; i <= endAsc; i++) {
		if (arr[i] < subMin) subMin = arr[i];
		if (arr[i] > subMax) subMax = arr[i];
	}

	// Расширяем startAsc влево, если есть элементы больше subMin
	while (startAsc > 0 && arr[startAsc - 1] > subMin) startAsc--;
	// Расширяем endAsc вправо, если есть элементы меньше subMax
	while (endAsc < n - 1 && arr[endAsc + 1] < subMax) endAsc++;

	// Аналогично для сортировки по убыванию:
	// Но так как нам надо вернуть самый маленький по длине подмассив
	// для любого направления сортировки, проверим вариант и для убывания

	// Найдём минимальный и максимальный элементы, которые нарушают сортировку по убыванию
	let startDesc = 0;
	while (startDesc < n - 1 && arr[startDesc] >= arr[startDesc + 1]) startDesc++;

	let endDesc = n - 1;
	while (endDesc > 0 && arr[endDesc] <= arr[endDesc - 1]) endDesc--;

	// min и max для подмассива по убыванию
	let subMinDesc = Infinity;
	let subMaxDesc = -Infinity;
	for (let i = startDesc; i <= endDesc; i++) {
		if (arr[i] < subMinDesc) subMinDesc = arr[i];
		if (arr[i] > subMaxDesc) subMaxDesc = arr[i];
	}

	while (startDesc > 0 && arr[startDesc - 1] < subMaxDesc) startDesc--;
	while (endDesc < n - 1 && arr[endDesc + 1] > subMinDesc) endDesc++;

	// Выберем более короткий подмассив из двух вариантов (возрастающий / убывающий)
	const lengthAsc = endAsc - startAsc;
	const lengthDesc = endDesc - startDesc;

	if (lengthAsc < 0 && lengthDesc < 0) return [0, 0]; // массив уже отсортирован (редкий случай)

	if (lengthAsc < lengthDesc) return [startAsc, endAsc];
	else if (lengthDesc < lengthAsc) return [startDesc, endDesc];
	else {
		// если длины равны, возвращаем с меньшим end
		if (endAsc <= endDesc) return [startAsc, endAsc];
		else return [startDesc, endDesc];
	}
}