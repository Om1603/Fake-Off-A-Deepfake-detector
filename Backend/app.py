from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import tensorflow as tf
from PIL import Image
import io

app = FastAPI()

# Enable CORS to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to your frontend URL if needed
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Load the trained model
model = tf.keras.models.load_model("models/deepfake_model.h5")  # Update path

@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
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
