from flask import Flask, jsonify, request
from flask_cors import CORS

# Create Flask app
app = Flask(__name__)

# Enable CORS for all routes and origins
CORS(app)

# Example route
@app.route("/api/data", methods=["GET", "POST"])
def get_data():
    if request.method == "POST":
        try:
            data = request.get_json(force=True)
            return jsonify({"status": "success", "received": data}), 201
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)}), 400
    return jsonify({"message": "Hello from Flask with CORS!"})

if __name__ == "__main__":
    # Run the app
    app.run(debug=True)
