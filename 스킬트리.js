function solution(skill, skill_trees) {
    let answer = 0
    // 스킬을 배열로 변환
    const skillTree = skill.split('')
    // 각 스킬트리별 조건 부합 판별
    for(const tree of skill_trees){
        let idx = 0
        let check = true
        for(const char of tree){
            // 옳은 스킬트리인지 판별
            if(skillTree.includes(char)){
                if(skillTree[idx] === char){
                    idx ++
                }else{
                    check = false
                    break
                }
            }
        }
        if(check) answer ++
        idx = 0
    }
    return answer
}