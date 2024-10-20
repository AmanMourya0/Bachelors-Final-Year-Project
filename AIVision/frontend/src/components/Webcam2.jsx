import React, { useRef, useEffect, useState } from "react";
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';

const App = () => {
  const videoRef = useRef(null);
  const [description, setDescription] = useState("");
  const [model, setModel] = useState(null);

  // Load COCO-SSD model for object detection
  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await cocoSsd.load();
      setModel(loadedModel);
    };
    loadModel();
  }, []);

  // Start video stream
  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch((err) => console.error("Error accessing webcam: ", err));
  };

  // Perform object detection and send results to the server
  const detectObjectsAndSendFrame = async () => {
    if (!model || !videoRef.current) return;

    const predictions = await model.detect(videoRef.current);

    // Extract object names from predictions
    const detectedObjects = predictions.map(prediction => prediction.class);

    // Capture frame
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const frame = canvas.toDataURL("image/jpeg");

    // Send detected objects and frame to server for scenario recognition
    const response = await fetch("http://localhost:5000/process", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ frame, detectedObjects })
    });

    const data = await response.json();
    setDescription(data.description);
  };

  useEffect(() => {
    startVideo();
  }, []);

  return (
    <>
    {/* <div>
      <h1>Real-time Video Narration</h1>
      <video ref={videoRef} width="640" height="480" />
      <button onClick={detectObjectsAndSendFrame}>Capture & Process Frame</button>
      <p>{description}</p>
    </div> */}
    
    <div className='max-w-screen-2xl h-dvh container mx-auto md:px-20 px-4 py-16 bg-white text-black dark:bg-black dark:text-white'>
      
          <h1 className='text-5xl font-bold text-center' >Real-time Video Narration</h1>
      
          <div className=' m-5 flex flex-row justify-center '>
            <button className='p-2 mr-5 bg-cyan-400 hover:bg-orange-400 rounded-md' onClick={detectObjectsAndSendFrame}>Capture & Process Frame</button>
            {/* <button className='p-2 mr-5 bg-cyan-400 hover:bg-orange-400 rounded-md' onClick={stopWebcam}>Stop Webcam</button> */}
          </div>
          {/* <div className=' m-5 flex flex-row justify-center '>
            <button className='p-2 mr-5 bg-cyan-400 hover:bg-orange-400 rounded-md' onClick={startDetection} disabled={!stream || !model}>Start Detection</button>
            <button className='p-2 mr-5 bg-cyan-400 hover:bg-orange-400 rounded-md' onClick={stopDetection} disabled={!detectionInterval}>Stop Detection</button>
          </div> */}
      
      
          <div className='p-48 bg-white text-black dark:bg-black dark:text-white flex flex-col md:flex-row py-6'>
          <div className='relative w-full md:w-1/2 order-1'>
          {/* <video className='mt-10 object-cover' ref={videoRef} autoPlay ></video> */}
          <video className='mt-10 object-cover' ref={videoRef} />
          <canvas className='absolute top-0 left-0 w-full h-full' ref={canvasRef}></canvas>
          </div>
          <div className='w-full order-2 md:w-1/2 grid text-center'>
          <p>{description}</p>
          </div>
          </div>
      
    </div>
    </>
  );
};

export default App;
