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
                style={{left: `calc(${xpos / 15 - 18}em + 50%)`, top: `${ypos / 15 + 4.96}em`, width: `${width / 8 + 14.8}em`, height: `${height / 5 + 45}em`}}
            />
        </div>
    );
};

export default RenderCharacter;