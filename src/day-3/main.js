import fs from 'fs';
import _ from 'lodash';

const text = fs.readFileSync('./input.txt', 'utf-8').split('\n');
let input = text.map(line => line.split('').map(Number));

// part 1
// const transInput = _.zip.apply(_, input);

// let gamma = '';
// let epsilon = ''; 

// transInput.forEach(line => {
//   let count = 0;

//   line.forEach(digit => {
//     if (digit === 1) count++;
//     else if (digit === 0) count--;
//   });

//   if (count > 0) {
//     gamma += '1';
//     epsilon += '0';
//   } else {
//     gamma += '0';
//     epsilon += '1';
//   }
// });

// console.log('answerA', parseInt(gamma, 2) * parseInt(epsilon, 2))

// part 2
let input2 = [...input];

let o2; 
let currDigit = 0;

while (input.length > 1) {
  const transInput = _.zip.apply(_, input);

  let count = 0;
  let oneIndexs = [];
  let zeroIndexs = [];

  transInput[currDigit].forEach((digit, index) => {
    if (digit === 1) {
      count++;
      oneIndexs.push(index);
    }
    else if (digit === 0) {
      count--;
      zeroIndexs.push(index)
    }
  });

  if (count >= 0) {
    input = input.filter((line, index) => oneIndexs.includes(index));
  } else {
    input = input.filter((line, index) => zeroIndexs.includes(index));
  }

  currDigit++;
};


let co2;
let currDigit2 = 0;

while (input2.length > 1) {
  const transInput = _.zip.apply(_, input2);

  let count = 0;
  let oneIndexs = [];
  let zeroIndexs = [];

  transInput[currDigit2].forEach((digit, index) => {
    if (digit === 1) {
      count++;
      oneIndexs.push(index);
    }
    else if (digit === 0) {
      count--;
      zeroIndexs.push(index)
    }
  });

  if (count >= 0) {
    input2 = input2.filter((line, index) => zeroIndexs.includes(index));
  } else {
    input2 = input2.filter((line, index) => oneIndexs.includes(index));
  }

  currDigit2++;
}; 

o2 = parseInt(input.toString().replace(/,/g, ''), 2);
co2 = parseInt(input2.toString().replace(/,/g, ''), 2);

console.log('answerB', o2 * co2)