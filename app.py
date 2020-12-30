from flask import Flask
from flask import send_file
from flask import request
from flask import url_for
from flask import render_template, redirect, request
import json

app = Flask(__name__)

# @app.route('/')
# def hello():
#     return render_template('index.html')
@app.route('/', methods=['GET', 'POST'])
def index():
    print(request.method, 'er')
    if request.method == 'POST':
        # print(request.form)
        player_id = request.form.get('PlayerID')
        player_group = request.form.get('PlayerGroup')
        if request.form.get('mouse_game') == 'mouse_game':
            # print("mouse_game")
            return render_template('mouse_game.html', player_id = player_id, player_group = player_group)
            
        elif  request.form.get('video_game') == 'video_game':
            # pass # do something else
            print("Starting Webcam game")
            return render_template('video_game.html')
        else:
            # pass # unknown
            return render_template("index.html")
    elif request.method == 'GET':
        # return render_template("index.html")
        print("No Post Back Call")
    return render_template("index.html")

def contact():
    if request.method == 'POST':
        if request.form['submit_button'] == 'Mouse_Game':
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