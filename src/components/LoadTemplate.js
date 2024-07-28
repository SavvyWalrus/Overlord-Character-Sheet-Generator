import React from 'react';

function LoadTemplate({ selectedTemplate }) {
    return <img className='template' src={selectedTemplate} alt='A blank character sheet template'/>
};

export default LoadTemplate;