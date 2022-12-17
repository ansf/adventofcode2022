import fs from "node:fs"

const lines = fs.readFileSync("input.txt", "utf-8").trim().split("\n")

const monkeys = []

for (let i = 0; i < lines.length; i++) {
    if (lines[i].length === 0) {
        continue
    }

    if (lines[i].startsWith("Monkey")) {
        i++
    }

    const [, itemsStr] = lines[i].match(/Starting items: (.*)$/)
    const items = itemsStr.split(", ").map(Number)
    i++

    const [, operationStr] = lines[i].match(/Operation: new = (.*)$/)
    const [in1, op, in2] = operationStr.split(" ")
    i++

    const [, divisibleStr] = lines[i].match(/Test: divisible by (.*)$/)
    const divisible = Number(divisibleStr)
    i++

    const [, to1Str] = lines[i].match(/If true: throw to monkey (.*)$/)
    const to1 = Number(to1Str)
    i++

    const [, to2Str] = lines[i].match(/If false: throw to monkey (.*)$/)
    const to2 = Number(to2Str)
    i++

    monkeys.push({
        items,
        op: { in1, op, in2 },
        divisible,
        out: { to1, to2 },
        activity: 0
    })
}


function monkey(m) {
    while (m.items.length !== 0) {
        m.activity++

        let item = m.items.shift()

        const op = m.op
        const in1 = m.op.in1 === "old" ? item : Number(m.op.in1)
        const in2 = m.op.in2 === "old" ? item : Number(m.op.in2)
        if (op.op === "*") {
            item = in1 * in2
        } else {
            item = in1 + in2
        }

        item = Math.floor(item / 3)

        if (item % m.divisible === 0) {
            monkeys[m.out.to1].items.push(item)
        } else {
            monkeys[m.out.to2].items.push(item)
        }
    }
}


for (let r = 0; r < 20; r++) {
    for (const m of monkeys) {
        monkey(m)
    }
}

monkeys.sort((a, b) => b.activity - a.activity)

console.log(monkeys[0].activity * monkeys[1].activity)