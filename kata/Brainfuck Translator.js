// Introduction
// Brainfuck is one of the most well-known esoteric programming languages.
// But it can be hard to understand any code longer than 5 characters.
// In this kata you have to solve that problem.
// Description
// In this kata you have to write a function which will do 3 tasks:
// Optimize the given Brainfuck code.
// Check it for mistakes.
// Translate the given Brainfuck programming code into C programming code.
// More formally about each of the tasks:
// Your function has to remove from the source code all useless command sequences such as: '+-', '<>', '[]'.
// Also it must erase all characters except +-<>,.[].
// Example:
// "++--+." -> "+."
// "[][+++]" -> "[+++]"
// "<>><" -> ""
// If the source code contains unpaired braces, your function should return "Error!" string.
// Your function must generate a string of the C programming code as follows:
// Sequences of the X commands + or - must be replaced by *p += X;\n or *p -= X;\n.
// Example:
// "++++++++++" -> "*p += 10;\n"
// "------" -> "*p -= 6;\n"
// Sequences of the Y commands > or < must be replaced by p += Y;\n or p -= Y;\n.
// Example:
// ">>>>>>>>>>" -> "p += 10;\n"
// "<<<<<<" -> "p -= 6;\n"
// . command must be replaced by putchar(*p);\n.
// Example:
// ".." -> "putchar(*p);\nputchar(*p);\n"
// , command must be replaced by *p = getchar();\n.
// Example:
// "," -> "*p = getchar();\n"
// [ command must be replaced by if (*p) do {\n
// ] command must be replaced by } while (*p);\n
// Example:
// "[>>]" ->
// if (*p) do {\n
//   p += 2;\n
// } while (*p);\n
// Each command in the code block must be shifted 2 spaces to the right accordingly to the previous code block.
// Example:
// "[>>[<<]]" ->
// if (*p) do {\n
//   p += 2;\n
//   if (*p) do {\n
//     p -= 2;\n
//   } while (*p);\n
// } while (*p);\n
// Examples
// Input:
// +++++[>++++.<-]
// Output:
// *p += 5;
// if (*p) do {
//   p += 1;
//   *p += 4;
//   putchar(*p);
//   p -= 1;
//   *p -= 1;
// } while (*p);


function brainfuck_to_c(sc){
	let code = [...sc].filter(c => '+-<>.,[]'.includes(c)).join('');

	let stack = [];
	for (let c of code) {
		if (c === '[') stack.push('[');
		else if (c === ']') {
			if (stack.length === 0) return "Error!";
			stack.pop();
		}
	}
	if (stack.length > 0) return "Error!";

	let prev;
	let iterations = 0;
	do {
		prev = code;
		code = code.replace(/\+-|-\+|<>|><|\[\]/g, '');
		iterations++;
	} while (code !== prev && iterations < 1000);

	let indentLevel = 0;
	let output = [];
	let i = 0;
	const n = code.length;

	while (i < n) {
		let c = code[i];

		if (c === '+' || c === '-') {
			let count = 0;
			while (i < n && (code[i] === '+' || code[i] === '-')) {
				count += (code[i] === '+') ? 1 : -1;
				i++;
			}
			if (count !== 0) {
				let op = count > 0 ? '+=' : '-=';
				output.push('  '.repeat(indentLevel) + `*p ${op} ${Math.abs(count)};\n`);
			}
			continue;
		}

		if (c === '>' || c === '<') {
			let count = 0;
			while (i < n && (code[i] === '>' || code[i] === '<')) {
				count += (code[i] === '>') ? 1 : -1;
				i++;
			}
			if (count !== 0) {
				let op = count > 0 ? '+=' : '-=';
				output.push('  '.repeat(indentLevel) + `p ${op} ${Math.abs(count)};\n`);
			}
			continue;
		}

		if (c === '.') {
			output.push('  '.repeat(indentLevel) + `putchar(*p);\n`);
			i++;
			continue;
		}

		if (c === ',') {
			output.push('  '.repeat(indentLevel) + `*p = getchar();\n`);
			i++;
			continue;
		}

		if (c === '[') {
			output.push('  '.repeat(indentLevel) + `if (*p) do {\n`);
			indentLevel++;
			i++;
			continue;
		}

		if (c === ']') {
			indentLevel--;
			output.push('  '.repeat(indentLevel) + `} while (*p);\n`);
			i++;
			continue;
		}

		i++;
	}

	return output.join('');
}