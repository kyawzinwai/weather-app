require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3100,
  weatherStackApiKey: process.env.WEATHERSTACK_API_KEY,
};
