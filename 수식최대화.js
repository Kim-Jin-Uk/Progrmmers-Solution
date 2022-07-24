function solution(expression) {
    // 초기값 0으로 설정
    let answer = 0
    // 연산자 담을 배열 생성
    let operators = []
    // 문자열 순회하며 연산자만 넣어주기
    for(let char of expression){
        if(['*','-','+'].includes(char)) operators.push(char)
    }
    // 연산기호 제외하고 나머지 숫자만 배열로 추출
    expression = expression.replace(/[*\-+]/gi,' ').split(' ').map((v)=>Number(v))
    // 가짓수가 6개밖에 안되므로 모두 케이스로 돌려보기
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
        // 음수 처리
        if(value < 0){
            value *= -1
        }
        // 최대값 갱신
        answer = Math.max(value,answer)
    }
    // 입력받은 우선순위를 통해 계산
    function calc(priority,e,o){
        //길이 1이면 리턴
        if(expression.length === 1) return [e,o]
        // 인덱스 최신화를 위해 for문을 연산기호 수만큼 반복
        while(o.includes(priority)){
            const setO = []
            const setE = []
            let check = false
            for(let idx =0;idx < o.length;idx++){
                const symbol = o[idx]
                // 연산 기호는 1회만 수행 -> 전체 수행시 계산이 복잡해짐
                if(check){
                    // 이미 연산 수행한 케이스
                    setO.push(symbol)
                    setE.push(e[idx+1])
                }
                else if(symbol === priority){
                    // 우선순위 연산 기호인 케이스 해당 연산자에 맞게 계산
                    if(symbol === '*'){
                        setE.push(e[idx] * e[idx+1])   
                    }else if(symbol === '+'){
                        setE.push(e[idx] + e[idx+1]) 
                    }else{
                        setE.push(e[idx] - e[idx+1]) 
                    }
                    check = true
                }else{
                    // 연산 기호가 다른 케이스
                    setO.push(symbol)
                    setE.push(e[idx])
                }
            }
            //최신화 시켜주기
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