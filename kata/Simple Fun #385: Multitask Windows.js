// Story
// John likes to multitask, especially when it comes to using his computer. Never satisfied with just running one application at a time, he usually runs nine applications, each in its own window. Due to limited screen real estate, he overlaps these windows and brings whatever window he currently needs to work with to the foreground. If his screen were a 4 x 4 grid of squares, each of John's windows would be represented by the following 2 x 2 windows:
//
// 1 1 - -  - 2 2 -  - - 3 3
// 1 1 - -  - 2 2 -  - - 3 3
// - - - -  - - - -  - - - -
// 	- - - -  - - - -  - - - -
//
// 		- - - -  - - - -  - - - -
// 			4 4 - -  - 5 5 -  - - 6 6
// 4 4 - -  - 5 5 -  - - 6 6
// - - - -  - - - -  - - - -
//
// 	- - - -  - - - -  - - - -
// 		- - - -  - - - -  - - - -
// 			7 7 - -  - 8 8 -  - - 9 9
// 7 7 - -  - 8 8 -  - - 9 9
// When John brings a window to the foreground, all of its squares come to the top, overlapping any squares it shares with other windows. For example, if window 1 and then window 2 were brought to the foreground, the resulting representation would be:
//
// 	1 1 - -    1 2 2 -
// 1 1 - -    1 2 2 -
// - - - - -> - - - -
// 	- - - -    - - - -
// 		If window 4 were then brought to the foreground:
//
// 	1 2 2 -
// 4 4 2 -
// 4 4 - -
// 	- - - -
// . . . and so on . . .
//
// 	Unfortunately, John's computer is very unreliable and crashes often. He could easily tell if a crash occurred by looking at the windows and seeing a graphical representation that should not occur if windows were being brought to the foreground correctly. And this is where you come in...
//
// Task
// You are given a multiline string windows that represent the current graphical representation of the windows on John's screen. It's always a 4 x 4 matrix. Each position in this matrix will represent the current piece of window showing in each square. To make input easier and clearer, the list of numbers on each line will be delimited by a single space.
//
// 	Note that each piece of visible window will appear only in screen areas where the window could appear when brought to the front. For instance, a 1 can only appear in the top left quadrant.
//
// 	The output should return true if there exists a sequence of bringing windows to the foreground that would result in the graphical representation of the windows on John's screen.
//
// Otherwise, the output should be false.
//
// 	Still not understand the task- Look at the following example ;-)
//
// Examples
// For windows =
//
// 	1 2 3 3
// 4 5 6 6
// 7 8 9 9
// 7 8 9 9
// the output should be true.
//
// 	John can bringing windows to the foreground like this:
//
// click      click      click      click      click
// window1    window2    window3    window4    window5
// 1 1 - -    1 2 2 -    1 2 3 3    1 2 3 3    1 2 3 3
// 1 1 - -    1 2 2 -    1 2 3 3    4 4 3 3    4 5 5 3
// - - - - -> - - - - -> - - - - -> 4 4 - - -> 4 5 5 -
// - - - -    - - - -    - - - -    - - - -    - - - -
//
// 	click      click      click      click
// window6    window7    window8    window9
// 1 2 3 3    1 2 3 3    1 2 3 3    1 2 3 3
// 4 5 6 6    4 5 6 6    4 5 6 6    4 5 6 6
// ->4 5 6 6 -> 7 7 6 6 -> 7 8 8 6 -> 7 8 9 9
// - - - -    7 7 - -    7 8 8 -    7 8 9 9
// For windows =
//
// 	1 1 3 3
// 1 1 3 3
// 7 7 9 9
// 7 7 9 9
// the output should be true.
//
// 	John can bringing windows to the foreground like this:
//
// click      click      click      click      click
// window2    window4    window5    window6    window8
// - 2 2 -    - 2 2 -    - 2 2 -    - 2 2 -    - 2 2 -
// - 2 2 -    4 4 2 -    4 5 5 -    4 5 6 6    4 5 6 6
// - - - - -> 4 4 - - -> 4 5 5 - -> 4 5 6 6 -> 4 8 8 6
// - - - -    - - - -    - - - -    - - - -    - 8 8 -
//
// click      click      click      click
// window1    window3    window7    window9
// 1 1 2 -    1 1 3 3    1 1 3 3    1 1 3 3
// 1 1 6 6    1 1 3 3    1 1 3 3    1 1 3 3
// ->4 8 8 6 -> 4 8 8 6 -> 7 7 8 6 -> 7 7 9 9
// - 8 8 -    - 8 8 -    7 7 8 -    7 7 9 9
// For windows =
//
// 	1 2 3 3
// 4 5 6 6
// 7 8 9 9
// 7 8 9 9
// the output should be true.
//
// 	John can bringing windows to the foreground like this:
//
// click      click      click      click      click
// window1    window3    window7    window4    window2
// 1 1 - -    1 1 3 3    1 1 3 3    1 1 3 3    1 2 2 3
// 1 1 - -    1 1 3 3    1 1 3 3    4 4 3 3    4 2 2 3
// - - - - -> - - - - -> 7 7 - - -> 4 4 - - -> 4 4 - -
// 	- - - -    - - - -    7 7 - -    7 7 - -    7 7 - -
//
// 	click      click      click      click
// window5    window9    window8    window6
// 1 2 2 3    1 2 2 3    1 2 2 3    1 2 2 3
// 4 5 5 3    4 5 5 3    4 5 5 3    4 5 6 6
// ->4 5 5 - -> 4 5 9 9 -> 4 8 8 9 -> 4 8 6 6
// 7 7 - -    7 7 9 9    7 8 8 9    7 8 8 9
// The following cases should return false:
//
// 1 1 3 3
// 4 1 3 3
// 7 7 9 9
// 7 7 9 9
//
// 1 2 2 3
// 1 2 2 3
// 7 8 8 9
// 7 7 9 9

// Story
// John likes to multitask, especially when it comes to using his computer. Never satisfied with just running one application at a time, he usually runs nine applications, each in its own window. Due to limited screen real estate, he overlaps these windows and brings whatever window he currently needs to work with to the foreground. If his screen were a 4 x 4 grid of squares, each of John's windows would be represented by the following 2 x 2 windows:
//
// 1 1 - -  - 2 2 -  - - 3 3
// 1 1 - -  - 2 2 -  - - 3 3
// - - - -  - - - -  - - - -
// 	- - - -  - - - -  - - - -
//
// 		- - - -  - - - -  - - - -
// 			4 4 - -  - 5 5 -  - - 6 6
// 4 4 - -  - 5 5 -  - - 6 6
// - - - -  - - - -  - - - -
//
// 	- - - -  - - - -  - - - -
// 		- - - -  - - - -  - - - -
// 			7 7 - -  - 8 8 -  - - 9 9
// 7 7 - -  - 8 8 -  - - 9 9
// When John brings a window to the foreground, all of its squares come to the top, overlapping any squares it shares with other windows. For example, if window 1 and then window 2 were brought to the foreground, the resulting representation would be:
//
// 	1 1 - -    1 2 2 -
// 1 1 - -    1 2 2 -
// - - - - -> - - - -
// 	- - - -    - - - -
// 		If window 4 were then brought to the foreground:
//
// 	1 2 2 -
// 4 4 2 -
// 4 4 - -
// 	- - - -
// . . . and so on . . .
//
// 	Unfortunately, John's computer is very unreliable and crashes often. He could easily tell if a crash occurred by looking at the windows and seeing a graphical representation that should not occur if windows were being brought to the foreground correctly. And this is where you come in...
//
// Task
// You are given a multiline string windows that represent the current graphical representation of the windows on John's screen. It's always a 4 x 4 matrix. Each position in this matrix will represent the current piece of window showing in each square. To make input easier and clearer, the list of numbers on each line will be delimited by a single space.
//
// 	Note that each piece of visible window will appear only in screen areas where the window could appear when brought to the front. For instance, a 1 can only appear in the top left quadrant.
//
// 	The output should return true if there exists a sequence of bringing windows to the foreground that would result in the graphical representation of the windows on John's screen.
//
// Otherwise, the output should be false.
//
// 	Still not understand the task- Look at the following example ;-)
//
// Examples
// For windows =
//
// 	1 2 3 3
// 4 5 6 6
// 7 8 9 9
// 7 8 9 9
// the output should be true.
//
// 	John can bringing windows to the foreground like this:
//
// click      click      click      click      click
// window1    window2    window3    window4    window5
// 1 1 - -    1 2 2 -    1 2 3 3    1 2 3 3    1 2 3 3
// 1 1 - -    1 2 2 -    1 2 3 3    4 4 3 3    4 5 5 3
// - - - - -> - - - - -> - - - - -> 4 4 - - -> 4 5 5 -
// - - - -    - - - -    - - - -    - - - -    - - - -
//
// 	click      click      click      click
// window6    window7    window8    window9
// 1 2 3 3    1 2 3 3    1 2 3 3    1 2 3 3
// 4 5 6 6    4 5 6 6    4 5 6 6    4 5 6 6
// ->4 5 6 6 -> 7 7 6 6 -> 7 8 8 6 -> 7 8 9 9
// - - - -    7 7 - -    7 8 8 -    7 8 9 9
// For windows =
//
// 	1 1 3 3
// 1 1 3 3
// 7 7 9 9
// 7 7 9 9
// the output should be true.
//
// 	John can bringing windows to the foreground like this:
//
// click      click      click      click      click
// window2    window4    window5    window6    window8
// - 2 2 -    - 2 2 -    - 2 2 -    - 2 2 -    - 2 2 -
// - 2 2 -    4 4 2 -    4 5 5 -    4 5 6 6    4 5 6 6
// - - - - -> 4 4 - - -> 4 5 5 - -> 4 5 6 6 -> 4 8 8 6
// - - - -    - - - -    - - - -    - - - -    - 8 8 -
//
// click      click      click      click
// window1    window3    window7    window9
// 1 1 2 -    1 1 3 3    1 1 3 3    1 1 3 3
// 1 1 6 6    1 1 3 3    1 1 3 3    1 1 3 3
// ->4 8 8 6 -> 4 8 8 6 -> 7 7 8 6 -> 7 7 9 9
// - 8 8 -    - 8 8 -    7 7 8 -    7 7 9 9
// For windows =
//
// 	1 2 3 3
// 4 5 6 6
// 7 8 9 9
// 7 8 9 9
// the output should be true.
//
// 	John can bringing windows to the foreground like this:
//
// click      click      click      click      click
// window1    window3    window7    window4    window2
// 1 1 - -    1 1 3 3    1 1 3 3    1 1 3 3    1 2 2 3
// 1 1 - -    1 1 3 3    1 1 3 3    4 4 3 3    4 2 2 3
// - - - - -> - - - - -> 7 7 - - -> 4 4 - - -> 4 4 - -
// 	- - - -    - - - -    7 7 - -    7 7 - -    7 7 - -
//
// 	click      click      click      click
// window5    window9    window8    window6
// 1 2 2 3    1 2 2 3    1 2 2 3    1 2 2 3
// 4 5 5 3    4 5 5 3    4 5 5 3    4 5 6 6
// ->4 5 5 - -> 4 5 9 9 -> 4 8 8 9 -> 4 8 6 6
// 7 7 - -    7 7 9 9    7 8 8 9    7 8 8 9
// The following cases should return false:
//
// 1 1 3 3
// 4 1 3 3
// 7 7 9 9
// 7 7 9 9
//
// 1 2 2 3
// 1 2 2 3
// 7 8 8 9
// 7 7 9 9


function isValid(m) {
	console.log(m);
	m = m.split("\n").map(r => r.split(" "));
	let g = {};
	for (let y = 0; y < 3; y++) for (let x = 0; x < 3; x++) {
		let c = y * 3 + x + 1;
		g[c] = new Set();
		for (let [i, j] of [[y, x], [y, x + 1], [y + 1, x], [y + 1, x + 1]]) {
			if (m[i][j] != c) g[c].add(m[i][j]);
		}
	}
	console.log(g);
	for (let c = 1; c <= 9; c++) {
		let s = new Set(), q = [...g[c]];
		while (q.length) {
			let d = q.pop();
			if (d == c) return false;
			if (s.has(d)) continue;
			s.add(d);
			for (let e of [...g[d]]) if (!s.has(e)) q.push(e);
		}
	}
	return true;
}