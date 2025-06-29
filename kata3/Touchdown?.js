// In American football, scoring can occur in several ways. These scores have different values, which leads to scores that jump up based on the way the team has scored.
//
// 	A team can score in one of the following ways:
//
// 	Scoring a touchdown, which gains 6 points. A touchdown gives the team a chance to add to their score, either by:
// 	Going for a 2-point conversion, which (as you might guess), earns 2 points, or
// Attempting to kick for an extra point, which earns 1 point.
// 	Neither of those points are guaranteed!
// 	Kicking a field goal, which is worth 3 points.
// 	A player being tackled in their own endzone is called a safety, and it's worth 2 points. More on safeties
// We've just come into a game in the middle, and we'd like to know how the current score came to be.
//
// 	Given a current score, return an array containing all the possible ways that a team could have ended up with the current score. The array should contain one or more objects that look like this:
//
// {
// 	td: 2,  // touchdowns = 6pts * 2
// 		tp: 1,  // 2 point conversions = 2pts * 1
// 	ep: 1,  // extra points = 1pts * 1
// 	fg: 1,  // field goals = 3pts * 1
// 	s:  0   // safeties = 2pts * 0
// } // 18 total points
// You will not be provided with scores that cannot be solved, so it's not necessary to verify the score, but add it if you want.
// Some of the provided scores will be rather high (around 150 points) while but even low scores can have dozens of possible combinations, so be prepared!
//
// 	Remember that 2-point conversions or extra points can only happen after a successful touchdown!
//
// 	To assist in your testing, I've included a function called checkScores(score, expected), which will call the scoreBreakdowns function with the provided score, compare the resulting set of scores without concern for order, and report a useful error if one occurs. You use it like this:
//
// checkScores(2, [ { td: 0, tp: 0, ep: 0, fg: 0, s: 1 } ]);


function scoreBreakdowns(score) {
	const results = [];

	for (let td = 0; td <= Math.floor(score / 6); td++) {
		for (let tp = 0; tp <= td; tp++) {
			for (let ep = 0; ep <= td - tp; ep++) {
				const baseScore = td * 6 + tp * 2 + ep * 1;
				if (baseScore > score) continue;

				const rem = score - baseScore;

				// Теперь rem должен быть представлен как комбинация fg (3 очка) и s (2 очка)
				// Перебираем количество fg и s, чтобы 3*fg + 2*s = rem
				for (let fg = 0; fg <= Math.floor(rem / 3); fg++) {
					const rem2 = rem - fg * 3;
					if (rem2 < 0) break;
					if (rem2 % 2 !== 0) continue;
					const s = rem2 / 2;
					results.push({ td, tp, ep, fg, s });
				}
			}
		}
	}
	return results;
}