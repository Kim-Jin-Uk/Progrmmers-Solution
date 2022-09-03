function solution(gems) {
    // 보석 종류 수
    const size = new Set(gems).size
    const map = new Map()
    const SEs = []
    gems.forEach((gem,i)=>{
        // 시작 인덱스를 구하기 위해 해당 보석 값 삭제후 새로 할당
        // map 은 인덱스 오름차순으로 정렬된다
        map.delete(gem)
        map.set(gem,i)
        // 모든 보석종류가 있다면 후보에 넣어주기
        if(map.size === size) SEs.push([map.values().next().value+1,i+1])
    })
    // 후보군 정렬 > 길이짧은순, 시작인덱스 빠른순
    SEs.sort(([s1,e1],[s2,e2])=>{
        if((e1-s1)!==(e2-s2)) return (e1-s1)-(e2-s2)
        else return s1 - s2
    })
    return SEs[0]
}