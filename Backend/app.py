from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import tensorflow as tf
from PIL import Image
import io
import os
import requests

app = FastAPI()

# Enable CORS to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to your frontend URL if needed
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Model Download Configuration
MODEL_URL = "https://github.com/Om1603/Fake-Off-A-Deepfake-detector/releases/download/v1/deepfake_model.h5"
MODEL_PATH = "models/deepfake_model.h5"

# Ensure the 'models' directory exists
os.makedirs("models", exist_ok=True)

# Download model if not already present
if not os.path.exists(MODEL_PATH):
    print("Downloading model...")
    response = requests.get(MODEL_URL, stream=True)
    with open(MODEL_PATH, "wb") as file:
        for chunk in response.iter_content(chunk_size=1024):
            file.write(chunk)
    print("Model downloaded.")

# Load the model once at startup
try:
    model = tf.keras.models.load_model(MODEL_PATH)
    print("Model loaded successfully.")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None  # Set model to None if it fails to load

@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    if model is None:
        return {"error": "Model not loaded properly. Please check the logs."}

    try:
        # Read and preprocess image
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")
        
        # Resize to match the model's expected input
        image = image.resize((224, 224))  # Update based on model.input_shape

        # Convert image to NumPy array and normalize
        img_array = np.array(image) / 255.0
        img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension

        # Predict
        prediction = model.predict(img_array).flatten()[0]
        
        # Return response
        return {"deepfake_score": float(prediction), "label": "Deepfake" if prediction > 0.5 else "Real"}

    except Exception as e:
        return {"error": str(e)}
