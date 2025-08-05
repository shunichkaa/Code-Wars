// You work for an amoral online casino. Your pit boss has tasked you with coming up with an algorithim that will shuffle a deck of cards, HOWEVER, every once in a while the pit boss wants the order to be known to the dealer.
//
// 	The deck of cards is a standard deck of 52 cards. The Values are defined as:
//
// 	A = Ace
// K = King
// Q = Queen
// J = Jack
// then 2-10
// The Suits are defined as:
//
// 	d = Diamond
// h = Heart
// c = Club
// s = Spade
// Capitalization counts. Therefor an Ace of Spaces = "As" and a 5 of clubs = "5c", etc... You will be required to utilize a semi random generator to shuffle the deck. The deck needs to be repeatable, if the function receives a cheat code. There can be no repeating cards in the shuffled deck.


var StackedDeck = function(cheatCode) {
	this.cheatCode = cheatCode;
	this.shuffledDeck = [];
};

StackedDeck.prototype.shuffle = function () {
	const values = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2'];
	const suits = ['d', 'h', 'c', 's'];
	const deck = [];

	for (let v of values) {
		for (let s of suits) {
			deck.push(v + s);
		}
	}

	const rng = this.cheatCode ? seededRandom(this.cheatCode) : Math.random;

	// Fisher-Yates Shuffle
	for (let i = deck.length - 1; i > 0; i--) {
		const j = Math.floor(rng() * (i + 1));
		[deck[i], deck[j]] = [deck[j], deck[i]];
	}

	this.shuffledDeck = deck;
};

// Simple seeded random generator using Mulberry32
function seededRandom(seed) {
	let s = typeof seed === 'string'
		? Array.from(seed).reduce((acc, c) => acc + c.charCodeAt(0), 0)
		: seed;

	return function () {
		s |= 0;
		s = s + 0x6D2B79F5 | 0;
		let t = Math.imul(s ^ s >>> 15, 1 | s);
		t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}