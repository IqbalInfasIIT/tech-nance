from flask import Flask, request, jsonify
import pandas as pd
import warnings
from pmdarima import auto_arima

# Suppress warnings
warnings.simplefilter(action='ignore', category=UserWarning)
warnings.simplefilter(action='ignore', category=FutureWarning)

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    category_monthly_totals = data.get('categoryMonthlyTotals', [])

    predictions = []

    for category_data in category_monthly_totals:
        if not category_data:  # Handle empty category data
            continue
        
        # Convert data into a DataFrame
        df = pd.DataFrame(category_data)
        df['year_month'] = pd.to_datetime(df['year_month'], format='%Y%m')

        # Ensure chronological order (oldest to latest)
        df = df.sort_values(by='year_month')
        df.set_index('year_month', inplace=True)

        try:
            # Use Auto ARIMA to find the best model automatically
            model = auto_arima(df['total_amount'], seasonal=False, stepwise=True, suppress_warnings=True)

            # Predict the next month's value
            forecast = model.predict(n_periods=1)[0]

            # Append the prediction result
            category_id = category_data[0]['category_id']
            predictions.append({
                'category_id': category_id,
                'predicted_amount': round(forecast, 2)
            })
        except Exception as e:
            print(f"Error processing category {category_data[0]['category_id']}: {e}")
    print(predictions)
    return jsonify(predictions)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
