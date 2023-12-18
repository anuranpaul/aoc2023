//Solution to run directly in the Dev Tools console in the input page.

const data = $0.innerText.split('\n').slice(0, -1);
let x = [];
let y = [];
let X = 0;
let Y = 0;
let len = 0;

data.forEach(instruction => {
    const [dir, steps] = instruction.split(' ');
    const numSteps = parseInt(steps, 10);
    len += numSteps;
    switch(dir) {
        case 'U':
            Y-=numSteps;
            break;
            
        case 'R':
            X+=numSteps;
            break;

        case 'D':
            Y+=numSteps;
            break;
            
        case 'L':
            X-=numSteps;
            break;
    }
    x.push(X);
    y.push(Y);
});

function getArea(x, y) {
    let area = 0;
    let sum = 0;
    for (let i = 0; i < x.length-1; i++) {
        sum += x[i] * y[i+1] - x[i+1] * y[i]
    }
    area = sum / 2;
    return Math.abs(area);
}

let area = getArea(x,y);
console.log('Part 1 ->',len + (area + 1 - len / 2));

function hexToDec(hex) {
    if (!/^[0-9A-Fa-f]+$/.test(hex)) {
        throw new Error('No valid hex!');
    }
    return parseInt(hex, 16);
}


const instructions = [];
data.forEach( value => {
    let val = value.slice(value.indexOf('(')+2, -2);
    val = hexToDec(val);
    let ins = '';
    switch (value.slice(-2, -1)) {
        case '0':
            ins = 'R';
            break;
        case '1':
            ins = 'D';
            break;
        case '2':
            ins = 'L';
            break;
        case '3':
            ins = 'U';
            break; 
    }
    instructions.push([ins, val]);
});

X = 0; Y = 0; len = 0; x = []; y = [];

instructions.forEach(instruction => {
    const dir = instruction[0];
    const steps = instruction[1];
    const numSteps = parseInt(steps, 10);
    len += numSteps;
    switch(dir) {
        case 'U':
            Y-=numSteps;
            break;
            
        case 'R':
            X+=numSteps;
            break;

        case 'D':
            Y+=numSteps;
            break;
            
        case 'L':
            X-=numSteps;
            break;
    }
    x.push(X);
    y.push(Y);
});

area = getArea(x,y);
console.log('Part 2 ->',len + (area + 1 - len / 2));