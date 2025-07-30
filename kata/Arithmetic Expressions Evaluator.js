// The purpose of this Kata is to develop an arithmetic expression evaluator.
// Your task consists in implementing the methods eval and toString within the createOperator function.
// Values as Terminal Expressions
// Key to the understanding of the solution of this Kata is the realization that all expressions can be reduced to a value,
// and a value is just an expression that cannot be reduced any further.
// That is, if we evaluate a value expression, we get the value itself.
// Somewhat like this:
// function Value(value){
// 	this.value = value || 0;
// }
// Value.prototype.eval = function(){ return this; };
// Value.prototype.valueOf = function(){ return this.value.valueOf(); };
// Value.prototype.toString = function(){ return this.value.toString(); };
// For this Kata the Value type will be preloaded in your environment.
// Compound Expressions
// Now, we can also define more complex expressions by combining values with operators, like 3 * 5 or 6 + 2
// In this Kata we have provided a function createOperator that is capable of creating different kinds of operators.
// An operator is a type of expression. When they are used, they create new compound expression.
// You can see some predefined operators in the initial Kata's testing code.
// Examples of compound expressions.
// var sumExpr = new Add(new Value(3), new Value(5)); //3 + 5
// var mulExpr = new Mul(new Value(6), new Value(2)); //6 * 2
// We can even define more complex expressions like  3 * 5 + 6 / 2
// var a = new Mul(new Value(3), new Value(5));
// var b = new Div(new Value(6), new Value(2));
// var c = new Add(a,b);
// Since all expressions can be evaluated (meaning reduced) to a single value,
// we can see now that our operator expressions are lacking two important features: the functions eval and toString.
// eval: should reduce an expression to a Value
// toString: should generate a string with a human-readable representation of the expression.
// For instance
// c.eval();     //should return Value(18)
// c.toString(); //should return the string '3 * 5 + 6 / 2'
// Can you implement this missing functionality for the operator classes?
// Other Considerations
// The tests will only count on binary operators (i.e. +,-,*,/,^), and it is assumed that every operator must act on at least two expressions.


var createOperator = (function() {
	return function(name, oper){
		return function(){
			this.expressions = [].slice.call(arguments);

			this.eval = function() {
				const values = this.expressions.map(expr => expr.eval().valueOf());
				const result = values.reduce(oper);
				return new Value(result);
			};

			this.toString = function() {
				return this.expressions.map(expr => expr.toString()).join(' ' + name + ' ');
			};
		};
	};
})();