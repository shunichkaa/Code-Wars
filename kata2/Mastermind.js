// Introduction
// Mastermind or Master Mind is a code-breaking game for two players. The modern game with pegs was invented in 1970 by Mordecai Meirowitz, an Israeli postmaster and telecommunications expert. It resembles an earlier pencil and paper game called Bulls and Cows that may date back a century or more. (Source Wikipedia)
//
// mastermind board
//
// Rules
// The Mastermind (computer) will select 4 colours. The colours are randomly selected from ["Red", "Blue", "Green", "Orange", "Purple", "Yellow"]. Colours can be duplicated but there will always be exactly 4.
//
// The Mastermind will return an array back to you. For every correctly positioned colour in the array an element of "Black" is returned. For every correct colour but in the wrong position an element of "White" will be returned.
//
// 	Passing the correct array will pass the Kata test and return "WON!".
//
// 	Passing an invalid colour will fail the test with the error "Error: you have given an invalid colour!".
//
// 	Passing an invalid array length will fail the test with the error "Error: you must pass 4 colours!".
//
// 	Guessing more than 60 times will fail the test with the error "Error: you have had more than 60 tries!".
//
// 	All colours are capitalised.
//
// 	The return array will be shuffled!
//
// 	Task
// Your task is to create a method called mastermind() that will take an object called game. The object has already been preloaded so you do not need to worry about it.
//
// 	Within your method you must pass an array into the game object method .check(). This will evoke the object to check your array to see if it is correct.
//
// 	Example
// If the Mastermind selected the following colours
//
// secret code - red, blue, green, yellow
//
// Then the array you are trying to solve is ["Red", "Blue", "Green", "Yellow"]
//
// So you guess with
//
// 	guess - red, orange, yellow, orange
//
// 		["Red", "Orange", "Yellow", "Orange"]
//
// 	Your method would look like this.
//
// 	function mastermind(game){
// 	answer = game.check(["Red", "Orange", "Yellow", "Orange"]);
// }
// The element 0 => Red is at the correct index so Black is added to the return array. Element 2 => Yellow is in the array but at the wrong index position so White is added to the return array.
//
// 	The Mastermind would then return ["Black", "White"] (But not necessarily in that order as the return array is shuffled by the Mastermind).
//
// Keep guessing until you pass the correct solution which will pass the Kata.
//
// 	Check result
// To check the Masterminds return value
//
// answer = game.check(["Red", "Orange", "Yellow", "Orange"]);
// console.log(answer);
// Good luck and enjoy!
//


function mastermind(game) {
	const colors = ["Red", "Blue", "Green", "Orange", "Purple", "Yellow"];

	function generateAll() {
		const all = [];
		for (let a of colors)
			for (let b of colors)
				for (let c of colors)
					for (let d of colors)
						all.push([a, b, c, d]);
		return all;
	}

	function getFeedback(guess, code) {
		let black = 0;
		let white = 0;

		const guessCopy = guess.slice();
		const codeCopy = code.slice();

		for (let i = 0; i < 4; i++) {
			if (guessCopy[i] === codeCopy[i]) {
				black++;
				guessCopy[i] = codeCopy[i] = null;
			}
		}
		for (let i = 0; i < 4; i++) {
			if (guessCopy[i] === null) continue;
			const idx = codeCopy.indexOf(guessCopy[i]);
			if (idx !== -1) {
				white++;
				codeCopy[idx] = null;
			}
		}
		return { black, white };
	}

	function matchesFeedback(guess, code, feedback) {
		const fb = getFeedback(guess, code);
		return fb.black === feedback.black && fb.white === feedback.white;
	}

	let candidates = generateAll();
	let guess = ["Red", "Red", "Blue", "Blue"];
	let tries = 0;

	while (tries < 60) {
		tries++;
		const result = game.check(guess);
		if (result === "WON!") return;

		// Подсчёт количества "Black" и "White" из результата
		const blackCount = result.filter(x => x === "Black").length;
		const whiteCount = result.filter(x => x === "White").length;

		candidates = candidates.filter(code => matchesFeedback(guess, code, { black: blackCount, white: whiteCount }));

		if (candidates.length === 0) throw new Error("No candidates left");

		guess = candidates[0];
	}

	throw new Error("Error: you have had more than 60 tries!");
}
