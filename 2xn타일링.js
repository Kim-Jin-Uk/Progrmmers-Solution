function solution(n) {
    // 재귀함수로 풀면 런타임아웃
    // for문으로 풀어도 a,b,temp 형태로 풀게되면 런타임아웃이 걸린다
    // 연산을 최소화 하기 위해 배열을 선언 - 공간복잡도는 올라간다
    const dp = [1, 2]
    for (let i = 0; i < n-2; i++) {
        // 이번에 알게된사실 - 숫자가 커지게되면 연산시간이 길어질수 있다, 숫자가 너무 커지면 수가 변할 수 있으므로 조정
        dp.push((dp[i] + dp[i + 1]) % 1000000007)
    }
    return dp[n - 1]
}