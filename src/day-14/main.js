import fs from 'fs';

const text = fs.readFileSync('./input.txt', 'utf-8').split('\n');
const rules = text.slice(2).map(line => line.split(' -> '));

let polyString = text[0];

for(let step=0; step<10; step++) {
  let newPolyString = polyString.slice();
  let addCount = 0;

  for(let i=1; i<polyString.length; i++) {
    const pair = polyString.slice(i-1, i+1);

    rules.forEach(([rPair, rResult]) => {
      if (rPair === pair) {
        newPolyString = `${newPolyString.slice(0, i + addCount)}${rResult}${newPolyString.slice(i + addCount)}`;
        addCount++;
      }
    });
  }

  polyString = newPolyString;
}

const charCounts = [...polyString].reduce((res, char) => (res[char] = (res[char] || 0) + 1, res), {});
const values = Object.values(charCounts);
let result = Math.max(...values) - Math.min(...values);

console.log(charCounts);
console.log('Answer A', result);

