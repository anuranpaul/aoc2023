import { count } from "console";
import fs from "fs";
//console.log(lines);

const maxCount = {
  red: 12,
  green: 13,
  blue: 14,
};

function partTwo(file) {
  const lines = fs.readFileSync(file, "utf-8").trim().split("\n");
  return lines.map((line) => {
    const maxCount = {
        red: 0,
        green: 0,
        blue: 0,
      };
    line
      .split(": ")[1]
      .split("; ")
      .forEach((set) => {
        const pulls = set.split(", ");
        return pulls.forEach((pull) => {
          const[count, color] = pull.split(' ');
          if (maxCount[color] < Number(count)){
            maxCount[color] = Number(count);
          }
        });
      });
    return maxCount.red * maxCount.green * maxCount.blue;
  }).reduce((s,v) => s + v);
}

console.log(partTwo("./input.txt"));
