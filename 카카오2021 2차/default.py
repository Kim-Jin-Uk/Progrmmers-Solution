import requests
from collections import deque
from operator import itemgetter

base_url = "https://kox947ka1a.execute-api.ap-northeast-2.amazonaws.com/prod/users"
x_auth_token = "b453dff9db67d352bad3bbe06432ce7d"

def start(problem):
    fun_url = base_url + "/start"
    return requests.post(fun_url, headers={"X-Auth-Token" : x_auth_token}, json={"problem":problem}).json()

def locations(auth_key):
    fun_url = base_url + "/locations"
    return requests.get(fun_url, headers={"Authorization":auth_key}).json()

def trucks(auth_key):
    fun_url = base_url + "/trucks"
    return requests.get(fun_url, headers={"Authorization":auth_key}).json()

def simulate(auth_key, commands):
    fun_url = base_url + "/simulate"
    return requests.put(fun_url, headers={"Authorization":auth_key}, json={"commands":commands})

def score(auth_key):
    fun_url = base_url + "/score"
    return requests.get(fun_url, headers={"Authorization":auth_key}).json()

def cal_distance(id1, id2):
    id1_x = id1//5
    id1_y = id1%5
    id2_x = id2//5
    id2_y = id2%5
    cal_x = 0
    if id1_x>id2_x:
        cal_x = id1_x - id2_x
    else:
        cal_x = id2_x - id1_x
    cal_y = 0
    if id1_y>id2_y:
        cal_y = id1_y - id2_y
    else:
        cal_y = id2_y - id1_y
    return cal_x + cal_y


if __name__ == "__main__":
    start_res = start(2)

    auth_key = start_res["auth_key"]
    print(auth_key)

    # for loc in locations_res["locations"]:
    #     print("id = " + str(loc["id"]) + ", located_bikes_count = " + str(loc["located_bikes_count"]))

    # print()

    # for tru in trucks_res["trucks"]:
    #     print("id = " + str(tru["id"]) + ", location_id = " + str(tru["location_id"]) + ", loaded_bikes_count = " + str(tru["loaded_bikes_count"]))

    


    # comm = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    # for i in trucks_res["trucks"]:
    #     truck_commands.append(dict(truck_id=i["id"], command=comm))
    
    if start_res["problem"] == 1:
        for simul in range(720):
            print(simul)
            locations_res = locations(auth_key)
            trucks_res = trucks(auth_key)
            truck_commands = []
            if (simul % 2 == 0):
                custom_location = [[0]* 25 for i in range(5)]
                # locations_sorted = sorted(locations_res["locations"], key=itemgetter("located_bikes_count", "id"), reverse=True)
                for i in range(5):
                    for j in range(25):
                        custom_location[i][j] = dict(id=locations_res["locations"][j]["id"], located_bikes_count=locations_res["locations"][j]["located_bikes_count"], distan=-1 * cal_distance(trucks_res["trucks"][i]["location_id"], locations_res["locations"][j]["id"]))
                
                
                bo = [False] * 25
                for i in range(5):
                    locations_sorted = sorted(custom_location[i], key=itemgetter("located_bikes_count", "distan", "id"), reverse=True)
                    goal_id = -1
                    for j in locations_sorted:
                        if bo[j["id"]] == False:
                            goal_id = j["id"]
                            bo[goal_id] = True
                            break
                    comm = []
                    goal_x = goal_id // 5
                    goal_y = goal_id % 5

                    start_x = trucks_res["trucks"][i]["location_id"] // 5
                    start_y = trucks_res["trucks"][i]["location_id"] % 5

                    if start_x < goal_x:
                        for j in range(goal_x - start_x):
                            comm.append(2)
                    elif start_x > goal_x:
                        for j in range(start_x - goal_x):
                            comm.append(4)

                    if start_y < goal_y:
                        for j in range(goal_y - start_y):
                            comm.append(1)
                    elif start_y > goal_y:
                        for j in range(start_y - goal_y):
                            comm.append(3)
                    
                    comm.append(5)
                    truck_commands.append(dict(truck_id=trucks_res["trucks"][i]["id"], command=comm))
            else:
                # locations_sorted = sorted(locations_res["locations"], key=itemgetter("located_bikes_count", "id"))
                custom_location = [[0]* 25 for i in range(5)]
                for i in range(5):
                    for j in range(25):
                        custom_location[i][j] = dict(id=locations_res["locations"][j]["id"], located_bikes_count=locations_res["locations"][j]["located_bikes_count"], distan=cal_distance(trucks_res["trucks"][i]["location_id"], locations_res["locations"][j]["id"]))
                
                bo = [False] * 25
                for i in range(5):
                    locations_sorted = sorted(custom_location[i], key=itemgetter("located_bikes_count", "distan", "id"))
                    goal_id = -1
                    for j in locations_sorted:
                        if bo[j["id"]] == False:
                            goal_id = j["id"]
                            bo[goal_id] = True
                            break
                    comm = []
                    goal_x = goal_id // 5
                    goal_y = goal_id % 5

                    start_x = trucks_res["trucks"][i]["location_id"] // 5
                    start_y = trucks_res["trucks"][i]["location_id"] % 5

                    if start_x < goal_x:
                        for j in range(goal_x - start_x):
                            comm.append(2)
                    elif start_x > goal_x:
                        for j in range(start_x - goal_x):
                            comm.append(4)

                    if start_y < goal_y:
                        for j in range(goal_y - start_y):
                            comm.append(1)
                    elif start_y > goal_y:
                        for j in range(start_y - goal_y):
                            comm.append(3)
                    
                    comm.append(6)
                    truck_commands.append(dict(truck_id=trucks_res["trucks"][i]["id"], command=comm))
            simulate(auth_key, truck_commands)
    else:
        for simul in range(720):
            locations_res = locations(auth_key)
            trucks_res = trucks(auth_key)
            truck_commands = []
            if (simul % 2 == 0):
                locations_sorted = sorted(locations_res["locations"], key=itemgetter("located_bikes_count", "id"), reverse=True)
                for i in range(10):
                    comm = []
                    goal_x = locations_sorted[i]["id"] // 60
                    goal_y = locations_sorted[i]["id"] % 60

                    start_x = trucks_res["trucks"][i]["location_id"] // 60
                    start_y = trucks_res["trucks"][i]["location_id"] % 60

                    if start_x < goal_x:
                        for j in range(goal_x - start_x):
                            comm.append(2)
                    elif start_x > goal_x:
                        for j in range(start_x - goal_x):
                            comm.append(4)

                    if start_y < goal_y:
                        for j in range(goal_y - start_y):
                            comm.append(1)
                    elif start_y > goal_y:
                        for j in range(start_y - goal_y):
                            comm.append(3)
                    
                    comm.append(5)
                    truck_commands.append(dict(truck_id=trucks_res["trucks"][i]["id"], command=comm))
            else:
                locations_sorted = sorted(locations_res["locations"], key=itemgetter("located_bikes_count", "id"))
                for i in range(10):
                    comm = []
                    goal_x = locations_sorted[i]["id"] // 60
                    goal_y = locations_sorted[i]["id"] % 60

                    start_x = trucks_res["trucks"][i]["location_id"] // 60
                    start_y = trucks_res["trucks"][i]["location_id"] % 60

                    if start_x < goal_x:
                        for j in range(goal_x - start_x):
                            comm.append(2)
                    elif start_x > goal_x:
                        for j in range(start_x - goal_x):
                            comm.append(4)

                    if start_y < goal_y:
                        for j in range(goal_y - start_y):
                            comm.append(1)
                    elif start_y > goal_y:
                        for j in range(start_y - goal_y):
                            comm.append(3)
                    
                    comm.append(6)
                    truck_commands.append(dict(truck_id=trucks_res["trucks"][i]["id"], command=comm))
            simulate(auth_key, truck_commands)

    score_res = score(auth_key)
    

    print("내 점수는? : " + str(score_res["score"]))
