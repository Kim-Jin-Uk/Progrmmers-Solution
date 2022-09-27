function solution(name) {
    let [notAList, right, left, changeRL,changeLR] = [[],0,name.length,name.length,name.length]
    let upDownNum = 0
    const ENG = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    for(let i = 0; i<name.length;i++){
        if(name[i] !== 'A' && i > 0){
            notAList.push(i)
            if (i > right) right = i
            if (i < left) left = i
        }
        const upNum = ENG.indexOf(name[i])
        if(upNum > 13) upDownNum += 26 - upNum
        else upDownNum += upNum
    }
    for(let i = 0; i < notAList.length-1; i++){
        let v = 2 * notAList[i] + name.length - notAList[i+1]
        if(changeRL > v) changeRL = v
    }
    for(let i = notAList.length-1; i > 0; i--){
        let v = 2 * (name.length - notAList[i]) + notAList[i-1]
        if(changeLR > v) changeLR = v
    }

    left = name.length - left
    let minimum = Math.min(left,right,changeRL,changeLR)
    minimum += upDownNum
    return minimum
}