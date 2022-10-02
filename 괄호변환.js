function solution(p) {
    if(isRight(p)) return p
    return makeRight(p,'')
    function isRight(words){
        const check = []
        for(const char of words){
            if(check.length === 0){
                if (char === ')') return false
                check.push(char)
            }
            else{
                if(check[check.length - 1] !== char) check.pop()
                else{
                    if(char === ')') return false
                    check.push(char)
                }
            }
        }
        return true
    }
    function makeRight(wrong,prev){
        if(wrong === '') return prev
        const check = []
        let end = 0
        for(const idx in wrong){
            if(check.length === 0){
                if(+idx === 0) check.push(wrong[+idx])
                else{
                   end = +idx
                    break
                }
            } 
            else{
                if(check[check.length - 1] !== wrong[+idx]) check.pop()
                else check.push(wrong[+idx])
            }
        }
        if(end === 0) end = wrong.length
        const u = wrong.substring(0,end)
        const v = wrong.substring(end,wrong.length)
        if(isRight(u)) return makeRight(v,prev+u)
        const newV = makeRight(v,'')
        let solution = `${prev}(${newV})`
        const newU = u.substring(1,u.length-1)
        for(const char of newU){
            if(char === '(') solution += ')'
            else solution += '('
        }
        return solution
    }
}