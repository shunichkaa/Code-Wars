// For this kata, we're given an image in which some object of interest (e.g. a face, or a license plate, or an aircraft) appears as a large block of contiguous pixels all of the same colour.
// (Probably some image-processing has already occurred to achieve this, but we needn't worry about that.)
// We want to find the centre of the object in the image.
// We'll do this by finding which pixels of the given colour have maximum depth.
// The depth of a pixel P is the minimum number of steps (up, down, left, or right)
// you have to take from P to reach either a pixel of a different colour or the edge of the image.
// pixel depths pic
// In the picture, the red pixel marked "3" has a depth of 3: it takes at least 3 steps from there to reach something other than another red pixel.
// Note that the steps need not be all in the same direction.
// Only one red pixel has depth 3: the one right in the middle of the red region.
// Similarly, the blue pixel marked "2" has a depth of 2 (but it is not the only one with this depth).
// The green and purple pixels all have depth 1.
// The pixels of a given colour with the largest depth will be found at the centre of the biggest solid region(s) of that colour.
// Those are the ones we want.
// The function you'll write (central_pixels) belongs to the following data structure:
// class Image {
// 	constructor(data, w, h)
// 	{   this.pixels = data.slice();
// 		this.width = w;
// 		this.height = h;}}
// The image data consists of a one-dimensional array pixels of unsigned integers
// (or just integers, in languages that don't have unsigned integers as such), which correspond to pixels in row-by-row order.
// (That is, the top row of pixels comes first, from left to right, then the second row, and so on, with the pixel in the bottom right corner last of all.)
// The values of the pixels array elements represent colours via some one-to-one mapping whose details need not concern us.
// The central_pixels function should find and return all the positions (pixels array indices)
// of the pixels having the greatest depth among all pixels of colour colour).
// Note 1. The final test in the suite (Big_Test) is a 16-megapixel image (1 megapixel in the Python version),
// so you will need to consider the time and space requirements of your solution for images up to that size.
// Note 2. The order of pixel positions in the returned array is not important; sort them however you like.
// Hint. It is possible to get this done in two passes through the pixel data.


function central_pixels(image, colour) {
	const w = image.width;
	const h = image.height;
	const pixels = image.pixels;
	const n = w * h;

	const inBounds = (x, y) => x >= 0 && x < w && y >= 0 && y < h;

	const depth = new Int32Array(n).fill(-1);

	// Очередь: реализуем через два указателя для скорости
	const queue = new Uint32Array(n);
	let qStart = 0, qEnd = 0;

	for (let y = 0; y < h; y++) {
		for (let x = 0; x < w; x++) {
			const idx = y * w + x;
			if (pixels[idx] === colour) {
				// Проверяем соседей на границу
				let isBorder = false;
				for (const [dx, dy] of [[1,0],[-1,0],[0,1],[0,-1]]) {
					const nx = x + dx;
					const ny = y + dy;
					if (!inBounds(nx, ny)) {
						isBorder = true;
						break;
					}
					const nidx = ny * w + nx;
					if (pixels[nidx] !== colour) {
						isBorder = true;
						break;
					}
				}
				if (isBorder) {
					depth[idx] = 0;
					queue[qEnd++] = idx;
				}
			} else {
				depth[idx] = -2; // другой цвет, не посещаем
			}
		}
	}

	// BFS
	while (qStart < qEnd) {
		const current = queue[qStart++];
		const cx = current % w;
		const cy = Math.floor(current / w);
		const currentDepth = depth[current];

		for (const [dx, dy] of [[1,0],[-1,0],[0,1],[0,-1]]) {
			const nx = cx + dx;
			const ny = cy + dy;
			if (inBounds(nx, ny)) {
				const nidx = ny * w + nx;
				if (depth[nidx] === -1) {
					depth[nidx] = currentDepth + 1;
					queue[qEnd++] = nidx;
				}
			}
		}
	}

	// Максимальная глубина
	let maxDepth = -1;
	for (let i = 0; i < n; i++) {
		if (depth[i] > maxDepth) maxDepth = depth[i];
	}

	const result = [];
	for (let i = 0; i < n; i++) {
		if (depth[i] === maxDepth) result.push(i);
	}

	return result;
}