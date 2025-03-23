from flask import Flask, request, jsonify
import pandas as pd
import warnings
from pmdarima import auto_arima

warnings.simplefilter(action='ignore', category=UserWarning)
warnings.simplefilter(action='ignore', category=FutureWarning)

app = Flask(__name__)
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    category_monthly_totals = data.get('categoryMonthlyTotals', [])
    predictions = []

    for category_data in category_monthly_totals:
        if not category_data:
            continue

        if len(category_data) == 1:
            category_id = category_data[0].get('category_id', None)
            predictions.append({
                'category_id': category_id,
                'predicted_amount': 'N/A'
            })
            continue

        category_data = [item for item in category_data if item['total_amount'] != 0]
        if not category_data:
            predictions.append({
                'category_id': category_data[0]['category_id'],
                'predicted_amount': 'No data after zero removal'
            })
            continue
        
        df = pd.DataFrame(category_data)
        df['year_month'] = pd.to_datetime(df['year_month'], format='%Y%m')
        df = df.sort_values(by='year_month')
        df.set_index('year_month', inplace=True)
        try:
            time_series = df['total_amount']
            model = auto_arima(time_series, seasonal=False, stepwise=True, suppress_warnings=True)
            forecast = model.predict(n_periods=1)[0]
            category_id = category_data[0]['category_id']
            predictions.append({
                'category_id': category_id,
                'predicted_amount': round(forecast, 2)
            })
        except Exception as e:
            print(f"Error processing category {category_data[0]['category_id']}: {e}")
            predictions.append({
                'category_id': category_data[0]['category_id'],
                'predicted_amount': 'Error'
            })
    return jsonify(predictions)

if __name__ == '__main__':
    app.run(debug=True, port=5000)