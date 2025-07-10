// When no more interesting kata can be resolved, I just choose to create the new kata, to solve their own, to enjoy the process --myjinxin2015 said
//
// Description:
// 	There is a matrix that contains some points(Use A-Z to represent them).
//
// . . . . . .
// . . A . . .
// 	. . . . . .
// 	. . . . . .
// 	. . D . . .
// 	B . . . . C
// Find out the "center" point(s) which has the minimum sum of the pythagorean distances to the other points.
//
// 	In the example above, the "center" point is "D", so the result is ["D"].
//
// 	Arguments:
//
// matrix: A string that contains A,B,C... Each row is separated by "\n". Each point is separated by space(Please ignore space when you calculate the distance ;-) An example: In matrix above, the distance from B to C is 5, not 10 ;-))
// Results & Note:
//
// Returns an array that contains all "center" point(s).
// 	If more than one points are found, sort them according to the order A-Z.
// 	How to compare two distance are same? In the calculation process, the float numbers have the precision problem. So, we should rounding number to 6 decimal places, and then compare them.
// 	You can assume that there are at least two points in the matrix, up to 26 points.
// 	Some Examples
// matrix=
// . . . . . .
// . . A . . .
// 	. . . . . .
// 	. . . . . .
// 	. . D . . .
// 	B . . . . C
// findCenterPoints(matrix) === ["D"]
//
//
// matrix=
// 	A . . . . B
// 		. . . . . .
// 		. . . F . .
// 		. . E . . .
// 		. . . . . .
// 		D . . . . C
// findCenterPoints(matrix) === ["E","F"]


function findCenterPoints(matrix){
	let rows = matrix.trim().split('\n');
	let points = [];
	for(let y=0; y<rows.length; y++){
		let row = rows[y].replace(/\s+/g,'');
		for(let x=0; x<row.length; x++){
			let ch = row[x];
			if(ch>='A' && ch<='Z') points.push({ch,x,y});
		}
	}
	function dist(p1,p2){
		return Math.sqrt((p1.x-p2.x)**2 + (p1.y-p2.y)**2);
	}
	let sums = points.map(p1=>{
		let s=0;
		for(let p2 of points) if(p1!==p2) s+=dist(p1,p2);
		return {ch:p1.ch, sum:+s.toFixed(6)};
	});
	let minSum = Math.min(...sums.map(e=>e.sum));
	return sums.filter(e=>e.sum===minSum).map(e=>e.ch).sort();
}
