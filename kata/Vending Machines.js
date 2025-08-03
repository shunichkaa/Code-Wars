// You are in a room with 100 vending machines, each one numbered 0 to 99. Each vending machine has 100 candy bars inside. For 99 of the vending machines, all of their candy bars weigh 100 grams, but one special machine has candy bars that weigh 101 grams.
//
// 	Candy bars you vend are put into a pile, but you can only weigh the pile at most 10 times.
//
// 	Determine the number of the machine with the heavy candy bars.
//
// 	In this kata, you must solve this puzzle by coding the solution in the function findSpecialIdx.
//
// The function takes a VendingMachines object; call it vms.
//
// 	To make the ith machine vend, run vms[i].vend(); i can range from 0 to 99
// To weigh the pile, run vms.weigh()
// The index of the special machine is random, and different for each VendingMachines object. The function must return the index of the machine with the heavy candy bars.


function findSpecialIdx(vms) {
	let totalWeight = 0;

	for (let i = 0; i < 100; i++) {
		for (let j = 0; j <= i; j++) {
			vms[i].vend();
		}
	}

	totalWeight = vms.weigh();

	const idealWeight = 100 * (100 * 101) / 2;

	const diff = totalWeight - idealWeight;

	return diff - 1;
}