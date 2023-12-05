import fs from 'fs';

const numbers = { "1": "one", "2": "two", "3": "three", "4": "four", "5": "five", "6": "six", "7": "seven", "8": "eight", "9": "nine" };


const digits = [];


/*function to open and add contents into an array*/
function syncReadFile(filename) {
  try {
    const contents = fs.readFileSync(filename, "utf-8");
    /*remove any empty strings*/
    const arr = contents.split(/\n/).filter((line) => line !== "");
    return arr;
  } catch (err) {
    console.error(err);
    return [];
  }
}

/*include positions of all duplicates*/
const findAllPositions = (str, searchString) => {
  let indices = [];
  /*makes sure the index starts are the beginning of the string*/
  let index = -1;

  /*will continue to find the index of duplicates untill indexOf is unable to find anymore*/
  while ((index = str.indexOf(searchString, index + 1)) !== -1) {
    /*add index to array*/
    indices.push(index);
  }

  return indices;
};


const findNum = (str) => {

  for (let i = 0; i < str.length; i++) {
    let matchingSubstrings = {};

    /*find an integars within string and add to object*/
    for (let j = 0; j < str[i].length; j++) {
      if (str[i][j] >= "0" && str[i][j] <= "9") {
        matchingSubstrings[j] = str[i][j]; // Store digits within object
      }
    }

    /*find all spelled numbers within string and add to object*/
    for (const key in numbers) {
      if (str[i].includes(numbers[key])) {
        /*find array of duplicate positions*/
        const positions = findAllPositions(str[i], numbers[key]);

        /*for every position, add the corresponding value*/
        positions.forEach((position) => {
          matchingSubstrings[position] = key;
        });
      }


    }

    /*find the first and last key within object*/
    const keys = Object.keys(matchingSubstrings);
    const firstKey = keys[0];
    const lastKey = keys[keys.length - 1];

    /* concat the values*/
    const concatNum = parseInt(matchingSubstrings[firstKey].concat(matchingSubstrings[lastKey]));

    digits.push(parseInt(concatNum, 10));

  }

  return digits;


}

const sum = (arr) => {
  let total = 0;
  // calculate sum using forEach() method
  arr.forEach((num) => {
    total += num;
  });

  return total;
};



const processFile = () => {
  /* add file contents to an array*/
  const fileContentsArray = syncReadFile("input.txt");

  const pairs = findNum(fileContentsArray);
  console.log(pairs);
  const totalSum = sum(pairs);
  console.log(totalSum);
};


processFile();