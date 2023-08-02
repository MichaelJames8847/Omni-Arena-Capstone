// component for editing character in API 
// fetch character state and use PUT method to post updated 
// character object to API

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./CharacterEdit.css"

export const CharacterEdit = () => {
    const [characters, setCharacters] = useState([])
    const [selectedCharacterId, setSelectedCharacterId] = useState(null)
    const [character, assignCharacter] = useState({ // character state object for editing
        bioPic: "",
        info: "",
        powerSet: {
            powers: []
        }
    })

    const navigate = useNavigate()

    useEffect( // fetch character state, expanding with universes and powersets
        () => {
            fetch(`http://localhost:8088/characters?_expand=powerSet&_expand=universe`)
            .then(res => res.json())
            .then((data) => setCharacters(data))
        },
        []
    )

    useEffect( // fetch the selected character data from API when selectedCharacterId changes
        () => {
            if (selectedCharacterId) {
                fetch(`http://localhost:8088/characters/${selectedCharacterId}?_expand=powerSet&_expand=universe`)
                .then(res => res.json())
                .then((data) => {
                    assignCharacter(data)
                })
            }
        },
        [selectedCharacterId]
    )

        // event handler to update the character data in the API

    const handleUpdateCharacterClick = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8088/characters/${selectedCharacterId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(character)
        })

            .then(res => res.json())
            .then(() => {
                navigate("/characters")
            })
    }

    //Event handler to update the selected character ID when a character is selected from the dropdown
    
    const handleCharacterSelection = (event) => {
        const selectedCharacterId = parseInt(event.target.value)
        setSelectedCharacterId(selectedCharacterId)

        // Find and set character data for selected character from dropdown
        const selectedCharacter = characters.find((character) => character.id === selectedCharacterId)
        assignCharacter(selectedCharacter)
    }

    return (
        <form className="characterEditForm">
            <h2 className="characterForm_title">Characters</h2>
            <div className="form_group">
                <label htmlFor="characterSelect">Select a Character:</label>
                <select id="characterSelect" onChange={handleCharacterSelection} value={selectedCharacterId || ""}>
                    <option value="">Select a character</option>
                    {characters.map((character) => (
                        <option key={character.id} value={character.id}>
                            {character.name}
                        </option>
                    ))}
                </select>
            </div>

            {selectedCharacterId && (
                <div>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="bioPic">Character Portrait:</label>
                            <input 
                            type="url" 
                            id="bioPic"
                            value={character.bioPic}
                            onChange={(evt) => 
                                assignCharacter({...character, bioPic: evt.target.value})}
                                />
                        </div>
                    </fieldset>
                    <img src={character.bioPic} className="characterPortrait" />
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="info">Character Info:</label>
                            <textarea 
                            required autoFocus
                            type="text"
                            style={{ height: "7rem", width: "25rem"}}
                            className="form-control"
                            value={character.info}
                            onChange={(event) => assignCharacter({...character, info: event.target.value})}
                            />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="powers">Character Powers:</label>
                            <ul>
                                {character.powerSet?.powers.map((power, index) => (
                                    <li key={index}>
                                        <input 
                                        type="text"
                                        value={power}
                                        onChange={(event) => {
                                            const updatedPowers = [...character.powerSet.powers]
                                            updatedPowers[index] = event.target.value 
                                            assignCharacter({
                                                ...character,
                                                powerSet: {
                                                    ...character.powerSet,
                                                    powers: updatedPowers
                                                },
                                            })
                                        }}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </fieldset>
                    <button onClick={handleUpdateCharacterClick} className="btn btn-primary">
                        Save Updates
                    </button>
                </div>
            )}
        </form>
    )
}