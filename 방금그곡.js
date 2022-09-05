// 함수형 프로그래밍으로 개선
// KMP 알고리즘 적용
function solution(m, musicinfos) {
    let answer = '(None)'
    let maxTime = 0
    // 멜로디 배열 변환 및 패턴 추출
    const pattern = makeArrFor(m)
    const prefixes = makeTableFor(pattern)
    
    musicinfos.forEach((info)=>{
        const [start,end,title,datas] = info.split(',')
        // 해당 곡의 플레이 타임, 플레이된 음표 추출
        const playTime = getTimeFor(end) - getTimeFor(start)
        let playDatas = makeArrFor(datas)
        const len = playDatas.length
        if(playTime > len){
            for(let idx = 0; idx < playTime-len; idx++){
                playDatas.push(playDatas[idx])
            }
        }else playDatas = playDatas.slice(0,playTime)
        // 플레이 타임이 더 길고 매칭가능시 갱신
        if(maxTime < playTime && isMatch(playDatas,pattern,prefixes)){
            answer = title
            maxTime = playTime
        }
    })
    return answer
}
// 문자열을 시간으로 변환
function getTimeFor(str){
    const [H,M] = str.split(':')
    return +H*60 + +M
}
// 문자열을 배열로 변환
function makeArrFor(str){
    let playDatas = []
    let prevData = ''
    for(let i = 0; i < str.length; i++){
        const data = str[i]
        if(data === '#'){
            playDatas.push(prevData+data)
            prevData = ''
        }else if(prevData){
            playDatas.push(prevData)
            prevData = data
        }else prevData += data
    }
    if(prevData) playDatas.push(prevData)
    return playDatas
}
// 배열에서 패턴 추출
function makeTableFor(arr) {
    const table = new Array(arr.length)
    let j = 0
    table[0] = 0
    for(let i = 1; i < arr.length; i++){
        while (j > 0 && arr[i] !== arr[j]) j = table[j - 1]
        if (arr[j] === arr[i])  j++
        table[i] = j
    }
    return table
}
// KMP 알고리즘으로 매칭 확인
function isMatch(data,pattern,prefixes){
    if(data.length < pattern.length) return false
    let [i,j] = [0,0]
    while(i < data.length){
        if(data[i] === pattern[j]){
            i++
            j++
        }
        if(j === pattern.length) return true
        else if(data[i] !== pattern[j]){
            if(j !== 0) j = prefixes[j-1]
            else i++
        }
    }
    return false
}