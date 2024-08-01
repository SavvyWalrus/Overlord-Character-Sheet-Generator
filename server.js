const express = require('express');
const fs = require('fs');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const serverApp = express();
const port = 3001;

function getBasePath() {
    const isDevelopment = process.env.NODE_ENV === 'development';
    return isDevelopment ? 'user-files' : path.join(process.resourcesPath, 'user-files');
}

const userFilesPath = getBasePath();

// Set up storage destination and filename handling
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(userFilesPath, 'saved-images'));
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  });
  
const upload = multer({ storage: storage });

// Middleware to parse JSON request bodies
serverApp.use(bodyParser.json());

// Serve static files from the 'user-files' directory
serverApp.use('/user-files', express.static(userFilesPath));

serverApp.use(cors({
    origin: true,
    methods: ['GET', 'POST'],
    credentials: true,
}));

// API endpoint to get the list of JSON files
serverApp.get('/api/json-files', (req, res) => {
    const dirPath = path.join(userFilesPath, 'saved-presets/');
    fs.readdir(dirPath, (err, files) => {
        if (err) {
            return res.status(500).json({ error: `${dirPath}` });
        }

        // Filter to return only .json files
        const jsonFiles = files
                            .filter(file => path.extname(file) === '.json')
                            .map(file => path.basename(file, '.json'));
        res.json(jsonFiles);
    });
});

// API endpoint to get the list of image files
serverApp.get('/api/image-files', (req, res) => {
    const dirPath = path.join(userFilesPath, 'saved-images/');
    fs.readdir(dirPath, (err, files) => {
        if (err) {
            return res.status(500).json({ error: `${dirPath}` });
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
serverApp.post('/api/save-settings', (req, res) => {
    const { fileName, data } = req.body;

    if (!fileName || !data) {
        return res.status(400).json({ error: 'File name and data are required.' });
    }

    const filePath = path.join(userFilesPath, 'saved-presets/', `${fileName}.json`);
    
    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error(`Error saving the file: ${err.message}`);
            return res.status(500).json({ error: 'Error saving the file.' });
        }
        res.json({ message: 'File saved successfully.' });
    });
});

// API endpoint to upload an image
serverApp.post('/api/upload-image', upload.single('image'), (req, res) => {
    try {
      res.json({ message: 'Image uploaded successfully!', file: req.file });
    } catch (error) {
      res.status(400).json({ error: 'Error uploading image' });
    }
});

// Start the server
// serverApp.listen(port, () => {
//     console.log(`Server is running at http://localhost:${port}`);
// });

module.exports = serverApp;