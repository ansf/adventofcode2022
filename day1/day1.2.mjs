import fs from "node:fs"


const elfs = fs.readFileSync("input.txt", "utf-8")
    .split("\n\n")

const carries = []

for (const elf of elfs) {
    const carrying = elf.split("\n").map(v => Number(v)).reduce((p, c) => p + c, 0)
    carries.push(carrying)
}

carries.sort((a, b) => a - b)

console.log(carries.slice(-3).reduce((p, c) => p + c, 0))
