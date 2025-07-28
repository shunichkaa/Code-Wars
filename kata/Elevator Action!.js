// You're an elevator.
// People on each floor get on you in the order they are queued as long as you're stopped on their floor.
// Your doors are one-person wide.
// No one can board you when someone else is departing or vice versa.
// You must stop at each floor you pass that you can drop off and/or pick up passengers.
// Conversely, you don't stop if you're not changing passengers.
// You can't switch directions while holding passengers.
// People won't get on you if you're not going in the direction they want to go.
// During a stop, all passengers who can get off get off BEFORE any new passengers get on.
// When you're empty (at any point), you must go TOWARD the next person in the queue.
// You take anyone going in that direction along your path if you're capable.
// When you're empty AND you're on the same floor as the next person in the queue, you must now go in the direction they want to go.
// You must stop to open your doors, even if you haven't moved a floor.
// You begin each day with closed doors.
// Up to 5 people can be on you at a time.
// Given a starting_floor and a queue of people represented by the floor they're on (from) to the floor they want to go (to),
// return the order of stops you will take this day.
// Example:
// const queue = [
//     { from: 3, to: 2 }, // Al
//     { from: 5, to: 2 }, // Betty
//     { from: 2, to: 1 }, // Charles
//     { from: 2, to: 5 }, // Dan
//     { from: 4, to: 3 }, // Ed
// ];
// const startingFloor = 1;
// order(startingFloor, queue);
// should return:
// [2, 5, 4, 3, 2, 1]
// Explanation:
// You start on floor 1.
// Al is the first to queue for the elevator so you make your way toward him traveling UP.
// Going up a floor, you notice Charles and Dan on floor 2, but only Dan wants to go up, so your first stop is 2 to pick up Dan.
// Going up to floor 3, you reach Al, but he wants to go down.
// You can't switch directions until you drop off Dan, so you pass Al for now.
// Your second stop is 5 to drop off Dan.
// Now empty, you move toward Al again, who is below you.
// Betty, also on floor 5, joins you.
// You stop on 4 to pick up Ed going down.
// You stop on 3 to drop off Ed and pick up Al.
// You stop on 2 to drop off Al and Betty and pick up Charles.
// You stop on 1 to drop off Charles, the last passenger.
// Final Note:
// The building may have any number of floors (including basements).
// You should expect no more than 500 passengers per day.


const CAPACITY = 5;

const order = (start, queue, up, lift = [], log = []) => {
	lift = lift.filter(({to}) => to !== start);

	!lift.length && (up = queue[0]?.from === start ? queue[0].to > queue[0].from : queue[0]?.from > start);

	queue = queue.filter(({from, to}) => lift.length === CAPACITY || from !== start || to > from !== up || !lift.push({from, to}));

	!log.length && !lift.length || log.push(start);

	if (!queue.length && !lift.length) return log;

	start =
		([...lift, ...(lift.length < CAPACITY ? queue : [])]).reduce((acc, {from, to}, idx) => {
			const target = idx < lift.length ? to : from;
			return up === to > from && up === target > start && Math.abs(target - start) < Math.abs(acc - start) ? target : acc;
		}, !lift.length ? queue[0].from : Infinity);

	return order(start, queue, up, lift, log);
};