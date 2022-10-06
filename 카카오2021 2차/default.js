import axios from "axios";
const X_AUTH_TOKEN = 'b453dff9db67d352bad3bbe06432ce7d'
const BASE_URL = 'https://kox947ka1a.execute-api.ap-northeast-2.amazonaws.com/prod/users'
console.log('start')
axios.defaults.baseURL = BASE_URL
const START_HEADERS = {headers:{'X-Auth-Token':X_AUTH_TOKEN,'Content-Type':'application/json'}}

const createStart = async (problem) => {
    try{
        const {status,data} = await axios.post('/start',{problem},START_HEADERS)
        console.log(status,data)
        return data
    }catch(err){
        console.log(err)
    }
}

const getLocations = async (header) => {
    try{
        const {status, data} = await axios.get('/locations',header)
        return data
    }catch(err){
        console.log(err.response.data)
    }
}

const getTrucks = async (header) => {
    try{
        const {status, data} = await axios.get('/trucks',header)
        console.log(status,data)
        return data
    }catch(err){
        console.log(err.response.data)
    }
}
const updateSimulate = async (header,commands) => {
    try{
        const {status, data} = await axios.put('/simulate',{commands},header)
        console.log(data)
        return data
    }catch(err){
        console.log(err.response.data)
    }
}

const getScore = async (header) => {
    try{
        const {status, data} = await axios.get('/score',header)
        return data
    }catch(err){
        console.log(err.response.data)
    }
}

/* 
운행시간 : 12시간 > 720분
이동시간 : 100m / 6s
자전거 싣는 / 내리는 시간: 6s
최대 20대
대여요청은 순차적으로 실행
명령은 10개까지 가능
0 가만히
1 상(우) 2 우(하) 3 하(좌) 4 좌(상) 5 상차 6 하차
"commands": [{ "truck_id": 0, "command": [2, 5, 4, 1, 6] }]
*/
const main1 = async () => {
    const AUTH_KEY_1 = (await createStart(1)).auth_key
    const HEADER_PROBLEM_1 = {headers:{'Authorization':AUTH_KEY_1}}
    console.log(HEADER_PROBLEM_1)
    let {locations} = (await getLocations(HEADER_PROBLEM_1))
    let time = 0
    while(time <= 720){
        time = (await updateSimulate(HEADER_PROBLEM_1,[])).time
    }
    
    const {score} = await getScore(HEADER_PROBLEM_1)
    console.log(score)
}

await main1()