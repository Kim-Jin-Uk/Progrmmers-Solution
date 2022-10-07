import axios from "axios";
const X_AUTH_TOKEN = '7888df51e8eb579ff0dd9be11986f2ed'
const BASE_URL = 'https://kox947ka1a.execute-api.ap-northeast-2.amazonaws.com/prod/users'
axios.defaults.baseURL = BASE_URL
const START_HEADERS = {headers:{'X-Auth-Token':X_AUTH_TOKEN,'Content-Type':'application/json'}}
// 800 넘기
// 928
const createStart = async (problem) => {
    try{
        const {status,data} = await axios.post('/start',{problem},START_HEADERS)
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

/* { "id": 0, "located_bikes_count": 3 } */
const makeTableData = (locations,size) => {
    const table = new Array(size).fill().map(()=>new Array(size).fill())
    let sum = 0
    locations.forEach(({id,located_bikes_count}) => {
        const y = Math.floor(id / size)
        const x = size - (id - size * y) - 1
        table[x][y] = located_bikes_count
        sum += located_bikes_count
    })
    const avg = Math.ceil(sum / size ** 2)
    const min = []
    const max = []

    for(let x = 0; x < size; x++){
        for(let y = 0; y < size; y++){
            if(table[x][y] > avg) max.push([x,y,table[x][y]])
            else if(table[x][y] < avg) min.push([x,y,table[x][y]])
        }
    }

    return {table,max,min,avg}
}

/* { "id": 0, "located_bikes_count": 3 } */
const makeTableDataV2 = (locations,size,peakReq,peakRes,before) => {
    const table = new Array(size).fill().map(()=>new Array(size).fill())
    locations.forEach(({id,located_bikes_count}) => {
        const y = Math.floor(id / size)
        const x = size - (id - size * y) - 1
        table[x][y] = located_bikes_count
        if(before){
            if(located_bikes_count - before[x][y] > 0) peakRes[x][y] += located_bikes_count - before[x][y]
            else peakReq[x][y] += before[x][y] - located_bikes_count
        }
    })

    return {table,peakReq,peakRes}
}

const getMinMoveTruckFor = (trucks,min,max,disAlreadyTrucks) => {
    let minMove = Infinity
    let [truckI,maxI,minI] = [-1,0,0]
    for(const [i,[x1,y1,v1]] of min.entries()){
        for(const [j,[x2,y2,v2]] of max.entries()){
            for(const [k,[xt,yt,ct]] of trucks.entries()){
                if(ct.length) continue
                if(disAlreadyTrucks.includes(k)) continue
                const length = getLength(xt,yt,x2,y2) + getLength(x2,y2,x1,y1)
                if(minMove > length){
                    minMove = length, minI = i, maxI = j, truckI = k
                }
            }
        }
    }
    return {truckI,maxI,minI}
}

const getLength = (x1,y1,x2,y2) => {
    return Math.abs(x2 - x1) + Math.abs(y2 - y1)
}

const makeCommand = (x1,y1,x2,y2) => {
    const command = []
    const H = x2 - x1
    if(H > 0){
        for(let i = 0; i < H; i++){
            command.push(3)
        }
    }else{
        for(let i = 0; i < -H; i++){
            command.push(1)
        }
    }
    const W = y2 - y1
    if(W > 0){
        for(let i = 0; i < W; i++){
            command.push(2)
        }
    }else{
        for(let i = 0; i < -W; i++){
            command.push(4)
        }
    }
    return command
}

/* 
운행시간 : 12시간 > 720분
이동시간 : 100m / 6s
자전거 싣는 / 내리는 시간: 6s
최대 20대
대여요청은 순차적으로 실행
명령은 10개까지 가능
0 가만히
1 상 2 우 3 하 4 좌 5 상차 6 하차
"commands": [{ "truck_id": 0, "command": [2, 5, 4, 1, 6] }]
*/
const main1 = async () => {
    const AUTH_KEY_1 = (await createStart(1)).auth_key
    const HEADER_PROBLEM_1 = {headers:{'Authorization':AUTH_KEY_1}}

    const truck = [4,0,[]]
    const trucks = new Array(5).fill().map(()=>[...truck])
    let {time} = await updateSimulate(HEADER_PROBLEM_1,[])
    while(time <= 720){
        let {locations} = (await getLocations(HEADER_PROBLEM_1))
        let {table,max,min,avg} = makeTableData(locations,5)
        while(!(min.length && max.length)){
            time = (await updateSimulate(HEADER_PROBLEM_1,[])).time
            locations = (await getLocations(HEADER_PROBLEM_1)).locations
            const T = makeTableData(locations,5)
            table = T.table, max = T.max, min = T.min, avg = T.avg
        }
        min.sort((a,b) => a[2] - b[2])
        max.sort((a,b) => b[2] - a[2])
        const disAlreadyTrucks = []
        const commands = []
        while(min.length && max.length && disAlreadyTrucks.length !== 5){
            const {truckI,maxI,minI} = getMinMoveTruckFor(trucks,min,max,disAlreadyTrucks)
            if(truckI === -1) break
            disAlreadyTrucks.push(truckI)
            const [xt,yt,ct] = trucks[truckI]
            const [x1,y1,v1] = max[maxI]
            const [x2,y2,v2] = min[minI]
            const bikes = Math.min(v1-avg,avg-v2,20)
            const moveToMax = makeCommand(xt,yt,x1,y1)
            for(let i = 0; i < bikes; i++) {moveToMax.push(5)}
            const movetoMin = makeCommand(x1,y1,x2,y2)
            for(let i = 0; i < bikes; i++) {movetoMin.push(6)}
            const command = ct.concat(moveToMax).concat(movetoMin)
            if(command.length > 10){
                trucks[truckI] = [x2,y2,command.slice(10)]
                commands.push({ truck_id: truckI, command: command.slice(0,10) })
            }else{
                trucks[truckI] = [x2,y2,[]]
                commands.push({ truck_id: truckI, command: command })
            }
            min.splice(minI,1)
            max.splice(maxI,1)
        }
        trucks.forEach(([x,y,command],i) => {
            if (commands.filter(v => v.truck_id === i).length === 0){
                if(command.length > 10){
                    trucks[i] = [x,y,command.slice(10)]
                    commands.push({ truck_id: i, command: command.slice(0,10) })
                }else{
                    trucks[i] = [x,y,[]]
                    commands.push({ truck_id: i, command: command })
                }
            }
        })
        time = (await updateSimulate(HEADER_PROBLEM_1,commands)).time
    }
    
    const {score} = await getScore(HEADER_PROBLEM_1)
    return score
}

const main2 = async () => {
    const AUTH_KEY_2 = (await createStart(2)).auth_key
    const HEADER_PROBLEM_2 = {headers:{'Authorization':AUTH_KEY_2}}

    const truck = [59,0,[]]
    const trucks = new Array(10).fill().map(()=>[...truck])
    let {time} = await updateSimulate(HEADER_PROBLEM_2,[])
    let peakReq = new Array(60).fill().map(() => new Array(60).fill(0))
    let peakRes = new Array(60).fill().map(() => new Array(60).fill(0))
    let before = new Array(60).fill().map(() => new Array(60).fill(3))
    while(time <= 30){
        let {locations} = (await getLocations(HEADER_PROBLEM_2))
        let tableData = makeTableDataV2(locations,60,peakReq,peakRes,before)
        before = tableData.table
        peakReq = tableData.peakReq
        peakRes = tableData.peakRes
        
        let {table,max,min,avg} = makeTableData(locations,60)
        while(!(min.length && max.length)){
            time = (await updateSimulate(HEADER_PROBLEM_2,[])).time
            locations = (await getLocations(HEADER_PROBLEM_2)).locations
            const T = makeTableData(locations,60)
            table = T.table, max = T.max, min = T.min, avg = T.avg
        }
        min.sort((a,b) => a[2] - b[2])
        max.sort((a,b) => b[2] - a[2])
        const disAlreadyTrucks = []
        const commands = []
        while(min.length && max.length && disAlreadyTrucks.length !== 10){
            const {truckI,maxI,minI} = getMinMoveTruckFor(trucks,min,max,disAlreadyTrucks)
            if(truckI === -1) break
            disAlreadyTrucks.push(truckI)
            const [xt,yt,ct] = trucks[truckI]
            const [x1,y1,v1] = max[maxI]
            const [x2,y2,v2] = min[minI]
            const bikes = Math.min(v1-avg,avg-v2,20)
            const moveToMax = makeCommand(xt,yt,x1,y1)
            for(let i = 0; i < bikes; i++) {moveToMax.push(5)}
            const movetoMin = makeCommand(x1,y1,x2,y2)
            for(let i = 0; i < bikes; i++) {movetoMin.push(6)}
            const command = ct.concat(moveToMax).concat(movetoMin)
            if(command.length > 10){
                trucks[truckI] = [x2,y2,command.slice(10)]
                commands.push({ truck_id: truckI, command: command.slice(0,10) })
            }else{
                trucks[truckI] = [x2,y2,[]]
                commands.push({ truck_id: truckI, command: command })
            }
            min.splice(minI,1)
            max.splice(maxI,1)
        }
        trucks.forEach(([x,y,command],i) => {
            if (commands.filter(v => v.truck_id === i).length === 0){
                if(command.length > 10){
                    trucks[i] = [x,y,command.slice(10)]
                    commands.push({ truck_id: i, command: command.slice(0,10) })
                }else{
                    trucks[i] = [x,y,[]]
                    commands.push({ truck_id: i, command: command })
                }
            }
        })
        time = (await updateSimulate(HEADER_PROBLEM_2,commands)).time
    }
    let maxReq = 0
    let reqSum = 0
    peakReq.forEach((Q) => Q.forEach((q) => {
        if(maxReq < q) maxReq = q
        reqSum += q
    }))
    let maxRes = 0
    let resSum = 0
    peakRes.forEach((S) => S.forEach((s) => {
        if(maxRes < s) maxRes = s
        resSum += s
    }))
    reqSum /= 60**2
    resSum /= 60**2
    console.log({maxReq,maxRes,reqSum,resSum})
    const {score} = await getScore(HEADER_PROBLEM_2)
    return score
}

// const score1 = await main1()
const score2 = await main2()

console.log('my score: ', score2)