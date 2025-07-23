// Mr. Mxyzinjin has a private stream where some noodle-like substance are flowing through. It's probably those spaghetti that gives his code the distinctive taste of spaghetti code!
//
// These streams are binary streams so they consists of lots of 1 and 0s. Mr. Mxyzinjin uses his streams by seeing if the stream matches the secret 25-digit password. If so, he opens the lock and picks up the noodle.
//
// 	You just got hold of the 64 end-points to his stream. Each of them has a login function which will only return true if Mr. Mxyzinjin opens the lock. Your task is to crack and return the passwords on all sections of his stream before it is exhausted and you end up with no spaghetti (which happens 12 seconds after you get in).
//
// Moreover, because streams are inherently unstable in nature, you only get 32 calls to each login function.


function* lyndonWords() {
	const res = [-1];
	while (res.length) {
		let len = res.length;
		res[len-1] += 1;
		yield res;
		while (res.length < 25) res.push(res[res.length-len]);
		while (res[res.length-1] == 1) res.pop();
	}
}

let deBruijn = "";
for (const word of lyndonWords())
	if (25%word.length == 0) deBruijn += word.join("");

function crack(login) {
	let current = deBruijn;
	while (current.length > 36) {
		let testSlice = current.slice(current.length/2-16);
		if (login(testSlice))
			current = testSlice;
		else
			current = current.slice(0, current.length/2+16);
	}
	for (let i=0; i<9; i++) {
		let testSlice = current.slice(i, i+25);
		if (login(testSlice)) return testSlice;
	}
	return current.slice(9);
}