// server.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Endpoint to handle POST requests to save text
app.post('/save', (req, res) => {
  const textToSave = req.body.text;
  if (!textToSave) {
    return res.status(400).json({ error: 'No text provided' });
  }

  // Append text to a file
  fs.appendFile('savedText.txt', textToSave + '\n', (err) => {
    if (err) {
      console.error('Error saving text:', err);
      return res.status(500).json({ error: 'Error saving text' });
    }
    console.log('Text saved successfully:', textToSave);
    res.status(200).json({ message: 'Text saved successfully' });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
