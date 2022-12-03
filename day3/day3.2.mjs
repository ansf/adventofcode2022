import fs from "node:fs"

const backpacks = fs.readFileSync("input.txt", "utf-8")
    .trim()
    .split("\n")
    .map(s => s.split(""))

let sum = 0

for (let i = 0; i <= backpacks.length - 3; i += 3) {
    const elf1 = backpacks[i]
    const elf2 = backpacks[i + 1]
    const elf3 = backpacks[i + 2]
    const badge = elf1.find(s => elf2.includes(s) && elf3.includes(s))

    const charCode = badge.charCodeAt(0)
    const priority = charCode >= 97
        ? charCode - (97 - 1)
        : charCode - (65 - 27)

    sum += priority
}


console.log(sum)