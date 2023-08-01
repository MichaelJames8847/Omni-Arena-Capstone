// module for viewing a list of all currently stored characters, and have them sorted by relative universe
// first fetch state of intial state of characters to be displayed 
// expand to include relative universe and powersets
// and then map over characters and render in html format

import "./CharacterList.css"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const CharacterList = () => {
    const [characters, setCharacters] = useState([])
    const [sortedCharacters, setSortedCharacters] = useState([])
    const [universes, setUniverses] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/universes`) // fetch list of universes
            .then(res => res.json())
            .then((universeArray) => {
                setUniverses(universeArray)
            })
        },
        [] // initial universe state
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/characters?_expand=powerSet&_expand=universe`) // fetch lists of characters with universes and powerSets expanded
            .then(res => res.json())
            .then((charactersArray) => {
                setCharacters(charactersArray)
            })
        },
        [] // initial characters state
    )

    useEffect(
        () => {
            const sortedChars = characters.sort((a, b) => a.universeId - b.universeId) // sort characters by universe
            setSortedCharacters(sortedChars)
        },
        [characters]
    )

        const handleDeleteCharacter = (characterId) => {

            const confirmDelete = window.confirm( // window alert, confirm if user wants to delete custom character
                "Are you sure you want to delete this custom character?"
            )

            if (!confirmDelete) {
                return
            }

            fetch(`http://localhost:8088/characters/${characterId}`, { // send delete request to remove custom character from API
                method: "DELETE",
            })
            .then(res => res.json())
            .then((data) => {
                setCharacters((prevCharacters) => 
                prevCharacters.filter((character) => character.id !== characterId))
            }) 
        }

   return ( // JSX rendering 
    <>
        <h2>Fighters by Universe</h2>

        <article className="universes">
            {universes.map((universe) => (
                <div key={`universe--${universe.id}`}>
                    <img src={universe.universeImage} alt={universe.universeName} />
                    <h3>{universe.universeName}</h3>
                    {characters
                    .filter((character) => character.universeId === universe.id)
                    .map((character) => (
                        <section className="character" key={`character--${character.id}`}>
                            <Link to={`/characters/${character.id}`}>
                            <header>{character.name}</header>
                            </Link>
                            {character.isUserCreated && (
                                <button onClick={() => handleDeleteCharacter(character.id)}>
                                    Delete Custom Character
                                </button>
                            )}
                        </section>
                    ))}
                </div>
            ))}
        </article>
    </>
   )
}
   

