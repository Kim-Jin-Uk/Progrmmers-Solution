function solution(s){
    s = s.split('')
    const checker = []
    checker.push(s[0])
    for(let idx = 1; idx < s.length; idx++){
        if(checker[checker.length -1] === s[idx])checker.pop()
        else checker.push(s[idx])
    }
    return checker.length === 0 ? 1 : 0
}