function solution(grid) {
    const answer = []

    const X = grid.length
    const Y = grid[0].length

    const position = [[0, 1], [-1, 0], [0, -1], [1, 0]]
    const visited = grid.map(
        row => Array.from(row).map(
            () => Array(4).fill(0)
        )
    )

    for (let i = 0; i < X; i++) {
        for (let j = 0; j < Y; j++) {
            for (let k = 0; k < 4; k++) {
                if (visited[i][j][k]) continue
                let cycle = 1
                // 다익스트라 적용
                const que = [[i, j, k, 1]]
                visited[i][j][k] = 1

                while (que.length) {
                    let [x, y, z, c] = que.shift()
                    const d = grid[x][y]
                    cycle = Math.max(cycle, c)
                    if (d === 'L') z = (z + 1) % 4
                    else if (d === 'R') z = (z + 3) % 4

                    x += position[z][0]
                    y += position[z][1]

                    if (x < 0) x = X - 1
                    else if (x >= X) x = 0

                    if (y < 0) y = Y - 1
                    else if (y >= Y) y = 0

                    if (!visited[x][y][z]) {
                        visited[x][y][z] = 1
                        que.push([x, y, z, c + 1])
                    }
                }
                answer.push(cycle)
            }
        }
    }

    answer.sort((a, b) => a - b)

    return answer
}