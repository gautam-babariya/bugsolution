const express = require('express');
const multer = require('multer');
var { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');


const app = express();

// Cloudinary configuration
cloudinary.config({
    cloud_name: 'delde3vvw',
    api_key: '677662562595255',
    api_secret: 'OtKmdP9jhhYIXObdsuUmVbDCuV4'
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/api/upload', upload.single('video'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
  
    const stream = Readable.from(req.file.buffer);
    
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: 'video' },
      (error, result) => {
        if (error) {
          return res.status(500).json({ error: 'Failed to upload to Cloudinary' });
        }
  
        res.status(200).json({
          message: 'File uploaded successfully',
          fileUrl: result.secure_url
        });
      }
    );
  
    stream.pipe(uploadStream);
  });


app.get('/api/upload', (req, res) => {
    res.send('Hello World!');
  });
// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
