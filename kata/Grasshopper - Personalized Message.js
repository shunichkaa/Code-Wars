// Create a function that gives a personalized greeting. This function takes two parameters: name and owner.
//
// 	Use conditionals to return the proper message:
//
// 	case	return
// name equals owner	'Hello boss'
// otherwise	'Hello guest'


function greet(name, owner) {
	if (name === owner) {
		return 'Hello boss';
	}
	return 'Hello guest';
}
