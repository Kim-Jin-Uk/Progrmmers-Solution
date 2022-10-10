function solution(cards) {
    let answer = 0
    
    for(let start1 = 0; start1 < cards.length; start1 ++){
        const boxes1 = {}
        cards.forEach((v) => boxes1[v] = true)
        let key1 = start1 + 1
        const group1 = {}
        // group 1
        while(true){
            if(!boxes1[key1]) break
            boxes1[key1] = false
            key1 = cards[key1-1]
            group1[key1] = true
        }
        if(Object.keys(group1).length === cards.length) continue
        // group 2
        let group2Max = 0
        for(let start2 = 0; start2 < cards.length; start2 ++){
            if(group1[start2]) continue
            const group2 = {}
            const boxes2 = {...boxes1}
            let key2 = start2
            while(true){
                if(!boxes2[key2]) break
                boxes2[key2] = false
                key2 = cards[key2-1]
                group2[key2] = true
            }
            group2Max = Math.max(group2Max,Object.keys(group2).length)
        }
        answer = Math.max(answer,Object.keys(group1).length*group2Max)
    }
    return answer
}