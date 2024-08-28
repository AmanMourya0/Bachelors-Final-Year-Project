import React, { useRef, useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as cocossd from '@tensorflow-models/coco-ssd';

function WebCam1() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [model, setModel] = useState(null);
  const [stream, setStream] = useState(null);
  const [detectionInterval, setDetectionInterval] = useState(null);
  const [objects, setObjects] = useState([]);
  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await cocossd.load();
      setModel(loadedModel);
    };
    loadModel();
  }, []);

  const startWebcam = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
      }
      setStream(mediaStream);
    } catch (err) {
      console.error("Error accessing webcam: ", err);
    }
  };

  const stopWebcam = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const startDetection = () => {
    if (model && videoRef.current && canvasRef.current) {
      const interval = setInterval(() => detectObjects(), 1000);
      setDetectionInterval(interval);
    }
  };

  const stopDetection = () => {
    clearInterval(detectionInterval);
      setDetectionInterval(null);
    // if (detectionInterval) {
    //   clearInterval(detectionInterval);
    //   setDetectionInterval(null);
    // }
  };

  const detectObjects = async () => {
    if (model && videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const predictions = await model.detect(video);

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      const detectedObjects = predictions.map(prediction => ({
        class: prediction.class,
        score: Math.round(prediction.score * 100)
      }));

      setObjects(detectedObjects);

      predictions.forEach(prediction => {
        context.beginPath();
        context.rect(...prediction.bbox);
        context.lineWidth = 2;
        context.strokeStyle = 'red';
        context.fillStyle = 'red';
        context.stroke();
        context.fillText(
          `${prediction.class} (${Math.round(prediction.score * 100)}%)`,
          prediction.bbox[0],
          prediction.bbox[1] > 10 ? prediction.bbox[1] - 10 : 10
        );
      });
    }
  };

  return (
    <div className='max-w-screen-2xl container mx-auto md:px-20 px-4 py-16 bg-white text-black dark:bg-black dark:text-white'>
      <h1 className='text-5xl font-bold text-center' >WebCam Object Detection</h1>
  
      <div className=' m-5 flex flex-row justify-center '>
        <button className='p-2 mr-5 bg-cyan-400 hover:bg-orange-400 rounded-md' onClick={startWebcam}>Start Webcam</button>
        <button className='p-2 mr-5 bg-cyan-400 hover:bg-orange-400 rounded-md' onClick={stopWebcam}>Stop Webcam</button>
      </div>
      <div className=' m-5 flex flex-row justify-center '>
        <button className='p-2 mr-5 bg-cyan-400 hover:bg-orange-400 rounded-md' onClick={startDetection} disabled={!stream || !model}>Start Detection</button>
        <button className='p-2 mr-5 bg-cyan-400 hover:bg-orange-400 rounded-md' onClick={stopDetection} disabled={!detectionInterval}>Stop Detection</button>
      </div>
      <div className='relative max-w-screen-2xl container mx-auto md:px-20 px-4 bg-white text-black dark:bg-black dark:text-white flex flex-col md:flex-row py-6'>
      <div className=' w-full md:w-1/2 order-2 md:order-1 space-y-7 md:mt-32'>
      <video className='w-6/12' ref={videoRef} autoPlay ></video>
      <canvas className='absolute top-8 w-4/12' ref={canvasRef}></canvas>
      </div>
      <div className='w-full order-1 md:w-1/2 grid text-center'>
        <h2>Detected Objects:</h2>
        <ul>
          {objects.map((obj, index) => (
            <li key={index}>{obj.class} ({obj.score}%)</li>
          ))}
        </ul>
      </div>
      </div>
      
    </div>
  );
}

export default WebCam1;
