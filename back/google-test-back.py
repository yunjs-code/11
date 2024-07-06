from flask import Flask, request, jsonify
from flask_cors import CORS
from google.oauth2 import id_token
from google.auth.transport import requests

app = Flask(__name__)
CORS(app, resources={r"/verify_token": {"origins": "http://localhost:3000"}}, supports_credentials=True)

CLIENT_ID = "807052214718-ktlnkpsas66of4fg4koupnhoq3s3dkie.apps.googleusercontent.com"

@app.route('/verify_token', methods=['POST'])
def verify_token():
    token = request.json.get('token')
    if not token:
        app.logger.error("Token not found in request")
        return jsonify({"error": "Token not found"}), 400

    try:
        app.logger.info(f"Received token: {token}")
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), CLIENT_ID)
        app.logger.info("Token verified successfully")

        userid = idinfo['sub']
        response = {
            "message": "Token verified successfully",
            "userid": userid,
            "email": idinfo.get('email'),
            "name": idinfo.get('name'),
            "picture": idinfo.get('picture')
        }
        app.logger.info(f"Response: {response}")
        return jsonify(response)
    except ValueError as e:
        app.logger.error(f"Invalid token: {e}")
        return jsonify({"error": "Invalid token"}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)
