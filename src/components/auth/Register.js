import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Register = (props) => {
    const [user, setUser] = useState({
        userName: "",
        fullName: ""
    })
    let navigate = useNavigate()

    const registerNewUser = () => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("omni_user", JSON.stringify({
                        id: createdUser.id
                    }))

                    navigate("/")
                }
            })
    }

    const handleRegister = (u) => {
        u.preventDefault()
        return fetch(`http://localhost:8088/users?userName=${user.userName}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    // Duplicate userName. No good.
                    window.alert("Account with that userName address already exists")
                }
                else {
                    // Good userName, create user.
                    registerNewUser()
                        .then(() => {
                            window.alert("Thank you for joining Omni-Arena!")
                            navigate("/")
                     })
                }
            })
    }

    const updateuser = (evt) => {
        const copy = { ...user }
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }

    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Please Register for Omni-Arena</h1>
                <fieldset>
                    <label htmlFor="fullName"> Full Name </label>
                    <input onChange={updateuser}
                        type="text" id="fullName" className="form-control"
                        placeholder="Enter your name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="userName"> Username </label>
                    <input onChange={updateuser}
                        type="userName" id="userName" className="form-control"
                        placeholder="userName" required />
                </fieldset>
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}

