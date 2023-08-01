import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/characters">Characters</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">Home</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/characterSelection">Choose your Combatants</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/characters/:characterId/edit">Update a Character</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/characters/create">Create Custom Character</Link>
            </li>
            {
                localStorage.getItem("omni_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("omni_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}

