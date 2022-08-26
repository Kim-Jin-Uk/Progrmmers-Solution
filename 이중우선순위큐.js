function solution(operations) {
    const answer = []
    operations.forEach((operation)=>{
        const [type,num] = operation.split(' ')
        // insert
        if(type === 'I') answer.push(+num)
        // delete
        else{
            // js 에서 shift는 O(n) pop은 O(1) > 정렬방식을 변경하여 pop
            if(+num === 1){
                answer.sort((a,b)=>a-b)
                answer.pop()
            }else{
                answer.sort((a,b)=>b-a)
                answer.pop()
            }
        }
    })
    if(!answer.length) return [0,0]
    // 정렬하여 리턴하면 O(nlogn) 이고 최대 최소를 리턴하면 O(n) 이기에 최대 최소 리턴
    return [Math.max(...answer),Math.min(...answer)]
}