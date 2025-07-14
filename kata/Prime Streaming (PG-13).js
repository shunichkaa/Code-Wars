// Create an endless stream that yields prime numbers. The stream must be able to produce a million primes in a few seconds.
//
// 	If this is too easy, try Prime Streaming (NC-17).


class Primes{
	static *stream(){
		yield 2
		let primes=[2]
		for(let n=3;;n+=2){
			let isPrime=true
			let r=Math.sqrt(n)
			for(let p of primes){
				if(p>r)break
				if(n%p===0){isPrime=false;break}
			}
			if(isPrime){
				primes.push(n)
				yield n
			}
		}
	}
}
