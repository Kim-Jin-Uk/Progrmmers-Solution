function solution(n, words) {
    const answer = []
    // 끝말잇기가 성공적이였을때 처리를 위해 -1로 초기화
    let index = -1
    // 단어의 마지막 글자 저장
    let lastChar = ''
    // 중복단어 체크
    const checker = {}
    for(let idx = 0; idx < words.length; idx ++){
        const word = words[idx]
        // 이미 말했던 단어 or 첫 단어가 아니고, 잘못된 끝말잇기를 한경우
        if(checker[word] || (lastChar !== '' && word[0] !== lastChar)){
            index = idx
            break
        }
        // 객체에 단어 키로 넣어주기
        checker[word] = true
        // 마지막 글자 갱신
        lastChar = word[word.length-1]
    }
    // 성공적이였을때 리턴
    if(index === -1) return [0,0]
    // user가 0일 때 n으로 처리
    const user = (index+1)%n
    if(user === 0) answer.push(n)
    else answer.push(user)

    answer.push(parseInt(index/n)+1)
    return answer
}