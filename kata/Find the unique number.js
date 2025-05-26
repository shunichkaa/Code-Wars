// There is an array with some numbers. All numbers are equal except for one. Try to find it!
//
// 	findUniq([ 1, 1, 1, 2, 1, 1 ]) === 2
// findUniq([ 0, 0, 0.55, 0, 0 ]) === 0.55
// It’s guaranteed that array contains at least 3 numbers.
//
// 	The tests contain some very huge arrays, so think about performance.


function findUniq(arr) {
    if (!Array.isArray(arr)) {
        throw new TypeError('Аргумент должен быть массивом');
    }
    if (arr.length < 3) {
        throw new Error('Массив должен содержать минимум 3 элемента');
    }
    if (arr[0] !== arr[1]) {
        return arr[0] === arr[2] ? arr[1] : arr[0];
    }
    const baseValue = arr[0];
    for (let i = 2; i < arr.length; i++) {
        if (arr[i] !== baseValue) {
            return arr[i];
        }
    }
    throw new Error('Уникальный элемент не найден');
}