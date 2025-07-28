// Campfire Whispers
// Introduction
// In this coding challenge, we will simulate the "Campfire Whispers" game where friends share a movie quote in a circular manner.
// The friends' moods will affect how they pass along the quote.
// Task Description
// Implement a function that simulates the "Campfire Whispers" game with the following specifications:
// Parameters
// friends: An array of tuples, where each tuple contains two elements:
// First element: A string representing the friend's name.
// Second element: A string representing the friend's mood ("participative," "uninterested," or "excited").
// quote: A string representing the initial quote (always a movie quote).
// index: An integer representing the index of the friend in the friends array who we want to ask what they were told.
// Rules
// Nobody knows the mood of the others, except that of the initiator, who is always participative.
// Each friend whispers the quote to the next, without the others hearing it.
// At the end, one of the friends is picked and asked to cite the quote.
// Impact of mood on passing along the quote
// The first friend initiates the game by sharing a quote.
// The initiator will simply repeat what they hear from the previous friend.
// An uninterested friend changes any quote they receive to "Whatever.".
// An excited friend adds " Wow! That's amazing!" after the quote they heard,
// but only if the quote doesn't already end with " amazing!" (case-insensitive).
// A participative friend passes along exactly what they heard from the previous friend, with the following exceptions:
// If they hear "Whatever.", they use the default quote: "A classic movie quote!".
// If they hear "Whatever. Wow! That's amazing!", they also use the default quote: "A classic movie quote!".
// However, if the quote came directly from the initiator, they won't change it, as they are sure it's a genuine quote.
// Citing the quote
// When asked to cite the quote, the friend answers as follows: "A told me that B told A that C told B 'quote'.".
// The chain of friends A, B, C, ... is in the reverse order of how the quote was passed along.
// The initiator uses "I" where appropriate: "A told me that B told A that I told B 'quote'.".
// Output
// A string representing what the friend at index cites when asked what they got told by the previous friend.
// Additional Information
// There will be at least two friends in the input list and at most thirty.
// The initial quote is always from a movie, but may change depending on the moods of some friends.
// A movie quote always ends with punctuation.
// Use names directly in responses, but include "me" and "I" where appropriate.
// Several friends may share the same name.
// "Whatever." may be a movie quote, and some movie quotes may end with " amazing!".
// "A classic movie quote!" is a placeholder used by some friends, but will never appear as initial movie quote.
// Summary
// Your task is to implement the function as described, ensuring that it correctly simulates message
// passing while returning the appropriate message chain for the queried friend.
// Good luck!


function campfire(a,s,k){
	let t = a.slice(0,k ? k+1 : a.length)
	for (let i=0;i<t.length;i++){
		let [x,y] = t[i]
		if (y==='uninterested') s = 'Whatever.'
		if (y==='excited') s = / amazing!$/i.test(s) ? s : s+` Wow! That's amazing!`
		if (y==='participative'){
			if (s==='Whatever.' || s===`Whatever. Wow! That's amazing!`){
				s = i<2 ? s : 'A classic movie quote!'
			}
		}
	}
	let r = ''
	for (let i=k,j=0;j<t.length-1;i=(i-1+t.length)%t.length,j++){
		let n = t.at(i-1)[0], nn = t.at(i)[0]
		r += `${n} told ${j===0 ? 'me' : nn} that `
	}
	if (k===0) r += `I told ${t[k+1][0]}`
	return `${r.replace(/ that $/,'')} '${s}'.`
}