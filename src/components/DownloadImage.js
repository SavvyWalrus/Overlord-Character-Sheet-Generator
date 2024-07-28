import React from "react";
import html2canvas from "html2canvas";


const DownloadImageButton = ({ characterSheetRef }) => {
    const handleDownloadImage = async () => {
        if (characterSheetRef.current) {
            const canvas = await html2canvas(characterSheetRef.current, {scale: 2});
            const data = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = data;
            link.download = 'character-sheet.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div className='image-download-container'>
            <button onClick={handleDownloadImage}>Download as Image</button>
        </div>
    );
  };
  
  export default DownloadImageButton;