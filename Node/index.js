// server.js

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import axios from 'axios';
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


// Function to call Django API and retrieve ngrams
async function getNgrams(text1, text2) {
  const apiUrl = 'http://127.0.0.1:8000/api/ngrams/'; // Replace with your Django API URL

  try {
    const response = await axios.post(apiUrl, { text1, text2 });
    return response.data;
  } catch (error) {
    console.error('Error retrieving ngrams:', error);
    throw new Error('Error retrieving ngrams');
  }
}

// Call Django API and return ngrams to frontend
app.get('/ngrams', async (req, res) => {
  try {
    const texts = await TextData.find()
      .sort({ _id: -1 })
      .limit(2)
      .select('text');

    if (texts.length < 2) {
      res.status(400).json({ error: 'Insufficient data to compare ngrams' });
      return;
    }

    const ngrams = await getNgrams(texts[0].text, texts[1].text);

    res.status(200).json(ngrams);
  } catch (error) {
    console.error('Error retrieving ngrams:', error);
    res.status(500).json({ error: 'Error retrieving ngrams' });
  }
});



// Start the server
app.listen(5000, () => {
  console.log('Server started on port 5000');
});
