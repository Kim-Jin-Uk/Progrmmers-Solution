function solution(a, b, g, s, w, t) {
    let [answer,end,start] = [4 * 10 ** 14,4 * 10 ** 14,0]
    while(start <= end) {
        let [mid,gold,silver,add] = [Math.floor((start + end) / 2),0,0,0]
        for(let i =0; i < s.length; i++ ) {
            let [nowG,nowS,nowW,nowT] = [g[i],s[i],w[i],t[i]]
            let count = Math.floor(mid / (nowT * 2))
            if(mid % (nowT * 2) >= t[i]) count++
            gold += (nowG < count * nowW) ? nowG : count * nowW
            silver += (nowS < count * nowW) ? nowS : count * nowW
            add += (nowG + nowS < count * nowW) ? nowG + nowS : count * nowW
        }       
        if(gold >= a && silver >= b && add >= a + b) {
            end = mid - 1
            answer = Math.min(mid, answer)
        }else start = mid + 1
    }
    return answer
}