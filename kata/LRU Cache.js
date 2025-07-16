// Implement a Least Recently Used (LRU) cache. An LRU cache is a key-value store that contains a set capacity for the number of elements it holds, which is stored in a property. The size should also be a property. When trying to add a new key-value pair, if cache.size == cache.capacity, the Least Recently Used key is removed.
//
// 	Hint: You will will need to use the Object.defineProperty facility
//
// Example Behavior:
//
// 	var store = new LRUCache(3 // Size of the cache
// 		, {a: 1}); // Optional initial values for cache
// store.size; // should be 1
// store.capacity; // should be 3
// store.a; // should be 1;
// store.cache('b', 2)['b']; // should be 2
// store.a = 5;
// store.a; // should be 5
// store.cache('c', 3).cache('d', 4).b; // should be undefined, since 'b' was removed because it was the least recently used
// store.delete('d');
// store.d ; // should be undefined, since 'd' was deleted
// store.size ; // should be 2
// store.cache('c', 4);
// store.c; // should be 4
// store.capacity = 1; // should resize the store to have just one element
// Object.keys(store); // should be ['c']
// Full API Specification:
//
// 	The user should be able to make a new cache object with new LRUCache(n), where n is the cache's (initial) capacity
// The constructor should be able to take a javascript object as an optional second parameter, which will be copied and put into the cache
// Items can be added to the cache using a method called cache
// cache takes two arguments, a key and a value
// The new key should be added as a property to the cache
// The new property should be enumerable
// It should be possible to reassign the new property
// Caching an already existing property should update its value
// The cache method should return the cache itself, so the method can be chained (ie, the builder pattern)
// The cache method itself should not be enumerable, writable, nor configurable
// Items can be deleted from the cache using a method called delete
// 	This method should not be enumerable, writable, nor configurable
// This method should have the same return values as the delete builtin
// The number of elements stored in the cache should be accessible via the size property
// This property should not be enumerable, writable nor configurable
// The capacity should be accessible by via the capacity property
// Making the capacity smaller should trigger the cache to delete the least recently used items until the size of the cache is smaller than or equal to the capacity
// This property should not be enumerable
// The size property should never acceed the capacity property of a cache
// An item in the cache is used every time its value is read or assigned, or it is cached using the cache method


function LRUCache(capacity, init = {}) {
	if (!(this instanceof LRUCache)) return new LRUCache(capacity, init);

	let _capacity = capacity;
	const _map = new Map(); // key -> value
	const _order = []; // ключи в порядке использования, последний — самый свежий

	const reservedKeys = new Set(['cache', 'delete', 'size', 'capacity']);

	// Обновить порядок использования ключа
	const touch = (key) => {
		const idx = _order.indexOf(key);
		if (idx !== -1) _order.splice(idx, 1);
		_order.push(key);
	};

	// Удалить устаревшие ключи, если превышен capacity
	const evictIfNeeded = () => {
		while (_map.size > _capacity) {
			const oldest = _order.shift();
			_map.delete(oldest);
			if (!reservedKeys.has(oldest)) delete this[oldest];
		}
	};

	// Создать getter/setter свойство для ключа (если это не reservedKey)
	const defineProp = (key) => {
		if (reservedKeys.has(key)) return;
		Object.defineProperty(this, key, {
			enumerable: true,
			configurable: true,
			get() {
				if (!_map.has(key)) return undefined;
				touch(key);
				return _map.get(key);
			},
			set(value) {
				_map.set(key, value);
				touch(key);
				evictIfNeeded();
			}
		});
	};

	Object.defineProperty(this, 'size', {
		enumerable: false,
		configurable: false,
		get: () => _map.size
	});

	Object.defineProperty(this, 'capacity', {
		enumerable: false,
		configurable: false,
		get: () => _capacity,
		set: (newCap) => {
			if (!Number.isInteger(newCap) || newCap < 0)
				throw new TypeError('Capacity must be a non-negative integer');
			_capacity = newCap;
			evictIfNeeded();
		}
	});

	Object.defineProperty(this, 'cache', {
		enumerable: false,
		configurable: false,
		writable: false,
		value: (key, value) => {
			if (_map.has(key)) {
				_map.set(key, value);
				touch(key);
			} else {
				_map.set(key, value);
				defineProp(key);
				touch(key);
				evictIfNeeded();
			}
			return this;
		}
	});

	Object.defineProperty(this, 'delete', {
		enumerable: false,
		configurable: false,
		writable: false,
		value: (key) => {
			if (reservedKeys.has(key)) {
				// Зарезервированные ключи считаем "нет в кэше"
				return false;
			}
			const existed = _map.delete(key);
			if (existed) {
				const idx = _order.indexOf(key);
				if (idx !== -1) _order.splice(idx, 1);
				delete this[key];
			}
			return true; // для остальных всегда true
		}
	});
	// Инициализация из объекта init
	for (const [k, v] of Object.entries(init)) {
		this.cache(k, v);
	}
}
