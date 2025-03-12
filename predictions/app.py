from flask import Flask, request, jsonify
import numpy as np

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    category_monthly_totals = data['categoryMonthlyTotals']

    predictions = []

    for category_data in category_monthly_totals:
        # Extracting the total amounts for each category (e.g., 3 months of data)
        amounts = [item['total_amount'] for item in category_data]
        
        # Calculate the average for this category
        average_amount = np.mean(amounts)

        # Get the category ID (use the ID of the first entry in the array)
        category_id = category_data[0]['category_id']
        
        # Append the result
        predictions.append({
            'category_id': category_id,
            'predicted_amount': round(average_amount, 2)  # rounding to 2 decimal places
        })

    return jsonify(predictions)

if __name__ == '__main__':
    app.run(debug=True, port=5000)