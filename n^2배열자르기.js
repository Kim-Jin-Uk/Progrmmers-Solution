function solution(n, left, right) {
    let answer = []
    // 완전 탐색의 경우 시간이 초과됨
    // 필요한 부분만 연산하기 위해 left, rigt 범위가 포함된 영역만 계산
    const start = Math.floor(left / n) // 시작점 - left가 포함된 row 부터
    const sIdx = left % n // 배열 슬라이싱을 위해 나머지 값 도출
    const end = Math.ceil(right / n) // 끝점 - right가 포함된 row 까지
    const eIdx = right % n // 배열 슬라이싱을 위해 나머지 값 도출
    
    for(let i = start; i < end; i++){
        // 문제에서 요구한 배열의 일부분 생성 - 1차원 배열로
        for(let j = 0; j < n; j++){
            if(j <= i) answer.push(i+1)
            else answer.push(j+1)
        }
    }
    // eIdx의 경우 우리가 원하는 값은 n에서 eIdx를 뺀값이다
    return answer.slice(sIdx,answer.length-(n-eIdx)+1)
}