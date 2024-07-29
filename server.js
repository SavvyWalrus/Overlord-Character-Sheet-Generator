const express = require('express');
const fs = require('fs');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 3002;

// Set up storage destination and filename handling
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, 'public/images'));
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  });
  
const upload = multer({ storage: storage });

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static('public/images'));

// Serve static files from the 'public' directory
app.use(express.static('public/character-presets'));

app.use(cors({
    origin: "http//localhost:3000",
    methods: ['GET', 'POST'],
    credentials: true,
}));

// API endpoint to get the list of JSON files
app.get('/api/json-files', (req, res) => {
    const dirPath = path.join(__dirname, 'public/character-presets/');
    fs.readdir(dirPath, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to scan directory' });
        }
        // Filter to return only .json files
        const jsonFiles = files
                            .filter(file => path.extname(file) === '.json')
                            .map(file => path.basename(file, '.json'));
        res.json(jsonFiles);
    });
});

// Endpoint to save JSON data to the server
app.post('/api/save-settings', (req, res) => {
    const { fileName, data } = req.body;

    if (!fileName || !data) {
        return res.status(400).json({ error: 'File name and data are required.' });
    }

    const filePath = path.join(__dirname, 'public/character-presets/', `${fileName}.json`);
    
    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error(`Error saving the file: ${err.message}`);
            return res.status(500).json({ error: 'Error saving the file.' });
        }
        res.json({ message: 'File saved successfully.' });
    });
});

// API endpoint to upload an image
app.post('/api/upload-image', upload.single('image'), (req, res) => {
    try {
      res.json({ message: 'Image uploaded successfully!', file: req.file });
    } catch (error) {
      res.status(400).json({ error: 'Error uploading image' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
