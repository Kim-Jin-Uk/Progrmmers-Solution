function solution(land) {
    for (let r = 1; r < land.length; r++) {
        for (let c = 0; c < land[0].length; c++) {
            // 각 인덱스별 최대값 갱신
            land[r][c] += Math.max(
                ...land[r - 1].slice(0, c), 
                ...land[r - 1].slice(c + 1)
            )
        }
    }
    return Math.max(...land[land.length - 1])
}

console.log(solution([[1,2,3,5],[5,6,7,8],[4,3,2,1]]))