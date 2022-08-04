function solution(line) {
    const result = []
    // 별을 그려낼 테이블의 크기를 위해 변수 정의
    let maxH = -Number.MAX_VALUE
    let minH = Number.MAX_VALUE
    let maxW = -Number.MAX_VALUE
    let minW = Number.MAX_VALUE
    for (let i = 0; i < line.length - 1; i++) {
        for (let j = i + 1; j < line.length; j++) {
            const [a, b, e] = line[i]
            const [c, d, f] = line[j]

            const mod = a * d - b * c
            if (mod === 0) continue // 분모가 0인 경우 > 서로 평행하거나 일치하는 경우

            const xNumerator = b * f - e * d
            const yNumerator = e * c - a * f
            if (xNumerator % mod || yNumerator % mod) continue // 정수가 아닌 교차점 제외

            const x = xNumerator / mod
            const y = yNumerator / mod

            result.push([x, y])
            // 테이블 크기를 정의할 변수 갱신
            maxW = Math.max(x,maxW)
            minW = Math.min(x,minW)
            maxH = Math.max(y,maxH)
            minH = Math.min(y,minH)
        }
    }
    // 테이블 초기값 .으로 정의
    const table = [...Array(maxH - minH + 1)]
    .map(() => [...Array(maxW - minW + 1)].map(() => '.'))
    // 각 위치에 맞게 별찍기
    result.forEach(([x, y]) => {
        table[maxH - y][x - minW] = '*'
    })

    return table.map(v => v.join(''))
}