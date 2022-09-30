function solution(numbers) {
    const answer = []
    for(const number of numbers){
        if(number % 2 === 0){
            answer.push(number+1)
            continue
        }
        const bin = ['0'].concat(number.toString(2).split(''))
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