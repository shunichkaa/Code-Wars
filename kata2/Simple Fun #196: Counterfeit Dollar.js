// Story
// Sally Jones has a dozen Voyageur silver dollars. However, only eleven of the coins are true silver dollars; one coin is counterfeit even though its color and size make it indistinguishable from the real silver dollars. The counterfeit coin has a different weight from the other coins but Sally does not know if it is heavier or lighter than the real coins.
//
// 	Happily, Sally has a friend who loans her a very accurate balance scale. The friend will permit Sally three weighings to find the counterfeit coin. For instance, if Sally weighs two coins against each other and the scales balance then she knows these two coins are true.
//
// 	Now if Sally weighs one of the true coins against a third coin and the scales do not balance then Sally knows the third coin is counterfeit and she can tell whether it is light or heavy depending on whether the balance on which it is placed goes up or down, respectively.
//
// 	By choosing her weighings carefully, Sally is able to ensure that she will find the counterfeit coin with exactly three weighings.
//
// 	Task
// You are given an string array results, it consists of three times of result, one for each weighing. Sally has identified each of the coins with the letters A--L. Information on a weighing will be given by two substrings of letters and then one of the words up, down, or even. The first 4 letters of string will represent the coins on the left balance; the second 4 letters of string will represent the coins on the right balance. (Sally will always place the same number of coins on the right balance as on the left balance.) The word at the end will tell whether the right side of the balance goes up, down, or remains even.
//
// 	Your task is to find the counterfeit coin and judge whether the counterfeit coin is light or heavy. The output should be a string like this:
//
// "? is the counterfeit coin and it is light/heavy."
//
// 	? is the letter of the counterfeit coin, and you should choose one of light/heavy.
//
// 	If it's impossible to determine, return "???".
//
// Input/Output
// 	[input] string array results
// A string array contains the results of Sally's weighing.
//
// 	[output] a string
// The final result of the counterfeit coin.

function counterfeitDollar(results) {
	const coins = "ABCDEFGHIJKL".split("");
	let jdg = Array(12).fill(0);
	let time = Array(12).fill(0);

	results.forEach(result => {
		const [left, right, balance] = parseResult(result);

		if (balance === "even") {
			[...left, ...right].forEach(coin => {
				const index = coins.indexOf(coin);
				jdg[index] = 1;
			});
		} else if (balance === "up") {
			left.forEach(coin => {
				const index = coins.indexOf(coin);
				time[index]++;
			});
			right.forEach(coin => {
				const index = coins.indexOf(coin);
				time[index]--;
			});
		} else if (balance === "down") {
			left.forEach(coin => {
				const index = coins.indexOf(coin);
				time[index]--;
			});
			right.forEach(coin => {
				const index = coins.indexOf(coin);
				time[index]++;
			});
		}
	});

	let max = 0;
	let flag = -1;

	for (let i = 0; i < 12; i++) {
		if (jdg[i]) continue;
		if (Math.abs(time[i]) > max) {
			max = Math.abs(time[i]);
			flag = i;
		}
	}

	let possibleCoins = 0;
	for (let i = 0; i < 12; i++) {
		if (jdg[i] === 0 && Math.abs(time[i]) === max) {
			possibleCoins++;
		}
	}

	if (possibleCoins > 1 || flag === -1) {
		return "???";
	}

	const counterfeitCoin = coins[flag];
	const weightStatus = time[flag] < 0 ? "light" : "heavy";
	return `${counterfeitCoin} is the counterfeit coin and it is ${weightStatus}.`;
}

function parseResult(result) {
	const parts = result.split(' ');
	return [parts[0].split(''), parts[1].split(''), parts[2]];
}