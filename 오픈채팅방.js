function solution(record) {
    let dict = {}
    let count = []
    let real = []

    for(let i = 0; i < record.length; i ++){
        const key = record[i].split(' ')
        if(key[2] !== undefined){
            dict[key[1]] = key[2]
        }
        count.push([key[1],key[0]])
    }

    for (let i in count){
        if (count[i][1] === 'Enter'){
            real.push(dict[count[i][0]]+"님이 들어왔습니다.")
        }else if(count[i][1] === 'Leave'){
            real.push(dict[count[i][0]]+"님이 나갔습니다.")
        }
    }
    return real
}