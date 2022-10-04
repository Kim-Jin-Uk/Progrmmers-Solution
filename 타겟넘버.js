function solution(numbers, target) {
    let answer = 0
    function calc(idx,prevValue){
        if (idx === numbers.length-1){
            if (prevValue === target) answer ++
            return
        }
        calc(idx+1,prevValue+numbers[idx+1])
        calc(idx+1,prevValue-numbers[idx+1])
    }
    calc(-1,0)
    return answer
}