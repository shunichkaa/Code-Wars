// Implement an interpreter for the esoteric language Boolfuck.
// Boolfuck is like Brainfuck but operates on bits, not bytes.
// Tape is infinite in both directions, cells hold 0 or 1 only, pointer starts at middle.
// Commands:
// + flips current bit under pointer
// , reads one bit from input (input is bytes, read bitwise in little-endian order per byte; EOF yields 0 bit)
// ; outputs current bit to output bit stream (bits collected to bytes little-endian; last byte padded with zeros if incomplete)
// < moves pointer left by 1 bit
// > moves pointer right by 1 bit
// [ if current bit is 0, jump forward to matching ]
// ] if current bit is 1, jump back to matching [
// Ignore any non-command characters.
// The interpreter receives code string and optional input string.
// Return output string composed of bytes formed from collected output bits.
// Use provided brainfuckToBoolfuck() converter if needed.
// The input and output bits order are little-endian per byte.
// Implement matching bracket logic for loops.
// Handle infinite tape using a map or dynamic array with pointer index starting at 0.
// Input bits extracted per character: least significant bit first.
// Output bits assembled similarly.
// Ensure robust parsing and looping logic.


function boolfuck(code, input = "") {
	const commands = new Set(['+', ',', ';', '<', '>', '[', ']']);

	let filteredCode = "";
	for (let ch of code) {
		if (commands.has(ch)) filteredCode += ch;
	}

	const bracketMap = new Map();
	const stack = [];
	for (let i = 0; i < filteredCode.length; i++) {
		if (filteredCode[i] === '[') stack.push(i);
		else if (filteredCode[i] === ']') {
			const start = stack.pop();
			bracketMap.set(start, i);
			bracketMap.set(i, start);
		}
	}

	const inputBits = [];
	for (let i = 0; i < input.length; i++) {
		let byte = input.charCodeAt(i);
		for (let b = 0; b < 8; b++) {
			inputBits.push(byte & 1);
			byte >>= 1;
		}
	}

	const tape = new Map();
	let ptr = 0;

	let inputPos = 0;

	const outputBits = [];

	let pc = 0;

	while (pc < filteredCode.length) {
		const cmd = filteredCode[pc];

		switch (cmd) {
			case '+': {
				const val = tape.get(ptr) || 0;
				tape.set(ptr, val ^ 1);
				pc++;
				break;
			}
			case ',': {
				let bit = 0;
				if (inputPos < inputBits.length) {
					bit = inputBits[inputPos];
					inputPos++;
				}
				tape.set(ptr, bit);
				pc++;
				break;
			}
			case ';': {
				const val = tape.get(ptr) || 0;
				outputBits.push(val);
				pc++;
				break;
			}
			case '<':
				ptr--;
				pc++;
				break;
			case '>':
				ptr++;
				pc++;
				break;
			case '[': {
				const val = tape.get(ptr) || 0;
				if (val === 0) pc = bracketMap.get(pc) + 1;
				else pc++;
				break;
			}
			case ']': {
				const val = tape.get(ptr) || 0;
				if (val === 1) pc = bracketMap.get(pc) + 1;
				else pc++;
				break;
			}
			default:
				pc++;
				break;
		}
	}

	let result = "";
	for (let i = 0; i < outputBits.length; i += 8) {
		let charCode = 0;
		for (let b = 0; b < 8; b++) {
			charCode |= ((outputBits[i + b] || 0) << b);
		}
		result += String.fromCharCode(charCode);
	}

	return result;
}