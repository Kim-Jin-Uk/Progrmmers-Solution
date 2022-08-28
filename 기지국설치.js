function solution(n, stations, w) {
    let answer = 0
    // 전파의 범위
    const length = 2*w+1
    // 시작 인덱스
    let prev = 0
    stations.forEach((s) => {
        // 범위를 벗어나는 경우 처리
        const [start,end] = [s-w > 1 ? s-w : 1,s+w < n ? s+w :n]
        // 전파가 닿지 않는다면 안닿는 범위를 전파 범위로 나누어 올림
        // 이미 전파가 닿는 다면 설치 필요 없음
        answer += Math.max(Math.ceil((start-prev-1)/length),0)
        // 시작 인덱스 갱신
        prev = end
    })
    // 마지막 원소, 스테이션 길이가 0 일때 처리
    answer += Math.max(Math.ceil((n-prev)/length),0)
    return answer
}