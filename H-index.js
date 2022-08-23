function solution(citations) {
    // 내림차순 정렬
    citations.sort((a,b)=>b-a)
    // 현재 인덱스보다 인용수 이상이고 다음 인덱스의 인용수가 현재인덱스 이하인 경우 리턴
    for(let i = 0; i < citations.length; i++){
        if (i+1 <= citations[i] && i+1 >= citations[i+1])return i+1
    }
    // 마지막 인덱스, 마지막 인용수의 최소값 리턴
    return Math.min(citations.length,citations[citations.length-1])
}