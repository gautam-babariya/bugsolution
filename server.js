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

// Set up multer for handling file uploads
const upload = multer({ dest: 'uploads/' });

// const imageSchema = new mongoose.Schema({
//   url: String,
//   public_id: String,
// });

// const Image = mongoose.model('Image', imageSchema);

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => {
//   console.log('Connected to MongoDB');
// }).catch((err) => {
//   console.error('Error connecting to MongoDB:', err);
// });

// API endpoint for image uploads
app.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        url = result.secure_url,
            public_id = result.public_id,
            console.log(url);
        console.log(public_id);
        res.json("done he bhai");
    } catch (err) {
        res.status(500).send(err);
    }
});

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
