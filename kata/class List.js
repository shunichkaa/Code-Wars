// List. Any way you like.
// JavaScript Arrays can only represent lists of finite length.
// Your job is to implement the List class, which must be able to represent both finite and infinite lists.
// It must support the class and instance methods specified below.
// Methods must not have side effects ( mutating any argument would be a side effect ).
// The internal representation of List is completely free.
// With great power, however, comes great responsibility: you need to supply adequate laziness to support infinite lists yourself.
// E.g. \[ infinite elements ].map( function ) or \[ infinite elements ].append( \[ (in)finite elements ] ) should return a new \[ infinite elements ].
// class methods
// List.empty, .iterate(fn,x), .repeat(x), .cycle(xs), .replicate(n,x), .fromList(xs)
// where fn is a function, xs is a list, x is an element (a value) and n is a number.
// instance methods
// list.head(), .tail(), .init(), .last(), .length(), .toList(), .get(i), .nil(), .take(n), .drop(n), .cons(x), .append(xs), .slice(i,j),
// .map(fn), .filter(fn), .reverse(), .concat(), .concatMap(fn), .zipWith(fn,xs), .foldr(fn,x), .foldl(fn,x), .scanr(fn,x), .scanl(fn,x), .elem(x),
// .elemIndex(x), .find(fn), .findIndex(fn), .any(fn), .all(fn), .the()
// where fn is a function, xs is a list, x is an element (a value), i,j are indices and n is a number (a sort of index).
// more class methods
// You will also need to implement some use cases of infinite lists.
// List.PRIME: an infinite list of all prime numbers (\[ 2, 3, 5, 7, 11, 13, 17, 19, .. ] ).
// You might use primes = filterPrime \[2..] where filterPrime (p\:xs) = p : filterPrime \[x | x <- xs, x `mod` p /= 0] from haskell.org.
// It can be written quite elegantly using List. (Don't worry too much about efficiency for this.)
// List.FIB: an infinite list of Fibonacci (0,1) numbers ( \[ 0, 1, 1, 2, 3, 5, 8, 13, .. ] ).
// You might use fib = 0 : 1 : zipWith (+) fib (tail fib). (Again, elegance over efficiency.)
// arctan(x) can be written as an infinite sum 0 + x^1/1 - x^3/3 + x^5/5 - x^7/7 ..
// π is equal to 4 \* ( arctan(1/2) + arctan(1/3) ).
// List.PI: an infinite list of increasing numbers of terms (taken pairwise) of this infinite sum
// ( \[ 0, 4\*(1/2+1/3), 4\*(1/2+1/3 - 1/8/3-1/27/3), 4\*(1/2+1/3 - 1/8/3-1/27/3 + 1/32/5+1/243/5), .. ] ).
// This one is actually quite efficient ! even though it can converge faster still with other constants.
// But these look nice. \:P
// notes
// Unlike in Haskell, the head, tail, init and last of an empty list are defined.
// Also, the is defined for all lists ( and can be determined, except in case of an infinite list of all equal elements ).
// Diverging results and list values at out-of-bounds indices are undefined ( not necessarily undefined ! ).
// take and drop have defined results for out-of-bounds arguments, but slice does not.
// Undefined results may result in any value or action.
// All test inputs are valid and should result in a defined result.
// class methods
// List.empty => an (or the) empty list ( must not require () ).
// List.iterate(fn,x) => an infinite list of successive applications of fn to x.
// List.repeat(x) => an infinite list, every element of which is x.
// List.cycle(xs) => an infinite list of repetitions of xs ( equals xs if xs is infinite ).
// List.replicate(n,x) => a finite list of length n, every element of which is x.
// List.fromList(xs) => xs converted to a list ( an Array must be a valid xs ).
// List.PRIME, List.FIB, List.PI => ( must not require () ).
// instance methods
// list.head() => the first element of list, or undefined for empty list.
// list.tail() => list without its first element, or an empty list for empty list.
// list.init() => list without its last element, or an empty list for empty list ( equals list if list is infinite ).
// list.last() => the last element of list, or undefined for empty list ( diverges for infinite list ).
// list.length() => the length of list ( diverges for infinite list ).
// list.toList() => list converted to an Array ( diverges for infinite list ).
// list.get(i) => the element of list at index i.
// list.nil() => true for empty list, false otherwise ( null in Haskell ).
// list.take(n) => the first (at most) n elements of list ( n may be negative or greater than list.length() ).
// list.drop(n) => list without its first ( at most ) n elements ( n may be negative or greater than list.length() ).
// list.cons(x) => x prepended to list.
// list.append(xs) => xs appended to list ( equals list if list is infinite ).
// list.slice(i,j) => list from index i (inclusive) to index j (exclusive) ( both arguments are optional; result is undefined for arguments not in list ).
// list.map(fn) => list transformed by fn.
// list.filter(fn) => only the elements of list for which fn holds.
// list.reverse() => list in reverse order ( diverges for infinite list ).
// list.concat() => list flattened; list must be a list of lists ( behaves differently than .concat() in JavaScript ! ).
// list.concatMap(fn) => list transformed by fn, then flattened.
// list.zipWith(fn,xs) => map, but with two lists ( fn will normally be a binary function ).
// list.foldr(fn,x) => right-associative reduction of list to a single value ( \[x1,x2,..,xn].foldr(fn,z) = fn( x1, fn( x2, .. fn( xn, z ) ) ) )
// ( foldr should only recursively evaluate necessary fn arguments, as to return a valid value from a nullary or unary fn even if list is infinite )
// ( not quite .reduceRight() in JavaScript ).
// list.foldl(fn,x) => left-associative reduction of list to a single value ( \[x1,x2,..,xn].foldl(fn,z) = fn( .. fn( fn( z, x1 ), x2 ) .., xn ) )
// ( diverges for infinite list ) ( .reduce() in JavaScript ).
// list.scanr(fn,x) => right-associative incremental reduction of list to a list ( \[x1,x2,..,xn].scanr(fn,z) = \[ fn( x1, .. ), .., fn( x(n-1),
// fn( xn, z ) ), fn( xn, z ), z ] ) ( scanr should only recursively evaluate necessary fn arguments, as to return a valid value from a nullary or unary fn even
// if list is infinite. earlier versions of the kata did not have this requirement, so this is tested for Bonus Points only ).
// list.scanl(fn,x) => left-associative incremental reduction of list to a list ( \[x1,x2,..,xn].scanl(fn,z) = \[ z, fn( z, x1 ), fn( fn( z, x1 ), x2 ), .., fn( .., xn ) ] ).
// list.elem(x) => true if list contains x, false otherwise ( possibly diverges for infinite list ) ( .includes() in JavaScript ).
// list.elemIndex(x) => index of x in list, or -1 if list does not contain x ( possibly diverges for infinite list ) ( .indexOf() in JavaScript ).
// list.find(fn) => the first element of list for which fn holds ( possibly diverges for infinite list ).
// list.findIndex(fn) => the first index in list for which fn holds ( possibly diverges for infinite list ).
// list.any(fn) => true if fn holds for any element of list, false otherwise ( possibly diverges for infinite list ) ( .some() in JavaScript ).
// list.all(fn) => true if fn holds for all elements of list, false otherwise ( possibly diverges for infinite list ) ( .every() in JavaScript ).
// list.the() => any element of list if all elements of list are equal, undefined otherwise ( possibly diverges for infinite list ).
// hints
// options for underlying datatype.
// achieving laziness.
// consider thunks or proxies.
// determining function arity.
// look into function.length.
// reference guides.
// see Mozilla Developer Network / JavaScript and Hoogle.


class List {
	constructor(...g) {this.gens = g;}

	get gs(){return ((a)=>function*(){for (const r of a){yield* r();}})(this.gens)}

	toList(){return this.gens.reduce((a,c)=>a.concat([...c()]),[])}

	static fromList(list){return new List(function* (){yield* list;})}

	static get empty() {return new List(function*(){});}

	head(){return this.gs().next().value}

	tail(){return ((that)=>new List(function*(){let gs=that.gs();gs.next();yield* gs;}))(this)}

	get(n){
		let gs = this.gs();
		while (n--) gs.next();
		return gs.next().value;}

	take(num){return ((n,that)=>new List(function*(){
		let gs = that.gs();
		let nxt;
		for (let i=0;i<n;i++) {
			if ((nxt=gs.next()).done) break;
			yield nxt.value;
		}}))(num,this)}

	drop(n){return ((that)=>new List(function*(){
		let gs = that.gs(), num=n;
		while ((num--)>0&&!gs.next().done);
		yield* gs;
	}))(this)}

	length(){
		let res = [...this.gs()];
		return res.length;}

	nil(){return this.gs().next().done}

	cons(x){return new List(function*(){yield x;}, this.gs)}

	append(xs){return new List(this.gs, xs.gs)}

	slice(i=0,j){return j?this.drop(i).take(j-i):this.drop(i)}

	map(f){return ((that)=>new List(function*(){
		let gs = that.gs();
		let last;
		while (!(last=gs.next()).done) yield f(last.value);
	}))(this)}

	filter(p){return ((that)=>new List(function*(){
		let gs = that.gs();
		let last=gs.next();
		while (!last.done) {
			if (p(last.value)) yield last.value;
			last = gs.next();
		}
	}))(this)}

	reverse(){return ((gs)=>new List(function*(){
		let xs = gs.toList()
		while (xs.length) yield xs.pop();
	}))(this)}

	concat(){return ((that)=>new List(function*(){
		let gs = that.gs();
		let last;
		while (!(last=gs.next()).done) yield* last.value.gs();
	}))(this)}

	zipWith(f, xs){return ((that)=>new List(function*(){
		let gs = that.gs();
		let last1, last2; let zs = xs.gs();
		while (!(last1=gs.next()).done&&!(last2=zs.next()).done) {
			yield f(last1.value,last2.value);
		}}))(this)}

	foldr(f,x){
		if (x===undefined) return f(this.head());
		let l = this.length();
		if (l == 0) return x;
		return f(this.head(),(l==1? x : this.tail().foldr(f,x)));}

	foldl(f,x){return this.toList().reduce(f,x)}

	scanr(f,x){return ((that)=>new List(function*(){
		let nxt = that.drop(0);
		while (!nxt.nil()) {
			yield nxt.foldr(f, x);
			nxt = nxt.drop(1);
		}
		yield x;
	}))(this)}

	scanl(f,x){return ((that)=>new List(function*(){
		let foo = x;
		let gs = that.gs(), val;
		yield foo;
		while (!(val=gs.next()).done) yield (foo=f(foo,val.value));
	}))(this)}

	findIndex(f){
		let gs = this.gs();
		let nxt, c=0;
		while (!(nxt=gs.next()).done) {
			if (f(nxt.value)) return c;
			c++;
		}return -1;}

	find(f){
		let gs = this.gs();
		let nxt;
		while (!(nxt=gs.next()).done) if (f(nxt.value)) return nxt.value;}

	elemIndex(e){return this.findIndex(v=>v===e)||-1}

	elem(e){return this.elemIndex(e)!==-1}

	any(f){return !!(1+this.findIndex(f))}

	all(f){return !(1+this.findIndex(v=>!f(v)))}

	the(){return this.all(v=>v===this.get(0))?this.get(0):undefined}

	static repeat(x){return new List(function*(){while(1)yield x;})}

	static iterate(f,z){return new List(function*(){let x=z;yield x;while(1)yield(x=f(x));})}

	static cycle(l){return new List(function*(){while(1)yield* l.gs();})}

	static replicate(n,x){return new List(function*(){yield* Array(n).fill(x);})}

	last(){return this.toList()[this.length()-1]}

	init(){return ((that)=>new List(function*(){
		let gs = that.gs();
		let lst = gs.next();
		let cnt = gs.next();
		while (!cnt.done) {
			yield lst.value;
			lst = cnt;
			cnt = gs.next();
		}}))(this)}

	concatMap(f){return this.map(f).concat()}

	static get PRIME(){return new List(function*(){
		let ns = List.iterate(x=>x+1,2);
		while (true) {
			let val = ns.head();
			yield val;
			ns = ns.filter(v=>v%val);
		}})}

	static get FIB(){return new List(function*(){
		let [a, b] = [0, 1];
		while (true) {
			yield a;
			[a, b] = [b, a+b];
		}})}

	static get PI(){return new List(function*(){
		let n = 1;
		let s = 0;
		while (true) {
			yield 4*s;
			s += (-1)**((n-1)/2)*((1/2)**n+(1/3)**n)/n
			n += 2;
		}})}
}