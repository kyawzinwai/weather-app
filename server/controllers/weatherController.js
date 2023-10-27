const axios = require('axios');
const config = require('../config');

async function getWeather(req, res) {
  try {
    const { zipcode } = req.query;
    const weatherStackApiKey = config.weatherStackApiKey;
    const response = await axios.get(
      `http://api.weatherstack.com/current?access_key=${weatherStackApiKey}&query=${zipcode},ho%20chi%20%minh`
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
}

module.exports = {
  getWeather,
};
