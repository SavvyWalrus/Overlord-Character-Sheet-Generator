const express = require('express');
const fs = require('fs');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;

// Set up storage destination and filename handling
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, 'user-files/saved-images'));
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  });
  
const upload = multer({ storage: storage });

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Serve static files from the 'user-files' directory
app.use('/user-files', express.static(path.join(__dirname, 'user-files')));

app.use(cors({
    origin: "http//localhost:3000",
    methods: ['GET', 'POST'],
    credentials: true,
}));

// API endpoint to get the list of JSON files
app.get('/api/json-files', (req, res) => {
    const dirPath = path.join(__dirname, 'user-files/saved-presets/');
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

// API endpoint to get the list of image files
app.get('/api/image-files', (req, res) => {
    const dirPath = path.join(__dirname, 'user-files/saved-images/');
    fs.readdir(dirPath, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to scan directory' });
        }

        // Filter to return only image files with the specified extensions
        const imageFiles = files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return ext === '.png' || ext === '.jpg' || ext === '.jpeg';
        });

        res.json(imageFiles);
    });
});

// Endpoint to save JSON data to the server
app.post('/api/save-settings', (req, res) => {
    const { fileName, data } = req.body;

    if (!fileName || !data) {
        return res.status(400).json({ error: 'File name and data are required.' });
    }

    const filePath = path.join(__dirname, 'user-files/saved-presets/', `${fileName}.json`);
    
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
