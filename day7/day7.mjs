import fs from "node:fs"

const input = fs.readFileSync("input.txt", "utf-8").trim().split("\n")

const root = {
    type: "dir",
    name: "/",
    parent: undefined,
    children: {},
}

let cwd = root

for (const line of input) {
    if (line === "$ cd /") {
        // skip
    } else if (line === "$ ls") {
        // skip
    } else if (line.startsWith("$ cd ")) {
        const [, dir] = line.match(/^\$ cd (.+)$/)
        if (dir === "..") {
            cwd = cwd.parent
        } else {
            cwd = cwd.children[dir]
        }
    } else {
        if (line.startsWith("dir")) {
            const [, name] = line.match(/^dir (.+)$/)
            cwd.children[name] = {
                type: "dir",
                name,
                parent: cwd,
                children: {}
            }
        } else {
            const [, size, name] = line.match(/^(\d+) (.+)$/)
            cwd.children[name] = {
                type: "file",
                name,
                size: Number(size),
                parent: cwd
            }
        }
    }
}

function size(node) {
    if (node.type === "file") {
        return node.size
    }

    return Object.values(node.children).reduce((p, c) => p + size(c), 0)
}

function filter(node, predicate) {
    const result = []
    if (predicate(node)) {
        result.push(node)
    }

    if (node.type === "dir") {
        result.push(...Object.values(node.children).flatMap(c => filter(c, predicate)))
    }

    return result
}

console.log(filter(root, n => n.type === "dir" && size(n) <= 100000).reduce((p, c) => p + size(c), 0))