function solution(queue1, queue2) {
    let answer = 0
    // 최대횟수 > q1으로 모두 보냈다가(n) 다시 q2로 오는경우(2n)
    const max = queue1.length*3
    let value = queue1.reduce((acc,cur,idx)=>acc+cur-queue2[idx],0)/2
    let [i,j] = [0,0] // shift는 타임오버
    while(value !== 0 && answer < max){
        if(value > 0){
            const v = queue1[i]
            i++
            value -= v
            queue2.push(v)
        }else{
            const v = queue2[j]
            j++
            value += v
            queue1.push(v)
        }
        answer++
    }
    return value !== 0 ? -1 : answer
}