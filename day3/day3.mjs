import fs from "node:fs"

const backpacks = fs.readFileSync("input.txt", "utf-8")
    .trim()
    .split("\n")

let sum = 0

for (const backpack of backpacks) {
    const items = backpack.split("")
    const slot1 = items.splice(0, backpack.length / 2)
    const slot2 = items;

    const duplicate = slot2.find(s => slot1.includes(s))
    const charCode = duplicate.charCodeAt(0)
    const priority = charCode >= 97
        ? charCode - (97 - 1)
        : charCode - (65 - 27)

    sum += priority
}


console.log(sum)