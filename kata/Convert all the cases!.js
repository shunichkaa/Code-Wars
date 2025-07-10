// In this kata, you will make a function that converts between camelCase, snake_case, and kebab-case.
//
// You must write a function that changes to a given case. It must be able to handle all three case types:
//
// 	js> changeCase("snakeCase", "snake")
// "snake_case"
// js> changeCase("some-lisp-name", "camel")
// "someLispName"
// js> changeCase("map_to_all", "kebab")
// "map-to-all"
// js> changeCase("doHTMLRequest", "kebab")
// "do-h-t-m-l-request"
// js> changeCase("invalid-inPut_bad", "kebab")
// undefined
// js> changeCase("valid-input", "huh???")
// undefined
// js> changeCase("", "camel")
// ""
// Your function must deal with invalid input as shown, though it will only be passed strings. Furthermore, all valid identifiers will be lowercase except when necessary, in other words on word boundaries in camelCase.
//
// (Any translations would be greatly appreciated!)

function changeCase(str, targetCase) {
	if (typeof str !== 'string' || typeof targetCase !== 'string') return undefined;
	if (str === '') return '';

	// Проверка корректности исходной строки (она должна быть в одном стиле)
	// Допустимые стили: camelCase, snake_case, kebab-case
	const isCamel = /^[a-z]+(?:[A-Z][a-z]*)*$/.test(str);
	const isSnake = /^[a-z]+(?:_[a-z]+)*$/.test(str);
	const isKebab = /^[a-z]+(?:-[a-z]+)*$/.test(str);

	// Если строка не подходит ни под один стиль — undefined
	if (!(isCamel || isSnake || isKebab)) return undefined;

	// Проверка targetCase на валидность
	if (!['camel', 'snake', 'kebab'].includes(targetCase)) return undefined;

	// Функция для разбивки строки на слова
	let words;
	if (isCamel) {
		words = str.split(/(?=[A-Z])/).map(w => w.toLowerCase());
	} else if (isSnake) {
		words = str.split('_');
	} else {
		words = str.split('-');
	}

	// Конвертация в нужный формат
	switch (targetCase) {
		case 'camel':
			return words
			.map((w, i) => i === 0 ? w : w[0].toUpperCase() + w.slice(1))
			.join('');
		case 'snake':
			return words.join('_');
		case 'kebab':
			return words.join('-');
	}
}
