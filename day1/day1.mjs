import fs from "node:fs"


const elfs = fs.readFileSync("input.txt", "utf-8")
    .split("\n\n")

let max = 0

for (const elf of elfs) {
    const carrying = elf.split("\n").map(v => Number(v)).reduce((p, c) => p + c, 0)
    if (carrying > max) {
        max = carrying
    }
}


console.log(max)
