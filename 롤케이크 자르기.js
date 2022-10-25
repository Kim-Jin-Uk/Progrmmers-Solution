function solution(topping) {
    let answer = 0
    const older = []
    const olderSet = new Set()
    for(let index = 0; index < topping.length - 1; index++){
        olderSet.add(topping[index])
        older.push(olderSet.size)
    }
    const younger = []
    const youngerSet = new Set()
    for(let index = topping.length; index > 1; index--){
        youngerSet.add(topping[index - 1])
        younger.push(youngerSet.size)
    }
    for(let index = 0; index < topping.length - 1; index++){
        if(older[index] === younger[topping.length - 2 - index]) answer++
    }
    return answer
}