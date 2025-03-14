from flask import Flask, request, jsonify
import pandas as pd
from statsmodels.tsa.arima.model import ARIMA

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    category_monthly_totals = data['categoryMonthlyTotals']

    predictions = []

    for category_data in category_monthly_totals:
        print(category_data)
        # Extract amounts and convert to a DataFrame
        amounts = [item['total_amount'] for item in category_data]
        months = [item['year_month'] for item in category_data]
        df = pd.DataFrame({
            'year_month': months,
            'total_amount': amounts
        })
        df['year_month'] = pd.to_datetime(df['year_month'], format='%Y%m')
        df.set_index('year_month', inplace=True)

        # Fit ARIMA(1,1,1) Model
        model = ARIMA(df['total_amount'], order=(1, 1, 1))  # Using ARIMA(1,1,1)
        model_fit = model.fit()

        # Predict the next month's value
        forecast = model_fit.forecast(steps=1).iloc[0]  # Safe way to access the first value

        # Append the prediction result
        category_id = category_data[0]['category_id']
        predictions.append({
            'category_id': category_id,
            'predicted_amount': round(forecast, 2)
        })

    return jsonify(predictions)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
