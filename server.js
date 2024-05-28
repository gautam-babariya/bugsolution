const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const cors = require('cors');
const path = require('path');



// Cloudinary configuration

cloudinary.config({
    cloud_name: 'delde3vvw',
    api_key: '677662562595255',
    api_secret: 'OtKmdP9jhhYIXObdsuUmVbDCuV4'
});

// Create a new Express application
const app = express();

// Enable CORS
app.use(cors());

// Parse JSON requests
app.use(express.json());

// const parser = multer({ storage: storage });

app.get('/', (req, res) => {
    res.send('Hello World!');
  });
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
