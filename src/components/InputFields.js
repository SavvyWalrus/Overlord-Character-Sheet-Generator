import React, { useState } from "react";

const TextInput = ({ label, initialValue, settingName, changeSetting }) => {
    const [value, setValue] = useState(initialValue);

    const handleChange = event => {
        const newValue = event.target.value;
        setValue(newValue);
        changeSetting(settingName, newValue);
    };

    return (
        <label>
            {label}<input type="text" value={value} onChange={handleChange} />
        </label>
    );
};

const NumberInput = ({ label, initialValue, settingName, changeSetting }) => {
    const [value, setValue] = useState(initialValue);

    const handleChange = event => {
        const newValue = event.target.value;
        setValue(newValue);
        changeSetting(settingName, newValue);
    };

    return (
        <label>
            {label}<input type="number" value={value} onChange={handleChange} />
        </label>
    );
};

const Checkbox = ({ label, defaultChecked, settingName, changeSetting }) => {
    const [value, setValue] = useState(defaultChecked);

    const handleChange = () => {
        const newValue = !value;
        setValue(newValue);
        changeSetting(settingName, newValue);
    };

    return (
        <label>
            {label}<input type="checkbox" checked={defaultChecked} onChange={handleChange} />
        </label>
    );
};

const Slider = ({ label, initialValue=0, settingName, minSetting, maxSetting, changeSetting }) => {
    const [value, setValue] = useState(initialValue);

    const handleChange = event => {
        const newValue = Number(event.target.value);
        setValue(newValue);
        changeSetting(settingName, newValue);
    };

    return (
        <label>
            {label}<input type="range" min={minSetting} max={maxSetting} value={value} onChange={handleChange} />
        </label>
    );
};

function RenderAllFields(props) {
    const jsonSettings = props.jsonSettings;
    const setJsonSettings = props.setJsonSettings;
    const handleImageChange = props.handleImageChange;

    const changeSetting = ( name, value ) => {
        let tempSettings = { ...jsonSettings };
        tempSettings[name] = value;
        setJsonSettings(tempSettings);
    }

    return (
        <div className="input-fields">
            <div className="header-fields">
                <div className="sheet-type-input"><TextInput initialValue={jsonSettings["SheetType"]} settingName="SheetType" changeSetting={changeSetting} /></div>
                <div className="race-type-input"><TextInput initialValue={jsonSettings["RaceType"]} settingName="RaceType" changeSetting={changeSetting} /></div>
                <div className="sheet-type-number-input"><NumberInput initialValue={jsonSettings["SheetNum"]} settingName="SheetNum" changeSetting={changeSetting} /></div>
            </div>

            <div className="name-fields">
                <div className="romanji-name-input"><TextInput initialValue={jsonSettings["RomanjiName"]} settingName="RomanjiName" changeSetting={changeSetting} /></div>
                <div className="romanji-secondary-name-input"><TextInput initialValue={jsonSettings["RomanjiSecondaryName"]} settingName="RomanjiSecondaryName" changeSetting={changeSetting} /></div>
                <div className="hiragana-name-input"><TextInput initialValue={jsonSettings["HiraganaName"]} settingName="HiraganaName" changeSetting={changeSetting} /></div>
                <div className="hiragana-secondary-name-input"><TextInput initialValue={jsonSettings["HiraganaSecondaryName"]} settingName="HiraganaSecondaryName" changeSetting={changeSetting} /></div>
            </div>
            
            <div className="description-fields">
                <div className="epithet-input-1"><TextInput initialValue={jsonSettings["Epithet1"]} settingName="Epithet1" changeSetting={changeSetting} /></div>
                <div className="epithet-input-2"><TextInput initialValue={jsonSettings["Epithet2"]} settingName="Epithet2" changeSetting={changeSetting} /></div>
                <div className="epithet-input-3"><TextInput initialValue={jsonSettings["Epithet3"]} settingName="Epithet3" changeSetting={changeSetting} /></div>

                <div className="position-description-input-1"><TextInput initialValue={jsonSettings["Position1"]} settingName="Position1" changeSetting={changeSetting} /></div>
                <div className="position-description-input-2"><TextInput initialValue={jsonSettings["Position2"]} settingName="Position2" changeSetting={changeSetting} /></div>

                <div className="residence-description-input-1"><TextInput initialValue={jsonSettings["Residence1"]} settingName="Residence1" changeSetting={changeSetting} /></div>
                <div className="residence-description-input-2"><TextInput initialValue={jsonSettings["Residence2"]} settingName="Residence2" changeSetting={changeSetting} /></div>
            </div>

            <div className="karma-fields">
                <div className="alignment-text-input"><TextInput initialValue={jsonSettings["AlignmentText"]} settingName="AlignmentText" changeSetting={changeSetting} /></div>
                <div className="karma-value-input"><NumberInput initialValue={jsonSettings["KarmaValue"]} settingName="KarmaValue" changeSetting={changeSetting} /></div>
            </div>

            <div className="class-fields">
                <div className="racial-class-input-1"><TextInput initialValue={jsonSettings["RaceClass1"]} settingName="RaceClass1" changeSetting={changeSetting} /></div>
                <div className="racial-class-input-2"><TextInput initialValue={jsonSettings["RaceClass2"]} settingName="RaceClass2" changeSetting={changeSetting} /></div>
                <div className="racial-class-input-3"><TextInput initialValue={jsonSettings["RaceClass3"]} settingName="RaceClass3" changeSetting={changeSetting} /></div>
                
                <div className="job-class-input-1"><TextInput initialValue={jsonSettings["JobClass1"]} settingName="JobClass1" changeSetting={changeSetting} /></div>
                <div className="job-class-input-2"><TextInput initialValue={jsonSettings["JobClass2"]} settingName="JobClass2" changeSetting={changeSetting} /></div>
                <div className="job-class-input-3"><TextInput initialValue={jsonSettings["JobClass3"]} settingName="JobClass3" changeSetting={changeSetting} /></div>

                <div className="racial-class-level-input-1"><NumberInput initialValue={jsonSettings["RaceLevel1"]} settingName="RaceLevel1" changeSetting={changeSetting} /></div>
                <div className="racial-class-level-input-2"><NumberInput initialValue={jsonSettings["RaceLevel2"]} settingName="RaceLevel2" changeSetting={changeSetting} /></div>
                <div className="racial-class-level-input-3"><NumberInput initialValue={jsonSettings["RaceLevel3"]} settingName="RaceLevel3" changeSetting={changeSetting} /></div>

                <div className="job-class-level-input-1"><NumberInput initialValue={jsonSettings["JobLevel1"]} settingName="JobLevel1" changeSetting={changeSetting} /></div>
                <div className="job-class-level-input-2"><NumberInput initialValue={jsonSettings["JobLevel2"]} settingName="JobLevel2" changeSetting={changeSetting} /></div>
                <div className="job-class-level-input-3"><NumberInput initialValue={jsonSettings["JobLevel3"]} settingName="JobLevel3" changeSetting={changeSetting} /></div>

                <div className="others-text-racial-checkbox"><Checkbox label="Others: " defaultChecked={jsonSettings["RaceOthers"]} settingName="RaceOthers" changeSetting={changeSetting} /></div>
                <div className="others-text-job-checkbox"><Checkbox label="Others: " defaultChecked={jsonSettings["JobOthers"]} settingName="JobOthers" changeSetting={changeSetting} /></div>
            </div>

            <div className="total-level-fields">
                <div className="total-levels-input"><NumberInput initialValue={jsonSettings["TotalLevels"]} settingName="TotalLevels" changeSetting={changeSetting} /></div>
                <div className="total-racial-levels-input"><NumberInput initialValue={jsonSettings["TotalRaceLevels"]} settingName="TotalRaceLevels" changeSetting={changeSetting} /></div>
                <div className="total-job-levels-input"><NumberInput initialValue={jsonSettings["TotalJobLevels"]} settingName="TotalJobLevels" changeSetting={changeSetting} /></div>
            </div>

            <div className="stat-fields">
                <div className="hp-input"><NumberInput initialValue={jsonSettings["HP"]} settingName="HP" changeSetting={changeSetting} /></div>
                <div className="mp-input"><NumberInput initialValue={jsonSettings["MP"]} settingName="MP" changeSetting={changeSetting} /></div>
                <div className="phy-atk-input"><NumberInput initialValue={jsonSettings["PhysicalAttack"]} settingName="PhysicalAttack" changeSetting={changeSetting} /></div>
                <div className="phy-def-input"><NumberInput initialValue={jsonSettings["PhysicalDefense"]} settingName="PhysicalDefense" changeSetting={changeSetting} /></div>
                <div className="agility-input"><NumberInput initialValue={jsonSettings["Agility"]} settingName="Agility" changeSetting={changeSetting} /></div>
                <div className="mag-atk-input"><NumberInput initialValue={jsonSettings["MagicAttack"]} settingName="MagicAttack" changeSetting={changeSetting} /></div>
                <div className="mag-def-input"><NumberInput initialValue={jsonSettings["MagicDefense"]} settingName="MagicDefense" changeSetting={changeSetting} /></div>
                <div className="resist-input"><NumberInput initialValue={jsonSettings["Resistance"]} settingName="Resistance" changeSetting={changeSetting} /></div>
                <div className="special-input"><NumberInput initialValue={jsonSettings["Special"]} settingName="Special" changeSetting={changeSetting} /></div>
            </div>

            <div className="image-fields">
                <div className="upload-button"><label>Upload Character Image: <input type="file" accept="image/*" onChange={handleImageChange} /></label></div>
                <div className="horizontal-image-slider"><Slider minSetting="-150"  maxSetting="150" initialValue={jsonSettings["CharacterXpos"]} settingName="CharacterXpos" changeSetting={changeSetting} /></div>
                <div className="vertical-image-slider"><Slider minSetting="-150" maxSetting="150" initialValue={jsonSettings["CharacterYpos"]} settingName="CharacterYpos" changeSetting={changeSetting} /></div>
                <div className="image-width-slider"><Slider minSetting="0" maxSetting="150" initialValue={jsonSettings["CharacterWidth"]} settingName="CharacterWidth" changeSetting={changeSetting} /></div>
                <div className="image-height-slider"><Slider minSetting="0" maxSetting="150" initialValue={jsonSettings["CharacterHeight"]} settingName="CharacterHeight" changeSetting={changeSetting} /></div>
            </div>
        </div>
    );
};

export default RenderAllFields;