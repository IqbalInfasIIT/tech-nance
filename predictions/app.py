from flask import Flask, request, jsonify
import pandas as pd

app = Flask(__name__)

@app.route('/sort', methods=['POST'])
def sort_transactions():
    data = request.json
    df = pd.DataFrame(data)
    sorted_df = df.sort_values(by='amount')
    return jsonify(sorted_df.to_dict(orient='records'))

if __name__ == '__main__':
    app.run(debug=True, port=5000)
