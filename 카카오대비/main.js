import axios from "axios";
import qs from "qs";
const BASE_URL = 'https://huqeyhi95c.execute-api.ap-northeast-2.amazonaws.com/prod'
const X_AUTH_TOKEN = '24b055d8660d7b0121c187e931f5bf15'
axios.defaults.paramsSerializer = params => {
    return qs.stringify(params);
}
axios.defaults.baseURL = BASE_URL
const START_HEADERS = {headers:{'X-Auth-Token':X_AUTH_TOKEN,'Content-Type':'application/json'}}
const getStartKey = async (problem) => {
    try{
        const params = {problem:1}
        const {status,data} = await axios.post(`/start`,params,START_HEADERS)
        return data
    }catch (err){
        console.log(err.response.data.message)
    }
}
const getWaitingLine = async () => {
    try{
        const {status,data} = await axios.get(`/waiting_line`)
        return data
    }catch (err){
        console.log(err.response.data.message)
    }
}
const putMatch = async (users) => {
    try{
        const params = {pairs:[]}
        if(users.length > 1) {
            for (let i = 0; i < users.length / 2; i += 2) {
                params.pairs.push([users[i].id, users[i + 1].id])
            }
        }
        const {status,data} = await axios.put(`/match`,params)
        return data
    }catch (err){
        console.log(users)
        console.log(err)
    }
}
const getGameResult = async () => {
    try{
        const {status,data} = await axios.get(`/game_result`)
        return data
    }catch (err){
        console.log(err)
    }
}
const getUserInfo = async () => {
    try{
        const {status,data} = await axios.get(`/user_info`)
        return data
    }catch (err){
        console.log(err.response.data)
    }
}
const putChangeGrade = async (commands) => {
    try{
        const params = {commands:commands}
        const {status,data} = await axios.put(`/change_grade`,params)
        return data
    }catch (err){
        console.log(err)
    }
}
const getScore = async () => {
    try{
        const {status,data} = await axios.get(`/score`)
        console.log(status,data)
        return data
    }catch (err){
        console.log(err.response.data)
    }
}
const SCORES = []
const Main = async () => {
    let serverTime = 0
    const {auth_key} = await getStartKey(1)
    axios.defaults.headers.common['Authorization'] = auth_key
    axios.defaults.headers.common['Content-Type'] = 'application/json'
    const {user_info} = await getUserInfo()
    let result = {status:null}
    while(result) {
        let {waiting_line} = await getWaitingLine()
        result = await putMatch(waiting_line)
        if(result)serverTime = result.time
        const {game_result} = await getGameResult()
        if (game_result.length) {
            /* 실력차이 differ => 99000 * (40 - taken) / 35 의 평균
            * 승률 => (유저 A의 고유 실력) / (유저 A의 고유 실력 + 유저 B의 고유 실력) */
            for(const {taken,win,lose} of game_result) {
                const score = Math.ceil(99000 * (40 - taken) / 70)
                user_info[win - 1].grade += score
                user_info[lose - 1].grade -= score
            }
        }
    }
    let grade = 0
    let prev = -Infinity
    user_info.sort((a,b)=>a.grade-b.grade).forEach((user) => {
        if(user.grade > prev) grade++
        prev = user.grade
        user.grade = grade
    })
    await putChangeGrade(user_info)
    SCORES.push(await getScore())
    console.log(SCORES)
}

const Main2 = async () => {
    let serverTime = 0
    const {auth_key} = await getStartKey(2)
    axios.defaults.headers.common['Authorization'] = auth_key
    axios.defaults.headers.common['Content-Type'] = 'application/json'
    const {user_info} = await getUserInfo()
    let result = {status:null}
    while(result) {
        let {waiting_line} = await getWaitingLine()
        result = await putMatch(waiting_line)
        if(result)serverTime = result.time
        const {game_result} = await getGameResult()
        if (game_result.length) {
            /* 실력차이 differ => 99000 * (40 - taken) / 35 의 평균
            * 승률 => (유저 A의 고유 실력) / (유저 A의 고유 실력 + 유저 B의 고유 실력) */
            for(const {taken,win,lose} of game_result) {
                if(taken < 10) continue
                const score = Math.ceil(99000 * (40 - taken) / 70)
                user_info[win - 1].grade += score
                user_info[lose - 1].grade -= score
            }
        }
    }
    let grade = 0
    let prev = -Infinity
    user_info.sort((a,b)=>a.grade-b.grade).forEach((user) => {
        if(user.grade > prev) grade++
        prev = user.grade
        user.grade = grade
    })
    await putChangeGrade(user_info)
    SCORES.push(await getScore())
    console.log(SCORES)
}
await Main()
await Main2()


