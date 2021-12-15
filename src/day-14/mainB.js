import fs from 'fs';

const generatePairCounts = (polyString) => {
  let pairCounts = {};
  for(let i=1; i<polyString.length; i++) {
    const pair = polyString.slice(i-1, i+1);
    if (pairCounts[pair]) pairCounts[pair] += 1;
    else pairCounts[pair] = 1;
  }
  return pairCounts;
};

const generateRules = (rulesArray) => {
  let rules = {};
  rulesArray.forEach(([rPair, rResult]) => rules[rPair] = rResult);
  return rules;
};

const text = fs.readFileSync('./input.txt', 'utf-8').split('\n');
const rules = generateRules(text.slice(2).map(line => line.split(' -> ')));
let pairCounts = generatePairCounts(text[0]);

for(let step=0; step<40; step++) {
  let newPairCounts = {};

  Object.keys(pairCounts).forEach(pair => {
    const count = pairCounts[pair];

    if (rules[pair]) {
      let newPairA = `${pair[0]}${rules[pair]}`;
      let newPairB = `${rules[pair]}${pair[1]}`;
      
      if (newPairCounts[newPairA]) newPairCounts[newPairA] += count;
      else newPairCounts[newPairA] = count;

      if (newPairCounts[newPairB]) newPairCounts[newPairB] += count;
      else newPairCounts[newPairB] = count;
    }
  });
  
  pairCounts = newPairCounts;
}

let letterCounts = {};

Object.keys(pairCounts).forEach(pair => {
  const count = pairCounts[pair];
  const letterA = pair[0];
  const letterB = pair[1];

  if (letterCounts[letterA]) letterCounts[letterA] += count;
  else letterCounts[letterA] = count;

  if (letterCounts[letterB]) letterCounts[letterB] += count;
  else letterCounts[letterB] = count;
});

letterCounts[text[0].charAt(0)] += 1;
letterCounts[text[0].charAt(text[0].length - 1)] += 1;
Object.keys(letterCounts).forEach(letter => letterCounts[letter] = letterCounts[letter] / 2);

const values = Object.values(letterCounts);
console.log('Answer', Math.max(...values) - Math.min(...values));
