import fs from 'fs';

const input = fs.readFileSync('./input.txt', 'utf-8').split(',').map(num => Number(num));
let bestSolution = [-1, Infinity];

const calcFuel = (a, b, isPartOne) => {
  const delta = Math.abs(a - b);
  if (isPartOne) return delta;
  return delta * (delta + 1) / 2;
};

for(let i=Math.min(...input); i<=Math.max(...input); i++) {
  const currCost = input.reduce((total, pos) => total + calcFuel(pos, i, false), 0)
  if (currCost < bestSolution[1]) bestSolution = [i, currCost];
}

console.log('answer', bestSolution);