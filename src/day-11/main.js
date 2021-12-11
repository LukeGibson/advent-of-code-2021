import fs from 'fs';

let input = fs.readFileSync('./input.txt', 'utf-8').split('\n')
  .map(line => line.split('')
  .map(char => Number(char)));

let flashCount = 0;
let prevFlashCount = 0;
let time = 0;
let flashSync = false;

const checkFlash = (row, col) => input[row][col] === 10;

const flash = (row, col) => {
  flashCount++;

  if (row !== 0) {
    input[row - 1][col] += 1
    if (checkFlash(row-1, col) ) flash(row - 1, col);
  }
  if (row !== 9) {
    input[row + 1][col] += 1;
    if (checkFlash(row+1, col)) flash(row + 1, col);
  }

  if (col !== 0) {
    input[row][col - 1] += 1;
    if (checkFlash(row, col-1)) flash(row, col - 1);
  }
  if (col !== 9) {
    input[row][col + 1] += 1;
    if (checkFlash(row, col+1)) flash(row, col + 1);
  }

  if (row !== 0 && col !== 0) {
    input[row - 1][col - 1] += 1;
    if (checkFlash(row-1,col-1)) flash(row - 1, col - 1);
  }
  if (row !== 0 && col !== 9) {
    input[row - 1][col + 1] += 1;
    if (checkFlash(row-1, col+1)) flash(row - 1, col + 1);
  }

  if (row !== 9 && col !== 0) {
    input[row + 1][col - 1] += 1;
    if (checkFlash(row+1, col-1)) flash(row + 1, col - 1);

  }
  if (row !== 9 && col !== 9) {
    input[row + 1][col + 1] += 1;
    if (checkFlash(row+1, col+1)) flash(row + 1, col + 1);
  }
};


while(!flashSync) {
  prevFlashCount = flashCount;

  for(let row=0; row<10; row++) {
    for(let col=0; col<10; col++) {
      input[row][col] += 1;
      if (input[row][col] === 10) flash(row, col);
    }
  }

  for(let row=0; row<10; row++) {
    for(let col=0; col<10; col++) {
      if (input[row][col] >= 10) input[row][col] = 0;
    }
  }

  if (time === 100) console.log('answer A', flashCount);
  if (flashCount - prevFlashCount === 100) flashSync = true;

  time++;
}

console.log('asnwer B', time);