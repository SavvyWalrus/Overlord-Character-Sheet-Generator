import React, { useState, useEffect, useRef } from 'react';
import './css/App.css';
import './css/characterSheet.css';
import './css/inputFields.css';
import LoadTemplate from './components/LoadTemplate.js';
import RenderAllText from './components/RenderText.js';
import RenderBars from './components/RenderBars.js';
import RenderCharacter from './components/RenderCharacter.js';
import RenderAllFields from './components/InputFields.js';
import DownloadImageButton from './components/DownloadImage.js';
import SaveJson from './components/SaveJson.js'
import RenderTemplateSettings from './components/TemplateSettings.js';

var RESIZABLE = false; // Change to true to allow for resizing of page ; Affects html2canvas output image quality at different sizes
var minWidth = "50rem";

if (RESIZABLE) {
  minWidth = "";
}

// Ensures proper path is used for development vs production builds
function getBasePath() {
  const isDevelopment = process.env.NODE_ENV === 'development';
  return isDevelopment ? 'user-files/' : window.electronAPI.getResourcePath() + '/user-files';
}

function App() {
  const [jsonSettings, setJsonSettings] = useState({}); // Holds the current user settings
  const [fontSize, setFontSize] = useState(); // Holds the current font size for resizing
  const [selectedCharacterImage, setSelectedCharacterImage] = useState(null); // Holds the current character image
  const [selectedTemplate, setSelectedTemplate] = useState(null); // Holds the current template image
  const [selectedTemplateName, setSelectedTemplateName] = useState("") // Holds the name of the current template image ; Used for menu refreshing
  const [settingsFileNames, setSettingsFileNames] = useState([]); // Holds the file names for all stored character settings ; Used for menu list
  const [savedImageFileNames, setSavedImageFileNames] = useState([]); // Holds the file names for all stored character images ; Used for menu list
  const characterSheetRef = useRef(null); // Reference variable for character sheet ; Used for image downloading
  const userInputRef = useRef(null); // Reference variable for user input sheet
  const basePath = getBasePath(); // Variable for file pathing

  // Handles resizing of elements for varying screen sizes via changing font size
  const handleResize = () => {
    if (characterSheetRef.current) {
      const containerWidth = characterSheetRef.current.clientWidth;
      if (containerWidth === 0) return;
      const newFontSize = `${containerWidth * 0.0625 / 50}rem`;
      setFontSize(newFontSize);
    }
  };

  // Sets the character image to the user upload
  const handleCharacterImageChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];

    if (file) {
      // Create FormData object
      const formData = new FormData();
      formData.append('image', file);

      // Send the image file to the server
      fetch('http://localhost:3001/api/upload-image', {
        method: 'POST',
        body: formData,
      })
      .then(response => response.json())
      .then(data => {
        if (data.file) {
          const imageUrl = `${basePath}/saved-images/${data.file.filename}`;
          setSelectedCharacterImage(imageUrl);
          console.log('Image uploaded successfully:', data);
          let tempSettings = {...jsonSettings};
          tempSettings["CharacterImageName"] = data.file.filename;
          setJsonSettings(tempSettings);

        } else {
          console.error('Image upload failed:', data.error);
        }
      })
      .catch(error => {
        console.error('Error uploading image:', error);
      });
    }
  };

  // Listener for window resize events
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Triggers a resize event after the app components have been loaded to set the initial font size
  useEffect(() => {
    const timer = setTimeout(() => {
      handleResize();
      window.dispatchEvent(new Event('resize'));
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    // Whole app container
    <div className='main-container'>

      {/* Container for template settings */}
      <div className='template-settings-container'>
        <RenderTemplateSettings jsonSettings={jsonSettings}
                                setJsonSettings={setJsonSettings}
                                setSelectedTemplate={setSelectedTemplate}
                                setSelectedTemplateName={setSelectedTemplateName}
                                setSelectedCharacterImage={setSelectedCharacterImage}
                                settingsFileNames={settingsFileNames}
                                savedImageFileNames={savedImageFileNames}
                                basePath={basePath}
        />
      </div>
      
      {/* Container for the actual character sheet */}
      <div className='character-sheet' ref={characterSheetRef} style={{ fontSize, minWidth }}>
        <LoadTemplate selectedTemplate={selectedTemplate} />
        <RenderAllText jsonSettings={jsonSettings} selectedTemplateName={selectedTemplateName} />
        <RenderBars jsonSettings={jsonSettings} selectedTemplateName={selectedTemplateName} />
        <RenderCharacter jsonSettings={jsonSettings} selectedCharacterImage={selectedCharacterImage} />
      </div>

      {/* Container for user input character sheet */}
      <div className='user-input-container' ref={userInputRef} style={{ fontSize, minWidth }}>
        <LoadTemplate selectedTemplate={`${basePath}/templates/Input-Template.png`} />
        <RenderAllFields jsonSettings={jsonSettings} setJsonSettings={setJsonSettings} handleCharacterImageChange={handleCharacterImageChange} setSavedImageFileNames={setSavedImageFileNames} />
        <DownloadImageButton characterSheetRef={characterSheetRef} />
        <SaveJson jsonSettings={jsonSettings} setSettingsFileNames={setSettingsFileNames} fileName={jsonSettings["RomanjiName1"] + (jsonSettings["RomanjiName2"] !== "" ? " " + jsonSettings["RomanjiName2"] : "")} />
      </div>
    </div>
  );
};

export default App;
