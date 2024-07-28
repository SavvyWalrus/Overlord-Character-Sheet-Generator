import React from 'react';

const DownloadJsonButton = ({ jsonSettings, fileName }) => {
  const handleDownloadJson = () => {
    const jsonData = JSON.stringify(jsonSettings, null, 2); // Pretty-print the JSON
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.json`; // Set the desired file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className='current-settings-download-container'>
        <button onClick={handleDownloadJson}>Save Current Settings</button>
    </div>
  );
};

export default DownloadJsonButton;
