// What is DFA and NFA
// For more information about definition NFA and DFA for this kata see this and this katas.
//
// 	In general terms, DFA and NFA are described by:
//
// 	a set of states
// one (for DFA) or more start states
// a set of transitions
// a set of accepted states
// Both separate set of all posible strings on two group:
//
// 	accepted
// not accepted
// String is accepted if a path exists from any start state to any accepted state by transitions corresponding to the characters in the string.
//
// 	DFA contains no more than one transition for each pair of state and character. NFA can contains multiple transition for there pairs.
//
// 	In addition NFA can contain empty transitions.
//
// 	An interesting fact, for any NFA, you can construct an equivalent DFA.
//
// 	Task
// Write a function NFAtoDFA that to the given NFA construct an equivalent (accepted the same strings) DFA.
//
// 	Function get NFA in following format:
//
// 	Start states (array of number)
// Transitions (array of [number, symbol, number])
// Accepted states (array of numbers)
// And must return answer array of 3 elements:
//
// 	answer[0] - Start state of DFA (number)
// answer[1] - Transition of DFA (array of [number, symbol, number])
// answer[2] - Accepted states of DFA (array of numbers)
// Note: In some definitions of DFA, also indicate the need for a transition for each state and each symbol to have one transition, in this kata there can be 0.
//
// Example
// NFA and DFA for /^(a|b)*a$/
//
// 	For this NFA:
//
// 	In function you get:
//
// 	startStates = [0]
// transitions = [
// 	[0, '', 1], // q0 --> q1
// 	[0, '', 5], // q0 --> q5
// 	[1, 'a', 2], // q1 -a-> q2
// 	[1, 'b', 3], // q1 -b-> q3
// 	[2, '', 4], // q2 --> q4
// 	[3, '', 4], // q3 --> q4
// 	[4, '', 1], // q4 --> q1
// 	[4, '', 5], // q4 --> q5
// 	[5, 'a', 6], // q5 -a-> q6
// ]
// acceptStates = [6]
// For this DFA:
//
// 	dfaStartState = 0
// dfaTransitions = [
// 	[0, 'a', 1],
// 	[1, 'a', 1],
// 	[2, 'a', 1],
// 	[0, 'b', 2],
// 	[1, 'b', 2],
// 	[2, 'b', 2]
// ]
// dfaAcceptStates = [1]
// And your output can be:
//
// 	[
// 		dfaStartState,
// 		dfaTransitions,
// 		dfaAcceptStates,
// 	]


function NFAtoDFA(startStates, transitions, acceptStates) {
	// Построим карту переходов и ε-переходов
	const epsilon = '';
	const nfaTransitions = new Map(); // Map<state, Map<symbol, Set<state>>>
	const allSymbols = new Set();

	for (const [from, sym, to] of transitions) {
		if (!nfaTransitions.has(from)) nfaTransitions.set(from, new Map());
		const mapSym = nfaTransitions.get(from);
		if (!mapSym.has(sym)) mapSym.set(sym, new Set());
		mapSym.get(sym).add(to);
		if (sym !== epsilon) allSymbols.add(sym);
	}

	// Функция для ε-замыкания множества состояний
	function epsilonClosure(states) {
		const stack = [...states];
		const closure = new Set(states);
		while (stack.length > 0) {
			const state = stack.pop();
			const trans = nfaTransitions.get(state);
			if (trans && trans.has(epsilon)) {
				for (const nxt of trans.get(epsilon)) {
					if (!closure.has(nxt)) {
						closure.add(nxt);
						stack.push(nxt);
					}
				}
			}
		}
		return closure;
	}

	// Функция перехода по символу с ε-замыканием
	function move(states, symbol) {
		const result = new Set();
		for (const state of states) {
			const trans = nfaTransitions.get(state);
			if (trans && trans.has(symbol)) {
				for (const nxt of trans.get(symbol)) {
					result.add(nxt);
				}
			}
		}
		return epsilonClosure(result);
	}

	// Начальное состояние DFA - ε-замыкание стартовых состояний NFA
	const startClosure = epsilonClosure(new Set(startStates));

	// Map множества состояний NFA -> номер состояния DFA
	const dfaStatesMap = new Map();
	const dfaStatesList = [];
	const queue = [];

	function statesToKey(states) {
		return [...states].sort((a,b) => a-b).join(',');
	}

	const startKey = statesToKey(startClosure);
	dfaStatesMap.set(startKey, 0);
	dfaStatesList.push(startClosure);
	queue.push(startClosure);

	const dfaTransitions = [];
	const dfaAcceptStates = new Set();

	while (queue.length > 0) {
		const currStates = queue.shift();
		const currKey = statesToKey(currStates);
		const currDfaState = dfaStatesMap.get(currKey);

		// Проверяем, является ли это принимающим состоянием
		for (const s of currStates) {
			if (acceptStates.includes(s)) {
				dfaAcceptStates.add(currDfaState);
				break;
			}
		}

		// Для каждого символа ищем переход
		for (const sym of allSymbols) {
			const nextStates = move(currStates, sym);
			if (nextStates.size === 0) continue;

			const nextKey = statesToKey(nextStates);
			if (!dfaStatesMap.has(nextKey)) {
				const newIndex = dfaStatesList.length;
				dfaStatesMap.set(nextKey, newIndex);
				dfaStatesList.push(nextStates);
				queue.push(nextStates);
			}
			const nextDfaState = dfaStatesMap.get(nextKey);
			dfaTransitions.push([currDfaState, sym, nextDfaState]);
		}
	}

	return [
		0,
		dfaTransitions,
		Array.from(dfaAcceptStates).sort((a,b) => a-b)
	];
}