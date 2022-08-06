function solution(s) {
    const answer = [0,0]
    // s가 '1'이면 리턴
    while(s!=='1'){
        // 0 없애기 전 길이
        const origin = s.length
        s = s.replace(/0/gi,'')
        // 0 없앤후 길이
        const trans = s.length
        // 이진변환 횟수, 삭제한 0 개수 갱신
        answer[0] ++
        answer[1] += origin - trans
        // 문자열의 길이를 이진수 문자열로 변환
        s = (s.length).toString(2)
    }
    return answer
}