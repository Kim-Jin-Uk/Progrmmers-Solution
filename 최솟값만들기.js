function solution(A,B){
    // 수학적인 문제 작은수*큰수 순으로 계산해야한다
    A.sort((a,b)=>a-b)
    B.sort((a,b)=>b-a)
    return A.reduce((acc,cur,idx)=>acc+cur*B[idx],0)
}