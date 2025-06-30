// Create a function that differentiates a polynomial for a given value of x.
//
// 	Your function will receive 2 arguments: a polynomial as a string, and a point to evaluate the equation as an integer.
//
// 	Assumptions:
// There will be a coefficient near each x, unless the coefficient equals 1 or -1.
// There will be an exponent near each x, unless the exponent equals 0 or 1.
// All exponents will be greater or equal to zero
// Examples:
// 	differenatiate("12x+2", 3)      ==>   returns 12
// differenatiate("x^2+3x+2", 3)   ==>   returns 9


function differentiate(polynomial, x) {
	// Разбиваем многочлен на слагаемые, учитывая знаки + и -
	// Для удобства заменим минусы на +-
	polynomial = polynomial.replace(/-/g, "+-");
	if (polynomial[0] === '+') polynomial = polynomial.slice(1);
	const terms = polynomial.split("+").filter(t => t);

	let result = 0;

	for (const term of terms) {
		// Парсим коэффициент и степень из каждого слагаемого
		// Форматы:
		// "12x^3", "-x^2", "x", "-x", "3", "-5"
		let coef = 1, power = 0;

		// Проверка наличия x
		if (term.includes("x")) {
			// Коэффициент - часть перед x
			let coefPart = term.split("x")[0];
			if (coefPart === "" || coefPart === "+") coef = 1;
			else if (coefPart === "-") coef = -1;
			else coef = Number(coefPart);

			// Степень - после ^
			if (term.includes("^")) {
				power = Number(term.split("^")[1]);
			} else {
				power = 1;
			}
		} else {
			// Просто число - константа, производная 0
			continue;
		}

		// Производная: n*a*x^(n-1) = coef*power*x^(power-1)
		if (power === 0) continue; // производная константы 0

		const derivedCoef = coef * power;
		const derivedPower = power - 1;

		result += derivedCoef * Math.pow(x, derivedPower);
	}

	return result;
}
