function solution(n) {
    let answer = ''
    const key = ['','1','2','4']
    const calc = (num) => {
        if(num > 3){
            let result = num % 3
            if(result === 0){
                result = 3
                num --
            }
            calc(parseInt(num / 3))
            answer += key[result]
        }else answer += key[num]
    }
    calc(n)
    return answer
}