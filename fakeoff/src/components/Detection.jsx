import React, { useState } from 'react';
import '../styles/Detection.css';

const Detection = () => {
    const [result, setResult] = useState('');

    const uploadImage = async () => {
        const input = document.getElementById("imageInput");
        if (input.files.length === 0) {
            alert("Please select an image first.");
            return;
        }

        const formData = new FormData();
        formData.append("file", input.files[0]);

        try {
            const response = await fetch("http://127.0.0.1:8000/predict/", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            setResult(`Prediction: ${data.label} (Score: ${data.deepfake_score})`);
        } catch (error) {
            setResult("Error in prediction.");
        }
    };

    return (
        <section id="detection" className="detection">
            <div className="container">
                <h2 className="animate__animated animate__fadeIn">Deepfake Detection</h2>
                <p className="animate__animated animate__fadeIn animate__delay-1s">Upload an image to check if it's a deepfake.</p>
                <div className="detection-box animate__animated animate__fadeIn animate__delay-2s">
                    <input type="file" id="imageInput" accept="image/*" />
                    <button onClick={uploadImage} className="btn">Detect</button>
                </div>
                <p id="result" className="animate__animated animate__fadeIn animate__delay-3s">{result}</p>
            </div>
        </section>
    );
};

export default Detection;