
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  

@app.route('/')
def hello(): 
    return("hello")

@app.route('/submit', methods=['POST'])
def submit():
    data = request.get_json()
    print(data)
    # Process data as needed
    return jsonify({"message": "Data received"}), 200

if __name__ == '__main__':
    app.run(debug=True)


