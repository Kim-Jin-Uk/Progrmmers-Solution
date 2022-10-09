function solution(want, number, discount) {
    let answer = 0
    const wMap = new Map()
    want.forEach((w,i) => {
        wMap.set(w,number[i])
    })
    for(let idx = 0; idx <= discount.length - 10; idx++){
        const dMap = new Map()
        discount.slice(idx,idx+10).forEach((d) => {
            dMap.set(d,(dMap.get(d) || 0) + 1)
        })
        let isAble = true
        want.forEach((w) => {
            if(wMap.get(w) > (dMap.get(w) || 0)) isAble = false
        })
        if(isAble) answer ++
    }
    return answer
}