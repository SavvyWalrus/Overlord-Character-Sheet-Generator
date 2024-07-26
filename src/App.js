import React, { useState } from 'react';
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

  return (
    <div className='main-container'>
      <div className='character-sheet'>
        <LoadTemplate />
        <RenderAllText jsonSettings={jsonSettings} />
        <RenderBars jsonSettings={jsonSettings} />
        <RenderCharacter jsonSettings={jsonSettings} />
      </div>
      <div className='user-input-container'>
        <LoadTemplate />
        <RenderAllFields jsonSettings={jsonSettings} setJsonSettings={setJsonSettings} />
      </div>
    </div>
  );
};

export default App;
