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

const makeTable = (locations,size) => {
    const bikeTable = new Array(size).fill().map(()=>new Array(size).fill())
    let sum = 0
    const min = []
    const max = []
    locations.forEach(({id,located_bikes_count}) => {
        const x = Math.floor(id / size)
        const y = id - x*size
        bikeTable[x][y] = located_bikes_count
        sum += located_bikes_count
    })
    const avg = sum / (size ** 2)
    for(let x = 0; x < size; x++){
        for(let y = 0; y < size; y++){
            if(bikeTable[x][y] < avg - 1) min.push([x,y,bikeTable[x][y]])
            else if(bikeTable[x][y] > avg) max.push([x,y,bikeTable[x][y]])
        }
    }
    return [bikeTable,max,min,Math.ceil(avg)]
}

const makeCommand = (oldX,oldY,newX,newY) => {
    const command = []
    const H = newX - oldX
    if(H > 0){
        for(let i = 0; i < H; i++){
            command.push(2)
        }
    }else{
        for(let i = H; i < 0; i++){
            command.push(4)
        }
    }
    const W = newY - oldY
    if(W > 0){
        for(let i = 0; i < W; i++){
            command.push(1)
        }
    }else{
        for(let i = W; i < 0; i++){
            command.push(3)
        }
    }
    return command
}

const findMinMoveTruckFor = (max,min,trucks,avg,usingTrucks) => {
    let minDistance = Infinity
    let command = []
    let truckIdx = 0
    let maxIdx = 0
    let minIdx = 0
    trucks.forEach(([tx,ty,stays],i) => {
        if(!stays.length && !usingTrucks.includes(i)){
            max.forEach(([maxx,maxy,bikes],j) => {
                min.forEach(([minx,miny],k) => {
                    const move = Math.abs(maxx-tx) + Math.abs(maxy-ty) + Math.abs(maxx-minx) + Math.abs(maxy-miny)
                    if(move < minDistance){
                        minDistance = move
                        const b = bikes - avg
                        const moveToMax = makeCommand(tx,ty,maxx,maxy)
                        const getBikes = new Array(b).fill(5)
                        const moveToMin = makeCommand(maxx,maxy,minx,miny)
                        const setBikes = new Array(b).fill(6)
                        command = moveToMax.concat(getBikes).concat(moveToMin).concat(setBikes)
                        truckIdx = i
                        maxIdx = j
                        minIdx = k
                    }
                })
            })
        }
    })
    return {command,truckIdx,maxIdx,minIdx}
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
    let tableData = makeTable(locations,5)
    let [bikeTable,max,min,avg] = tableData
    const truckTable = [[0,0,[]],[0,0,[]],[0,0,[]],[0,0,[]],[0,0,[]]]
    let time = 0
    while(time <= 720){
        while(min.length === 0){
            time = (await updateSimulate(HEADER_PROBLEM_1,[])).time
            locations = (await getLocations(HEADER_PROBLEM_1)).locations
            tableData = makeTable(locations,5)
            bikeTable = tableData[0]
            max = tableData[1]
            min = tableData[2]
            avg = tableData[3]
        }
        console.log(bikeTable)
        let commands = []
        truckTable.forEach(([,,command],truckIdx) => {
            if(command.length === 0){}
            else{
                if(command.length < 10){
                    commands.push({
                        truck_id:truckIdx,
                        command:command
                    })
                }else {
                    truckTable[truckIdx][2] = command.slice(10)
                    commands.push({
                        truck_id:truckIdx,
                        command:command.slice(0,10)
                    })
                }
            }
        })
        const usingTrucks = []
        while(min.length){
            let tCheck = false
            truckTable.forEach(([,,command],truckIdx) => {
                if(command.length === 0) tCheck = true
            })
            if(!tCheck) break
            if(usingTrucks.length === 5) break
            let {command,truckIdx,maxIdx,minIdx} = findMinMoveTruckFor(max,min,truckTable,avg,usingTrucks)
            usingTrucks.push(truckIdx)
            if(command.length < 10){
                truckTable[truckIdx] = min[minIdx].slice(0,2).concat([[]])
                commands.push({
                    truck_id:truckIdx,
                    command:command
                })
            }else{
                truckTable[truckIdx] = min[minIdx].slice(0,2).concat([command.slice(10)])
                commands.push({
                    truck_id:truckIdx,
                    command:command.slice(0,10)
                })
            }
            max.splice(maxIdx,1)
            min.splice(minIdx,1)
        }
        time = (await updateSimulate(HEADER_PROBLEM_1,commands)).time
        commands = []
    }
    
    const {score} = await getScore(HEADER_PROBLEM_1)
    console.log(score)
}

await main1()