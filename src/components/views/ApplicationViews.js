import { Route, Routes } from "react-router-dom"
import { HomeViews } from "./HomeViews"
import { CharacterList } from "../characters/CharacterList"
import { CharacterDetails } from "../characters/CharacterDetails"
import { BattlePage } from "../characters/CharacterSelection"
import { CharacterEdit } from "../characters/CharacterEdit"
import { CharacterForm } from "../characters/CharacterForm"

// general overlay of what the user view is of the home page of omni Arena 
// user should be able to navigate to 5 different "views": List of all fighters, update characters, 
// choose combatants, add a character, and remove character 



export const ApplicationViews = () => {
	return (
		<Routes>
			<Route path="/" element={<HomeViews />} />

			<Route path="/characters" element={<CharacterList />} />

			<Route path="/characters/:characterId" element={<CharacterDetails />} />

			<Route path="/characterSelection" element={<BattlePage />} />

			<Route path="/characters/:characterId/edit" element={<CharacterEdit />} />
			
			<Route path="/characters/create" element={<CharacterForm />} />
		</Routes>
	)
}

