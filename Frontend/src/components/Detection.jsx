import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion'; // Import motion from framer-motion
import '../styles/Detection.css';

const Detection = () => {
    const [result, setResult] = useState('');
    const [file, setFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const [showDetectButton, setShowDetectButton] = useState(true);
    const [showChooseAnotherButton, setShowChooseAnotherButton] = useState(false);
    const fileInputRef = useRef(null);
    const dropAreaRef = useRef(null);

    const titleText = "Deepfake Detection".split(" "); // Split title into words
    titleText.splice(1, 0, "\u00A0"); // Add a space between "Deepfake" and "Detection"

    const text2 = result.split(" ");

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setImagePreview(URL.createObjectURL(selectedFile));
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0];
        if (droppedFile) {
            setFile(droppedFile);
            setImagePreview(URL.createObjectURL(droppedFile));
        }
        dropAreaRef.current.classList.remove('dragover');
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        dropAreaRef.current.classList.add('dragover');
    };

    const handleDragLeave = () => {
        dropAreaRef.current.classList.remove('dragover');
    };

    const uploadImage = async () => {
        if (!file) {
            alert("Please select an image first.");
            return;
        }

        setIsScanning(true);
        setShowDetectButton(false);
        setResult('');

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("http://127.0.0.1:8000/predict/", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            setIsScanning(false);

            const labelColor = data.label === "Real" ? "green" : "red";
            setResult(
                `Your Picture Is Likely a <span class="result-label" style="color: ${labelColor}; ">${data.label}</span> Image `
            );

            setShowChooseAnotherButton(true);
        } catch (error) {
            console.error("Error in prediction:", error);
            setIsScanning(false);
            setResult("Error in prediction.");
            setShowDetectButton(true);
        }
    };

    return (
        <section id="detection" className="detection">
            <div className="container">
                <h2 className="title">
                    {titleText.map((word, index) => (
                        <motion.span
                            key={index}
                            initial={{ opacity: 0, y: 0 }} // Start hidden and slightly below
                            animate={{ opacity: 1, y: 0 }} // Fade in and move up
                            transition={{
                                duration:1, // Animation duration
                                delay: index / 5, // Delay between words
                            }}
                        >
                            {word}{"  "}
                        </motion.span>
                    ))}
                </h2>
                <p className="subtitle animate-text-delay">
                    Drag & drop an image or click to upload.
                </p>
                <div 
                    className={`detection-box ${imagePreview ? 'has-preview' : ''}`}
                    ref={dropAreaRef}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                >
                    {!imagePreview ? (
                        <>
                            <input 
                                type="file" 
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="image/*"
                                hidden
                            />
                            <button 
                                onClick={() => fileInputRef.current.click()} 
                                className="upload-btn"
                            >
                                Choose Image
                            </button>
                            <p className="drag-text">or drag & drop here</p>
                        </>
                    ) : (
                        <>
                            <div className="image-container">
                                <img src={imagePreview} alt="Preview" className="image-preview" />
                                {isScanning && (
                                    <div className="scanning-overlay">
                                        <div className="scanning-line"></div>
                                    </div>
                                )}
                            </div>
                            {showDetectButton && (
                                <button onClick={uploadImage} className="detect-btn">
                                    {isScanning ? 'Scanning...' : 'Detect Deepfake'}
                                </button>
                            )}
                            {result && (
                                <div className="result-container">
                                    <p 
                                        className="result animate-pop"
                                        dangerouslySetInnerHTML={{ __html: result }}
                                    />
                                    {showChooseAnotherButton && (
                                        <button 
                                            onClick={() => {
                                                setFile(null);
                                                setImagePreview(null);
                                                setResult('');
                                                setShowDetectButton(true);
                                                setShowChooseAnotherButton(false);
                                            }} 
                                            className="choose-another-btn"
                                        >
                                            Choose Another Picture
                                        </button>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Detection;