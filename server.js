const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 3002;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

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
            return res.status(500).json({ error: 'Error saving the file.' });
        }
        res.json({ message: 'File saved successfully.' });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
