function solution(matrix) {
    const len = matrix.length
    const dp = new Array(len).fill().map(_ => new Array(len).fill(Infinity))
    for(let idx = 0; idx < len; idx++) dp[idx][idx] = 0
    for(let i = 1; i < len; i++) {
        for(let j = 0; j < len; j++) {
            const k = i+j
            if(k >= len) break
            for(let l = j; l < k; l++) {
                dp[j][k] = Math.min(dp[j][k],dp[j][l] + dp[l+1][k] + (matrix[j][0] * matrix[l+1][0] * matrix[k][1]))
            }
        }
    }
    return dp[0][len-1]
}