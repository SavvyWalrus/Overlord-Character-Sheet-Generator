import React, { useState, useCallback, useEffect } from "react";

const DropdownMenu = ({ label, options, onSelect, defaultSelection, className, jsonSettings={}, jsonSettingName="" }) => {
    const [selectedOption, setSelectedOption] = useState(defaultSelection);

    const handleChange = (event) => {
        const newValue = event.target ? event.target.value : event;
        setSelectedOption(newValue);
        onSelect(newValue);
    };

    useEffect(() => {
        handleChange(defaultSelection);
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (jsonSettings && jsonSettingName) {
            setSelectedOption(jsonSettings[jsonSettingName]);
        }
    }, [jsonSettings, jsonSettingName])

    try {
        return (
            <label className={className}>
                {label}
                <select value={selectedOption} onChange={handleChange}>
                    {options.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                    ))}
                </select>
            </label>
        );
    } catch {
        return (
            <label className={className}>
                {label}
                <select></select>
            </label>
        );
    }
};

function RenderTemplateSettings(props) {
    const jsonSettings = props.jsonSettings;
    const setJsonSettings = props.setJsonSettings;
    const setSelectedCharacterImage = props.setSelectedCharacterImage;
    const setSelectedTemplate = props.setSelectedTemplate;
    const setSelectedTemplateName = props.setSelectedTemplateName;
    const fileNames = props.fileNames;
    const savedImageFileNames = props.savedImageFileNames;
    const basePath = props.basePath;

    const handlePresetSelect = useCallback(async (selectedOption) => {
        if (!selectedOption) return; // Avoid making fetch request if no option is selected
        
        try {
            const jsonResponse = await fetch(`${basePath}/saved-presets/${selectedOption}.json`);
            if (!jsonResponse.ok) {
                throw new Error('Network response was not ok');
            }
            const newSettings = await jsonResponse.json();
            const newCharacterImage = `${basePath}/saved-images/${newSettings["CharacterImageName"]}`;
            const newTemplateImage = `${basePath}/templates/${newSettings["TemplateImageName"]}`;

            setJsonSettings(newSettings);
            setSelectedTemplate(newTemplateImage);
            setSelectedTemplateName(newSettings["TemplateImageName"]);
            setSelectedCharacterImage(newCharacterImage);
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        };
    }, [setJsonSettings, setSelectedCharacterImage, setSelectedTemplate, setSelectedTemplateName, basePath]);

    const handleCharacterImageSelect = useCallback(async (selectedOption) => {
        if (!selectedOption) return; // Avoid making fetch request if no option is selected
        
        try {
            const response = await fetch(`${basePath}/saved-images/${selectedOption}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const blob = await response.blob();
            const newCharacterImage = URL.createObjectURL(blob);

            let tempSettings = {...jsonSettings};

            if (JSON.stringify(tempSettings) !== '{}') {
                tempSettings["CharacterImageName"] = selectedOption;
                setJsonSettings(tempSettings);
                setSelectedCharacterImage(newCharacterImage);
            }
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        };
    }, [jsonSettings, setJsonSettings, setSelectedCharacterImage, basePath]);

    const handleTemplateImageSelect = useCallback(async (selectedOption) => {
        if (!selectedOption) return; // Avoid making fetch request if no option is selected
        
        try {
            const response = await fetch(`${basePath}/templates/${selectedOption}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const blob = await response.blob();
            const newTemplateImage = URL.createObjectURL(blob);

            let tempSettings = {...jsonSettings};

            if (JSON.stringify(tempSettings) !== '{}') {
                tempSettings["TemplateImageName"] = selectedOption;
                setJsonSettings(tempSettings);
                setSelectedTemplate(newTemplateImage);
                setSelectedTemplateName(selectedOption);
            }
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        };
    }, [jsonSettings, setJsonSettings, setSelectedTemplate, setSelectedTemplateName, basePath]);

    return (
        <div className="template-settings">
            <DropdownMenu onSelect={handlePresetSelect} 
                options={fileNames}
                label="Select Preset: "
                defaultSelection="Momonga"
                className="preset-dropdown"
            />
            <DropdownMenu onSelect={handleCharacterImageSelect} 
                options={savedImageFileNames}
                label="Select Character Image: "
                defaultSelection="01-Momonga.jpg"
                className="character-image-dropdown"
                jsonSettings={jsonSettings}
                jsonSettingName="CharacterImageName"
            />
            <DropdownMenu onSelect={handleTemplateImageSelect} 
                options={["Heteromorph-Demihuman.png", "Humanoid.png"]}
                label="Select Template Image: "
                defaultSelection="Heteromorph-Demihuman.png"
                className="template-image-dropdown"
                jsonSettings={jsonSettings}
                jsonSettingName="TemplateImageName"
            />
        </div>
    );
};

export default RenderTemplateSettings;