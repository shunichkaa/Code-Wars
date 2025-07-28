// Introduction
// Robozzle is a puzzle game which requires the player to write programs to get a robot through a maze, collecting all stars on it.
//
// 	The best way to understand the game is probably to play it, please have a try on http://www.robozzle.com/
//
// 	Your ultimate goal in the life is now to write a Robozzle simulator.
//
// 	The task
// You'll write a robozzle function which will take the board, the robot initial state and the program in paramters.
//
// The board will be a 2 dimensions array containing cells. A cell is a Hash containing 2 elements:
//
// 	color: the color of the cell (one of blue, green or red)
// star: a boolean indicating if the cell contains a star
// The robot will be a Hash containing the following elements:
//
// 	x: the x position of the robot on the board
// y: the y position on the roboat board
// direction: one of right, left, up, down
// Coordinates start at 0; 0 at the top left, the y axix goes "down" and the x axis goes to the "right", so if the robot is moving down, it's y coordinate will increase.
//
// The program will be an array of subprograms, containing at least one subprogram. Each subprogram is a list of actions, an action is a hash containing the following elements:
//
// 	action: the instruction to perform (see below for the possible instructions)
// if (optional): the color condition to perform the action (see "conditionals")
// Your simulator will run turn by turn, until the end of the game, popping an action from the stack and executing it.
//
// 	At the end of the game (see "end of the game" section), you will return a 2 elements array containg the final state of the board and the final state of the robot.
//
// 	Your function might need to abort prematurely if there is an error (see "end of the game")
//
// Instructions
// Your simulator will support the following instructions:
//
// 	forward: move the robot 1 cell forward, following it's current direction
// turn_right: turn the robot to the right
// turn_left: turn the robot to the left
// paint_blue: change the color of the current cell to blue
// paint_green: change the color of the current cell to green
// paint_red: change the color of the current cell to red
// an integer: stack the instructions of the subprogram at the integer's index in the given program
// Conditionals
// Actions can be conditional, meaning they will be executed only if the current cell is of the same color as their if element.
//
// 	If an action does not fulfil the conditional, it's skipped.
//
// The stack
// Your simulator will use a stack to store the instructions to execute. You will initialize it with the instructions of the first subprogram.
//
// 	The stack is Last-in, First-out, that means the last inserted instruction will be executed next.
//
// 	Each turn, you'll have to pop the most recently inserted action from the stack and execute it.
//
// Please note the subprogams are meant to be executed in the same order as given, so take care when putting their instructions on the stack.
//
// 	End of the game
// The game ends when the robot has collected all the stars on the board or if an error occurs.
//
// 	You have to take care of the following errors:
//
// 	There is no more instructions to execute on the stack
// The robot moved out of the board (either outside of the board array boudaries or on a nil cell)
// You have to raise an exception to signal it with a meaningful error message if any errors occurs.
//
// 	Other remarks
// The requirements might be harder to understand if you haven't yet play the game (and the game is really fun to play, you should really give it a try).
//
// I have included 2 sample puzzles in the test cases so you can check how the simulator is expected to work, especially about dealing with the inputs and outputs.
//
// 	Feel free to let me know in the comments if anything is unclear or if there is an issue with the Kata.
//
// 	Happy coding!


robozzle = function(board, robot, program) {
	const height = board.length;
	const width = height > 0 ? board[0].length : 0;

	// Копируем доску, учитывая возможные null клетки
	board = board.map(row =>
		row.map(cell => cell ? { color: cell.color, star: cell.star } : null)
	);

	// Направления и повороты
	const directions = ['up', 'right', 'down', 'left'];
	function turnRight(dir) {
		let i = directions.indexOf(dir);
		return directions[(i + 1) % 4];
	}
	function turnLeft(dir) {
		let i = directions.indexOf(dir);
		return directions[(i + 3) % 4];
	}
	function moveForward(pos, dir) {
		let { x, y } = pos;
		if (dir === 'up') y -= 1;
		else if (dir === 'down') y += 1;
		else if (dir === 'left') x -= 1;
		else if (dir === 'right') x += 1;
		return { x, y };
	}
	function isInBoard(pos) {
		if (pos.y < 0 || pos.y >= height) return false;
		if (pos.x < 0 || pos.x >= width) return false;
		if (board[pos.y][pos.x] == null) return false;
		return true;
	}
	function allStarsCollected() {
		for (let row of board) {
			for (let cell of row) {
				if (cell && cell.star) return false;
			}
		}
		return true;
	}

	robot = { ...robot };

	// Инициализируем стек с инструкциями первой подпрограммы в обратном порядке
	if (program.length === 0) throw new Error('Program is empty');
	let stack = [...program[0]].reverse();

	while (true) {
		if (allStarsCollected()) break;
		if (stack.length === 0) throw new Error('No instructions left to execute');

		const instr = stack.pop();

		// Проверяем условие цвета (if)
		if (instr.if !== undefined) {
			const currentCell = board[robot.y][robot.x];
			if (!currentCell || currentCell.color !== instr.if) {
				continue; // условие не выполнено, пропускаем
			}
		}

		const action = instr.action;

		if (typeof action === 'number') {
			if (action < 0 || action >= program.length) {
				throw new Error('Invalid subprogram index');
			}
			const subprog = program[action];
			for (let i = subprog.length - 1; i >= 0; i--) {
				stack.push(subprog[i]);
			}
			continue;
		}

		switch (action) {
			case 'forward': {
				const newPos = moveForward(robot, robot.direction);
				if (!isInBoard(newPos)) {
					throw new Error('Robot moved out of the board');
				}
				robot.x = newPos.x;
				robot.y = newPos.y;
				const cell = board[robot.y][robot.x];
				if (cell.star) {
					cell.star = false;
				}
				break;
			}
			case 'turn_right':
				robot.direction = turnRight(robot.direction);
				break;
			case 'turn_left':
				robot.direction = turnLeft(robot.direction);
				break;
			case 'paint_blue':
			case 'paint_green':
			case 'paint_red': {
				const cell = board[robot.y][robot.x];
				if (!cell) {
					throw new Error('Robot is on invalid cell');
				}
				cell.color = action.split('_')[1];
				break;
			}
			default:
				throw new Error('Unknown action');
		}
	}

	return [board, robot];
};