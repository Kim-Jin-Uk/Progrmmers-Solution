function solution(len, weight, weights) {
    let answer = 0
    let wSum = 0
    let index = 0
    let queue = new Array(len).fill(0)
    while(queue.length){
        // 트럭 무게를 버틸 수 없을 떄
        if(weight < wSum + weights[index]){
            // 한칸씩 전진
            wSum -= queue.shift()
            // 그래도 버티지 못한다면 트럭 진입 불가
            if(weights[index] && weight < wSum + weights[index]){
                queue.push(0)
                answer ++
                continue
            }
        }
        // 버틸수 있다면 한칸씩 전진
        else wSum -= queue.shift()
        // 트럭이 존재하면 진입
        if(weights[index]){
            queue.push(weights[index])
            wSum += weights[index]
            index ++
        }
        answer ++
    }
    return answer
}