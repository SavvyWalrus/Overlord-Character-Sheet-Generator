import React, { useState, useEffect, useCallback } from "react";

const DropdownMenu = ({ label, options, onSelect }) => {
    const [selectedOption, setSelectedOption] = useState("Momonga");

    useEffect(() => {
        onSelect(selectedOption);
    }, [selectedOption, onSelect]);

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <label>
            {label}
            <select value={selectedOption} onChange={handleChange}>
                {options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
        </label>
    );
};

function RenderTemplateSettings(props) {
    const setJsonSettings = props.setJsonSettings;
    const setSelectedCharacterImage = props.setSelectedCharacterImage;
    const setSelectedTemplate = props.setSelectedTemplate;

    const handlePresetSelect = useCallback(async (selectedOption) => {
        if (!selectedOption) return; // Avoid making fetch request if no option is selected
    
        try {
            const jsonResponse = await fetch(`/character-presets/${selectedOption}.json`);
            if (!jsonResponse.ok) {
                throw new Error('Network response was not ok');
            }
            const newSettings = await jsonResponse.json();
            const newCharacterImage = `/images/${newSettings["CharacterImageName"]}`;
            const newTemplateImage = `/images/${newSettings["TemplateImageName"]}`;

            setJsonSettings(newSettings);
            setSelectedTemplate(newTemplateImage);
            setSelectedCharacterImage(newCharacterImage);
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        };
    }, [setJsonSettings, setSelectedCharacterImage, setSelectedTemplate]);
    

    return (
        <div className="template-settings">
            <DropdownMenu onSelect={handlePresetSelect} 
                options={["Momonga", "Narberal Gamma"]}
                label="Select Preset: "
            />
        </div>
    );
};

export default RenderTemplateSettings;