// Texas Hold'em is a Poker variant in which each player is given two "hole cards". Players then proceed to make a series of bets while five "community cards" are dealt. If there are more than one player remaining when the betting stops, a showdown takes place in which players reveal their cards. Each player makes the best poker hand possible using five of the seven available cards (community cards + the player's hole cards).
//
// Possible hands are, in descending order of value:
//
// 	Straight-flush (five consecutive ranks of the same suit). Higher rank is better.
// 	Four-of-a-kind (four cards with the same rank). Tiebreaker is first the rank, then the rank of the remaining card.
// 	Full house (three cards with the same rank, two with another). Tiebreaker is first the rank of the three cards, then rank of the pair.
// Flush (five cards of the same suit). Higher ranks are better, compared from high to low rank.
// Straight (five consecutive ranks). Higher rank is better.
// 	Three-of-a-kind (three cards of the same rank). Tiebreaker is first the rank of the three cards, then the highest other rank, then the second highest other rank.
// 	Two pair (two cards of the same rank, two cards of another rank). Tiebreaker is first the rank of the high pair, then the rank of the low pair and then the rank of the remaining card.
// Pair (two cards of the same rank). Tiebreaker is first the rank of the two cards, then the three other ranks.
// 	Nothing. Tiebreaker is the rank of the cards from high to low.
// 	Given hole cards and community cards, complete the function hand to return the type of hand (as written above, you can ignore case) and a list of ranks in decreasing order of significance, to use for comparison against other hands of the same type, of the best possible hand.
//
// hand(["A:♠", "A♦"], ["J♣", "5♥", "10♥", "2♥", "3♦"])
// // ...should return {type: "pair", ranks: ["A", "J", "10", "5"]}
// hand(["A♠", "K♦"], ["J♥", "5♥", "10♥", "Q♥", "3♥"])
// // ...should return {type: "flush", ranks: ["Q", "J", "10", "5", "3"]}
// EDIT: for Straights with an Ace, only the ace-high straight is accepted. An ace-low straight is invalid (ie. A,2,3,4,5 is invalid). This is consistent with the author's reference solution. ~docgunthrop


function hand(holeCards, communityCards) {
	const rankOrder = {'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'J':11,'Q':12,'K':13,'A':14};
	function parseCard(card) {
		let rank = card.slice(0, card.length - 1);
		let suit = card.slice(-1);
		if (rank === '1' && card.slice(0,2) === '10') rank = '10';
		return {rank, suit, val: rankOrder[rank]};
	}

	let cards = holeCards.concat(communityCards).map(parseCard);

	function combinations(arr, k) {
		let result = [];
		function comb(start, chosen) {
			if (chosen.length === k) {
				result.push(chosen.slice());
				return;
			}
			for(let i = start; i < arr.length; i++) {
				chosen.push(arr[i]);
				comb(i+1, chosen);
				chosen.pop();
			}
		}
		comb(0, []);
		return result;
	}

	function isFlush(cards) {
		let suit = cards[0].suit;
		return cards.every(c => c.suit === suit);
	}

	function isStraight(cards) {
		let vals = cards.map(c=>c.val).sort((a,b)=>a-b);
		for(let i=1;i<vals.length;i++) {
			if(vals[i]!==vals[i-1]+1) return false;
		}
		return true;
	}

	function countRanks(cards) {
		let counts = {};
		for(let c of cards) counts[c.val] = (counts[c.val]||0)+1;
		return counts;
	}

	function compareRanks(a, b) {
		for(let i=0;i<a.length;i++){
			if(a[i] > b[i]) return 1;
			if(a[i] < b[i]) return -1;
		}
		return 0;
	}

	function evaluate(cards) {
		cards = cards.slice().sort((a,b)=>b.val - a.val);
		let flush = isFlush(cards);
		let straight = isStraight(cards);

		let counts = countRanks(cards);
		let groups = Object.entries(counts).sort((a,b) => b[1] - a[1] || b[0] - a[0]);
		let ranksSorted = cards.map(c=>c.val).sort((a,b)=>b-a);

		if (flush && straight) return {type:'straight-flush', ranks:ranksSorted};
		if(groups[0][1]===4) {
			let four = parseInt(groups[0][0]);
			let kicker = ranksSorted.filter(r=>r!==four)[0];
			return {type:'four-of-a-kind', ranks:[four,kicker]};
		}
		if(groups[0][1]===3 && groups[1] && groups[1][1]===2) {
			return {type:'full house', ranks:[parseInt(groups[0][0]),parseInt(groups[1][0])]};
		}
		if(flush) return {type:'flush', ranks:ranksSorted};
		if(straight) return {type:'straight', ranks:ranksSorted};
		if(groups[0][1]===3) {
			let three = parseInt(groups[0][0]);
			let kickers = ranksSorted.filter(r=>r!==three);
			return {type:'three-of-a-kind', ranks:[three,...kickers]};
		}
		if(groups[0][1]===2 && groups[1] && groups[1][1]===2) {
			let highPair = Math.max(parseInt(groups[0][0]),parseInt(groups[1][0]));
			let lowPair = Math.min(parseInt(groups[0][0]),parseInt(groups[1][0]));
			let kicker = ranksSorted.filter(r=>r!==highPair && r!==lowPair)[0];
			return {type:'two pair', ranks:[highPair,lowPair,kicker]};
		}
		if(groups[0][1]===2) {
			let pair = parseInt(groups[0][0]);
			let kickers = ranksSorted.filter(r=>r!==pair);
			return {type:'pair', ranks:[pair,...kickers]};
		}
		return {type:'nothing', ranks:ranksSorted};
	}

	let combos = combinations(cards, 5);
	let best = null;
	let order = ['straight-flush','four-of-a-kind','full house','flush','straight','three-of-a-kind','two pair','pair','nothing'];

	for(let c of combos){
		let val = evaluate(c);
		if(!best) best = val;
		else {
			if(order.indexOf(val.type) < order.indexOf(best.type)) best = val;
			else if(order.indexOf(val.type) === order.indexOf(best.type)){
				if(compareRanks(val.ranks,best.ranks) > 0) best = val;
			}
		}
	}

	let rankToName = {};
	for (let k in rankOrder) rankToName[rankOrder[k]] = k;
	best.ranks = best.ranks.map(r => rankToName[r]);

	return best;
}