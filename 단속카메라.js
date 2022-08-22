function solution(routes) {
    let answer = 0
    let prev = -Number.MAX_VALUE
    // 진출 시간순으로 정렬
    routes.sort((a,b)=>a[1]-b[1])
    // 진출 시점에 카메라 설치, 이미 카메라에 확보되는 차량이면 패스
    routes.forEach(([start,end])=>{
        if(prev < start){
            answer ++
            prev = end
        }
    })
    return answer
}