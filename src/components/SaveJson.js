import React, { useEffect, useState } from 'react';
// import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SaveJson = (props) => {
  const [finishedSaving, setFinishedSaving] = useState(true);
  const jsonSettings = props.jsonSettings;
  const fileName = props.fileName;
  const setFileNames = props.setFileNames;

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

  const handleSaveJson = (event) => {
    event.preventDefault();

    try {
      fetch('/api/save-settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fileName, data: jsonSettings }),
      })
        .then(response => response.json())
        .then(data => {
          // toast.success('Settings saved successfully!');
          setFinishedSaving(true);
        })
        .catch(error => {
          // toast.error('Error saving settings.');
          console.error('Error saving the file:', error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (finishedSaving) {
      setFinishedSaving(false);
      fetch('/api/json-files')
        .then(response => response.json())
        .then(data => {
          setFileNames(data);
        })
        .catch(error => console.error('Error fetching file names:', error));
    }
  }, [finishedSaving, setFileNames]);

  return (
    <div>
      <div className='current-settings-download-container'>
        <button onClick={handleDownloadJson}>Download Current Settings</button>
      </div>
      <div className='current-settings-save-container'>
        <button type="button" onClick={handleSaveJson}>Save Current Settings</button>
        {/* <ToastContainer position="top-right" autoClose={5000} /> */}
      </div>
    </div>
  );
};

export default SaveJson;
