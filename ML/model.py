from flask import Flask, request, jsonify
import requests
import pandas as pd
from geopy.distance import geodesic

app = Flask(__name__)

API_URL = 'http://localhost:5000/api/products/'

# Simulating user storage
user_location = {}

def fetch_product_data(api_url):
    response = requests.get(api_url)
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"Error fetching data: {response.status_code}")

def get_nearby_products(user_lat, user_lng, products, radius_km=25):
    df = pd.DataFrame(products)
    df = df.dropna(subset=['product_lat', 'product_lng'])
    nearby_products = []

    for _, row in df.iterrows():
        product_lat = row['product_lat']
        product_lng = row['product_lng']
        distance = geodesic((user_lat, user_lng), (product_lat, product_lng)).km

        if distance <= radius_km:
            nearby_products.append(row)

    return pd.DataFrame(nearby_products)

@app.route('/nearby-products', methods=['GET'])
def nearby_products():
    user_id = request.args.get('user_id')
    radius = float(request.args.get('radius', 25))  # default to 25 km if not provided

    # Get user location
    user_loc = user_location.get(user_id)
    if not user_loc:
        return jsonify({"error": "User location not found"}), 404

    user_lat = user_loc['lat']
    user_lng = user_loc['lng']

    # Fetch data from the external API
    products = fetch_product_data(API_URL)

    # Get nearby products
    nearby_df = get_nearby_products(user_lat, user_lng, products, radius)
    return jsonify(nearby_df.to_dict(orient='records'))

@app.route('/update-location', methods=['POST'])
def update_location():
    user_id = request.json.get('user_id')
    lat = request.json.get('lat')
    lng = request.json.get('lng')

    if not user_id or lat is None or lng is None:
        return jsonify({"error": "Invalid input"}), 400

    updated_location = update_user_location(user_id, lat, lng)
    return jsonify(updated_location)

if __name__ == '__main__':
    app.run(port=5001)  # Use a different port to avoid conflict with the existing API
