import React, { useState, useEffect } from "react";

const TextInput = ({ label, value="", settingName, changeSetting }) => {
    const [currentValue, setCurrentValue] = useState(value);

    useEffect(() => {
        setCurrentValue(value);
    }, [value]);

    const handleChange = event => {
        const newValue = event.target.value;
        setCurrentValue(newValue);
        changeSetting(settingName, newValue);
    };

    return (
        <label>
            {label}<input type="text" value={currentValue} onChange={handleChange} />
        </label>
    );
};

const NumberInput = ({ label, value=0, settingName, changeSetting, maxValue, minValue }) => {
    const [currentValue, setCurrentValue] = useState(value);

    useEffect(() => {
        setCurrentValue(value);
    }, [value]);

    const handleChange = event => {
        const newValue = event.target.value;
        setCurrentValue(newValue);
        changeSetting(settingName, Number(newValue));
    };

    return (
        <label>
            {label}<input type="number" value={currentValue} max={maxValue} min={minValue} onChange={handleChange} />
        </label>
    );
};

const Checkbox = ({ label, defaultChecked=true, settingName, changeSetting }) => {
    const [value, setValue] = useState(defaultChecked);

    const handleChange = () => {
        const newValue = !value;
        setValue(newValue);
        changeSetting(settingName, newValue);
    };

    useEffect(() => {
        if (value !== defaultChecked) {
            setValue(defaultChecked);
        }
    }, [defaultChecked, value]);

    return (
        <label>
            {label}<input type="checkbox" checked={value} onChange={handleChange} />
        </label>
    );
};

const Slider = ({ label, value=0, settingName, minSetting, maxSetting, changeSetting, title }) => {
    const [currentValue, setCurrentValue] = useState(value);

    useEffect(() => {
        setCurrentValue(value);
    }, [value]);

    const handleChange = event => {
        const newValue = Number(event.target.value);
        setCurrentValue(newValue);
        changeSetting(settingName, newValue);
    };

    return (
        <label>
            {label}<input type="range" title={title} min={minSetting} max={maxSetting} value={currentValue} onChange={handleChange} />
        </label>
    );
};

function RenderAllFields(props) {
    const jsonSettings = props.jsonSettings || {};
    const setJsonSettings = props.setJsonSettings;
    const handleCharacterImageChange = props.handleCharacterImageChange;
    const setSavedImageFileNames = props.setSavedImageFileNames;
    const [detectedImageUpload, setDetectedImageUpload] = useState(true);

    const changeSetting = ( name, value ) => {
        let tempSettings = { ...jsonSettings };
        tempSettings[name] = value;
        setJsonSettings(tempSettings);
    }

    const handleImageUpload = (event) => {
        setDetectedImageUpload(true);
        handleCharacterImageChange(event);
    }

    useEffect(() => {
        if (detectedImageUpload) {
            setDetectedImageUpload(false);
            fetch('http://localhost:3001/api/image-files')
                .then(response => response.json())
                .then(data => {
                    setSavedImageFileNames(data);
                })
                .catch(error => console.error('Error fetching image file names:', error));
        }
    }, [detectedImageUpload, setSavedImageFileNames]);

    return (
        <div className="input-fields">
            <div className="header-fields">
                <div className="sheet-type-input"><TextInput value={jsonSettings["SheetType"]} settingName="SheetType" changeSetting={changeSetting} /></div>
                <div className="race-type-input"><TextInput value={jsonSettings["RaceType"]} settingName="RaceType" changeSetting={changeSetting} /></div>
                <div className="sheet-type-number-input"><NumberInput value={jsonSettings["SheetNum"]} minValue={0} settingName="SheetNum" changeSetting={changeSetting} /></div>
            </div>

            <div className="name-fields">
                <div className="romanji-name-input-1"><TextInput value={jsonSettings["RomanjiName1"]} settingName="RomanjiName1" changeSetting={changeSetting} /></div>
                <div className="romanji-name-input-2"><TextInput value={jsonSettings["RomanjiName2"]} settingName="RomanjiName2" changeSetting={changeSetting} /></div>
                <div className="romanji-secondary-name-input"><TextInput value={jsonSettings["RomanjiSecondaryName"]} settingName="RomanjiSecondaryName" changeSetting={changeSetting} /></div>
                <div className="hiragana-name-input"><TextInput value={jsonSettings["HiraganaName"]} settingName="HiraganaName" changeSetting={changeSetting} /></div>
                <div className="hiragana-secondary-name-input"><TextInput value={jsonSettings["HiraganaSecondaryName"]} settingName="HiraganaSecondaryName" changeSetting={changeSetting} /></div>
            </div>
            
            <div className="description-fields">
                <div className="epithet-input-1"><TextInput value={jsonSettings["Epithet1"]} settingName="Epithet1" changeSetting={changeSetting} /></div>
                <div className="epithet-input-2"><TextInput value={jsonSettings["Epithet2"]} settingName="Epithet2" changeSetting={changeSetting} /></div>
                <div className="epithet-input-3"><TextInput value={jsonSettings["Epithet3"]} settingName="Epithet3" changeSetting={changeSetting} /></div>

                <div className="position-description-input-1"><TextInput value={jsonSettings["Position1"]} settingName="Position1" changeSetting={changeSetting} /></div>
                <div className="position-description-input-2"><TextInput value={jsonSettings["Position2"]} settingName="Position2" changeSetting={changeSetting} /></div>

                <div className="residence-description-input-1"><TextInput value={jsonSettings["Residence1"]} settingName="Residence1" changeSetting={changeSetting} /></div>
                <div className="residence-description-input-2"><TextInput value={jsonSettings["Residence2"]} settingName="Residence2" changeSetting={changeSetting} /></div>
            </div>

            <div className="karma-fields">
                <div className="alignment-text-input"><TextInput value={jsonSettings["AlignmentText"]} settingName="AlignmentText" changeSetting={changeSetting} /></div>
                <div className="karma-value-input"><NumberInput value={jsonSettings["KarmaValue"]} minValue={-500} maxValue={500} settingName="KarmaValue" changeSetting={changeSetting} /></div>
            </div>

            <div className="class-fields">
                <div className="racial-class-input-1"><TextInput value={jsonSettings["RaceClass1"]} settingName="RaceClass1" changeSetting={changeSetting} /></div>
                <div className="racial-class-input-2"><TextInput value={jsonSettings["RaceClass2"]} settingName="RaceClass2" changeSetting={changeSetting} /></div>
                <div className="racial-class-input-3"><TextInput value={jsonSettings["RaceClass3"]} settingName="RaceClass3" changeSetting={changeSetting} /></div>
                <div className="racial-class-input-4"><TextInput value={jsonSettings["RaceClass4"]} settingName="RaceClass4" changeSetting={changeSetting} /></div>
                <div className="racial-class-input-5"><TextInput value={jsonSettings["RaceClass5"]} settingName="RaceClass5" changeSetting={changeSetting} /></div>
                <div className="racial-class-input-6"><TextInput value={jsonSettings["RaceClass6"]} settingName="RaceClass6" changeSetting={changeSetting} /></div>
                <div className="racial-class-input-7"><TextInput value={jsonSettings["RaceClass7"]} settingName="RaceClass7" changeSetting={changeSetting} /></div>
                <div className="racial-class-input-8"><TextInput value={jsonSettings["RaceClass8"]} settingName="RaceClass8" changeSetting={changeSetting} /></div>
                
                <div className="job-class-input-1"><TextInput value={jsonSettings["JobClass1"]} settingName="JobClass1" changeSetting={changeSetting} /></div>
                <div className="job-class-input-2"><TextInput value={jsonSettings["JobClass2"]} settingName="JobClass2" changeSetting={changeSetting} /></div>
                <div className="job-class-input-3"><TextInput value={jsonSettings["JobClass3"]} settingName="JobClass3" changeSetting={changeSetting} /></div>
                <div className="job-class-input-4"><TextInput value={jsonSettings["JobClass4"]} settingName="JobClass4" changeSetting={changeSetting} /></div>
                <div className="job-class-input-5"><TextInput value={jsonSettings["JobClass5"]} settingName="JobClass5" changeSetting={changeSetting} /></div>
                <div className="job-class-input-6"><TextInput value={jsonSettings["JobClass6"]} settingName="JobClass6" changeSetting={changeSetting} /></div>
                <div className="job-class-input-7"><TextInput value={jsonSettings["JobClass7"]} settingName="JobClass7" changeSetting={changeSetting} /></div>
                <div className="job-class-input-8"><TextInput value={jsonSettings["JobClass8"]} settingName="JobClass8" changeSetting={changeSetting} /></div>

                <div className="racial-class-level-input-1"><NumberInput value={jsonSettings["RaceLevel1"]} minValue={0} maxValue={99} settingName="RaceLevel1" changeSetting={changeSetting} /></div>
                <div className="racial-class-level-input-2"><NumberInput value={jsonSettings["RaceLevel2"]} minValue={0} maxValue={99} settingName="RaceLevel2" changeSetting={changeSetting} /></div>
                <div className="racial-class-level-input-3"><NumberInput value={jsonSettings["RaceLevel3"]} minValue={0} maxValue={99} settingName="RaceLevel3" changeSetting={changeSetting} /></div>
                <div className="racial-class-level-input-4"><NumberInput value={jsonSettings["RaceLevel4"]} minValue={0} maxValue={99} settingName="RaceLevel4" changeSetting={changeSetting} /></div>
                <div className="racial-class-level-input-5"><NumberInput value={jsonSettings["RaceLevel5"]} minValue={0} maxValue={99} settingName="RaceLevel5" changeSetting={changeSetting} /></div>
                <div className="racial-class-level-input-6"><NumberInput value={jsonSettings["RaceLevel6"]} minValue={0} maxValue={99} settingName="RaceLevel6" changeSetting={changeSetting} /></div>
                <div className="racial-class-level-input-7"><NumberInput value={jsonSettings["RaceLevel7"]} minValue={0} maxValue={99} settingName="RaceLevel7" changeSetting={changeSetting} /></div>
                <div className="racial-class-level-input-8"><NumberInput value={jsonSettings["RaceLevel8"]} minValue={0} maxValue={99} settingName="RaceLevel8" changeSetting={changeSetting} /></div>

                <div className="job-class-level-input-1"><NumberInput value={jsonSettings["JobLevel1"]} minValue={0} maxValue={99} settingName="JobLevel1" changeSetting={changeSetting} /></div>
                <div className="job-class-level-input-2"><NumberInput value={jsonSettings["JobLevel2"]} minValue={0} maxValue={99} settingName="JobLevel2" changeSetting={changeSetting} /></div>
                <div className="job-class-level-input-3"><NumberInput value={jsonSettings["JobLevel3"]} minValue={0} maxValue={99} settingName="JobLevel3" changeSetting={changeSetting} /></div>
                <div className="job-class-level-input-4"><NumberInput value={jsonSettings["JobLevel4"]} minValue={0} maxValue={99} settingName="JobLevel4" changeSetting={changeSetting} /></div>
                <div className="job-class-level-input-5"><NumberInput value={jsonSettings["JobLevel5"]} minValue={0} maxValue={99} settingName="JobLevel5" changeSetting={changeSetting} /></div>
                <div className="job-class-level-input-6"><NumberInput value={jsonSettings["JobLevel6"]} minValue={0} maxValue={99} settingName="JobLevel6" changeSetting={changeSetting} /></div>
                <div className="job-class-level-input-7"><NumberInput value={jsonSettings["JobLevel7"]} minValue={0} maxValue={99} settingName="JobLevel7" changeSetting={changeSetting} /></div>
                <div className="job-class-level-input-8"><NumberInput value={jsonSettings["JobLevel8"]} minValue={0} maxValue={99} settingName="JobLevel8" changeSetting={changeSetting} /></div>

                <div className="others-text-racial-checkbox"><Checkbox label="Others: " defaultChecked={jsonSettings["RaceOthers"]} settingName="RaceOthers" changeSetting={changeSetting} /></div>
                <div className="others-text-job-checkbox"><Checkbox label="Others: " defaultChecked={jsonSettings["JobOthers"]} settingName="JobOthers" changeSetting={changeSetting} /></div>

                <div className="visible-racial-classes-input"><NumberInput label="Visible Race Levels: " value={jsonSettings["VisibleRacialClasses"]} maxValue={8} minValue={0} settingName="VisibleRacialClasses" changeSetting={changeSetting} /></div>
                <div className="visible-job-classes-input"><NumberInput label="Visible Job Levels: " value={jsonSettings["VisibleJobClasses"]} maxValue={8} minValue={0} settingName="VisibleJobClasses" changeSetting={changeSetting} /></div>
            </div>

            <div className="total-level-fields">
                <div className="total-levels-input"><NumberInput value={jsonSettings["TotalLevels"]} minValue={0} settingName="TotalLevels" changeSetting={changeSetting} /></div>
                <div className="total-racial-levels-input"><NumberInput value={jsonSettings["TotalRaceLevels"]} minValue={0} settingName="TotalRaceLevels" changeSetting={changeSetting} /></div>
                <div className="total-job-levels-input"><NumberInput value={jsonSettings["TotalJobLevels"]} minValue={0} settingName="TotalJobLevels" changeSetting={changeSetting} /></div>
            </div>

            <div className="stat-fields">
                <div className="hp-input"><NumberInput value={jsonSettings["HP"]} minValue={0} settingName="HP" changeSetting={changeSetting} /></div>
                <div className="mp-input"><NumberInput value={jsonSettings["MP"]} minValue={0} settingName="MP" changeSetting={changeSetting} /></div>
                <div className="phy-atk-input"><NumberInput value={jsonSettings["PhysicalAttack"]} minValue={0} settingName="PhysicalAttack" changeSetting={changeSetting} /></div>
                <div className="phy-def-input"><NumberInput value={jsonSettings["PhysicalDefense"]} minValue={0} settingName="PhysicalDefense" changeSetting={changeSetting} /></div>
                <div className="agility-input"><NumberInput value={jsonSettings["Agility"]} minValue={0} settingName="Agility" changeSetting={changeSetting} /></div>
                <div className="mag-atk-input"><NumberInput value={jsonSettings["MagicAttack"]} minValue={0} settingName="MagicAttack" changeSetting={changeSetting} /></div>
                <div className="mag-def-input"><NumberInput value={jsonSettings["MagicDefense"]} minValue={0} settingName="MagicDefense" changeSetting={changeSetting} /></div>
                <div className="resist-input"><NumberInput value={jsonSettings["Resistance"]} minValue={0} settingName="Resistance" changeSetting={changeSetting} /></div>
                <div className="special-input"><NumberInput value={jsonSettings["Special"]} minValue={0} settingName="Special" changeSetting={changeSetting} /></div>
            </div>

            <div className="image-fields">
                <div className="upload-button"><label>Upload Character Image: <input type="file" accept="image/*" onChange={handleImageUpload} /></label></div>
                <div className="horizontal-image-slider"><Slider title="Horizontal Movement Slider" minSetting="-200"  maxSetting="200" value={jsonSettings["CharacterXpos"]} settingName="CharacterXpos" changeSetting={changeSetting} /></div>
                <div className="vertical-image-slider"><Slider title="Vertical Movement Slider" minSetting="-200" maxSetting="200" value={jsonSettings["CharacterYpos"]} settingName="CharacterYpos" changeSetting={changeSetting} /></div>
                <div className="image-width-slider"><Slider title="Width Slider" minSetting="-200" maxSetting="200" value={jsonSettings["CharacterWidth"]} settingName="CharacterWidth" changeSetting={changeSetting} /></div>
                <div className="image-height-slider"><Slider title="Height Slider" minSetting="-200" maxSetting="200" value={jsonSettings["CharacterHeight"]} settingName="CharacterHeight" changeSetting={changeSetting} /></div>
            </div>
        </div>
    );
};

export default RenderAllFields;