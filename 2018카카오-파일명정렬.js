function solution(files) {
    // 숫자임을 확인할 사전 초기화
    const numbers = {0:true,1:true,2:true,3:true,4:true,
                     5:true,6:true,7:true,8:true,9:true}
    files = files.map((v,i)=>{
        // head, nums, tail 중 tail은 정렬에 사용되지 않으니 제외
        let head = ''
        let num = ''
        let isHead = true
        for(const char of v){
            if(char in numbers){
                num += char
                isHead = false
            }else if(isHead) head += char
            else break
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