from flask import Flask, request, jsonify
import pandas as pd

app = Flask(__name__)

@app.route('/sort', methods=['POST'])
def sort_transactions():
    try:
        data = request.get_json()
        df = pd.DataFrame(data)

        if 'amount' not in df.columns:
            return jsonify({'error': 'Column "amount" not found in data'}), 400

        sorted_df = df.sort_values(by='amount')
        sorted_data = sorted_df.to_dict(orient='records')
        return jsonify(sorted_data)
    except Exception as e:
        return str(e), 500

if __name__ == '__main__':
    app.run(debug=False)
