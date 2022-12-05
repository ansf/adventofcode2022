import fs from "node:fs"

function parseInput(input) {
    function parseLayer(s) {
        const result = []
        for (let i = 1; i < s.length; i += 4) {
            result.push(s[i])
        }
        return result
    }

    const layers = []
    const moves = []

    const lines = input.split("\n")
    for (const line of lines) {
        if (line.match(/\[/)) {
            layers.push(parseLayer(line))
        } else if (line.match(/move/)) {
            const [, count, from, to] = line.match(/^move (\d+) from (\d+) to (\d+)$/)
            moves.push({ count, from: from - 1, to: to - 1 })
        }
    }

    // rearrange layers to stacks
    const stacks = Array.from({ length: layers[0].length }, () => [])
    for (let i = layers.length - 1; i >= 0; i--) {
        for (let j = 0; j < stacks.length; j++) {
            const crate = layers[i][j]
            if (crate !== " ") {
                stacks[j].push(crate)
            }
        }
    }

    return { stacks, moves }
}

const input = fs.readFileSync("input.txt", "utf-8").trimEnd()
const { stacks, moves } = parseInput(input)

for (const move of moves) {
    const { count, from, to } = move
    for (let i = 0; i < count; i++) {
        stacks[to].push(stacks[from].pop())
    }
}

console.log(stacks.map(s => s[s.length - 1]).join(""))