//Solution to run directly in the Dev Tools console in the input page.



const data = $0.innerText.split('\n').slice(0,-1);
let bean = {x:0, y:0, xdir: 1, ydir: 0};
let explored = [];
let max = 0;

explored.push([bean.x, bean.y]);
cave(bean.x, bean.y, bean.xdir, bean.ydir, [...data]);

console.log('Part 1 ->',explored.length);

data.forEach((line,i) => {
    if (i === 0) {
        explored = [];
        cave(0, i, 1, 0, [...data]);
        explored.length > max ? max = explored.length : null;
        for (let j = 0; j < line.length; j++) {
            explored = [];
            cave(j, i, 0, 1, [...data]);
            explored.length > max ? max = explored.length : null;
        }
        explored = [];
        cave(line.length-1, i, -1, 0, [...data]);
        explored.length > max ? max = explored.length : null;
    } else if (i === data.length-1) {
        explored = [];
        cave(0, i, 1, 0, [...data]);
        explored.length > max ? max = explored.length : null;
        for (let j = 0; j < line.length; j++) {
            explored = [];
            cave(j, i, 0, -1, [...data]);
            explored.length > max ? max = explored.length : null;
        }
        explored = [];
        cave(line.length-1, i, -1, 0, [...data]);
        explored.length > max ? max = explored.length : null;
    } else {
        explored = [];
        cave(0, i, 1, 0, [...data]);
        explored.length > max ? max = explored.length : null;
        explored = [];
        cave(line.length-1, i, -1, 0, [...data]);
        explored.length > max ? max = explored.length : null;
    }
    
})

function cave(x, y, xdir, ydir, currentData) {
    let contain = false;
    
    if (x < 0 || x > currentData[0].length - 1 || y < 0 || y > currentData.length - 1) {
        return ;
    }
    
    for (let coors of explored) {
        if (coors[0] === x && coors[1] === y) {
            contain = true;
        }
    }
    if (contain) {
        contain = false;
    } else {
        explored.push([x, y]);
    }
    
    if (currentData[y][x] === '\\') {

        if (xdir === 1) {
            cave(x, y+1, 0, 1, currentData);    
        } else if (xdir === -1) {
            cave(x, y-1, 0, -1, currentData);    
        } else if (ydir === 1) {
            cave(x+1, y, 1, 0, currentData);    
        } else if (ydir === -1) {
            cave(x-1, y, -1, 0, currentData);    
        }

    }
    else if (currentData[y][x] === '/') {
        if (xdir === 1) {
            cave(x, y-1, 0, -1, currentData);    
        } else if (xdir === -1) {
            cave(x, y+1, 0, 1, currentData);    
        } else if (ydir === 1) {
            cave(x-1, y, -1, 0, currentData);    
        } else if (ydir === -1) {
            cave(x+1, y, 1, 0, currentData);    
        }
    }
    else if (currentData[y][x] === '|') {
        currentData[y] = currentData[y].substring(0, x) + 'L' + currentData[y].substring(x + 1);

        if (xdir === 1 || xdir === -1) {
            cave(x, y-1, 0, -1, currentData);
            cave(x, y+1, 0, 1, currentData);
        }
        else if (ydir === 1) {
            cave(x, y+1, 0, 1, currentData);
        } else if (ydir === -1) {
            cave(x, y-1, 0, -1, currentData);
        }
    }
    else if (currentData[y][x] === '-') {
        currentData[y] = currentData[y].substring(0, x) + 'L' + currentData[y].substring(x + 1);

        if (xdir === 1) {
            cave(x+1, y, 1, 0, currentData);
        } else if (xdir === -1) {
            cave(x-1, y, -1, 0, currentData);
        } else {
            cave(x+1, y, 1, 0, currentData);
            cave(x-1, y, -1, 0, currentData);
        }
    }
    else if (currentData[y][x] === 'L') {
        return ;
    }
    else {
        if (xdir === 1) {
            cave(x+1, y, 1, 0, currentData);
        } else if (xdir === -1) {
            cave(x-1, y, -1, 0, currentData);
        } else if (ydir === 1) {
            cave(x, y+1, 0, 1, currentData);
        } else if (ydir === -1) {
            cave(x, y-1, 0, -1, currentData);
        }
    }

}

console.log('Part 2 ->',max);