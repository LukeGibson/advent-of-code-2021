import fs from 'fs';

const text = fs.readFileSync('./input.txt', 'utf-8').split('\n');
const input = text.map(line => Number(line));

let timesIncreased = 0;

// ---- Part 2 ---- //

for (let i=1; i<input.length - 2; i++) {
  let sumA = input[i-1] + input[i] + input[i+1];
  let sumB = input[i] + input[i+1] + input[i+2];

  if (sumB > sumA) timesIncreased++;
}


// ---- Part 1 ---- //

// for (let i=1; i<input.length; i++) { 
//  if (input[i] > input[i-1]) timesIncreased++;
// }

console.log(timesIncreased);