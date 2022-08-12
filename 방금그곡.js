function solution(m, musicinfos) {
    // 리턴값, 시간 초기화
    let answer = '(None)'
    let time = -1
    // m을 배열로 변환
    const mList = []
    for(const char of m){
        if(char === '#') mList[mList.length-1] = mList[mList.length-1] + '#'
        else mList.push(char)
    }
    // 두 악보를 매치하는 함수
    function matchMusic(m1,m2,title){
        // 멜로디의 길이가 더짧다면 바로 리턴
        if(m2.length < m1.length) return
        // 배열을 순회하며 매치 체크
        for(let start = 0; start <= m2.length - m1.length; start ++){
            let check = true
            for(let match = 0; match < m1.length; match ++){
                if(m2[start+match] !== m1[match]){
                    check = false
                    break
                }
            }
            if(check){
                // 멜로디의 길이가 더 긴 경우에만 값 갱신
                if(time < m2.length){
                    answer = title
                    time = m2.length
                }
                return
            }
        }
    }
    
    for(const musicInfo of musicinfos){
        let [start,end,title,music] = musicInfo.split(',')
        // 멜로디 재생시간 구하기
        const [startH,startM] = start.split(':')
        const [endH,endM] = end.split(':')
        start = +startH*60 + +startM
        end = +endH*60 + +endM
        let musicTime = end-start
        // 멜로디를 배열로 변환
        const musicList = []
        for(let idx = 0; idx < musicTime; idx++){
            const i = idx % music.length
            if(music[i] === '#'){
                musicList[musicList.length-1] = musicList[musicList.length-1]+'#'
                musicTime++
            }else musicList.push(music[i])
        }
        // 마지막 글자가 #인경우 처리
        if(music[(musicTime)%music.length] === '#')
                musicList[musicList.length-1] = musicList[musicList.length-1]+'#'
        // 매칭
        matchMusic(mList,musicList,title)
    }
    return answer
}