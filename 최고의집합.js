function solution(n, s) {
    const answer = []
    // 불가능한 케이스 처리
    if(s < n) return [-1]
    // 곱은 최대로 하는것은 가능한한 원소들의 편차가 적게하면 된다
    for(let i = n; i; i--){
        // 오름차순정렬을 위한 버림
        const num = Math.floor(s/i)
        answer.push(num)
        s -= num
    }
    return answer
}