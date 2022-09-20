function solution(input_string) {
    const answer = []
    const dict = {}
    const string = input_string.split('')
    string.forEach((char)=>{
        dict[char] = (dict[char]||0)+1
    })
    for(const key in dict){
        // 빈도수 2회이상 필터링
        if(dict[key] > 1){
            let idx = -1
            // 분활 유무 필터링
            for(let i = 0; i < string.length; i++){
                const char = string[i]
                if(char === key && key !== string[i+1]){
                    if(idx === -1) idx = i
                    else{
                        answer.push(key)
                        break
                    }
                }
            }
        }
    }
    // 정렬
    answer.sort()
    return answer.length ? answer.join('') : 'N';
}