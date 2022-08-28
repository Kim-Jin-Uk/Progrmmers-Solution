function solution(A, B) {
    let answer = 0
    // 내림차순 정렬
    A.sort((a,b)=>b-a)
    B.sort((a,b)=>b-a)
    let aIdx = 0
    let bIdx = 0
    while(bIdx < B.length){
        // 지는 경우 가장 작은 수로 지기
        if(A[aIdx] >= B[bIdx]) B.pop()
        // 이기는 경우
        else{
            bIdx ++
            answer ++
        }
        aIdx++
    }
    return answer
}