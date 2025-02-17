from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import tensorflow as tf
import cv2
import io
import tempfile
from moviepy import VideoFileClip
from PIL import Image

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

def extract_frames(video_path, frame_interval=1):
    """
    Extract frames from the video at regular intervals.
    :param video_path: Path to the uploaded video.
    :param frame_interval: Extract every nth frame.
    :return: List of frames as NumPy arrays.
    """
    frames = []
    clip = VideoFileClip(video_path)

    # Extract frames at regular intervals
    for t in range(0, int(clip.duration), frame_interval):
        frame = clip.get_frame(t)
        frame = cv2.cvtColor(frame, cv2.COLOR_RGB2BGR)  # Convert to OpenCV format
        frame = cv2.resize(frame, (224, 224))  # Resize to model's expected size
        frames.append(frame / 255.0)  # Normalize pixels

        # Debugging: print the frame shape
        print(f"Extracted frame at {t} seconds with shape: {frame.shape}")

    clip.close()
    return np.array(frames)

@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    try:
        # Save the uploaded video to a temporary file
        with tempfile.NamedTemporaryFile(delete=False, suffix=".mp4") as temp_video:
            temp_video.write(await file.read())
            temp_video_path = temp_video.name

        # Extract frames from the video
        frames = extract_frames(temp_video_path)

        if len(frames) == 0:
            return {"error": "No valid frames extracted from the video."}

        # Predict on extracted frames
        try:
            predictions = model.predict(frames)
        except Exception as e:
            return {"error": f"Prediction failed: {str(e)}"}

        # Average prediction score across frames
        avg_score = np.mean(predictions)
        label = "Deepfake" if avg_score > 0.5 else "Real"

        return {"deepfake_score": float(avg_score), "label": label}

    except Exception as e:
        return {"error": f"An error occurred: {str(e)}"}
