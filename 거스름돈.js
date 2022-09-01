function solution(n, money) {
    const dp = new Array(n+1).fill(0)
    // 현재 가격과 화폐 단위가 같다면 1을 증가시켜주기 위해 1로 초기화
    dp[0] = 1
    money.forEach((m)=>{
        // 점화식을 이용하여 가짓수 갱신
        for(let i = m; i < n+1; i++) dp[i] += dp[i-m]
    })
    return dp[n]
}