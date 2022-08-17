function solution(n) {
    // 피보나치 수열 문제
    let prev = 1
    let current = 2
    
    for(let idx = 2; idx < n; idx++){
        const tmp = current
        current = (prev+current) % 1234567
        prev = tmp
    }
    // 1일때 예외처리
    if(n===1) return prev
    return current;
}