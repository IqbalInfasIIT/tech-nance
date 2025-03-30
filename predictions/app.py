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
        if len(category_data) < 5:
            predictions.append({
                'category_id': category_data[0].get('category_id', None) if category_data else None,
                'predicted_amount': 'Insufficient data (needs at least 5 months)'
            })
            continue
        df = pd.DataFrame(category_data)
        df = df[df['total_amount'] != 0]
        if df.empty:
            predictions.append({
                'category_id': category_data[0]['category_id'],
                'predicted_amount': 'No data after zero removal'
            })
            continue
        df['year_month'] = pd.to_datetime(df['year_month'], format='%Y%m')
        df = df.sort_values(by='year_month').set_index('year_month')
        try:
            forecast = auto_arima(df['total_amount']).predict(n_periods=1)[0]
            predictions.append({
                'category_id': category_data[0]['category_id'],
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
