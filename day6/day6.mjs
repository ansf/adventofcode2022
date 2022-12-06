import fs from "node:fs"

const signal = fs.readFileSync("input.txt", "utf-8").trim()

for (let i = 3; i < signal.length; i++) {
    if (new Set(signal.substring(i - 3, i + 1).split("")).size === 4) {
        console.log(i + 1)
        break
    }
}