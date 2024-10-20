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
  const [lastSpokenSentence, setLastSpokenSentence] = useState('');
  const [lastSpokenTime, setLastSpokenTime] = useState(0);

  const THROTTLE_TIME = 5000; // 5 seconds cooldown for narration

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
      const interval = setInterval(() => detectObjects(), 3000); // Adjusted interval
      setDetectionInterval(interval);
    }
  };

  const stopDetection = () => {
    if (detectionInterval) {
      clearInterval(detectionInterval);
      setDetectionInterval(null);
    }
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

      // Only narrate when new objects are detected or significant changes are found
      if (detectedObjects.length > 0) {
        const sentence = `I can see ${detectedObjects.map(obj => obj.class).join(', ')}`;
        const currentTime = Date.now();

        // Throttle speech to prevent overlapping narration
        if (sentence !== lastSpokenSentence || currentTime - lastSpokenTime > THROTTLE_TIME) {
          speak(sentence);
          setLastSpokenSentence(sentence);
          setLastSpokenTime(currentTime);
        }
      }
    }
  };

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1; // Adjust the rate if needed
      speechSynthesis.speak(utterance);
    } else {
      console.warn('Speech synthesis not supported in this browser.');
    }
  };

  return (
    <>
      <div className='max-w-screen-2xl h-dvh container mx-auto px-4 py-16 bg-white text-black dark:bg-black dark:text-white'>
        <h1 className='text-5xl font-bold text-center'>WebCam Object Detection with Narration</h1>

        <div className='m-5 flex flex-row justify-center'>
          <button className='p-2 mr-5 bg-cyan-400 hover:bg-orange-400 rounded-md' onClick={startWebcam}>Start Webcam</button>
          <button className='p-2 mr-5 bg-cyan-400 hover:bg-orange-400 rounded-md' onClick={stopWebcam}>Stop Webcam</button>
        </div>
        <div className='flex flex-row justify-center'>
          <button className='p-2 mr-5 bg-cyan-400 hover:bg-orange-400 rounded-md' onClick={startDetection} disabled={!stream || !model}>Start Detection</button>
          <button className='p-2 mr-5 bg-cyan-400 hover:bg-orange-400 rounded-md' onClick={stopDetection} disabled={!detectionInterval}>Stop Detection</button>
        </div>

        <div className='container mx-auto pl-28 py-6 bg-white text-black dark:bg-black dark:text-white flex flex-col md:flex-row'>
          <div className='relative w-full md:w-1/2 order-2 md:order-1'>
            <video className='absolute w-3/4 top-0 left-auto' ref={videoRef} autoPlay></video>
            <canvas className='absolute w-3/4 top-0 left-auto' ref={canvasRef}></canvas>
          </div>
          <div className='w-full order-1 md:w-1/2'>
            <p>Speaker Output: 
              <ul>
                I can see
                {objects.map((obj, index) => (
                  <span key={index}> {obj.class} ({obj.score}%)</span>
                ))}
              </ul>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default WebCam1;
