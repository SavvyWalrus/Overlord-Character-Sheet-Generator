import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SaveJson = ({ jsonSettings, fileName }) => {
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

  const handleSaveJson = ({ jsonSettings, fileName }) => {
    fetch('/api/save-settings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fileName, data: jsonSettings }),
    })
      .then(response => response.json())
      .then(data => {
        toast.success('Settings saved successfully!');
      })
      .catch(error => {
        toast.error('Error saving settings.');
        console.error('Error saving the file:', error);
      });
  };

  return (
    <div>
      <div className='current-settings-download-container'>
        <button onClick={handleDownloadJson}>Download Current Settings</button>
      </div>
      <div className='current-settings-save-container'>
        <button onClick={handleSaveJson}>Save Current Settings</button>
      </div>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default SaveJson;
