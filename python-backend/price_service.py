from flask import Flask, jsonify
from flask_cors import CORS
from flask_caching import Cache
import requests

app = Flask(__name__)
CORS(app)

# Configure the cache
cache = Cache(app, config={'CACHE_TYPE': 'simple'})  # In-memory caching

def fetch_prices():
    try:
        # Using DeBank API to fetch price data
        response = requests.get("https://api.debank.com/v1/protocols")
        response.raise_for_status()  # Raise an error for bad responses
        data = response.json()

        # Extract ETH and BNB prices from the data
        prices = {}
        for item in data['data']:
            if item['id'] == 'ethereum':
                prices['ETH'] = item['price']
            elif item['id'] == 'binancecoin':
                prices['BNB'] = item['price']

        return prices
    except Exception as e:
        return {"error": str(e)}

@cache.cached(timeout=300)  # Cache for 5 minutes (300 seconds)
@app.route("/prices", methods=["GET"])
def get_prices():
    prices = fetch_prices()
    return jsonify(prices)

if __name__ == "__main__":
    app.run(port=5005)  # Run the Python service on port 5005

