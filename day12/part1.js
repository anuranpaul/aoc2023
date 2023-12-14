import fs from "fs"

let answer = 0;
try {
    const lines = fs.readFileSync("./input.txt", "utf-8").split(/\r?\n/g);
    
    lines.forEach((line) => {
        
        const bits = line.split(" ");
        const springs = bits[0].split("");
        const records = bits[1];
        let checks = perms(springs);
        checks.forEach((check) => {
            let rule = [];
            let count = 0;
            for(let i=0; i<check.length; i++) {
                if(check[i] == '#') {
                    count++;
                }
                else if(count != 0) {
                    rule.push(count);
                    count = 0;
                }
            }
            if(count != 0) {
                rule.push(count);
            }
            //console.log(check.join(''), rule.join(","));
            if(rule.join(",") == records) answer++;
        })
    });
}
catch(e) {
    console.error(e);
}

function perms(springs) {
    let stack = [];
    let res = [];
    stack.push(springs);
    while(stack.length > 0) {
        const checking = stack.pop();
        const hasError = checking.findIndex((e) => e == "?");
        if(hasError != -1) {
            let tryOperational = [...checking];
            tryOperational[hasError] = '.';
            stack.push(tryOperational);
            let tryDamaged  = [...checking];
            tryDamaged[hasError] = '#';
            stack.push(tryDamaged);
        }
        else {
            res.push(checking);
        }
    }
    return res;
}

console.log("The answer is:", answer);