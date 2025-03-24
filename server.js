require('dotenv').config();  // Load environment variables from .env
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// loading the API key from the .env file
const JOB_API_KEY = process.env.JOB_API_KEY;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/api/jobs', async (req, res) => {
  const { skill } = req.query;
  try {
    const response = await axios.get('https://jsearch.p.rapidapi.com/search', {
      params: { query: skill, num_pages: 1 },
      headers: {
        'X-RapidAPI-Key': JOB_API_KEY,
        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
      },
    });
    res.json(response.data.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching job data');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

