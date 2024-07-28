import React from "react";

function RenderCharacter(props) {
    const jsonSettings=props.jsonSettings;
    const xpos=jsonSettings["CharacterXpos"];
    const ypos=jsonSettings["CharacterYpos"];
    const width=jsonSettings["CharacterWidth"];
    const height=jsonSettings["CharacterHeight"];
    const character=props.selectedCharacterImage;

    return (
        <div className="character-container">
            <img className="character"
                src={character}
                alt="portrait of character"
                style={{left: `calc(${xpos / 10 - 30}em + 50%)`, top: `${ypos / 10}em`, width: `${width / 2}em`, height: `${height / 1.6}em`}}
            />
        </div>
    );
};

export default RenderCharacter;