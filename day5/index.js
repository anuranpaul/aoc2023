// https://adventofcode.com/2023/day/5

import { readFileSync } from "fs"

const solution = solve(readInput(`./input.txt`))
console.log(solution)

function readInput(inputFilePath) {
  const input = readFileSync(inputFilePath, "utf-8")
  const inputLines = input.split("\n")
  const [seedsLine, ...otherLines] = inputLines
  const seeds = parseNumbers(seedsLine.split(":")[1])
  const maps = []

  for (const line of otherLines) {
    if (line.trim() === "") {
      continue
    }

    if (line.includes("map")) {
      maps.push([])
      continue
    }

    const currentMap = maps[maps.length - 1]
    const [dstRangeStart, srcRangeStart, rangeLength] = parseNumbers(line)
    currentMap.push({
      dstRangeStart,
      srcRangeStart,
      rangeLength
    })
  }

  return { seeds, maps }
}

function parseNumbers(line) {
  return line
    .trim()
    .split(" ")
    .map(x => parseInt(x, 10))
}

function solve({ seeds, maps }) {
  return {
    part1: solvePart1({ seeds, maps }), // ~0.25 ms
    part2: solvePart2({ seeds, maps }) // ~5500 ms
  }
}

function solvePart1({ seeds, maps }) {
  const locations = seeds.map(seed => getLocationBySeed(seed, maps))
  return Math.min(...locations)
}

function getLocationBySeed(seed, maps) {
  return maps.reduce((dst, map) => getDstByMap(dst, map), seed)
}

function getDstByMap(src, map) {
  const mapEntry = map.find(
    ({ srcRangeStart, rangeLength }) =>
      src >= srcRangeStart && src <= srcRangeStart + rangeLength
  )

  if (!mapEntry) {
    return src
  }

  const offset = src - mapEntry.srcRangeStart
  const dst = mapEntry.dstRangeStart + offset
  return dst
}

function solvePart2({ seeds, maps }) {
  const seedRanges = getSeedRanges(seeds)
  for (let location = 0; ; location++) {
    const seed = getSeedByLocation(location, maps)

    if (isSeedPresent(seed, seedRanges)) {
      return location-1
    }
  }
}

function getSeedRanges(seeds) {
  const ranges = []
  for (let i = 0; i < seeds.length; i += 2) {
    ranges.push({
      start: seeds[i],
      end: seeds[i] + seeds[i + 1]
    })
  }
  return ranges
}

function isSeedPresent(seed, seedRanges) {
  return seedRanges.some(({ start, end }) => start <= seed && seed <= end)
}

function getSeedByLocation(location, maps) {
  return [...maps]
    .reverse()
    .reduce((src, map) => getSrcByMap(src, map), location)
}

function getSrcByMap(dst, map) {
  const mapEntry = map.find(
    ({ dstRangeStart, rangeLength }) =>
      dst >= dstRangeStart && dst <= dstRangeStart + rangeLength
  )

  if (!mapEntry) {
    return dst
  }

  const offset = dst - mapEntry.dstRangeStart
  const src = mapEntry.srcRangeStart + offset
  return src
}
