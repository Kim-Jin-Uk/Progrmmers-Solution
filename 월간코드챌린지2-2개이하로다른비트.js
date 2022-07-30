function solution(numbers) {
    const answer = []
    for(const number of numbers){
        // 짝수일 경우 비트의 끝이 01로 끝나거나 0으로 끝난다
        // 01 -> 10 0 -> 1 로 변환해주면 값이 1만 증가하며 비트를 2개이하로 다르게 만들 수 있다
        if(number % 2 === 0){
            answer.push(number+1)
            continue
        }

        const bin = ['0'].concat(number.toString(2).split(''))
        
        // 홀수일 경우 뒤에서부터 가장 먼저나온 01을 10으로 변환해주는 것이 가장 작게 만들 수 있다
        for(let idx = bin.length-1; idx > 0; idx --){
            if(bin[idx] === '1' && bin[idx-1] === '0'){
                bin[idx-1] = '1'
                bin[idx] = '0'
                break
            }
        }
        answer.push(parseInt(bin.join(''),2))
    }
    return answer
}