function solution(n) {
    // 1로는 어떠한 수든 가능
    let answer = 1
    // 2부터 시작
    let len = 2
    // 1+2+3...+k 의 총합을 뺀수가 k로 나누어떨어지면 가능
    let sum = len*(len+1)/2
    while(sum <= n){
        // 판별
        if((n-sum)%len === 0)answer++
        // 갱신
        len ++
        sum = len*(len+1)/2
    }
    return answer
}