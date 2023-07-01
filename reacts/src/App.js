import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [inputText, setInputText] = useState('');
  const [ngrams, setNgrams] = useState([]);

  useEffect(() => {
    // Fetch the ngrams from the Django API
    const fetchNgrams = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/ngrams/', { data: inputText });
        setNgrams(response.data);
      } catch (error) {
        console.error('Error retrieving ngrams:', error);
      }
    };

    fetchNgrams();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Make a POST request to your backend to insert the text data
    axios
      .post('http://localhost:5000/text-data', { text: inputText })
      .then((response) => {
        // Handle successful response from the backend
        console.log(response.data);
        // Update the UI or perform any other actions based on the response
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });

      
  };

  return (
    <div>
      <h1>Text Input Form</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      <h2>Ngrams:</h2>
      <ul>
        {ngrams.map((ngram, index) => (
          <li key={index}>{ngram}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
