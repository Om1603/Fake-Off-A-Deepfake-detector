import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import "../styles/Detection.css";

const Detection = () => {
    const [result, setResult] = useState("");
    const [file, setFile] = useState(null);
    const [videoPreview, setVideoPreview] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const [showDetectButton, setShowDetectButton] = useState(true);
    const [showChooseAnotherButton, setShowChooseAnotherButton] = useState(false);
    const fileInputRef = useRef(null);
    const dropAreaRef = useRef(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setVideoPreview(URL.createObjectURL(selectedFile));
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0];
        if (droppedFile) {
            setFile(droppedFile);
            setVideoPreview(URL.createObjectURL(droppedFile));
        }
        dropAreaRef.current.classList.remove("dragover");
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        dropAreaRef.current.classList.add("dragover");
    };

    const handleDragLeave = () => {
        dropAreaRef.current.classList.remove("dragover");
    };

    const uploadVideo = async () => {
        if (!file) {
            alert("Please select a video first.");
            return;
        }

        setIsScanning(true);
        setShowDetectButton(false);
        setResult("");

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("https://api.fakeoff.in/predict/", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            setIsScanning(false);

            const labelColor = data.label === "Real" ? "green" : "red";
            setResult(
                `Your Video Is Likely a <span class="result-label" style="color: ${labelColor};">${data.label}</span> Video `
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
                    <motion.span
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        Deepfake Detection{" "}
                    </motion.span>
                </h2>
                <p className="subtitle">Drag & drop a video or click to upload.</p>
                <div
                    className={`detection-box ${videoPreview ? "has-preview" : ""}`}
                    ref={dropAreaRef}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                >
                    {!videoPreview ? (
                        <>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="video/*"
                                hidden
                            />
                            <button
                                onClick={() => fileInputRef.current.click()}
                                className="upload-btn"
                            >
                                Choose Video
                            </button>
                            <p className="drag-text">or drag & drop here</p>
                        </>
                    ) : (
                        <>
                            <div className="video-container">
                                <video
                                    src={videoPreview}
                                    controls
                                    className="video-preview"
                                />
                                {isScanning && (
                                    <div className="scanning-overlay">
                                        <div className="scanning-line"></div>
                                    </div>
                                )}
                            </div>
                            {showDetectButton && (
                                <button onClick={uploadVideo} className="detect-btn">
                                    {isScanning ? "Scanning..." : "Detect Deepfake"}
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
                                                setVideoPreview(null);
                                                setResult("");
                                                setShowDetectButton(true);
                                                setShowChooseAnotherButton(false);
                                            }}
                                            className="choose-another-btn"
                                        >
                                            Choose Another Video
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
