function solution(relation) {
    const idxs = relation[0].length
    const overlaps = []
    
    for(let len = 1; len <= idxs; len++){
        check(len,[])
    }
    
    function check(length,ids){
        if(ids.length === length){
            checkoverlap(ids)
        }else{
            for(let i = 0; i < idxs; i++){
                if(!ids.includes(i)){
                    check(length,ids.concat([i]))
                }
            }   
        }
    }
    
    function checkoverlap(ids){
        const overlap = []
        for(const r of relation){
            const row = r.filter((v,i) => ids.includes(i)).join(',')
            if(overlap.includes(row)) return false
            overlap.push(row)
        }
        const key = ids.sort((a,b)=>a-b).join(',')
        let check = true
        for(const o of overlaps){
            if(key.includes(o)){
                check = false
                break
            }
        }
        if(check){
            overlaps.push(key)
            // console.log('check',ids)
            return
        }
    }
    
    return overlaps.length
}

console.log(solution(
    [['a',1,'aaa','c','ng'],['b',1,'bbb','c','g'],['c',1,'aaa','d','ng'],['d',2,'bbb','d','ng']]
    ))