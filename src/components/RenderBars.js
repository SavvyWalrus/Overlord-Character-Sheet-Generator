import React from "react";

function StatBar({ label, value=0, maxValue=100 }) {
    const percentage = (value / maxValue) * 100;

    return (
        <div className={`stat-bar ${label}`}>
            <div 
                className="stat-bar-fill" 
                style={{ width: `${percentage}%` }}
            ></div>
        </div>
    );
};

function RacialLevelBar({ value=0, maxValue=100 }) {
    const percentage = (value / maxValue) * 100;

    return (
        <div className={`racial-level-bar`}>
            <div 
                className="racial-level-bar-fill" 
                style={{ width: `${percentage}%` }}
            ></div>
        </div>
    );
};

function JobLevelBar({ value=0, maxValue=100 }) {
    const percentage = (value / maxValue) * 100;

    return (
        <div className={`job-level-bar`}>
            <div 
                className="job-level-bar-fill" 
                style={{ width: `${percentage}%`}}
            ></div>
        </div>
    );
};

function RenderBars(props) {
    const jsonSettings=props.jsonSettings;

    return (
        <div className="character-sheet-subcontainer">
            <div className="stat-bar-container">
                <StatBar label='hp' value={jsonSettings["HP"]} maxValue={100} />
                <StatBar label='mp' value={jsonSettings["MP"]} maxValue={100} />
                <StatBar label='phy-atk' value={jsonSettings["PhysicalAttack"]} maxValue={100} />
                <StatBar label='phy-def' value={jsonSettings["PhysicalDefense"]} maxValue={100} />
                <StatBar label='agility' value={jsonSettings["Agility"]} maxValue={100} />
                <StatBar label='mag-atk' value={jsonSettings["MagicAttack"]} maxValue={100} />
                <StatBar label='mag-def' value={jsonSettings["MagicDefense"]} maxValue={100} />
                <StatBar label='resist' value={jsonSettings["Resistance"]} maxValue={100} />
                <StatBar label='special' value={jsonSettings["Special"]} maxValue={100} />
            </div>
            <div className="total-levels-bar">
                <RacialLevelBar value={jsonSettings["TotalRaceLevels"]} />
                <JobLevelBar value={jsonSettings["TotalJobLevels"]} />
            </div>
        </div>
    );
};

export default RenderBars;
