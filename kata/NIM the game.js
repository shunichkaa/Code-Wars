// This kata explores writing an AI for a two player, turn based game called NIM.
//
// 	The Board
// The board starts out with several piles of straw. Each pile has a random number of straws.
//
// 	Pile 0: ||||
//
// Pile 1: ||
//
// Pile 2: |||||
//
// Pile 3: |
//
// Pile 4: ||||||
//
// ...or more concisely: [4,2,5,1,6]
// The Rules
// The players take turns picking a pile, and removing any number of straws from the pile they pick
// A player must pick at least one straw
// If a player picks the last straw, she wins!
// 	The Task
// In this kata, you have to write an AI to play the straw picking game.
//
// 	You have to encode an AI in a function choose_move (or chooseMove, or choose-move) that takes a board, represented as a list of positive integers, and returns
//
// 	[pile_index, number_of_straws]
// Which refers to an index of a pile on the board, and some none-zero number of straws to draw from that pile.
//
// 	The test suite is written so that your AI is expected to play 50 games and win every game it plays.
//


function chooseMove(state) {
	// Compute the nim-sum (xor of all piles)
	let nimSum = 0;
	for (const pile of state) {
		nimSum ^= pile;
	}

	// If nimSum is 0, no winning move, pick first non-empty pile and remove 1 straw
	if (nimSum === 0) {
		for (let i = 0; i < state.length; i++) {
			if (state[i] > 0) return [i, 1];
		}
	}

	// Find a pile to reduce to make nim-sum 0
	for (let i = 0; i < state.length; i++) {
		let target = state[i] ^ nimSum;
		if (target < state[i]) {
			// Remove enough straws to get to target
			return [i, state[i] - target];
		}
	}
}