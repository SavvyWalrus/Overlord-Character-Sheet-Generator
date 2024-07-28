import React from "react";

function RenderHeader(props) {
    const jsonSettings=props.jsonSettings;
    
    return (
        <div className="header-container">
            <div className="sheet-type-label"><p>{jsonSettings["SheetType"]}</p></div>
            <div className="sheet-type-number"><p>{jsonSettings["SheetNum"]}</p></div>
            <div className="race-type"><p>{jsonSettings["RaceType"]}</p></div>
        </div>
    )
};

function RenderName(props) {
    const jsonSettings=props.jsonSettings;

    // Key must end with a number ; numbers each element className
    const renderNameWithSpan = (key) => {
        const name = jsonSettings[key];
        if (!name) return <p className="romanji-name"></p>;
        
        const upperName = name.toUpperCase();
        const firstLetter = upperName[0];
        const restOfName = upperName.slice(1);
        
        return (
            <div className={`romanji-name-${key[key.length - 1]}`}><p>{firstLetter}<span className="secondary-letters">{restOfName}</span></p></div>
        );
    };
    
    return (
        <div className="name-container">
            {renderNameWithSpan("RomanjiName1")}
            {renderNameWithSpan("RomanjiName2")}
            <div className="romanji-secondary-name"><p>{jsonSettings["RomanjiSecondaryName"]}</p></div>
            <div className="hiragana-name"><p>{jsonSettings["HiraganaName"]}</p></div>
            <div className="hiragana-secondary-name"><p>{jsonSettings["HiraganaSecondaryName"]}</p></div>
        </div>
    )
}

function RenderEpithet(props) {
    const jsonSettings=props.jsonSettings;
    
    return (
        <div className="epithet-container">
            <div className="epithet"><p>{jsonSettings["Epithet1"]}</p></div>
            <div className="epithet"><p>{jsonSettings["Epithet2"]}</p></div>
            <div className="epithet"><p>{jsonSettings["Epithet3"]}</p></div>
        </div>
    )
}

function RenderPositionDescription(props) {
    const jsonSettings=props.jsonSettings;
    
    return (
        <div className="position-description-container">
            <div className="position-description"><p>{jsonSettings["Position1"]}</p></div>
            <div className="position-description"><p>{jsonSettings["Position2"]}</p></div>
        </div>
    )
}

function RenderResidenceDescription(props) {
    const jsonSettings=props.jsonSettings;
    
    return (
        <div className="residence-description-container">
            <div className="residence-description"><p>{jsonSettings["Residence1"]}</p></div>
            <div className="residence-description"><p>{jsonSettings["Residence2"]}</p></div>
        </div>
    )
}

function RenderAlignment(props) {
    const jsonSettings=props.jsonSettings;
    
    return (
        <div className="alignment-container">
            <div className="alignment-label"><p>{jsonSettings["AlignmentText"]}</p></div>
            <div className="karma-value"><p>{jsonSettings["KarmaValue"]}</p></div>
        </div>
    )
}

function RenderRacials(props) {
    const jsonSettings=props.jsonSettings;
    const raceClass1=jsonSettings["RaceClass1"]
    const raceClass2=jsonSettings["RaceClass2"]
    const raceClass3=jsonSettings["RaceClass3"]
    const raceLevel1=jsonSettings["RaceLevel1"]
    const raceLevel2=jsonSettings["RaceLevel2"]
    const raceLevel3=jsonSettings["RaceLevel3"]
    const others=jsonSettings["RaceOthers"];
    
    return (
        <div className="racial-container">
            <div className="racial-types-container">
                <div className="racial-type-1"><p>{jsonSettings["RaceClass1"]}</p></div>
                <div className="racial-type-2"><p>{jsonSettings["RaceClass2"]}</p></div>
                <div className="racial-type-3"><p>{jsonSettings["RaceClass3"]}</p></div>
                {others ? <div className="racial-type-last"><p>Others<span className="last-filler">■■■■■■■■■■■■■■■■■■■■■■■</span></p></div> : <div className="last-filler"><p>■■■■■■■■■■■■■■■■■■■■■■■■■■</p></div>}
                {!raceClass1 || !raceClass2 || !raceClass3 ? <div className="last-filler"><p>■■■■■■■■■■■■■■■■■■■■■■■■■■</p></div> : <div><p></p></div>}
                {!raceClass1 && !raceClass2 && !raceClass3 ? <div className="last-filler"><p>■■■■■■■■■■■■■■■■■■■■■■■■■■</p></div> : <div><p></p></div>}
            </div>
            <div className="racial-levels-container">
                {raceClass1 ? <div className="racial-levels"><p><span className="level-text-H">lvl</span><span className="lvl-num-H">{raceLevel1}</span></p></div> : <div><p></p></div>}
                {raceClass2 ? <div className="racial-levels"><p><span className="level-text-H">lvl</span><span className="lvl-num-H">{raceLevel2}</span></p></div> : <div><p></p></div>}
                {raceClass3 ? <div className="racial-levels"><p><span className="level-text-H">lvl</span><span className="lvl-num-H">{raceLevel3}</span></p></div> : <div><p></p></div>}
            </div>
        </div>
    )
}

function RenderJobClasses(props) {
    const jsonSettings=props.jsonSettings;
    const jobClass1=jsonSettings["JobClass1"]
    const jobClass2=jsonSettings["JobClass2"]
    const jobClass3=jsonSettings["JobClass3"]
    const jobLevel1=jsonSettings["JobLevel1"]
    const jobLevel2=jsonSettings["JobLevel2"]
    const jobLevel3=jsonSettings["JobLevel3"]
    const others=jsonSettings["JobOthers"];
    
    return (
        <div className="job-class-container">
            <div className="job-class-type-container">
                <div className="job-class-1"><p>{jsonSettings["JobClass1"]}</p></div>
                <div className="job-class-2"><p>{jsonSettings["JobClass2"]}</p></div>
                <div className="job-class-3"><p>{jsonSettings["JobClass3"]}</p></div>
                {others ? <div className="job-class-last"><p>Others<span className="last-filler">■■■■■■■■■■■■■■■■■■■■■■■</span></p></div> : <div className="last-filler"><p>■■■■■■■■■■■■■■■■■■■■■■■■■■</p></div>}
                {!jobClass1 || !jobClass2 || !jobClass3 ? <div className="last-filler"><p>■■■■■■■■■■■■■■■■■■■■■■■■■■</p></div> : <div><p></p></div>}
                {!jobClass1 && !jobClass2 && !jobClass3 ? <div className="last-filler"><p>■■■■■■■■■■■■■■■■■■■■■■■■■■</p></div> : <div><p></p></div>}
            </div>
            <div className="job-class-levels-container">
                {jobClass1 ? <div className="job-class-levels"><p><span className="level-text-L">lvl</span><span className="lvl-num-L">{jobLevel1}</span></p></div> : <div><p></p></div>}
                {jobClass2 ? <div className="job-class-levels"><p><span className="level-text-L">lvl</span><span className="lvl-num-L">{jobLevel2}</span></p></div> : <div><p></p></div>}
                {jobClass3 ? <div className="job-class-levels"><p><span className="level-text-L">lvl</span><span className="lvl-num-L">{jobLevel3}</span></p></div> : <div><p></p></div>}
                <div className="job-class-levels"></div>
            </div>
        </div>
    )
}

function RenderAcquiredLevels(props) {
    const jsonSettings=props.jsonSettings;
    
    return (
        <div className="levels-container">
            <div className="total-acquired-levels"><p>{jsonSettings["TotalLevels"]}</p></div>
            <div className="acquired-racial-levels"><p>{jsonSettings["TotalRaceLevels"]}</p></div>
            <div className="acquired-job-class-levels"><p>{jsonSettings["TotalJobLevels"]}</p></div>
        </div>
    )
}

function RenderAllText(props) {
    const jsonSettings = props.jsonSettings;

    return (
        <div className="character-sheet-subcontainer">
            <RenderHeader jsonSettings={jsonSettings}/>
            <RenderName jsonSettings={jsonSettings}/>
            <RenderEpithet jsonSettings={jsonSettings}/>
            <RenderPositionDescription jsonSettings={jsonSettings}/>
            <RenderResidenceDescription jsonSettings={jsonSettings}/>
            <RenderAlignment jsonSettings={jsonSettings}/>
            <RenderRacials jsonSettings={jsonSettings}/>
            <RenderJobClasses jsonSettings={jsonSettings}/>
            <RenderAcquiredLevels jsonSettings={jsonSettings}/>
        </div>
    )
}

export default RenderAllText;