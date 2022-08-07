function solution(n) {
    // 홀수인 경우는 무조건 0
    if(n%2===1) return 0
    // n이 2,4 일때 먼저 리턴
    if(n===2) return 3
    if(n===4) return 11
    // 점화식으로 해결 점화식은 4*f(n-2)-f(n-4) 이다
    let prev1 = 3
    let prev2 = 11
    for(let i = 0; i < n-4; i+=2){
        const tmp = prev2
        // 머지값을 계속 계산하므로 4*prev2 - prev1가 음수일 수 있다
        // 때문에 음수 처리를 위해 +1000000007를 해준다
        prev2 = (4*prev2 - prev1 + 1000000007) % 1000000007
        prev1 = tmp
    }
    
    return prev2
}