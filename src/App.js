import React, { useState, useEffect, useRef } from 'react';
import './css/App.css';
import './css/characterSheet.css';
import './css/inputFields.css';
import defaultSettings from './character-presets/Momonga.json';
import defaultImage from './images/Momonga.png';
import LoadTemplate from './components/LoadTemplate.js';
import RenderAllText from './components/RenderText.js';
import RenderBars from './components/RenderBars.js';
import RenderCharacter from './components/RenderCharacter.js';
import RenderAllFields from './components/InputFields.js';
import DownloadImageButton from './components/DownloadImage.js';
import DownloadJsonButton from './components/DownloadCurrentSettings.js';

function App() {
  const [jsonSettings, setJsonSettings] = useState(defaultSettings);
  const [fontSize, setFontSize] = useState();
  const [selectedImage, setSelectedImage] = useState(defaultImage);
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
  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
        setSelectedImage(URL.createObjectURL(file));
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

      {/* Container for the actual character sheet */}
      <div className='character-sheet' ref={characterSheetRef} style={{ fontSize }}>
        <LoadTemplate />
        <RenderAllText jsonSettings={jsonSettings} />
        <RenderBars jsonSettings={jsonSettings} />
        <RenderCharacter jsonSettings={jsonSettings} selectedImage={selectedImage} />
      </div>

      {/* Container for user input character sheet */}
      <div className='user-input-container' ref={userInputRef} style={{ fontSize }}>
        <LoadTemplate />
        <RenderAllFields jsonSettings={jsonSettings} setJsonSettings={setJsonSettings} handleImageChange={handleImageChange} />
        <DownloadImageButton characterSheetRef={characterSheetRef} />
        <DownloadJsonButton jsonSettings={jsonSettings} fileName={jsonSettings["RomanjiName"]} />
      </div>
    </div>
  );
};

export default App;
