import React, { useState, useEffect } from "react";

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
            <div id="position-description-first-line"><p><span id="position-text">Position </span>{jsonSettings["Position1"]}</p></div>
            <div className="position-description"><p>{jsonSettings["Position2"]}</p></div>
        </div>
    )
}

function RenderResidenceDescription(props) {
    const jsonSettings=props.jsonSettings;
    
    return (
        <div className="residence-description-container">
            <div id="residence-description-first-line"><p><span id="residence-text">Residence </span>{jsonSettings["Residence1"]}</p></div>
            <div className="residence-description"><p>{jsonSettings["Residence2"]}</p></div>
        </div>
    )
}

function RenderAlignment(props) {
    const jsonSettings=props.jsonSettings;
    
    return (
        <div className="alignment-container">
            <div className="alignment-label"><p><span id="alignment-text">Alignment </span><span id="input-alignment-label">{jsonSettings["AlignmentText"]}</span></p></div>
            <div className="karma-value"><p><span>{"["}</span>Karma Value: {jsonSettings["KarmaValue"]}<span>{"]"}</span></p></div>
        </div>
    )
}

function RenderClassLevels(props) {
    const jsonSettings=props.jsonSettings;
    const numVisibleRacialClasses=jsonSettings["VisibleRacialClasses"] || 0;
    const numVisibleJobClasses=jsonSettings["VisibleJobClasses"] || 0;

    const jobLevel1=jsonSettings["JobLevel1"];
    const jobLevel2=jsonSettings["JobLevel2"];
    const jobLevel3=jsonSettings["JobLevel3"];
    const jobLevel4=jsonSettings["JobLevel4"];
    const jobLevel5=jsonSettings["JobLevel5"];
    const jobLevel6=jsonSettings["JobLevel6"];
    const jobLevel7=jsonSettings["JobLevel7"];
    const jobLevel8=jsonSettings["JobLevel8"];

    const jobOthers=jsonSettings["JobOthers"] || false;

    const raceLevel1=jsonSettings["RaceLevel1"];
    const raceLevel2=jsonSettings["RaceLevel2"];
    const raceLevel3=jsonSettings["RaceLevel3"];
    const raceLevel4=jsonSettings["RaceLevel4"];
    const raceLevel5=jsonSettings["RaceLevel5"];
    const raceLevel6=jsonSettings["RaceLevel6"];
    const raceLevel7=jsonSettings["RaceLevel7"];
    const raceLevel8=jsonSettings["RaceLevel8"];

    const raceOthers=jsonSettings["RaceOthers"] || false;

    const [numClassLines, setNumClassLines] = useState(0);

    useEffect(() => {
        const totalLines = numVisibleRacialClasses + numVisibleJobClasses + (raceOthers ? 1 : 0) + (jobOthers ? 1 : 0);
        setNumClassLines(totalLines);
    }, [numVisibleRacialClasses, numVisibleJobClasses, raceOthers, jobOthers]);

    return (
        <div className="class-levels-container">
            <div className="racial-container">
                <div className="racial-types-container">
                    {numVisibleRacialClasses >= 1 ? <div className="racial-type-1"><p><span id="racial-levels-text">Racial Levels </span><span id="racial-level-1-text">{jsonSettings["RaceClass1"]}</span></p></div> : <div></div>}
                    {numVisibleRacialClasses >= 2 ? <div className="racial-type-2"><p>{jsonSettings["RaceClass2"]}</p></div> : <div></div>}
                    {numVisibleRacialClasses >= 3 ? <div className="racial-type-3"><p>{jsonSettings["RaceClass3"]}</p></div> : <div></div>}
                    {numVisibleRacialClasses >= 4 ? <div className="racial-type-4"><p>{jsonSettings["RaceClass4"]}</p></div> : <div></div>}
                    {numVisibleRacialClasses >= 5 ? <div className="racial-type-5"><p>{jsonSettings["RaceClass5"]}</p></div> : <div></div>}
                    {numVisibleRacialClasses >= 6 ? <div className="racial-type-6"><p>{jsonSettings["RaceClass6"]}</p></div> : <div></div>}
                    {numVisibleRacialClasses >= 7 ? <div className="racial-type-7"><p>{jsonSettings["RaceClass7"]}</p></div> : <div></div>}
                    {numVisibleRacialClasses >= 8 ? <div className="racial-type-8"><p>{jsonSettings["RaceClass8"]}</p></div> : <div></div>}
                    {raceOthers ? <div className="racial-type-last"><p>Others<span className="last-filler">■■■■■■■■■■■■■■■■■■■■■■■■■■</span></p></div> : <div></div>}
                </div>
                <div className="racial-levels-container">
                    {numVisibleRacialClasses >= 1 ? <div className="racial-levels"><p><span className="level-text-H">lvl</span><span className="lvl-num-H">{raceLevel1}</span></p></div> : <div><p></p></div>}
                    {numVisibleRacialClasses >= 2 ? <div className="racial-levels"><p><span className="level-text-H">lvl</span><span className="lvl-num-H">{raceLevel2}</span></p></div> : <div><p></p></div>}
                    {numVisibleRacialClasses >= 3 ? <div className="racial-levels"><p><span className="level-text-H">lvl</span><span className="lvl-num-H">{raceLevel3}</span></p></div> : <div><p></p></div>}
                    {numVisibleRacialClasses >= 4 ? <div className="racial-levels"><p><span className="level-text-H">lvl</span><span className="lvl-num-H">{raceLevel4}</span></p></div> : <div><p></p></div>}
                    {numVisibleRacialClasses >= 5 ? <div className="racial-levels"><p><span className="level-text-H">lvl</span><span className="lvl-num-H">{raceLevel5}</span></p></div> : <div><p></p></div>}
                    {numVisibleRacialClasses >= 6 ? <div className="racial-levels"><p><span className="level-text-H">lvl</span><span className="lvl-num-H">{raceLevel6}</span></p></div> : <div><p></p></div>}
                    {numVisibleRacialClasses >= 7 ? <div className="racial-levels"><p><span className="level-text-H">lvl</span><span className="lvl-num-H">{raceLevel7}</span></p></div> : <div><p></p></div>}
                    {numVisibleRacialClasses >= 8 ? <div className="racial-levels"><p><span className="level-text-H">lvl</span><span className="lvl-num-H">{raceLevel8}</span></p></div> : <div><p></p></div>}
                </div>
            </div>
            <div className="job-class-container">
                <div className="job-class-type-container" style={{top: `calc(30.2em + ${raceOthers ? '1.75em + ' : ''}1.9em * ${numVisibleRacialClasses})`}}>
                    {numVisibleJobClasses >= 1 ? <div className="job-class-1"><p><span id="class-levels-text">Class Levels </span><span id="job-class-1-text">{jsonSettings["JobClass1"]}</span></p></div> : <div></div>}
                    {numVisibleJobClasses >= 2 ? <div className="job-class-2"><p>{jsonSettings["JobClass2"]}</p></div> : <div></div>}
                    {numVisibleJobClasses >= 3 ? <div className="job-class-3"><p>{jsonSettings["JobClass3"]}</p></div> : <div></div>}
                    {numVisibleJobClasses >= 4 ? <div className="job-class-4"><p>{jsonSettings["JobClass4"]}</p></div> : <div></div>}
                    {numVisibleJobClasses >= 5 ? <div className="job-class-5"><p>{jsonSettings["JobClass5"]}</p></div> : <div></div>}
                    {numVisibleJobClasses >= 6 ? <div className="job-class-6"><p>{jsonSettings["JobClass6"]}</p></div> : <div></div>}
                    {numVisibleJobClasses >= 7 ? <div className="job-class-7"><p>{jsonSettings["JobClass7"]}</p></div> : <div></div>}
                    {numVisibleJobClasses >= 8 ? <div className="job-class-8"><p>{jsonSettings["JobClass8"]}</p></div> : <div></div>}
                    {jobOthers ? <div className="job-class-last"><p>Others<span className="last-filler">■■■■■■■■■■■■■■■■■■■■■■■</span></p></div> : <div></div>}
                    {Array.from({ length: 8 - numClassLines }, (_, index) => (<div key={index} className="class-levels-footer"><p className="last-filler">■■■■■■■■■■■■■■■■■■■■■■■■■■</p></div>))}
                </div>
                <div className="job-class-levels-container" style={{top: `calc(30em + ${raceOthers ? '1.75em + ' : ''}1.9em * ${numVisibleRacialClasses})`}}>
                    {numVisibleJobClasses >= 1 ? <div className="job-class-levels"><p><span className="level-text-L">lvl</span><span className="lvl-num-L">{jobLevel1}</span></p></div> : <div><p></p></div>}
                    {numVisibleJobClasses >= 2 ? <div className="job-class-levels"><p><span className="level-text-L">lvl</span><span className="lvl-num-L">{jobLevel2}</span></p></div> : <div><p></p></div>}
                    {numVisibleJobClasses >= 3 ? <div className="job-class-levels"><p><span className="level-text-L">lvl</span><span className="lvl-num-L">{jobLevel3}</span></p></div> : <div><p></p></div>}
                    {numVisibleJobClasses >= 4 ? <div className="job-class-levels"><p><span className="level-text-L">lvl</span><span className="lvl-num-L">{jobLevel4}</span></p></div> : <div><p></p></div>}
                    {numVisibleJobClasses >= 5 ? <div className="job-class-levels"><p><span className="level-text-L">lvl</span><span className="lvl-num-L">{jobLevel5}</span></p></div> : <div><p></p></div>}
                    {numVisibleJobClasses >= 6 ? <div className="job-class-levels"><p><span className="level-text-L">lvl</span><span className="lvl-num-L">{jobLevel6}</span></p></div> : <div><p></p></div>}
                    {numVisibleJobClasses >= 7 ? <div className="job-class-levels"><p><span className="level-text-L">lvl</span><span className="lvl-num-L">{jobLevel7}</span></p></div> : <div><p></p></div>}
                    {numVisibleJobClasses >= 8 ? <div className="job-class-levels"><p><span className="level-text-L">lvl</span><span className="lvl-num-L">{jobLevel8}</span></p></div> : <div><p></p></div>}
                </div>
            </div>
        </div>
    )
}

function RenderAcquiredLevels(props) {
    const jsonSettings=props.jsonSettings;
    
    return (
        <div className="levels-container">
            <div className="total-acquired-levels"><p>{"[Racial Levels] + [Class Levels] = "}{jsonSettings["TotalLevels"]} Total Levels</p></div>
            <div className="total-racial-job-levels-text"><p><span id="total-racial-levels-text">Racial Levels</span><span id="total-job-levels-text">Class Levels</span></p></div>
            <div className="acquired-racial-levels"><p>{jsonSettings["TotalRaceLevels"]} acquired total</p></div>
            <div className="acquired-job-class-levels"><p>{jsonSettings["TotalJobLevels"]} acquired total</p></div>
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
            <RenderClassLevels jsonSettings={jsonSettings}/>
            <RenderAcquiredLevels jsonSettings={jsonSettings}/>
        </div>
    )
}

export default RenderAllText;