import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose'
import bookRoute from './route/book.route.js' 
import cors from 'cors'
import userRoute from './route/user.route.js';
const app = express();

app.use(cors())
app.use(express.json())
dotenv.config();

const port=process.env.PORT
const URI=process.env.MongoDBURI

// Mongodb Connection
try{
    mongoose.connect(URI);
    console.log("MongoDB connection successfull");
} catch(error){
    console.log(error,"connection failed");
}

// defining routes

app.use("/book",bookRoute);
app.use("/user",userRoute)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// const tf = require('@tensorflow/tfjs-node');
// const express = require('express');
// const app = express();

// // Load the pre-trained MobileNet model
// const loadModel = async () => {
//     const model = await tf.loadLayersModel('/backend/mlModel/model.pkl');
//     return model;
// };

// let mobilenetModel;

// loadModel().then((model) => {
//     mobilenetModel = model;
//     console.log('MobileNet model loaded successfully');
// });

// // Preprocess the input image (resizing and normalization)
// const preprocessImage = (img) => {
//     const resizedImg = tf.image.resizeBilinear(img, [224, 224]);
//     const normalizedImg = resizedImg.div(255.0);
//     const batchImg = normalizedImg.expandDims(0); // Adding batch dimension
//     return batchImg;
// };

// // Endpoint to handle scene detection
// app.post('/detect-scene', async (req, res) => {
//     const imageBuffer = req.body.image;  // Assume you're sending the frame from frontend
//     const imgTensor = tf.node.decodeImage(imageBuffer, 3);

//     const preprocessedImg = preprocessImage(imgTensor);
//     const predictions = mobilenetModel.predict(preprocessedImg);

//     // Process the predictions to get scene category
//     const predictedScene = predictions.argMax(1).dataSync()[0];
    
//     // Return the predicted scene to be used with YOLO detection output
//     res.json({ scene: predictedScene });
// });

// app.listen(5000, () => {
//     console.log('Scene detection backend running on port 5000');
// });
