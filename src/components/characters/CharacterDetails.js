// component to view details about each specific character 
// useParams to fetch data dependent on characterId 
// render in JSX

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./CharacterDetails.css"


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

    return (
        <section className="characterDetails">
          <header className="character_header">
            <img src={character.bioPic} alt={character.name} />
            {character.name}
          </header>
          <div className="character_info">
            <div>
              <span>Info:</span>
            </div>
            <div>{character.info}</div>
            <div>
              <span>Powerset:</span> 
            </div>
            <div>{character?.powerSet?.description}</div>
            <div>
              <span>Powers:</span>
              <ul>
                {character.powerSet?.powers?.map((power) => (
                  <li key={power}>{power}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      );
}