// The Midnight Escape
// Story (Lore)
// As the campfire's last embers fade, a group of friends realizes they've lost track of time. The forest's darkness envelops them, and they must return to civilization before dawn. However, a rickety-old bridge stands between them and safety. With only one flashlight and limited time, they face a critical challenge. Can you help them devise the most efficient strategy to cross the treacherous bridge and make it home safely?
//
// Problem Description
// You are tasked with creating an algorithm to help a group of people cross a narrow bridge in the shortest possible time. The bridge can only support two people at once, and a flashlight must be carried on every crossing. There is only one flashlight available.
//
// 	Input
// An unordered array of tuples, where each tuple contains:
// 	A string representing a person's name (unique)
// An integer representing the time (in minutes) it takes that person to cross the bridge (not unique)
// Output
// An array of arrays, where each inner array represents a crossing:
// 	Even-indexed arrays contain the name(s) of person(s) crossing to the destination side
// Odd-indexed arrays contain the name(s) of person(s) returning to the starting side
// Rules
// Only 1 or 2 people can cross the bridge at a time.
// 	A flashlight must be carried on every crossing, and there is only 1 flashlight.
// 	When two people cross together, they move at the pace of the slower person.
// 	All people must reach the destination side of the bridge; no one can be left behind.
// 	Names within a crossing can be in any order.
// 	If multiple solutions with the fastest time exist, any one is acceptable.
// 	Constraints
// Performance constraints: O(n log n) expected.
// 	The number of people will be between 1 and 10,000.
// 	Each person's crossing time will be between 1 and 45 minutes.
// Example
// Note: depending on your programming language, a tuple can be an array or other equivalent data structure instead.
//
// 	Input:
//
// [("Alice", 1), ("Bob", 4), ("Charlie", 5), ("David", 8)]
// Output:
//
// 	[
// 		[ 'Alice', 'David' ],
// 		[ 'Alice' ],
// 		[ 'Alice', 'Charlie' ],
// 		[ 'Alice' ],
// 		[ 'Alice', 'Bob' ]
// 	]
// Solution breakdown:
//
// 	Alice and David cross (8 minutes)
// Alice returns (1 minute)
// Alice and Charlie cross (5 minutes)
// Alice returns (1 minute)
// Alice and Bob cross (4 minutes)
// Total time: 8 + 1 + 5 + 1 + 4 = 19 minutes
//
// Remember that these people need to get home before dawn. Get them across the bridge fast!


function solve(people) {
    people.sort((a, b) => a[1] - b[1]);
    
    // Для случая с 1-2 людьми
    if (people.length === 1) {
        return [[people[0][0]]];
    }
    if (people.length === 2) {
        return [[people[0][0], people[1][0]]];
    }
    
    // Для случая с 3 людьми
    if (people.length === 3) {
        return [
            [people[0][0], people[1][0]],
            [people[0][0]],
            [people[0][0], people[2][0]]
        ];
    }
    
    let result = [];
    let left = people.slice();
    
    // Стратегия для 4+ людей
    while (left.length > 2) {
        let p1 = left[0];  // Самый быстрый
        let p2 = left[1];  // Второй самый быстрый
        
        if (left.length === 3) {
            // Для 3 оставшихся людей
            result.push([p1[0], p2[0]]);
            result.push([p1[0]]);
            result.push([p1[0], left[2][0]]);
            break;
        }
        
        // Убираем двух самых медленных за раз
        let pn = left[left.length - 1];    // Самый медленный
        let pn_1 = left[left.length - 2];  // Второй самый медленный
        
        // Стратегия 1: p1+p2 -> p1 -> pn_1+pn -> p2 -> ...
        let option1 = p2[1] + p1[1] + Math.max(pn_1[1], pn[1]) + p2[1];
        
        // Стратегия 2: p1+pn -> p1 -> p1+pn_1 -> p1 -> ...
        let option2 = Math.max(p1[1], pn[1]) + p1[1] + Math.max(p1[1], pn_1[1]) + p1[1];
        
        if (option1 <= option2) {
            // Стратегия 1
            result.push([p1[0], p2[0]]);
            result.push([p1[0]]);
            result.push([pn_1[0], pn[0]]);
            result.push([p2[0]]);
        } else {
            // Стратегия 2
            result.push([p1[0], pn[0]]);
            result.push([p1[0]]);
            result.push([p1[0], pn_1[0]]);
            result.push([p1[0]]);
        }
        
        left.pop();  // Удаляем самого медленного
        left.pop();  // Удаляем второго самого медленного
    }
    
    // Добавляем последнюю пару (если осталось 2 человека)
    if (left.length === 2) {
        result.push([left[0][0], left[1][0]]);
    } else if (left.length === 1) {
        result.push([left[0][0]]);
    }
    
    return result;
}