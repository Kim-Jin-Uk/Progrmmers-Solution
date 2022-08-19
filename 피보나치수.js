function solution(n) {
    // 피보나치 구현
    if(n < 1) return n
    let prev = 0
    let curr = 1
    for(let i = 1; i < n; i++){
        const tmp = curr
        curr = (curr+prev) % 1234567
        prev = tmp
    }
    return curr
}