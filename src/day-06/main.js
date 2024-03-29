import fs from 'fs';

const input = fs.readFileSync('./input.txt', 'utf-8').split(',');

let fishCounts = new Array(9).fill(0);
input.forEach(fish => fishCounts[Number(fish)] += 1);

for (let day=0; day<256; day++) {
  let newFishCounts = new Array(9).fill(0);

  for (let i=8; i>0; i--) newFishCounts[i-1] = fishCounts[i];

  newFishCounts[6] += fishCounts[0];
  newFishCounts[8] += fishCounts[0];
  fishCounts = newFishCounts;
}

console.log('answer', fishCounts.reduce((a, b) => a + b, 0));