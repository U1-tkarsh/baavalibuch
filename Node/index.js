// server.js

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
// import { ConnectionLog, TextData } from './model.js';



// Connection log model
const connectionLogSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    // Add any other fields you want to track for each connection
  });
  
  const ConnectionLog = mongoose.model('ConnectionLog', connectionLogSchema);
  
  // Text data model
  const textDataSchema = new mongoose.Schema({
    text: { type: String, required: true },
    // Add any other fields specific to your text data model
  });
  
  const TextData = mongoose.model('TextData', textDataSchema);

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://0.0.0.0:27017/text-data", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Log connections and insert into ConnectionLog model
app.use((req, res, next) => {
  const connectionLog = new ConnectionLog();
  connectionLog.save()
    .then(() => {
      next();
    })
    .catch((error) => {
      console.error('Error logging connection:', error);
      res.status(500).json({ error: 'Error logging connection' });
    });
});

// Receive and insert text data into TextData model
app.post('/text-data', (req, res) => {
  const { text } = req.body;
  const textData = new TextData({ text });
  textData.save()
    .then(() => {
      res.status(200).json({ message: 'Text data saved successfully' });
    })
    .catch((error) => {
      console.error('Error inserting text data:', error);
      res.status(500).json({ error: 'Error inserting text data' });
    });
});

// Start the server
app.listen(5000, () => {
  console.log('Server started on port 5000');
});
