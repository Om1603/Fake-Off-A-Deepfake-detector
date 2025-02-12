mkdir frontend
cd frontend
npx create-react-app .
npm install react-dropzone framer-motion @shadcn/ui lucide-react

# Create necessary directories
mkdir src/components src/pages

# Remove unnecessary files
rm src/App.css src/logo.svg src/App.test.js src/setupTests.js

# Create main files
cat <<EOT > src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
EOT

cat <<EOT > src/App.js
import UploadPage from './pages/UploadPage';

function App() {
  return (
    <div className="App">
      <UploadPage />
    </div>
  );
}

export default App;
EOT

cat <<EOT > src/pages/UploadPage.js
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { UploadCloud } from "lucide-react";

export default function UploadPage() {
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "video/*, image/*",
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles);
      simulateUpload();
    },
  });

  const simulateUpload = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) clearInterval(interval);
    }, 300);
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-6 bg-gray-100 dark:bg-gray-900">
      <header className="w-full py-4 text-center bg-gradient-to-r from-purple-600 to-blue-500 text-white text-2xl font-bold shadow-md">
        Fake-Off: A Deepfake Detection Tool
      </header>

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="w-full max-w-lg p-6 text-center bg-white dark:bg-gray-800 shadow-lg rounded-2xl">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Upload Your Media</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">Drop a video or image file to analyze for deepfakes.</p>
          <div {...getRootProps()} className="p-6 border-2 border-dashed rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
            <input {...getInputProps()} />
            <UploadCloud className="w-12 h-12 mx-auto text-gray-500 dark:text-gray-400" />
            <p className="mt-3 text-gray-600 dark:text-gray-300">Drag & drop files here or click to upload</p>
          </div>
          {files.length > 0 && (
            <CardContent className="mt-4">
              <p className="text-lg font-semibold">Uploading {files[0].name}...</p>
              <Progress value={uploadProgress} className="mt-2" />
            </CardContent>
          )}
          <Button className="mt-4 w-full">Upload</Button>
        </Card>
      </motion.div>
      <footer className="w-full py-3 text-center text-gray-500 text-sm">&copy; 2025 Fake-Off. All rights reserved.</footer>
    </div>
  );
}
EOT

# Final message
echo "Frontend setup complete. Run 'npm start' inside the frontend folder to start development."
