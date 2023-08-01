import { useEffect, useState } from "react"

export const BattlePage = () => {
    const [characters, setCharacters] = useState([])
    // state to hold user selected characters for the battle 
    const [character1, setCharacter1] = useState(null)
    const [character2, setCharacter2] = useState(null)
    // state to store the winner of the battle 
    const [winner, setWinner] = useState(null)

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
    // const handleCharacterSelect = (event) => {
    //     const selectedCharacterId = parseInt(event.target.value)
    //     const selectedCharacter = characters.find(character => character.id === selectedCharacterId)

    //     // assign characters to character1 and character 2 dependent on availability (cannot choose same character twice)
    //     if (!character1) {
    //         setCharacter1(selectedCharacter)
    //     } else {
    //         setCharacter2(selectedCharacter)
    //     }
    // }

    // event handler to determine winner of battle 
    const handleBeginBattle = () => {
        if (character1 && character2) {

            // variables for storing selected character powerLevels
            const powerLevelCharacter1 = character1.powerSet.powerLevel
            const powerLevelCharacter2 = character2.powerSet.powerLevel

            // variable for winning character, value is if character 1 powerLevel is higher than character2's
            const winningCharacter = powerLevelCharacter1 > powerLevelCharacter2
            // if returns true, character1 is the winner
            ? character1
            // if false, character2 is the winner
            : character2;

            //function for storing winning character
            setWinner(winningCharacter)
        }
    }

    return (
        <div>
            <h2>Choose your combatants</h2>
            <select onChange={handleCharacter1Select}>
                <option value="0">Choose your first fighter...</option>
                {characters.map(character => (
                    <option key={character.id} value={character.id}>
                        {character.name}
                    </option>
                ))}
            </select>
            <select onChange={handleCharacter2Select}>
                <option value="0">Choose your second fighter...</option>
                {characters.map(character => (
                    <option key={character.id} value={character.id}>
                        {character.name}
                    </option>
                ))}
            </select>
            {character1 && <p>Fighter 1: {character1.name}</p>}
            {character2 && <p>Fighter 2: {character2.name}</p>}
            <button onClick={handleBeginBattle} disabled={!character1 || !character2}>
                Begin Battle
            </button>
            {winner && (
                <div>
                    <h2>Winner</h2>
                    <img src={winner.bioPic}></img>
                    <p>{winner.name}</p>
                    <p>Power Level: {winner.powerSet.powerLevel} </p>
                    <h3>Powers:</h3>
                    <ul>
                        {winner.powerSet.powers.map((power, index) => (
                            <li key={index}>{power}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}