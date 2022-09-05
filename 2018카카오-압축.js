// 코드 개선
function solution(msg) {
    const answer = []
    const dict = {
        A:1,B:2,C:3,D:4,E:5,F:6,G:7,
        H:8,I:9,J:10,K:11,L:12,M:13,N:14,
        O:15,P:16,Q:17,R:18,S:19,T:20,U:21,
        V:22,W:23,X:24,Y:25,Z:26,
    }
    let prevKey = ''
    let prevValue = -1
    let keyNum = 27
    // 키를 누산하여 계산
    for(let idx = 0; idx < msg.length; idx++){
        const key = msg[idx]
        prevKey += key
        // 키값이 존재하면 키 누산 및 직전 키값 갱신
        if(dict[prevKey]) prevValue = dict[prevKey]
        // 키값이 없다면 직전 키값으로 리턴값 갱신
        // 사전에 키등록, 직전 키 및 직전 키값 갱신
        else{
            answer.push(prevValue)
            dict[prevKey] = keyNum++
            prevKey = key
            prevValue = dict[prevKey]
        }
    }
    // 마지막 키값으로 리턴값 갱신
    answer.push(dict[prevKey])
    return answer
}