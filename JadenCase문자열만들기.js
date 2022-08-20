function solution(s) {
    // 전부 소문자 처리
    const word = s.toLowerCase().split('')
    let answer = ''
    let check = true
    word.forEach((char)=>{
        // 공백 바로 뒤 또는 첫글자 대문자 처리
        if(check){
            check = false
            answer +=char.toUpperCase()
        }
        else answer += char
        if(char === ' ') check = true
    })
    return answer
}