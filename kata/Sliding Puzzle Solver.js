// Image of sliding puzzle
// A sliding puzzle is a combination puzzle that challenges a player to slide (frequently flat) pieces along certain routes (usually on a board) to establish a certain end-configuration.
//
// 	Your goal for this kata is to write a function that produces a sequence of tile movements that solves the puzzle.
//
// 	Input
// An n x n array/list comprised of integer values ranging from 0 to n^2 - 1 (inclusive), which represents a square grid of tiles. Note that there will always be one empty tile (represented by 0) to allow for movement of adjacent tiles.
//
// 	Output
// An array/list comprised of any (but not necessarily all) of the integers from 1 to n^2 - 1, inclusive. This represents the sequence of tile moves for a successful transition from the initial unsolved state to the solved state. If the puzzle is unsolvable, return null(JavaScript, Java, PHP) or None(Python) or the vector {0} (C++).
//
// 	Test Example
// let simpleExample = [
// 	[ 1, 2, 3, 4],
// 	[ 5, 0, 6, 8],
// 	[ 9,10, 7,11],
// 	[13,14,15,12]
// ];
// slidePuzzle(simpleExample); // [6,7,11,12]
//
// // TRANSITION SEQUENCE:
// [ 1, 2, 3, 4]    [ 1, 2, 3, 4]    [ 1, 2, 3, 4]    [ 1, 2, 3, 4]    [ 1, 2, 3, 4]
// 	[ 5, 0, 6, 8]    [ 5, 6, 0, 8]    [ 5, 6, 7, 8]    [ 5, 6, 7, 8]    [ 5, 6, 7, 8]
// 	[ 9,10, 7,11] -> [ 9,10, 7,11] -> [ 9,10, 0,11] -> [ 9,10,11, 0] -> [ 9,10,11,12]
// 	[13,14,15,12]    [13,14,15,12]    [13,14,15,12]    [13,14,15,12]    [13,14,15, 0]
//
// // NOTE: Your solution does not need to follow this exact sequence to pass
// Technical Details
// Input will always be valid.
// 	The range of values for n are: 10 >= n >= 3
// If you enjoyed this kata, be sure to check out my other katas.


function slidePuzzle(arr,o=0){
	const find=n=>{
		var y=arr.findIndex(r=>r.includes(n));
		return [arr[y].indexOf(n),y];
	}
	var p=[], s=arr.length, [x,y]=find(0);
	const mov=d=>{
		if(d==='u') {[arr[y][x],arr[y-1][x]]=[arr[y-1][x],arr[y][x]]; p.push(arr[y--][x]);}
		else if(d==='l') {[arr[y][x],arr[y][x-1]]=[arr[y][x-1],arr[y][x]]; p.push(arr[y][x--]);}
		else if(d==='r') {[arr[y][x],arr[y][x+1]]=[arr[y][x+1],arr[y][x]]; p.push(arr[y][x++]);}
		else if(d==='d') {[arr[y][x],arr[y+1][x]]=[arr[y+1][x],arr[y][x]]; p.push(arr[y++][x]);}
		else throw new Error(d);
	}
	const rL=_=>{while(y+1<s) mov('d'); while(x+1<s) mov('r');}, rG=_=>{while(x+1<s) mov('r'); while(y+1<s) mov('d');};
	const rc=(w,h)=>[...'l'.repeat(w)+'u'.repeat(h)+'r'.repeat(w)+'d'.repeat(h)].forEach(mov),
		rcc=(w,h)=>[...'u'.repeat(h)+'l'.repeat(w)+'d'.repeat(h)+'r'.repeat(w)].forEach(mov);
	var u=arr[0].map((_,i)=>o*(s+o+1)+i+1), l=arr.map((_,j)=>o*(s+o+1)+j*(s+o)+1);

	if(arr.length===2) {
		rL();
		while(arr[0][0]!==u[0]) rc(1,1);
		return arr[0][1]!==u[1]?null:p;
	}

	// top row
	for(let i=0; i<u.length-1; i++) {
		let [tx,ty]=find(u[i]);
		if(ty===0&&tx===i) continue;
		rL();
		[tx,ty]=find(u[i]);
		while(arr[s-1][s-2]!==u[i]) rc(s-1-tx||1,s-1-ty||1);
		while(arr[0][i]!==u[i]) rc(s-1-i,s-1);
	}
	rL();
	var c=u[u.length-1], [tx,ty]=find(c);
	if(ty!==0||tx!==s-1) {
		while(arr[s-2][s-1]!==c) rc(s-1-tx||1,s-1-ty||1);
		rcc(1,s-1);
		while(arr[1][s-1]!==c) rcc(1,s-2);
		rc(1,s-1);
	}

	// left col
	for(let j=0; j<l.length-1; j++) {
		let [tx,ty]=find(l[j]);
		if(tx===0&&ty===j) continue;
		rG();
		[tx,ty]=find(l[j]);
		while(arr[s-2][s-1]!==l[j]) rc(s-1-tx||1,s-1-ty||1);
		while(arr[j][0]!==l[j]) rc(s-1,s-1-j);
	}
	rG();
	var c=l[l.length-1], [tx,ty]=find(c);
	if(tx!==0||ty!==s-1) {
		while(arr[s-1][s-2]!==c) rc(s-1-tx||1,s-1-ty||1);
		rc(s-1,1);
		while(arr[s-1][1]!==c) rcc(s-2,1);
		rcc(s-1,1);
	}

	var n=slidePuzzle(arr.slice(1).map((r,j)=>r.slice(1)),o+1);
	return n?p.concat(n):n;
}