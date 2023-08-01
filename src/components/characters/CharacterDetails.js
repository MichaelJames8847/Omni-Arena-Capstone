// component to view details about each specific character 
// useParams to fetch data dependent on characterId 
// render in JSX

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"


export const CharacterDetails = () => {
    //extract characterId from url params
     const { characterId } = useParams()
     const [character, updateCharacter] = useState({}) // state to hold updated character object state
     const navigate = useNavigate()

    useEffect( // fetch character data, expanding on universe and powerset, particular to characterId
        () => {
            fetch(`http://localhost:8088/characters/${characterId}?_expand=powerSet&_expand=universe`)
            .then(res => res.json())
            .then((data) => {
                updateCharacter(data)
            })
        },
        [characterId]
    )

    return <section className="character">
        <header className="character_header">{character.name}</header>
        <img src={character.bioPic} alt={character.name} />
        <div>Info: {character.info}</div>
        <div>Powerset: {character?.powerSet?.description}</div>
        <div>Powers:
            <ul>
                {character.powerSet?.powers?.map((power) => (
                    <li key={power}>{power}</li>
                ))}
            </ul>
        </div>
    </section>
}