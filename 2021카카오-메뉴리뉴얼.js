function solution(orders, course) {
    const answer = []
    // 가능한 모든 메뉴를 담을 사전
    const menu = {}
    // 메뉴 생성 함수
    function makeMenu(order,length,idx,prev,dict){
        if(prev.length === length) return dict.add(prev)
        for(let i = idx; i < order.length; i++){
            makeMenu(order,length,i+1,prev+order[i],dict)
            makeMenu(order,length,i+1,prev,dict)
        }
    }
    orders.forEach((order)=>{
        course.forEach((length)=>{
            const dict = new Set()
            // order은 정렬이 안되어있을 수 있다
            makeMenu(order.split('').sort(),length,0,'',dict)
            for(const key of dict) menu[key] = (menu[key] || 0) +1
        })
    })
    // 코스 길이별 최대 주문 횟수 산정
    const max = {}
    for(const key in menu){
        max[key.length] = Math.max(max[key.length] || 0,menu[key])
    }
    // 최대 주문 횟수인 메뉴 넣어주기
    for(const key in menu){
        if(max[key.length] === menu[key] && menu[key] > 1) answer.push(key)
    }
    answer.sort()
    return answer
}