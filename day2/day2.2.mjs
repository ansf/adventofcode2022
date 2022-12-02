import fs from "node:fs"

const matches = fs.readFileSync("input.txt", "utf-8")
    .trim()
    .split("\n")

const shapeScores = {
    A: 1,
    B: 2,
    C: 3
}

const matchScores = {
    A: { A: 3, B: 0, C: 6 },
    B: { A: 6, B: 3, C: 0 },
    C: { A: 0, B: 6, C: 3 },
}

const requiredMoveForOutcome = {
    A: { X: "C", Y: "A", Z: "B" },
    B: { X: "A", Y: "B", Z: "C" },
    C: { X: "B", Y: "C", Z: "A" },
}

let score = 0

for (const match of matches) {
    const [move1, desiredOutcome] = match.split(" ")

    const move2 = requiredMoveForOutcome[move1][desiredOutcome]

    const shapeScore = shapeScores[move2]
    const matchScore = matchScores[move2][move1]

    score += shapeScore + matchScore
}

console.log(score)