const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000; // You can change the port number if needed

const AUDD_API_KEY = 'f9660cbbcb557cf1641dd93ba5800156'; // Your API Key from audd.io

// Endpoint to search for music
app.get('/lyrics', async (req, res) => {
  const { query } = req.query; // Extract the search query from request parameters

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    const response = await axios.get('https://api.audd.io/findLyrics/', {
      params: {
        api_token: AUDD_API_KEY,
        q: query
      }
    });

    // Send back the result from the audd.io API
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from audd.io:', error.message);
    res.status(500).json({ error: 'An error occurred while fetching data from audd.io' });
  }
});

app.listen(PORT, () => {
  console.log(`Music API is running on http://localhost:${PORT}`);
});