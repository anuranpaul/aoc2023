import fs from "fs"

let answer = 0;
try {
    const patterns = fs.readFileSync("./input.txt", "utf-8").split(/\r?\n/g);
    
    patterns.forEach((pattern) => {
        const rows = pattern.split("\r\n");
        const grid = rows.map((rows) => rows.split(""));
        const flipped = grid[0].map((col,c) => grid.map((row, r) => grid[r][c]));
        const cols = flipped.map((col) => col.join(""));

        //hunt for reflection
        for(let c=1;c<cols.length;c++) {
            let maxLength = Math.min(c, cols.length - c);
            let left = cols.slice(c-maxLength,c);
            let right = cols.slice(c,c+maxLength);
            right.reverse();
            if(diffCount(left,right) == 1) {
                answer += c;
            }
        }        
        for(let r=1;r<rows.length;r++) {
            let maxLength = Math.min(r, rows.length - r);
            let top = rows.slice(r-maxLength,r);
            let bottom = rows.slice(r,r+maxLength);
            bottom.reverse();
            if(diffCount(top,bottom) == 1) {
                answer += (r * 100);
            }
        }
    });
}
catch(e) {
    console.error(e);
}

function diffCount(a,b) {
    let diff = 0;
    for(let row = 0; row<a.length; row++) {
        for(let col = 0; col<a[0].length; col++) {
            if(a[row].charAt(col) != b[row].charAt(col)) {
                diff++;
            }
        }
    }
    return diff;
}

console.log("The answer is:", answer);