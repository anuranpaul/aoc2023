import fs from "fs"

const input = fs.readFileSync("./input.txt", "utf-8").split(`\n\n`)

const start = performance.now()

// ===========================================================
// PART 1
// ===========================================================

let answer1 = 0

/** Number of characters different between string arrays. */
const diff = (a, b) => {
  let diffs = 0
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) diffs++
  }
  return diffs
}

/** Returns the the row where the reflection happens, and the total differences = smudge */
function getReflection(grid, smudge) {
  rLoop: for (let r = 0; r < grid.length - 1; r++) {
    let diffs = diff(grid[r], grid[r + 1])
    if (diffs <= smudge) {
      const rowsBelow = r
      const rowsAbove = grid.length - r
      for (let i = 0; i < Math.min(rowsBelow, rowsAbove); i++) {
        const lowRow = r - i - 1
        const highRow = r + 2 + i
        if (lowRow < 0 || highRow >= grid.length) break
        diffs += diff(grid[lowRow], grid[highRow])
        if (diffs > smudge) continue rLoop
      }
      if (diffs === smudge) {
        return r + 1
      }
    }
  }
  return 0
}

for (const gridInput of input) {
  const grid = parse2d(gridInput)
  const transposed = transposed(grid)
  const vertical = getReflection(transposed, 0)
  const horizontal = getReflection(grid, 0)
  answer1 += 100 * horizontal + vertical
}

console.info(
  `Answer1: ${answer1} after ${(performance.now() - start).toFixed(2)}ms`
)

// ===========================================================
// PART 2
// ===========================================================

let answer2 = 0

for (const gridInput of input) {
  const grid = parse2d(gridInput)
  const transposed = transposed(grid)
  const vertical = getReflection(transposed, 1)
  const horizontal = getReflection(grid, 1)
  answer2 += 100 * horizontal + vertical
}

console.info(
  `Answer2: ${answer2} after ${(performance.now() - start).toFixed(2)}ms`
)
