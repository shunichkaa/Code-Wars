// The marketing team is spending way too much time typing in hashtags.
// 	Let's help them with our own Hashtag Generator!
//
// Here's the deal:
//
// It must start with a hashtag (#).
// All words must have their first letter capitalized.
// 	If the final result is longer than 140 chars it must return false.
// 	If the input or the result is an empty string it must return false.
// 	Examples
// " Hello there thanks for trying my Kata"  =>  "#HelloThereThanksForTryingMyKata"
// "    Hello     World   "                  =>  "#HelloWorld"
// ""                                        =>  false

function generateHashtag(str) {
	if (!str || !str.trim()) return false;

	const hashtag = '#' + str
	.split(' ')
	.filter(word => word.length > 0)
	.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
	.join('');

	return hashtag.length <= 140 && hashtag.length > 1 ? hashtag : false;
}

module.exports = generateHashtag;
