// Mad Mathematician's Calculator (Hardcore Version)
// Story
// This tragedy began because of one weird rich math-psycho, named Kuy. He lives alone in an apartment near a supermarket. Everyday, he has to buy his living stuff from that place. But one problem is that he could not carry all of them by himself. Once, Kuy decided to have a talk with an operator from the call center. Sadly, the supermarket denied his request to borrow their basket, despite of his strong entreat. Eventually, the operator cut Kuy's call swiftly with a reason that she had to deal with a programmer, leaving him with a word 'bye' and beep sound. That made him crazy for a while.
//
// Unfortunately, you are in that while mentioned above. You are a programmer hired by Kuy to create a unique calculator software for him. A contract was made in exchange with huge amount of money. It has only one condition, "Do not violate limitations in the list."
//
// Kuy's words after you have already signed the contract:
//
// "I hate the operators, baskets, and programmers. So, I will troll you to satisfy myself HAHAHAHH. If you really are a true programmer, you should be able to do it by yourself without any excuses or shortcuts. Since I have got not much time, don't make me wait again and again."
//
// Task
// You have to write a calc(a,b,operator) function to receive 2 numbers and 1 operator respectively, assuming a, b, and operator. calc function will calculate a result from a and b as indicated by operator and return as a number.
//
// 	Coding Limitation:
// 	The data listed below are not allowed in your code:
//
// 	Operators
// Mathematical operators: +, -, *, /, %
// Bitwise operators: <<, >>, ^, ~, !, |, &
// Other operators: <, >, .
// Basket Brackets: [, ], {, }
// Numbers: 0-9, NaN
// Quotations: ", ', `` `
// Loop commands: for, while
// 	Additional libraries/constructors: Array, Math, Number, String
// Trolling conditions: global,return, this
// Note: arrow function is allowed
// The modules/functions below are also disabled:
//
// 	Bypassing functions: require(), eval(), function constructor
// Time functions: setTimeout(), setInterval()
// Modules: fs, vm
// Input:
// 	a, b as integer from 0 to 5000
// operator as string of basic mathematical operator as follow:
// 	"+" addition
// "-" substraction
// "*" multiplication
// "/" division
// "%" modulus
// Output:
// 	return a number with maximum 2 decimal places (rounded down), or NaN if a/0 or a%0
// Example:
// 	calc(1, 2, "+") === 3 //should return true
// calc(0, 0, "-") === 0 //should return true
// calc(6, 7, "*") === 42 //should return true
// calc(5, 4, "%") === 1 //should return true
// isNaN(calc(9, 0, "/")) === true //should return true


with (Function) with (call) _call = bind(bind, call);
with (encodeURI()) S = constructor;
with (S) SP = prototype, _fromCharCode = fromCharCode;
with (SP)
	_charCodeAt = _call(charCodeAt), _concat = _call(concat), _includes = _call(includes),
		_lastIndexOf = _call(lastIndexOf), _match = _call(match),
		_repeat = _call(repeat), _replace = _call(replace), _split = _call(split);
with (_split(S())) _map = _call(map), _push = _call(push);

with (___________________________________________ = _ => _) with (name) plus = _fromCharCode(length);
with (_____________________________________________ = _ => _) with (name) dash = _fromCharCode(length);
with (__________________________________________ = _ => _) with (name) asterisk = _fromCharCode(length);
with (_______________________________________________ = _ => _) with (name) slash = _fromCharCode(length);
with (e = _ => _) e = name;
with (g = _ => _) g = name;
with (d = _ => _) hundred = _charCodeAt(name, null);
z = _fromCharCode(null);

dec = x => _lastIndexOf(_repeat(z, x), z);
len = s => _lastIndexOf(_concat(s, z), z);
lena = a => dec(_push(a, null));
ge = (a, b) => _includes(_repeat(z, a), _repeat(z, b));
add = (a, b) => len(_concat(_repeat(z, a), _repeat(z, b)));
sub = (a, b) => ge(a, b) ? _lastIndexOf(_repeat(z, a), _repeat(z, b)) : parseInt(_concat(dash, sub(b, a)));
mul = (a, b) => len(_repeat(_repeat(z, a), b));
div = (a, b) => b ? dec(lena(_split(_repeat(z, a), _repeat(z, b)))) : parseInt();
divHundredFP = a => parseFloat(_concat(a, e, dash, add(true, true)));
mod = (a, b) => b ? len(_replace(_repeat(z, a), RegExp(_repeat(z, b), g), S())) : parseInt();
calc = (a, b, op) =>
	op == plus ? add(a, b):
		op == dash ? sub(a, b) :
			op == asterisk ? mul(a, b) :
				op == slash ? divHundredFP(div(mul(a, hundred), b)) :
					mod(a, b);