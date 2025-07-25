// In this Kata, you will create a selection tool that works like photoshop's Magic Wand Selector
// a giraffe
//
// Background:
//
// 	You are given an image in the form of a nXm array.
// 	Every cell in that array represents 1 pixel.
// 	Every pixel contains RGB information in the form of [R,G,B]. Each value spans from 0 to 255
// Example:
//
// 	let sampleImage = [
// 		[  [0,0,0],  [255,0,100],  [80,120,0]  ],
// 		[  [60,0,12],  [25,32,80],  [80,14,120]  ],
// 		[  [14,0,12],  [25,32,80],  [80,14,120]  ],
// 	]
// To do:
// 	Write function magicWand(arr,point,t) that gets 3 parameters:
//
// 	image - The 2D array representing the image.
// 	origin - {x:n,y:m} representing the "clicked" pixel from which to start the selection.
// 	threshold - A threshold that dictates the allows amount of deviation from the original color for making a selection (0 <= t <= 765)
// The function returns an array of objects representing the selected pixels, in any order:
//
// 	output = [ {x:x1,y:y1}, {x:x2,y:y2},...{x:xn,y:yn},]
// Threshold (t) is calculated by summing the differences between each of the colors of the pixel that was matched last with the new candidate pixel.
//
// 	For instance:
//
// 	pixel1=[0,50,120]
// pixel2=[120,14,120]
// The difference therefore is the sum of:
//
// 	120 - The difference in R between pixel1 and pixel2
// 36 - The difference in G between pixel1 and pixel2
// 0 - The difference in B between pixel1 and pixel2
// Therefore, the total difference is 120+36+0=156
//
// The difference spans from 0 to 765 since:
//
// 	pixel1=[0,0,0]
// pixel2=[0,0,0]
// (0-0)+(0-0)+(0-0)=0 //0=exactly the same color
// And,
//
// 	pixel1=[255,255,255]
// pixel2=[0,0,0]
// (255-0)+(255-0)+(255-0)=765 //765=the largest possible difference: black vs. white,
// which in practice means it is all inclusive
// Pixel lookup:
// 	magicWand() gets point and looks at all the pixels surrounding that point:
//
// 	For instance given point X, the function will check all cells marked with "O"
//
// |   | O | O | O |
// |   | O | X | O |
// |   | O | O | O |
// The same lookup will check the neighboring pixels for any of the matched pixels recurrsively.
//
// 	Example:
// var image = [
// 	[  [0,0,0],  [0,0,0],  [0,0,0]  ],
// 	[  [2,2,2],  [0,0,0],  [2,2,2]  ],
// 	[  [2,2,2],  [2,2,2],  [0,0,0]  ],
// ]
// Running magicWand(image,{x:0,y:0},0)
//
// Will output (order does not matter):
//
// [
// 	{x:0,y:0},
// 	{x:1,y:0},
// 	{x:2,y:0},
// 	{x:1,y:1},
// 	{x:2,y:2},
// ]
// Visually:
//
// 	| x | x | x |
// |   | x |   |
// |   |   | x |
// A helper function drawRes() has been created for your testing and debugging pleasure. The helper function draws the result(shown above) in the console.


function magicWand(image, origin, threshold) {
	const h = image.length, w = image[0].length
	const visited = Array.from({ length: h }, () => Array(w).fill(false))
	const res = []
	const queue = [origin]
	visited[origin.y][origin.x] = true

	while (queue.length) {
		const { x, y } = queue.shift()
		const curColor = image[y][x]
		res.push({ x, y })

		for (let dy = -1; dy <= 1; dy++) {
			for (let dx = -1; dx <= 1; dx++) {
				if (!dx && !dy) continue
				const nx = x + dx, ny = y + dy
				if (nx >= 0 && nx < w && ny >= 0 && ny < h && !visited[ny][nx]) {
					const cand = image[ny][nx]
					const diff = Math.abs(cand[0] - curColor[0]) + Math.abs(cand[1] - curColor[1]) + Math.abs(cand[2] - curColor[2])
					if (diff <= threshold) {
						visited[ny][nx] = true
						queue.push({ x: nx, y: ny })
					}
				}
			}
		}
	}

	return res
}