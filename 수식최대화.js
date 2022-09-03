function solution(expression) {
    let answer = 0
    const possibleSymbols = [
        ['+','-'],['+','*'],['-','+'],['-','*'],['*','-'],['*','+'],
    ]
    function calc(symbol,str){
        let full = ''
        let prev = ''
        for(let idx = 0; idx < str.length; idx ++){
            if(isNaN(str[idx])){
                if(str[idx] === symbol) prev += str[idx]
                else{
                    if(str[idx] === '-' && (prev === '' || isNaN(prev[prev.length-1]))){
                        prev += str[idx]
                    }else{
                        full += eval(prev)
                        full += str[idx]
                        prev = ''
                    }
                }
            }else prev += str[idx]
        }
        return full+eval(prev)
    }
    for(const symbols of possibleSymbols){
        let str = expression
        for(const symbol of symbols) str = calc(symbol,str)
        answer = Math.max(answer,Math.abs(eval(str)))
    }
    return answer
}