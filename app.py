from flask import Flask
from flask import send_file
from flask import request
from flask import url_for
from flask import render_template, redirect

app = Flask(__name__)

@app.route('/')
def hello():
    return render_template('mouse_game.html')


@app.route('/get_data', methods=['POST'])
def get_data():
    data = request.get_json(silent=True)
    print(data['logname'])
    filename = data['logname'];
    with open(f'{filename}.txt', "w") as test:
        test.write(str(data['logdata']))
    return {"Success":True}