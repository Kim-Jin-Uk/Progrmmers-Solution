function solution(msg) {
    const answer = []
    // 사전 사이즈 초기화
    let size = 27
    // 사전 초기화
    const dict = {
        A:1,B:2,C:3,D:4,E:5,F:6,G:7,H:8,
        I:9,J:10,K:11,L:12,M:13,N:14,O:15,P:16,
        Q:17,R:18,S:19,T:20,U:21,V:22,W:23,X:24,
        Y:25,Z:26
    }
    // 슬라이딩 윈도우로 탐색
    for(let start = 0; start < msg.length; start++){
        for(let end = start; end < msg.length; end++){
            const key = msg.substring(start,end+1)
            const nextKey = msg.substring(start,end+2)
            if(key in dict){
                // 키, 다음키가 존재하면 순회를 계속함 키와 다읔미가 같아지는 경우는 msg의 마지막 문자 부분이므로 따로 처리
                if(nextKey !== key && nextKey in dict) continue
                // 다음키가 존재하지 않다면 사이즈, 사전 갱신 및 리턴값에 넣어주기
                // 키와 다음키가 같은경우가 있으니 사전 갱신전에 리턴값 갱신
                else{
                    start = end
                    answer.push(dict[key])
                    dict[nextKey] = size++
                    break
                }
            }
        }
    }
    return answer
}