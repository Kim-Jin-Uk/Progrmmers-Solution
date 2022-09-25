function solution(files) {
    // 숫자임을 확인할 사전 초기화
    files = files.map((v,i)=>{
        // head, nums, tail 중 tail은 정렬에 사용되지 않으니 제외
        let [head,num,isHead] = ['','',true]
        for(const char of v){
            if(isNaN(char)){
                if(isHead) head += char
                else break
            }else{
                num += char
                isHead = false
            }
        }
        // head, nums가 모두 같은 경우 index를 이용해 순서를 보장
        return [v,head.toLowerCase(),+num,i]
    })
    files.sort((a,b)=>{
        // head로 정렬
        if(a[1] > b[1]) return 1
        if(a[1] < b[1]) return -1
        // head가 같다면
        if(a[1] === b[1]){
            // nums로 정렬
            if(a[2]!==b[2]) return a[2] - b[2]
            // index로 정렬
            else return a[3] - b[3]
        }
    })
    return files.map((v)=>v[0])
}