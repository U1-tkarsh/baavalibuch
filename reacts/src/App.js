import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Make a POST request to your backend endpoint
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
    </div>
  );
}

export default App;
