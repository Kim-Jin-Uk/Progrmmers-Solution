function solution(s) {
    let answer = 0
    // s를 한번더 이어붙일것이기에 미리 길이를 추출
    const length = s.length
    // 회전을 위해 s를 이어붙임
    s = s+s
    // 0부터 s길이까지 회전
    for(let idx = 0; idx < length; idx++){
        // 유효괄호를 확인하기 위한 스택 선언
        const stack = []
        // 회전된 괄호 순회하기
        for(let charIdx = idx; charIdx < length+idx; charIdx++){
            const stackSize = stack.length
            // 스택이 비었다면 넣어주고
            if(stackSize === 0) stack.push(s[charIdx])
            else{
                // 차있다면 유효괄호 확인, 유효하지 않다면 스택에 넣어주기
                if(stack[stackSize-1] === '{' && s[charIdx] === '}') stack.pop()
                else if(stack[stackSize-1] === '[' && s[charIdx] === ']') stack.pop()
                else if(stack[stackSize-1] === '(' && s[charIdx] === ')') stack.pop()
                else stack.push(s[charIdx])
            }
        }
        // 스택이 비었다면 올바른 괄호
        if(stack.length === 0) answer++
    }
    return answer;
}