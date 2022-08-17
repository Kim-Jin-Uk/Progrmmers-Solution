function solution(begin, end) {
    const answer = []
    for(let idx = begin; idx <= end; idx++){
        // 인데스가 1이면 0 리턴
        if(idx === 1) answer.push(0)
        else{
            let max = 1
            // 제곱근 까지만 약수를 취함 > 해당 약수로 나눈값이 더 큰 약수
            for(let div = 2; div <= idx**(0.5); div++){
                // 블럭의 개수가 1000000 이하이다
                if(idx % div === 0 && idx/div <= 10000000){
                    max = idx/div
                    // 찾으면 바로 탈출
                    break
                }
            }
            answer.push(max)
        }
    }
    return answer
}