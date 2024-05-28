const express = require('express');
const multer = require('multer');
var { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
const { Readable } = require('stream');
const cors = require('cors');

const app = express();
app.use(cors({
    origin: 'http://localhost:5173', // Adjust this to match your frontend's URL
    optionsSuccessStatus: 200,
  }));
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

// Cloudinary configuration
cloudinary.config({
    cloud_name: 'delde3vvw',
    api_key: '677662562595255',
    api_secret: 'OtKmdP9jhhYIXObdsuUmVbDCuV4'
});

const upload = multer({});

app.post('/api/upload', upload.single('video'), async (req, res) => {
  try {
    // Readable stream from buffer
    const stream = Readable.from(req.file.buffer);

    // Upload stream to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload_stream(
      { resource_type: 'video' },
      (error, result) => {
        if (error) {
          res.status(500).json({ error: 'Failed to upload to Cloudinary' });
        } else {
          res.status(200).json({
            message: 'File uploaded successfully',
            fileUrl: result.secure_url
          });
        }
      }
    );

    // Pipe the buffer stream to Cloudinary upload stream
    stream.pipe(uploadResponse);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


app.get('/api/upload', (req, res) => {
    res.send('Hello World!');
  });
// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
