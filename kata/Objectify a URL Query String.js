// In this kata, we want to convert a URL query string into a nested object. The query string will contain parameters that may or may not have embedded dots ('.'), and these dots will be used to break up the properties into the nested object.
//
// 	You will receive a string input that looks something like this:
//
// user.name.firstname=Bob&user.name.lastname=Smith&user.favoritecolor=Light%20Blue
// Your method should return an object hash-map that looks like this:
//
// {
// 	'user': {
// 	'name': {
// 		'firstname': 'Bob',
// 			'lastname': 'Smith'
// 	},
// 	'favoritecolor': 'Light Blue'
// }
// }
// You can expect valid input. You won't see input like:
// // This will NOT happen
// foo=1&foo.bar=2
// All properties and values will be strings — and the values should be left as strings to pass the tests.
// 	Make sure you decode the URI components correctly


function convertQueryToMap(query) {
	const obj = {};
	if (!query) return obj;

	const pairs = query.split('&');

	for (const pair of pairs) {
		const [rawKey, rawVal] = pair.split('=');
		const key = decodeURIComponent(rawKey);
		const val = decodeURIComponent(rawVal);

		const keys = key.split('.');
		let current = obj;

		for (let i = 0; i < keys.length; i++) {
			const k = keys[i];

			if (i === keys.length - 1) {
				// последний ключ — присваиваем значение
				current[k] = val;
			} else {
				// если нет объекта — создаём вложенный объект
				if (!(k in current)) current[k] = {};
				current = current[k];
			}
		}
	}

	return obj;
}
