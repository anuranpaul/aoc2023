import fs from "fs"

let lines = fs.readFileSync('./input.txt','utf8').split(/,/)
const hash = (a, sum=0) => {
    for (let i = 0; i < a.length; i++) {
        sum += a.charCodeAt(i)
        sum = (sum * 17) % 256
    }
    return sum
}

const p1 = ()=> {
    return lines.reduce((a,b)=>a+hash(b),0)
}

const p2 = ()=> {
    // array of 256 dictionaries
    const box = Array(256).fill().map(()=>({}))
    lines.map(line => {
        if (line.slice(-1) == '-') {
            const str = line.slice(0,-1)
            const hashNum = hash(str)
            delete  box[hashNum][str]
        } else {
            const str = line.slice(0,-2)
            const num = parseInt(line.slice(-1))
            const hashNum = hash(str)
            box[hashNum][str]=num
        }
    })
    let sum = 0
    for (let i=0; i < 256; i++) {
        let order = 1
        for (let key in box[i]) {
            sum += (i+1) * order++ * box[i][key]
        }
    }
    return sum
}

console.log("p1:",p1())
console.log("p2:",p2())