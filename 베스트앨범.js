function solution(genres, plays) {
    let answer = []
    // 노래가 많이 재생된 장르를 찾기 위한 객체
    const genreObj = {}
    plays.forEach((count,idx)=>{
        genreObj[genres[idx]] = genreObj[genres[idx]] || {total:0,songs:[]}
        genreObj[genres[idx]].songs.push([count,idx])
        genreObj[genres[idx]].total += count
    })
    const genreArr = []
    // 많이 재생된 노래 순 고유번호가 낮은 순 정렬
    for(const genre in genreObj){
        genreObj[genre].songs.sort((a,b)=>{
            if(a[0] === b[0]) return a[1] - b[1]
            return b[0] - a[0]
        })
        genreArr.push([genre,genreObj[genre]])
    }
    // 노래가 많이 재생된 장르 순 정렬
    genreArr.sort((a,b)=>b[1].total - a[1].total)
    for(const [,songObj] of genreArr){
        // 최대 2개로 필터링
        const songIdx = songObj.songs.map((v)=>v[1]).filter((v,i)=>i < 2)
        answer = answer.concat(songIdx)
    }
    return answer
}