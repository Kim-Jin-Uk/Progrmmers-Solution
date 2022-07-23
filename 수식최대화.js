function solution(expression) {
    let answer = 0
    let operators = []
    for(let char of expression){
        if(['*','-','+'].includes(char)) operators.push(char)
    }
    expression = expression.replace(/[*\-+]/gi,' ').split(' ').map((v)=>Number(v))
    
    const candidates = [
        ['*','+','-'],
        ['*','-','+'],
        ['+','*','-'],
        ['+','-','*'],
        ['-','+','*'],
        ['-','*','+']
    ]
    
    for(const candidate of candidates){
        let e = [...expression]
        let o = [...operators]
        for(const symbol of candidate){
            [e,o] = calc(symbol,e,o)
        }
        let value = e[0]
        if(value < 0){
            value *= -1
        }
        answer = Math.max(value,answer)
    }
    
    function calc(priority,e,o){
        if(expression.length === 1) return [e,o]
        
        while(o.includes(priority)){
            const setO = []
            const setE = []
            let check = false
            for(let idx =0;idx < o.length;idx++){
                const symbol = o[idx]
                if(check){
                    setO.push(symbol)
                    setE.push(e[idx+1])
                }
                else if(symbol === priority){
                    if(symbol === '*'){
                        setE.push(e[idx] * e[idx+1])   
                    }else if(symbol === '+'){
                        setE.push(e[idx] + e[idx+1]) 
                    }else{
                        setE.push(e[idx] - e[idx+1]) 
                    }
                    check = true
                }else{
                    setO.push(symbol)
                    setE.push(e[idx])
                }
            }
            o = setO
            e = setE
        }
        return [e,o]
    }
    return answer;
}

console.log(solution(
    "100-200*300-500+20"
))