// Imagine two thermometers placed on the equator, at exact opposite points of the globe.
// Two thermometers
// We will now swap the thermometers, maintaining 180º longtitude between them,
// and as each thermometer travels around the equator, we will record it's readings.
// Swap
// Common sense and Intermediate Value Theorem tells us that during this journey thermometers' readings will cross at some point at least once.
// Readings
// Let's look at this from above.
// Above view
// As you can see, at some point, defined by longtitude φ, thermometers' readings are equal.
// Your task is to implement a function equalTemperatureLongtitude,
// that will return the first longtitude φ, for which this statement is correct.
// Your function will recieve an object of class Strip, containing the temperatures on the equator, that has the following methods:
// getDatapointsCount() - returns the number of datapoints provided,
// raw() - returns an array of raw datapoints,
// getTemperatureAt(longtitude) - (longtitude in degrees) returns current temperature at specified longtitude.
// Important: readings are interpolated linearly between datapoints.
// As a result, your function must return the minimum longtitude φ, at which temperatures are equal.
// Tolerance for temperature difference is 0.001º Celcius and for longtitude is 0.01º.
// For example, for Strip([0,1,2,3]) the first (and only) longtitude where both thermometers have same readings is 135º.
// 135 example
// Sidenotes:
// Strip object will always contain N ∈ [4, 5, ..., 36] datapoints
// You may pass any longtitude to getTemperatureAt (negative or greater than 360º),
// it will be mapped to [0º, 360º) internally (-1º becomes 359º and so on)
// Temperatures will be in range [15, 25).
// I urge you not to use the most naive approach as it wastes CodeWars' computing power! (you will also run out of time, probably)
// Hints:
// According to Intermediate Value Theorem, ANY input has at least 1 solution
// By definition, the solution always lies in [0º, 180º) range
// Revise numerical methods of solving equations
// Temperature is interpolated linearly between datapoints, but its difference may not be that linear sometimes!
// Good luck and have fun!


function equalTemperatureLongtitude(strip) {
	let count = strip.getDatapointsCount(), interval = 180 / count;
	for (let i = 0; i < count; ++i) {
		let x1 = interval * i, x2 = x1 + interval,
			y1 = strip.getTemperatureAt(x1) - strip.getTemperatureAt(x1 + 180),
			y2 = strip.getTemperatureAt(x2) - strip.getTemperatureAt(x2 + 180);
		if (y1 == 0) return x1;
		if (y2 == 0) return x2;
		if (y1 * y2 <= 0) return (y1 * x2 - y2 * x1) / (y1 - y2);
	}
}