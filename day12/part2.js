import fs from "fs"

let answer = 0;
try {
    const lines = fs.readFileSync("./input.txt", "utf-8").split(/\r?\n/g);
    lines.forEach((line) => {
        let lineAnswer = 0;
        const bits = line.split(" ");
        const springsIn = bits[0];
        const recordsIn = bits[1];
        let springsOut = springsIn;
        let records = recordsIn;
        for(let i = 1; i < 5; i++) {
            springsOut += '?' + springsIn;
            records += ',' + recordsIn;
        }
        const springs = springsOut.split('');
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
            if(rule.join(",") == records) lineAnswer++;
        })
        console.log(line, lineAnswer);
        answer += lineAnswer;
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