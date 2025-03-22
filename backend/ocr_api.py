from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import cv2
import pytesseract
from PIL import Image
import numpy as np
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Path to Tesseract executable (Update this if Tesseract is not in PATH)
pytesseract.pytesseract.tesseract_cmd = r'C:/Program Files/Tesseract-OCR/tesseract.exe'

def preprocess_image(image):
    """Preprocess the image for better OCR results."""
    # Convert to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    # Apply thresholding
    _, binary = cv2.threshold(gray, 128, 255, cv2.THRESH_BINARY | cv2.THRESH_OTSU)
    return binary

@app.route('/upload', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400

    try:
        # Read the image file
        image = Image.open(file.stream)
        image = np.array(image)  # Convert PIL image to NumPy array
        image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)  # Convert RGB to BGR for OpenCV

        # Preprocess the image
        processed_image = preprocess_image(image)

        # Perform OCR
        extracted_text = pytesseract.image_to_string(processed_image)

        return jsonify({"text": extracted_text}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)