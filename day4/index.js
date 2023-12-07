import fs from "fs";

function loadData() {
  return fs.readFileSync("input.txt").toString("utf-8").split("\n");
}

function matchingNumbers(card) {
  let points = 0;
  const winningNumbers = card
    .substring(card.indexOf(":") + 2, card.indexOf("|") - 1)
    .match(/\d+/g);
  const cardNumbers = card.substring(card.indexOf("|") + 2).match(/\d+/g);
  for (let num of cardNumbers) {
    if (winningNumbers.includes(num)) {
      points += 1;
    }
  }
  return points;
}

function main1() {
  return loadData()
    .map((card) => {
      const n = matchingNumbers(card);
      return n === 0 ? 0 : Math.pow(2, n - 1);
    })
    .reduce((prev, curr) => (prev += curr));
}

function main2() {
  const data = loadData();
  const cardInstances = data.map(() => 1);
  for (let i = 0; i < data.length; i++) {
    const card = data[i];
    for (let j = 0; j < matchingNumbers(card); j++) {
      cardInstances[i + j + 1] += cardInstances[i];
    }
  }
  return cardInstances.reduce((prev, curr) => (prev += curr));
}

console.log("Solution to problem 1:", main1());
console.log("Solution to problem 2:", main2());