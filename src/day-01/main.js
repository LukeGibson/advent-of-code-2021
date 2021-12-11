import fs from 'fs';

const text = fs.readFileSync('./input.txt', 'utf-8').split('\n');
const input = text.map(line => Number(line));

// part 1
let answerA = 0;

for (let i=1; i<input.length; i++) { 
 if (input[i] > input[i-1]) answerA++;
}

console.log(answerA);

// part 2
let answerB = 0;

for (let i=1; i<input.length - 2; i++) {
  let sumA = input[i-1] + input[i] + input[i+1];
  let sumB = input[i] + input[i+1] + input[i+2];
  if (sumB > sumA) answerB++;
}

console.log(answerB);