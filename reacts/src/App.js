import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [inputText, setInputText] = useState('');
  const [ngrams, setNgrams] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Make a POST request to your backend to insert the text data
    axios
      .post('http://localhost:5000/text-data', { text: inputText })
      .then((response) => {
        // Handle successful response from the backend
        console.log(response.data);
        // Update the UI or perform any other actions based on the response
  
        // Call the function to retrieve ngrams here
        getNgrams();
      })
      .catch((error) => {
        // Handle error
        if (error.response && error.response.data && error.response.data.error) {
          console.error(error.response.data.error);
        } else {
          console.error(error);
        }
      });
  };
  
  // Function to call Django API and retrieve ngrams
  async function getNgrams() {
    try {
      const response = await axios.get('http://localhost:5000/ngrams');
      setNgrams(response.data.text)
      console.log('Ngrams Comparison:', response.data.text);
      // Process the ngrams data or update the UI based on the comparison result
    } catch (error) {
      console.error('Error retrieving ngrams:', error);
    }
  }
  


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

      {/* Display the ngramsArray in array format */}
      <h2>Ngrams Comparison:</h2>
      {ngrams.length > 0 ? (
        <ul>
          {ngrams.map((ngram, index) => (
            <li key={index}>{ngram.join(' ')}</li>

          ))}
        </ul>
      ) : (
        <p>No ngrams to display</p>
      )}
    </div>
  );
}

export default App;
