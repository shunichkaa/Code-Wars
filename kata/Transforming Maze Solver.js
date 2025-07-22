// The objective of this kata will be to guide a ball through an m x n rectangular maze. This maze is special in that:
//
// all the cells rotate 90 degrees clockwise, in unison, at each interval
// each cell can have anywhere from 0 to 4 walls
// Your goal is to write a function that returns a path that requires the fewest intervals for the ball to get from its starting position to a specified destination.
//
// 	Input
// Your function will receive one argument — an m x n matrix.
//
// 	Output
// Your function must return a path as an array/list of strings. Each string in the array will:
//
// 	consist only of the letters N, W, S, and E representing the directions north, west, south, and east, respectively
// represent the path of the ball at each interval (based on its index position in the array)
// Also note that empty strings are permitted in the output array.
// 	If there is no possible solution, return null or None.
//
// 	Maze Mechanics
// Each cell in the maze is given as an integer, ranging from 0 to 15. This number, when translated to binary form, represents the walls of the corresponding cell. That is, a 1 means there is a wall and a 0 means there is no wall. The order of the walls is north, west, south, and east.
//
// 	For example, a cell with the value 7 is 0111 in binary. This means it has 3 walls — initially on the west, south, and east sides. Since there is no wall on the north side of the cell, it can be entered from that side at time interval 0 (assuming that the adjacent cell to its north does not have a south wall).
//
// A cell with the value 5 (0101 in binary) can be entered from its north and south sides at interval 0. At the next interval, it rotates 90 degrees clockwise and can then only be entered from its west and east sides (1010).
//
// 	A cell with the value 15 is enclosed on all sides (1111 in binary) and therefore can never be entered. Likewise, a cell with a value of 0 can always be entered from any side.
//
// 	There will be 2 cells that will not be given in the form of an integer. Assume that these cells have no walls (the equivalent of a 0 cell):
//
// The ball's starting position, given as the letter B (Java,Kotlin:-1)
// The destination, given as the letter X (Java,Kotlin:-2)
// Test Example
//
// The image above shows the state of the maze and starting position of the ball at each each interval; the order is given in the bottom right square.
// 	The green shaded area shows the available cells the ball can move to at each interval, but the bold number shows where it ends up (for our example solution)
//
// let example = [
// 	[  4,  2,  5,  4],
// 	[  4, 15, 11,  1],
// 	['B',  9,  6,  8],
// 	[ 12,  7,  7,'X']
// ];
//
// mazeSolver(example) // ['NNE','EE','S','SS']
// Technical Details
// The width and length of the matrix will range between 4 and 25 in either direction
// The ball's starting position will always be on the west side and the exit will always be on the east side of the maze
// For the sake of efficiency, the ball must not enter the same cell more than once per interval
// Full Test Suite: 10 fixed tests, and 110 random tests for Python,Kotlin,Rust / 100 random tests for JavaScript / 200 random tests for Java
// 	Each test case may have 0 or more possible solutions
// Inputs will always be valid
// Use Python 3+ for the Python translation
// For JavaScript, require has been disabled and most built-in prototypes have been frozen (prototype methods can be added to Array, Function, and Set)


var shouldPrintSolutionSteps = false;
var shouldPrintAllPaths = false;
function mazeSolver(arr){
	printBoard(arr,0)
	var positionsToCheck = [];
	var checkedPositions = [];
	positionsToCheck.push(dataObj(findTile(arr,'B'), 0, ""))
	while(positionsToCheck.length) {
		var pos = positionsToCheck.shift();
		if(arr[pos.y][pos.x] == 'X') {
			var result =  pos.path.substring(1).split("|");
			console.log("RETURNING", result)
			if(shouldPrintSolutionSteps) {
				result.forEach((path,i)=> {
					console.log("path:", path);
					printBoard(arr,i);
				})
			}
			return result;
		}
		positionsToCheck = positionsToCheck.concat(findAllAccessiblePositions(arr, pos, checkedPositions,positionsToCheck));
		checkedPositions.push(pos);
	}
	console.log("RETURNING no solution possible")
	return null;
}

function isOpen(value, time, dir) {
	if(value=="B" || value=="X")return true;
	if(value==-1)return false;
	var dirInTime = (dir+4-(time%4))%4
	var isWall = value & (1<<dirInTime)
	return !isWall;
}
function findAllAccessiblePositions(arr, startPos, checkedPos, queuedPos) {
	var list = [];
	var positionsToCheck = [];
	positionsToCheck.push(dataObj(startPos, startPos.time, startPos.path+"|"));
	var letWaitingMove = !startPos.path.endsWith("||||");//do not let wait over 4 times
	while(positionsToCheck.length) {
		var pos = positionsToCheck.shift();
		if(list.some(checked=>checked.x==pos.x&&checked.y==pos.y))continue;
		if(!letWaitingMove&&checkedPos.some(checked=>checked.x==pos.x&&checked.y==pos.y))continue;
		if(!letWaitingMove&&queuedPos.some(checked=>checked.x==pos.x&&checked.y==pos.y))continue;
		letWaitingMove = false;
		list.push(dataObj(pos, pos.time+1,pos.path))
		var posVal = getValue(arr, pos);
		for(var d=0;d<4;d++) {
			if(isOpen(posVal, pos.time, d)){
				var nextPos = moveInDir(pos,d);
				var nextPosVal = getValue(arr, nextPos)
				if(isOpen(nextPosVal, pos.time,invertDir(d))) {
					positionsToCheck.push(dataObj(nextPos, pos.time,pos.path+"ESWN"[d]))
				}
			}
		}
	}
	if(shouldPrintAllPaths) {
		console.log("from pos", startPos)
		console.log("we reach")
		console.log(list);
	}
	return list;
}
function invertDir(dir) {
	return (dir+2)%4;
}
function moveInDir(pos, dir) {
	var newPos = {x: pos.x, y:pos.y};
	switch(dir) {
		case 0: newPos.x += 1; break;
		case 1: newPos.y += 1; break;
		case 2: newPos.x -= 1; break;
		case 3: newPos.y -= 1; break;
	}
	return newPos;
}
function getValue(arr, pos){
	if(pos.y<0||pos.y>=arr.length)return -1
	if(pos.x<0||pos.x>=arr[pos.y].length)return -1;
	return arr[pos.y][pos.x];
}


function dataObj(pos, time, path) {
	return {
		x: pos.x,
		y: pos.y,
		time,
		path
	};
}

function findTile(arr, char) {
	for(var i=0;i<arr.length;i++) {
		for(var j=0;j<arr[i].length;j++) {
			if(arr[i][j]==char) return {
				x: j,
				y: i,
			}
		}
	}
	return;
}
function printBoard(arr, time) {
	var output = [];
	for(var i=0;i<arr.length*3;i++) {
		output[i]="";
	}
	for(var j=0;j<arr.length;j++) {
		for(var i=0;i<arr[j].length;i++) {
			var val = arr[j][i];
			if(!isOpen(val, time, 3)) output[j*3]   += "▄▄▄▄"; else output[j*3] += "    "
			if(!isOpen(val, time, 2)) output[j*3+1] += "▌";    else output[j*3+1] += " "
			if((""+val).length<2)output[j*3+1] += val+" ";     else output[j*3+1] += val;
			if(!isOpen(val, time, 0)) output[j*3+1] += "▐";    else output[j*3+1] += " "
			if(!isOpen(val, time, 1)) output[j*3+2] += "▀▀▀▀"; else output[j*3+2] += "    "
			output[j*3]  +="|"
			output[j*3+1]+="|"
			output[j*3+2]+="|"
		}
	}
	output.forEach((line,i)=>{
		console.log(line);
		if(i%3==2)console.log("--------------------")
	})
}