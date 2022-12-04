import fs from "node:fs"

const pairs = fs.readFileSync("input.txt", "utf-8")
    .trim()
    .split("\n")
    .map(s => s.split(",").map(s => s.split("-").map(s => Number(s))))

let count = 0

for (const pair of pairs) {
    if ((pair[0][1] >= pair[1][0] && pair[0][0] <= pair[1][1]) ||
        (pair[0][0] > pair[1][1] && pair[1][0] > pair[0][1])) {
        count++
    }
}


console.log(count)