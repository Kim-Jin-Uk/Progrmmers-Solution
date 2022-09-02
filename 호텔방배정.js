function solution(k, room_number) {
    const answer = []
    // 효율성 개선을 위해 object => map으로 변경
    const map = new Map()
    room_number.forEach((num)=>{
        // 없다면 map에 추가
        if(!map.get(num)){
            map.set(num,num+1)
            answer.push(num)
        }
        else{
            // 있을때 map을 순회하며 업데이트 할 노드 갱신
            const updates = [num]
            let newNum = map.get(num)
            while(true){
                if(!map.get(newNum)) break
                newNum = map.get(newNum)
                updates.push(newNum)
            }
            updates.push(newNum)
            // 다녀간 노드 전부 갱신
            updates.forEach((num)=>{
                map.set(num,newNum+1)
            })
            answer.push(newNum)
        }
    })
    return answer
}