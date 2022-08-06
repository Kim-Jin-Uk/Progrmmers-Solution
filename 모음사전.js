function solution(word) {
    const chars = ['A','E','I','O','U']
    // 모음의 개수는 5개 길이도 5 이므로 생각보다 많은 단어들이 사전에 들어가지 않는다
    // 사전을 직접 만들어서 답을 찾아낸다
    const dict = []
    // 정렬할 필요없이 사전순에 맞게 단어를 넣어준다
    function dfs(prev){
        if(prev.length > 5) return
        if(prev.length > 0)dict.push(prev)
        for(const char of chars){
            dfs(prev+char)
        }
    }
    dfs('')
    // 사전을 순회하며 답을 찾으면 즉시 리턴한다
    for(let idx = 0; idx < dict.length; idx ++){
        if(dict[idx] === word) return idx+1
    }
}
