// There are a series of 10 bombs about to go off!
// Defuse them all! Simple, right?
// Note:
// This is not an ordinary Kata, but more of a series of puzzles.
// The point is to figure out what you are supposed to do, then how to do it.
// Instructions are intentionally left vague.


Bomb.diffuse(42)

for (i = 0; i < 5; ++i) Bomb.diffuse()

Bomb.diffuse(BombKey)

function diffuseTheBomb() { return 1; }
Bomb.diffuse()

Bomb.diffuse(3.14159)

date = new Date(); date.setFullYear(date.getFullYear() - 4);
Bomb.diffuse(date)

code = { key: 43 }; Object.freeze(code);
Bomb.diffuse(code)

value = 9;
obj = { valueOf: function() { ret = value; value = 11; return ret } }
Bomb.diffuse(obj)

cnt = 0;
Math.random = function() { if (cnt++ == 2) return 0.5; else return 1 }
Bomb.diffuse(42)

Array.prototype.valueOf = function() {
	return this.reduce(
		function(x, y) { return x + y }, 0
	)
}
Bomb.diffuse('eWVz')