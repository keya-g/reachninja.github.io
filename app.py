from flask import Flask
from flask import send_file
from flask import request
from flask import url_for
from flask import render_template, redirect
import json

app = Flask(__name__)

@app.route('/')
def hello():
    return render_template('mouse_game.html')


@app.route('/get_data', methods=['POST'])
def get_data():
    data = request.get_json(silent=True)
    # print(data)
    # print(data['logname'])
    filename = data['logname'];
    with open(f'{filename}.txt', "w") as test:
        test.write(str(data['logdata']))
    return {"Success":True}

@app.route('/send_gameparam', methods=['POST'])
def send_gameparam():
    data = request.get_json(silent = True)
    pid = str(data['player_no'])
    print(pid)
    num = str(data['attempt'])
    
    data = json.load(open(f'JSONFiles/Player_{pid}/GameParams.json','r'))
    return data[num]

@app.route('/send_gameseeds', methods=['POST'])
def send_gameseeds():
    data = request.get_json(silent = True)
    pid = str(data['player_no'])
    print(pid)
    num = str(data['attempt'])
    
    data = json.load(open(f'JSONFiles/Player_{pid}/GameSeeds_{num}.json','r'))
    return data