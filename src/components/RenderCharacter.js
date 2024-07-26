import React from "react";
import character from '../images/default_character.png';

function RenderCharacter(props) {
    const jsonSettings=props.jsonSettings;
    const xpos=jsonSettings["CharacterXpos"];
    const ypos=jsonSettings["CharacterYpos"];
    const width=jsonSettings["CharacterWidth"];
    const height=jsonSettings["CharacterHeight"];

    return (
        <div className="character-container">
            <img className="character"
                src={character}
                alt="portrait of character"
                style={{left: `calc(${xpos - 29}rem + 50%)`, top: `${ypos}rem`, maxWidth: `${width}%`, height: `${height}%`}}
            />
        </div>
    );
};

export default RenderCharacter;