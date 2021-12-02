import fs from 'fs';

const text = fs.readFileSync('./input.txt', 'utf-8').split('\n');

const input = text.map(line => {
  const lineParts = line.split(' ');
  return {
    way: lineParts[0],
    amount: Number(lineParts[1]),
  };
});

// part 1
// let startX = 0;
// let startY = 0;

// input.forEach(({way, amount}) => {
//   if (way === 'forward') startX += amount;
//   if (way === 'down') startY += amount;
//   if (way === 'up') startY -= amount;
// });

// console.log(startX * startY);

// part2
let startX = 0;
let startY = 0;
let aim = 0;

input.forEach(({way, amount}) => {
  if (way === 'forward'){
    startX += amount;
    startY += aim * amount;
  }
  if (way === 'down') aim += amount;
  if (way === 'up') aim -= amount;
});

console.log(startX * startY);