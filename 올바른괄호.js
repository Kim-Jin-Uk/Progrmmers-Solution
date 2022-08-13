function solution(s){
    // 스택의 성질을 이용해 확인
    const stack = []
    const matchDict = {'(':')',')':'('}
    for(const char of s){
        // 시작이 ')' 라면 바로리턴
        if(stack.length === 0 && char === ')') return false
        // 서로 매치된다면 스택에서 제거
        if(matchDict[char] === stack[stack.length-1]) stack.pop()
        // 스택에 차곡차곡 넣어주기
        else stack.push(char)
    }
    // 스택이 비었다면 올바른 괄호다
    return stack.length === 0
}