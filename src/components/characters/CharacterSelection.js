import { useEffect, useState } from "react"
import "./CharacterSelection.css"

export const BattlePage = () => {
    const [characters, setCharacters] = useState([])
    // state to hold user selected characters for the battle 
    const [character1, setCharacter1] = useState(null)
    const [character2, setCharacter2] = useState(null)
    // state to store the winner of the battle 
    const [winner, setWinner] = useState(null)
    const [animationInProgress, setAnimationInProgress] = useState(false)
    const [showModal, setShowModal] = useState(false)

    useEffect( // fetch characters with universe and powerset expanded
        () => {
            fetch(`http://localhost:8088/characters?_expand=powerSet&_expand=universe`)
                .then(res => res.json())
                .then((data) => {
                    setCharacters(data)
                    //console.log(data)
                })
        },
        []
    )

    // event handler to select characters for the battle

    const handleCharacter1Select = (event) => {
        const selectedCharacterId = parseInt(event.target.value)
        const selectedCharacter = characters.find(
            (character) => character.id === selectedCharacterId
        )
        setCharacter1(selectedCharacter)
    }
    const handleCharacter2Select = (event) => {
        const selectedCharacterId = parseInt(event.target.value)
        const selectedCharacter = characters.find(
            (character) => character.id === selectedCharacterId
        )
        setCharacter2(selectedCharacter)
    }

    // event handler to determine winner of battle 
    const handleBeginBattle = () => {
        if (character1 && character2) {
            setAnimationInProgress(true)
            setShowModal(true)

            setTimeout(() => {
                // variables for storing selected character powerLevels
                const powerLevelCharacter1 = character1.powerSet.powerLevel
                const powerLevelCharacter2 = character2.powerSet.powerLevel

                // // variable for winning character, value is if character 1 powerLevel is higher than character2's
                const winningCharacter =
                    powerLevelCharacter1 > powerLevelCharacter2

                        ? character1
                        : character2

                setWinner(winningCharacter)
                setTimeout(() => {
                    setShowModal(false)
                    setAnimationInProgress(false)
                }, 1000)
            }, 5000)
        }
    }

    return (
        <div className="character-select">
            <h2>Choose your combatants</h2>
            <select className="select" onChange={handleCharacter1Select}>
                <option value="0">Choose your first fighter...</option>
                {characters.map(character => (
                    <option key={character.id} value={character.id}>
                        {character.name}
                    </option>
                ))}
            </select>
            <select className="select" onChange={handleCharacter2Select}>
                <option value="0">Choose your second fighter...</option>
                {characters.map(character => (
                    <option key={character.id} value={character.id}>
                        {character.name}
                    </option>
                ))}
            </select>
            <button className="button" onClick={handleBeginBattle} disabled={!character1 || !character2 || animationInProgress}>
                Begin Battle
            </button>
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-content">
                            <p className="determining-text">Determining winner...</p>
                            <img
                                src="https://media.tenor.com/ukiEmBba_F8AAAAd/superman-vs-goku.gif"
                                alt="Fight animation"
                                className="fighting-gif"
                            />
                        </div>
                    </div>
                </div>
            )}
            {!showModal &&
                winner && (
                    <div className="winner-container">
                        <div className="winner">
                            <h2>Winner</h2>
                            <img src={winner.bioPic} alt={winner.bioPic} />
                            <p>{winner.name}</p>
                            <p>Power Level: {winner.powerSet.powerLevel} </p>
                            <h3>Powers:</h3>
                            <ul>
                                {winner.powerSet.powers.map((power, index) => (
                                    <li key={index}>{power}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )
            }
        </div>
    )
}