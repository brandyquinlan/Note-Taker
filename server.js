const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');

// Tells node that we are creating an "express" server
const app = express();

// Body Parser Middleware. Sets up the Express app to handle data parsing
app.use(express.json());
// Forms submissions middleware (url encoded data)
app.use(express.urlencoded({ extended: true }));

// Set static folder
app.use(express.static(path.join(__dirname, '/public')));

//Init middleware
app.use(logger);

// Maps to routes
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

// API Routes. Sets an initial port.
const PORT = process.env.PORT || 8080;

// The below code effectively "starts" our server
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));