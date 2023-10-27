const express = require('express');
const app = express();
const config = require('./config');
const cors = require('cors'); // Import the 'cors' middleware
const logger = require('./middleware/logger');
const security = require('./middleware/security');

app.use(cors());
app.use(logger);
app.use(express.json());
app.use(security);

const weatherRoute = require('./routes/weather');
app.use('/weather', weatherRoute);

const port = config.port;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

