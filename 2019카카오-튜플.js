function solution(s) {
    const setS = []
    let child = []
    let char2Num = ''
    // 문자열을 2차원 배열로 전환
    for(const char of s){
        // 열린부분은 스킵
        if(char === '{') continue
        // 닫힌부분은 맨 마지막이 아니라면 부분집합을 집합에 넣어주기
        else if(char === '}'){
            if(char2Num !== ''){
                child.push(Number(char2Num))
                char2Num = ''
                setS.push([...child])
                child = []
            }
        }
        // 구분자의 경우 부분집합의 구분자가 아니라면 부분집합에 원소 넣어주기
        else if(char === ','){
            if(char2Num !== ''){
                child.push(Number(char2Num))
                char2Num = ''
            }
        }
        // 그외의 경우는 숫자로 바꾸기 전 문자열에 넣어주기
        else{
            char2Num += char
        }
    }
    // 길이순으로 정렬
    setS.sort((a,b)=>a.length-b.length)
    const prevs = []
    for(const child of setS){
        for(const num of child){
            // 튜플에 존재하지 않으면 새로운 원소이므로 넣오주고 break
            if(!prevs.includes(num)){
                prevs.push(num)
                break
            }
        }
    }
    return prevs
}