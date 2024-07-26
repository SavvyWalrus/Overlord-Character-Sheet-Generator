import React from "react";

function RenderHeader(props) {
    const jsonSettings=props.jsonSettings;
    
    return (
        <div className="header-container">
            <p className="sheet-type-label">{jsonSettings["SheetType"]}</p>
            <p className="sheet-type-number">{jsonSettings["SheetNum"]}</p>
            <p className="race-type">{jsonSettings["RaceType"]}</p>
        </div>
    )
};

function RenderName(props) {
    const jsonSettings=props.jsonSettings;

    const renderNameWithSpan = (name) => {
        if (!name) return <p className="romanji-name"></p>;
        
        const upperName = name.toUpperCase();
        const firstLetter = upperName[0];
        const restOfName = upperName.slice(1);
        
        return (
            <p className="romanji-name">{firstLetter}<span className="secondary-letters">{restOfName}</span></p>
        );
    };
    
    return (
        <div className="name-container">
            {renderNameWithSpan(jsonSettings["RomanjiName"])}
            <p className="romanji-secondary-name">{jsonSettings["RomanjiSecondaryName"]}</p>
            <p className="hiragana-name">{jsonSettings["HiraganaName"]}</p>
            <p className="hiragana-secondary-name">{jsonSettings["HiraganaSecondaryName"]}</p>
        </div>
    )
}

function RenderEpithet(props) {
    const jsonSettings=props.jsonSettings;
    
    return (
        <div className="epithet-container">
            <p className="epithet">{jsonSettings["Epithet1"]}</p>
            <p className="epithet">{jsonSettings["Epithet2"]}</p>
            <p className="epithet">{jsonSettings["Epithet3"]}</p>
        </div>
    )
}

function RenderPositionDescription(props) {
    const jsonSettings=props.jsonSettings;
    
    return (
        <div className="position-description-container">
            <p className="position-description">{jsonSettings["Position1"]}</p>
            <p className="position-description">{jsonSettings["Position2"]}</p>
        </div>
    )
}

function RenderResidenceDescription(props) {
    const jsonSettings=props.jsonSettings;
    
    return (
        <div className="residence-description-container">
            <p className="residence-description">{jsonSettings["Residence1"]}</p>
            <p className="residence-description">{jsonSettings["Residence2"]}</p>
        </div>
    )
}

function RenderAlignment(props) {
    const jsonSettings=props.jsonSettings;
    
    return (
        <div className="alignment-container">
            <p className="alignment-label">{jsonSettings["AlignmentText"]}</p>
            <p className="karma-value">{jsonSettings["KarmaValue"]}</p>
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
                <p className="racial-type-1">{jsonSettings["RaceClass1"]}</p>
                <p className="racial-type-2">{jsonSettings["RaceClass2"]}</p>
                <p className="racial-type-3">{jsonSettings["RaceClass3"]}</p>
                {others ? <p className="racial-type-last">Others<span className="last-filler">■■■■■■■■■■■■■■■■■■■■■■■</span></p> : <p className="last-filler">■■■■■■■■■■■■■■■■■■■■■■■■■■</p>}
                {!raceClass1 || !raceClass2 || !raceClass3 ? <p className="last-filler">■■■■■■■■■■■■■■■■■■■■■■■■■■</p> : <p></p>}
                {!raceClass1 && !raceClass2 && !raceClass3 ? <p className="last-filler">■■■■■■■■■■■■■■■■■■■■■■■■■■</p> : <p></p>}
            </div>
            <div className="racial-levels-container">
                {raceClass1 ? <p className="racial-levels"><span className="level-text">lvl</span><span className="lvl-num">{raceLevel1}</span></p> : <p></p>}
                {raceClass2 ? <p className="racial-levels"><span className="level-text">lvl</span><span className="lvl-num">{raceLevel2}</span></p> : <p></p>}
                {raceClass3 ? <p className="racial-levels"><span className="level-text">lvl</span><span className="lvl-num">{raceLevel3}</span></p> : <p></p>}
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
                <p className="job-class-1">{jsonSettings["JobClass1"]}</p>
                <p className="job-class-2">{jsonSettings["JobClass2"]}</p>
                <p className="job-class-3">{jsonSettings["JobClass3"]}</p>
                {others ? <p className="job-class-last">Others<span className="last-filler">■■■■■■■■■■■■■■■■■■■■■■■</span></p> : <p className="last-filler">■■■■■■■■■■■■■■■■■■■■■■■■■■</p>}
                {!jobClass1 || !jobClass2 || !jobClass3 ? <p className="last-filler">■■■■■■■■■■■■■■■■■■■■■■■■■■</p> : <p></p>}
                {!jobClass1 && !jobClass2 && !jobClass3 ? <p className="last-filler">■■■■■■■■■■■■■■■■■■■■■■■■■■</p> : <p></p>}
            </div>
            <div className="job-class-levels-container">
                {jobClass1 ? <div className="job-class-levels"><span className="level-text">lvl</span><span className="lvl-num">{jobLevel1}</span></div> : <div></div>}
                {jobClass2 ? <div className="job-class-levels"><span className="level-text">lvl</span><span className="lvl-num">{jobLevel2}</span></div> : <div></div>}
                {jobClass3 ? <div className="job-class-levels"><span className="level-text">lvl</span><span className="lvl-num">{jobLevel3}</span></div> : <div></div>}
                <div className="job-class-levels"></div>
            </div>
        </div>
    )
}

function RenderAcquiredLevels(props) {
    const jsonSettings=props.jsonSettings;
    
    return (
        <div className="levels-container">
            <p className="total-acquired-levels">{jsonSettings["TotalLevels"]}</p>
            <p className="acquired-racial-levels">{jsonSettings["TotalRaceLevels"]}</p>
            <p className="acquired-job-class-levels">{jsonSettings["TotalJobLevels"]}</p>
        </div>
    )
}

function RenderAllText(props) {
    const jsonSettings = props.jsonSettings;

    return (
        <div>
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