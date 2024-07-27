import React, { useState, useEffect, useRef } from 'react';
import './css/App.css'
import './css/characterSheet.css'
import './css/inputFields.css'
import defaultSettings from './settings.json'
import LoadTemplate from './components/LoadTemplate.js';
import RenderAllText from './components/RenderText.js';
import RenderBars from './components/RenderBars.js';
import RenderCharacter from './components/RenderCharacter.js';
import RenderAllFields from './components/InputFields.js';

function App() {
  const [jsonSettings, setJsonSettings] = useState(defaultSettings);
  const [fontSize, setFontSize] = useState('1rem');
  const containerRef = useRef(null);

  // Handles resizing of elements for varying screen sizes via changing font size
  const handleResize = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      if (containerWidth === 0) return;
      const newFontSize = `${containerWidth * 0.0625 / 50}rem`;
      setFontSize(newFontSize);
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
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    // Whole app container
    <div className='main-container'>

      {/* Container for the actual character sheet */}
      <div className='character-sheet' ref={containerRef} style={{ fontSize }}>
        <LoadTemplate />
        <RenderAllText jsonSettings={jsonSettings} />
        <RenderBars jsonSettings={jsonSettings} />
        <RenderCharacter jsonSettings={jsonSettings} />
      </div>

      {/* Container for user input character sheet */}
      <div className='user-input-container' ref={containerRef} style={{ fontSize }}>
        <LoadTemplate />
        <RenderAllFields jsonSettings={jsonSettings} setJsonSettings={setJsonSettings} />
      </div>
    </div>
  );
};

export default App;
