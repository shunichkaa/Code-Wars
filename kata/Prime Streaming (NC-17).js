// Write a generator function that yields a stream of prime numbers. The stream must be able to produce 25 million primes in seconds.
//
// 	If this is too hard, try Prime Streaming (PG-13).


class BitVector {
	constructor(size) {
		this.store = Array(~~(size/31)+1).fill(0);
		for (let i=3; i<~~Math.sqrt(size); i+=2) {
			if (!this.isSet(i)) {
				for (let j=i*i, k=i<<1; j<size; j+=k) {
					this.setBit(j);
				}
			}
		}
	}
	setBit(bit) {
		this.store[~~(bit/31)]|=1<<bit%31;
	}
	isSet(bit) {
		return this.store[~~(bit/31)]&1<<bit%31;
	}
}
const MAX_PRIME = 500000000;
const sieve = new BitVector(MAX_PRIME);
class Primes {
	static * stream() {
		yield 2;
		for (var n=3;n<=MAX_PRIME;n+=2) {
			if (!sieve.isSet(n)) yield(n);
		}
	}
}