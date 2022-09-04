function solution(str1, str2) {
    // 영어 문자열 판별 정규식
    const alphabet = /[a-z]/
    // 합집합
    const fullSet = {}
    // 부분 집합
    const interSet = {}
    // 해당 문자열의 부분집합 생성
    function makeSubSet(str){
        str = str.toLowerCase()
        const subSet = {}
        for(let idx = 0; idx < str.length-1; idx++){
            if(alphabet.test(str[idx]) && alphabet.test(str[idx+1])){
                const key = str[idx]+str[idx+1]
                subSet[key] = (subSet[key] || 0) + 1
            }
        }
        return subSet
    }
    const subSet1 = makeSubSet(str1)
    const subSet2 = makeSubSet(str2)
    // 교집합,합집합 갱신
    for(const key in subSet1){
        fullSet[key] = Math.max(fullSet[key] || 0,subSet1[key])
        interSet[key] = Math.min(subSet1[key],subSet2[key] || 0)
    }
    // 합집합 갱신
    for(const key in subSet2){
        fullSet[key] = Math.max(fullSet[key] || 0,subSet2[key])
    }
    // 자카드 유사도를 위한 카운팅
    const maxNum = Object.keys(fullSet).reduce((sum,key)=>sum+fullSet[key],0)
    const minNum = Object.keys(interSet).reduce((sum,key)=>sum+interSet[key],0)
    // maxNum 이 0 이면 최대값 리턴
    if(maxNum === 0) return 65536
    return parseInt((minNum/maxNum)*65536)
}