// We all remember that Santa was once in dire need of help. Knowing who to call he shouted out for Rudolph to help him find his way.
//
// 	This story took place a long ago and, alas, Rudolph — suffering from old age — must now be replaced. As every code warrior knows, Santa is by no means an old fashioned man and he has sketched the brand new "Generate Path for Santa" system which he delegated to the IT elves to finish.
//
// "It shouldn't take long for such a bright bunch of elves like you", he claimed and left the room in a hurry to take care of the present shop.
//
// 	However, the IT elves are not yet ready to meet such a demand, yet they really do not want to disappoint Santa and the potential 3 billion children around the world.
//
// 	The elves require assistance. Can you help them?
//
// 	Before Santa rides off to deliver the presents, an existing system will deliver a network of possible routes. Your job (along with the IT elves) is to take this route network and find a path — any path — from a starting point to an end point. (Between you and me, the network is really what we know as a maze). Start and end points will always be different.
//
// 	The generated maze will differ between each jump on Santas route, so be aware that any x,y point can be the start and the same goes for the end point. Also, the dimensions may differ according to an algorithm only Santa knows.
//
// 	Format: The maze is an m x n matrix (array of arrays) with each cell being an object having an x,y (row/column). Every cell in the maze has one and only one path to any other cell.
//
// 	Each cell may have an open path in each of the four directions: North, South, East and West. E.g. a cell A connected to its right neighbor B will have A.east == B (and B.west == A)
//
// The output path must contain all path cells in visited order (including start and end cells, start being at path[0] and end at path[path.length-1].
//
// 	A simple 2 x 2 maze is generated through:
//
// 	var maze = [[{x:0,y:0},{x:1,y:0}],[{x:0,y:1},{x:1,y:1}]];
// maze.cell = function(x,y){return this[y][x]};
// maze[0][0].south = maze.cell(0,1);
// maze[0][0].east = maze.cell(1,0);
// maze[0][1].west = maze.cell(0,0);
// maze[1][0].north = maze.cell(0,0);
// maze[1][0].east = maze.cell(1,1);
// maze[1][1].west = maze.cell(0,1);
// Santa wants to have a findPath method returning the path containing each step in sequence from start to end.
//
// 	var path = findPath(maze[0][0],maze[1][1]);
// // path = [ {x:0,y:0,...}, {x:0,y:1,...}, {x:1,y:1,...} ]
// The QA elves have provided you with a few helper functions:
//
// 	createMaze(width,height) - Generate a random maze of dimensions width x height.
//
// checkPath(path) - Take a path and validate each step that will move Santa to neighboring cells only.
//
// display(maze, path) - Output a string depicting the maze. If the path argument is given it will be depicted too.
//
// stringify(maze) - Generate a string containing a piece of JavaScript code representing the given maze. This was used to generate the example 'maze' above.
//



function findPath(start, end) {
	const visited = new Set();
	const path = [];

	function dfs(cell) {
		if (!cell || visited.has(cell)) return false;
		visited.add(cell);
		path.push(cell);
		if (cell === end) return true;

		for (const dir of ['north', 'south', 'east', 'west']) {
			if (dfs(cell[dir])) return true;
		}

		path.pop();
		return false;
	}

	dfs(start);
	return path;
}
