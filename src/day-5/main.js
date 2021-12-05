import fs from 'fs';

// format input
const text = fs.readFileSync('./input.txt', 'utf-8').split('\n');
let input = text
  .map(line => line.split(' -> ')
  .map(pair => pair.split(',')
  .map(num => Number(num))));

const largestValue = input.flat(2).reduce((a, b) => Math.max(a, b)) + 1;
const board = Array(largestValue).fill(0).map(() => Array(largestValue).fill(0))

// fill board - option to include horizontail lines
const fillBoard = (plotHorizontail) => {
  input.forEach(line => {
    const [x1, y1] = line[0];
    const [x2, y2] = line[1];
  
    if(x1 === x2) {
      for(let i=Math.min(y1, y2); i <= Math.max(y1, y2); i++) {
        board[i][x1] += 1;
      }
    } else if (y1 === y2) {
      for(let i=Math.min(x1, x2); i <= Math.max(x1, x2); i++) {
        board[y1][i] += 1;
      }
    } else {
      if (plotHorizontail) {
        const lineLength = Math.abs(x1 - x2);
        let isRight = false;
        let isDown = false;

        if (x1 < x2) isRight = true;
        if (y1 < y2) isDown = true;
        
        for(let i=0; i<=lineLength; i++) {
          if (isDown && isRight) board[y1+i][x1+i] += 1;
          if (isDown && !isRight) board[y1+i][x1-i] += 1;
          if (!isDown && isRight) board[y1-i][x1+i] += 1;
          if (!isDown && !isRight) board[y1-i][x1-i] += 1;
        }
      }
    }
  });
};

// part 1
// fillBoard(false);

// part 2
fillBoard(true);

console.log('answer', board.flat(1).filter(num => num > 1).length);
