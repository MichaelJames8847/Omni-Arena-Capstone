import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Login = () => {
    const [userName, set] = useState("")
    const navigate = useNavigate()

    const handleLogin = (u) => {
        u.preventDefault()

        return fetch(`http://localhost:8088/users?userName=${userName}`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("omni_user", JSON.stringify({
                        id: user.id
                    }))

                    navigate("/")
                }
                else {
                    window.alert("Invalid login")
                }
            })
    }

    return (
        <main className="container--login">
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>Omni-Arena</h1>
                    <h2>Please sign in</h2>
                    <fieldset>
                        <label htmlFor="inputuserName"> Username </label>
                        <input type="userName"
                            value={userName}
                            onChange={evt => set(evt.target.value)}
                            className="form-control"
                            placeholder="userName"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <button type="submit">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section>
        </main>
    )
}

