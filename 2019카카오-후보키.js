function solution(relation) {
    const PKs = {}
    // 유일성 검증
    function uniquenessDFS(idx,PKObj){
        if(idx > relation[0].length) return
        const isUnique = Object.keys(PKObj).length ? new Set(relation.map((a)=>a.filter((b,i)=>PKObj[i]).join())).size === relation.length : false
        if(isUnique) PKs[Object.keys(PKObj).sort((a,b)=>a-b).join()] = true
        uniquenessDFS(idx+1,PKObj)
        const copy = {...PKObj}
        copy[idx] = true
        uniquenessDFS(idx+1,copy)
    }
    uniquenessDFS(0,{})
    // 최소성 검증
    while(true){
        const keys = Object.keys(PKs).sort((a,b)=>a.length-b.length)
        let isMinimality = true
        keys.forEach((key,idx)=>{
            const standard = new Array(relation[0].length).fill(false)
            key.split(',').forEach((idx)=>{standard[idx] = true})
            for(let i = idx+1; i < keys.length; i++){
                const match = new Array(relation[0].length).fill(false)
                keys[i].split(',').forEach((idx)=>{match[idx] = true})
                let check = true
                standard.forEach((v,i)=>{
                    if(v && !match[i]) check = false
                })
                if(check){
                    delete PKs[keys[i]]
                    isMinimality = false
                }
            }
        })
        if(isMinimality) return keys.length
    }
}