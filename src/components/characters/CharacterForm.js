// Component for creating a new character to be added to the list of 
// characters to view and to select to battle 
// fetch characters, create new state character object 
// create save click event that will POST the new character to the API 
// return JSX for app display page

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const CharacterForm = () => {
    const [characters, setCharacters] = useState([])
    const [universes, setUniverses] = useState([])

    useEffect( // fetch universes state 
        () => {
            fetch(`http://localhost:8088/universes`)
            .then(res => res.json())
            .then((universeArray) => {
                setUniverses(universeArray)
            })
        },
        [] // initial universe state
    )

    useEffect( // fetch characters state, expanding with powerSet and universe foreign keys/properties
        () => {
            fetch(`http://localhost:8088/characters?_expand=powerSet&_expand=universe`)
                .then(res => res.json())
                .then((characterArray) => {
                    setCharacters(characterArray)
                })
        },
        []
    )

    const [character, update] = useState({ // create empty state object with matching properties
        name: "",
        bioPic: "",
        info: "",
        universeId: 0,
        powerSetId: 0
    })

    const navigate = useNavigate()


    // save button function for sending custom created character to API,
    // including new isUserCreated boolean property for deletion functionality
    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const characterToSendToAPI = {
            name: character.name,
            bioPic: character.bioPic,
            info: character.info,
            universeId: character.universeId,
            powerSetId: character.powerSetId,
            isUserCreated: true
        }

        // POST created character to API
        return fetch(`http://localhost:8088/characters`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(characterToSendToAPI)
        })
            .then(res => res.json())
            .then(() => {
                navigate("/characters")
            })
    }

    // JSX rendering 
    return (
        <form className="characterForm">
            <h2 className="characterForm_title">New Character Form</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="Name">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        style={{ height: "1rem", width: "15rem"}}
                        className="form-control"
                        placeholder="Input new character name"
                        value={character.name}
                        onChange={
                            (event) => {
                                const copy = { ...character } // create copy of character object
                                copy.name = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="bioPic">Character Portrait:</label>
                    <input
                        type="url"
                        style={{ width: "25rem"}}
                        id="bioPic"
                        value={character.bioPic}
                        onChange={
                            (event) => {
                                const copy = { ...character }
                                copy.bioPic = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="bioPic">Character Info:</label>
                    <input
                        required autoFocus
                        type="text"
                        style={{ height: "7rem", width: "25rem"}}
                        className="form-control"
                        placeholder="Give a brief description of the new character"
                        value={character.info}
                        onChange={
                            (event) => {
                                const copy = { ...character }
                                copy.info = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="universe">Select Universe:</label>
                    <select
                        id="universe"
                        value={character.universeId}
                        onChange={
                            (event) => {
                                const copy = { ...character }
                                copy.universeId = parseInt(event.target.value)
                                update(copy)
                            }
                        } >
                        <option value="0">Universes</option>
                        {universes.map((universe) => (
                            <option key={`universe--${universe.id}`} value={universe.id}>
                                {universe.universeName}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="powerSet">Select Power Set:</label>
                    <select
                        id="powerSet"
                        value={character.powerSetId}
                        onChange={(event) => {
                            const copy = { ...character };
                            copy.powerSetId = parseInt(event.target.value);
                            update(copy);
                        }}
                    >
                        <option value="0">Select an option</option>
                        {characters.map((character) => (
                            <option key={character.powerSet.id} value={character.powerSet.id}>
                                {character.powerSet.description}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                    Submit Custom Character
            </button>
        </form>
    )
}