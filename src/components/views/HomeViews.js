import { Link, Outlet, Route, Routes } from "react-router-dom"
import "./Views.css"
import { useEffect, useState } from "react"
import { CharacterDetails } from "../characters/CharacterDetails";

export const HomeViews = () => {
    const [charactersList, setCharactersList] = useState([])
    const [currentCharacter, setCurrentCharacter] = useState(null)
    const [currentIndex, setCurrentIndex] = useState(0)

   useEffect(() => {
    fetch(`http://localhost:8088/characters?_expand=universe`)
    .then(res => res.json())
    .then((charactersArray) => {
        setCharactersList(charactersArray)
        setCurrentCharacter(charactersArray[0])
    })
   },
   []
   )

   useEffect(() => {
    const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % charactersList.length)
        setCurrentCharacter(charactersList[currentIndex])
    }, 5000)

    return () => clearInterval(interval)
   }, [charactersList, currentIndex]
   )

    return (
        <Routes>
          <Route
            path="/"
            element={
              <>
                <main className="content">
                  <section className="mainContent">
                    <h1>Omni-Arena</h1>
                    <div>Fight to determine who's the strongest in all the universes!</div>
    
                    <section className="aboutBox">
                      <h2>Welcome to Omni-Arena!</h2>
                      <p>
                        Ever wondered who would win in a battle against some of your favorite characters? Iron Man vs.
                        Batman? Kratos vs. Doomsday? Goku vs. Superman?
                        Well, wonder no more! Pit your warriors against each other to determine who the strongest of them all really is!
                      </p>
                      <h2>Features</h2>
                      <div className="features__header">
                        Check out some of the epic features of Omni-Arena!
                        <ul>
                          <li>View all the available characters that you can select to fight!</li>
                          <li>Choose your characters and fight to determine the winner!</li>
                          <li>Create your own custom character to participate in the battle!</li>
                          <li>See an error or some missing info on one of your preferred characters? No problem, you can update them at any time!</li>
                          <li>Don't like the character you created? No worries! Delete them at any time!</li>
                        </ul>
                      </div>
                    </section>
    
                    <footer className="contact">
                      Contact us: Email: omni-email@totallyrealemail.com Phone: 256-867-5309
                    </footer>
                  </section>
    
                  <aside className="rotatingList">
                    <h2>Rotating Characters</h2>
                   {currentCharacter && (
                    <Link to={`/characters?${currentCharacter.id}`}>
                        <img src={currentCharacter.bioPic} alt={currentCharacter.name} />
                        <span>{currentCharacter.name}</span>
                    </Link>
                   )}
                  </aside>
                </main>
                <Outlet />
              </>
            }
          />
          <Route path="/characters/:characterId" element={<CharacterDetails />} />
        </Routes>
      );
    };