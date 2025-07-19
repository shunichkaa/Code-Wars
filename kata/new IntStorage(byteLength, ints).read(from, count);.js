// Write an IntStorage object/class, which allows reading bit data from a series of integer values as if they were a single continuous stream of memory. The class should have the following features:
//
// 	new IntStorage(byteLength, ints)
// The parameter byteLength is an optional argument. If it is omitted (or is null or undefined), its value should be defaulted to 32. If it is invalid (not a primitive, positive integer between 1 and 32), an error should be thrown. Each integer should only have data allocated to the last (byteLength) bits (counted from the right). If the value is invalid, an error should be thrown.
//
// 	The parameter ints is an optional argument. If it is not omitted (and is not null or undefined) it should be an array of zero or more integer values. Each integer in the array should only have data in the last (byteLength) number of bits (counted from the right). Each integer should be added to the ints array property. If the ints value or any of its integer values are invalid, an error should be thrown.
//
// 	instance.ints
// The property ints an array holding zero or more 32-bit integer values.
//
// 	instance.length
// The length parameter reflects the number of bits stored by the IntStorage instance. If an ints array has been passed in for construction, length should reflect the number of data-allocated bits stored in those values (assuming each integer has data in all allowed bit positions, as indicated by byteLength). For example, if the byteLength is 8, and there are 7 integers passed in as part of the ints array, the number of allocated data bits will be 56.
//
// instance.read(from, count)
// This is the only method you need to implement for this kata. It accepts two optional parameter, from and count, and returns a 32-bit integer
//
// The parameter from, if provided (and not null or undefined) should be a primitive integer, zero or greater (0 being the first bit position, 1 being the second, and so on). If not provided, it should default to 0. It should refer to a bit position in the data (counting, from the left, each allocated bit (as defined by byteLength) running across all integer values in the IntStorage instance). Data should be read from this bit position onwards. If the from value is invalid, an error should be thrown.
//
// 	The parameter count, if provided (and not null or undefined) should be a primitive integer, between 0 and 32. It dictates how many bits should be read from the bit position marked by from, onwards (counting right). If there is not enough data to read the full count of bits from storage, or there is no stored data to read from to begin with, count is considered invalid. Otherwise, a primitive, 32-bit integer should be returned with the data (1s and 0s) copied into the correct positions. The data should be stored at the (right-most) end of the integer value. If the count value is invalid, an error should be thrown.
//
// 	Let's have a look at some examples:
//
// var instance = new IntStorage(6, [43, 36, 17]);
// // == { ints: [43 (101011), 36 (100100), 17 (010001)], length: 18 }
//
// instance.read(5, 2);
// // 101011 100100 010001
// // -----^ from (5)
// //      ^ ^ count (2)
// //      1 1 == extracted data
// // == 3 (11)
//
// instance.read(8, 8);
// // 101011 100100 010001
// // ------ --^ from (8)
// //          ^^^^ ^^^^ count (8)
// //          0100 0100
// // == 68 (01000100)
//
// instance.read(12);
// // 101011 100100 010001
// // ------ ------ ^ from (12)
// //               ^^^^^^ count (defaulted to byteLength = 6)
// //               010001
// // == 17 (010001)
//
// instance.read();
// // 101011 100100 010001
// // ^ from (defaulted to 0)
// // ^^^^^^ count (defaulted to byteLength = 6)
// // 101011
// // == 43 (101011)
//
// instance.read(15, 5);
// // 101011 100100 010001
// // ------ ------ ---^ from (15)
// //                  ^^^\*\* count (5) \* error; not enough data to read


function IntStorage(byteLength, ints) {
	// Валидация byteLength
	if (byteLength == null) {
		byteLength = 32;
	}
	if (
		typeof byteLength !== "number" ||
		!Number.isInteger(byteLength) ||
		byteLength < 1 ||
		byteLength > 32
	) {
		throw new Error("Invalid byteLength");
	}

	// Валидация массива ints
	if (ints == null) {
		this.ints = [];
	} else if (!Array.isArray(ints)) {
		throw new Error("ints must be an array");
	} else {
		for (const v of ints) {
			if (
				typeof v !== "number" ||
				!Number.isInteger(v) ||
				v < 0 ||
				v > 0xFFFFFFFF ||
				(v >>> byteLength) !== 0 // проверка, что старшие биты обнулены
			) {
				throw new Error("Invalid value in ints");
			}
		}
		this.ints = ints.slice(); // Копия массива
	}

	this.byteLength = byteLength;
	this.length = this.ints.length * this.byteLength;
}

IntStorage.prototype.read = function (from, count) {
	if (from == null) from = 0;
	if (!Number.isInteger(from) || from < 0) throw new Error("Invalid from");

	if (count == null) count = this.byteLength;
	if (!Number.isInteger(count) || count < 0 || count > 32) {
		throw new Error("Invalid count");
	}

	if (from + count > this.length) {
		throw new Error("Not enough data to read");
	}

	let result = 0;
	for (let i = 0; i < count; i++) {
		let bitIndex = from + i;
		let intIndex = Math.floor(bitIndex / this.byteLength);
		let bitPosInInt = bitIndex % this.byteLength;

		let bit = (this.ints[intIndex] >> (this.byteLength - 1 - bitPosInInt)) & 1;
		result = (result << 1) | bit;
	}

	return result;
};
