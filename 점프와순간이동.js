function solution(n){
    let answer = 0
    // 현재 n이 짝수인 경우 > n/2 만큼 이동후 순간이동 하면 된다 > n->n/2 > 배터리 소모 0
    // 현재 n이 홀수인 경우 > n/2-1만큼 이동후 1만큼 점프후 순간이동하면된다 > n->n/2-1 > 배터리 소모 1
    while(n>0){
        if(n%2){
            answer++
            n = parseInt(n/2)
        }
        else{
            n = n/2
        }
    }
    return answer
}