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

function App() {
  const [jsonSettings, setJsonSettings] = useState({});
  const [fontSize, setFontSize] = useState();
  const [selectedCharacterImage, setSelectedCharacterImage] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [fileNames, setFileNames] = useState([]);
  const characterSheetRef = useRef(null);
  const userInputRef = useRef(null);

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
      // Set the local image preview
      setSelectedCharacterImage(URL.createObjectURL(file));

      // Create FormData object
      const formData = new FormData();
      formData.append('image', file);

      // Send the image file to the server
      fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      })
      .then(response => response.json())
      .then(data => {
        console.log('Image uploaded successfully:', data);
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
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    // Whole app container
    <div className='main-container'>

      {/* Container for template settings */}
      <div className='template-settings'>
        <RenderTemplateSettings jsonSettings={jsonSettings}
                                setJsonSettings={setJsonSettings}
                                setSelectedTemplate={setSelectedTemplate}
                                setSelectedCharacterImage={setSelectedCharacterImage}
                                fileNames={fileNames}
        />
      </div>
      
      {/* Container for the actual character sheet */}
      <div className='character-sheet' ref={characterSheetRef} style={{ fontSize }}>
        <LoadTemplate selectedTemplate={selectedTemplate} />
        <RenderAllText jsonSettings={jsonSettings} />
        <RenderBars jsonSettings={jsonSettings} />
        <RenderCharacter jsonSettings={jsonSettings} selectedCharacterImage={selectedCharacterImage} />
      </div>

      {/* Container for user input character sheet */}
      <div className='user-input-container' ref={userInputRef} style={{ fontSize }}>
        <LoadTemplate selectedTemplate={'/images/blank-template.png'} />
        <RenderAllFields jsonSettings={jsonSettings} setJsonSettings={setJsonSettings} handleCharacterImageChange={handleCharacterImageChange} />
        <DownloadImageButton characterSheetRef={characterSheetRef} />
        <SaveJson jsonSettings={jsonSettings} setFileNames={setFileNames} fileName={jsonSettings["RomanjiName1"] + (jsonSettings["RomanjiName2"] !== "" ? " " + jsonSettings["RomanjiName2"] : "")} />
      </div>
    </div>
  );
};

export default App;
