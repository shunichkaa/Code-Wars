function knight(start, finish) {
    const moves = [
        [-2, -1], [-2, 1], [-1, -2], [-1, 2],
        [1, -2], [1, 2], [2, -1], [2, 1]
    ];
    
    // Преобразуем координаты в числа
    const startX = start[0].charCodeAt(0) - 97;
    const startY = parseInt(start[1]) - 1;
    const finishX = finish[0].charCodeAt(0) - 97;
    const finishY = parseInt(finish[1]) - 1;
    
    // Проверка валидности позиции
    const isValid = (x, y) => x >= 0 && x < 8 && y >= 0 && y < 8;
    
    // Очередь для BFS: [x, y, количество ходов]
    const queue = [[startX, startY, 0]];
    const visited = new Set([`${startX},${startY}`]);
    
    while (queue.length > 0) {
        const [x, y, steps] = queue.shift();
        
        if (x === finishX && y === finishY) {
            return steps;
        }
        
        for (const [dx, dy] of moves) {
            const newX = x + dx;
            const newY = y + dy;
            const key = `${newX},${newY}`;
            
            if (isValid(newX, newY) && !visited.has(key)) {
                queue.push([newX, newY, steps + 1]);
                visited.add(key);
            }
        }
    }
}