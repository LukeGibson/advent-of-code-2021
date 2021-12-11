import fs from 'fs';
import _ from 'lodash';

// input formatting
const text = fs.readFileSync('./input.txt', 'utf-8').split('\n');

const pickedNums = text[0].split(',').map(ele => Number(ele));
let boards = [];
let tempBoard = [];

for(let i=2; i<text.length; i++) {
  let line = text[i];

  if (line !== '') {
    let lineNums = line
      .split(' ')
      .filter(lineNum => lineNum !== '')
      .map(lineNum => Number(lineNum));
    tempBoard.push(lineNums);
  } else {
    boards.push(tempBoard);
    tempBoard = [];
  }
}
boards.push(tempBoard);


// checks if winner found
const isWinner = (boards) => {
  let result = [false, false];

  boards.forEach(board => {
    const transBoard = _.zip.apply(_, board);

    board.forEach(row => {
      if (row.reduce((a, b) => a + b, 0) === -5) result = [true, board];
    });

    transBoard.forEach(row => {
      if (row.reduce((a, b) => a + b, 0) === -5) result = [true, board];
    });
  });

  return result;
};

// calculate winning score
const calcScore = (roundNum, board) => {
  let unmarkedNums = [];

  board.forEach(row => {
    row.forEach(num => {
      if (num !== -1) unmarkedNums.push(num)
    });
  });

  const sum = unmarkedNums.reduce((a, b) => a + b, 0);
  return (roundNum * sum);
}


// part 1
// let winnerFound = false;
// let winningBoard = false;
// let round = 0;

// while(!winnerFound && round < pickedNums.length) {
//   let roundNum = pickedNums[round];

//   boards.forEach((board, boardIndex) => {
//     board.forEach((row, rowIndex) => {
//       row.forEach((num, numIndex) => {
//         if (num === roundNum) boards[boardIndex][rowIndex][numIndex] = -1;
//       });
//     });
//   });

//   let result = isWinner(boards);
//   winnerFound = result[0];
//   winningBoard = result[1];

//   if (!winnerFound) round++;
// }

// console.log('Score', calcScore(pickedNums[round], winningBoard));


// returns borads not yet won
const getRemainingBoards = (boards) => {
  const remainingBoards = [];

  boards.forEach(board => {
    let isBoardAWinner = false;
    const transBoard = _.zip.apply(_, board);

    board.forEach(row => {
      if (row.reduce((a, b) => a + b, 0) === -5) isBoardAWinner = true;
    });

    transBoard.forEach(row => {
      if (row.reduce((a, b) => a + b, 0) === -5) isBoardAWinner = true;
    });

    if (!isBoardAWinner) remainingBoards.push(board);
  });

  return remainingBoards;
}

// part 2
let lastWinnerFound = false;
let lastWinningBoard = false;
let round = 0;

while(!lastWinnerFound && round < pickedNums.length) {
  let roundNum = pickedNums[round];

  boards.forEach((board, boardIndex) => {
    board.forEach((row, rowIndex) => {
      row.forEach((num, numIndex) => {
        if (num === roundNum) boards[boardIndex][rowIndex][numIndex] = -1;
      });
    });
  });

  let remainingBoards = getRemainingBoards(boards);

  if (remainingBoards.length !== 0) {
    boards = remainingBoards;
    round++;
  } else {
    lastWinnerFound = true;
    lastWinningBoard = boards[0];
  }
}

console.log('Score', calcScore(pickedNums[round], lastWinningBoard));
