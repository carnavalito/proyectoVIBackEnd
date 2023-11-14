// app.js
const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

// Serve static files in the 'public' directory
app.use(express.static('public'));

// Handle image and video uploads for /api/upload/file route
app.post('/api/upload/file', upload.single('file'), (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            throw new Error('No file uploaded.');
        }
        // Additional processing for /api/upload/file route if needed
        res.json({ success: true, message: 'File uploaded successfully!' });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ success: false, error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
