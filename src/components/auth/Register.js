import React, { useRef } from "react"
import { Link, useHistory } from "react-router-dom"

export const Register = () => {

    const firstName = useRef()
    const lastName = useRef()
    const email = useRef()
    const ein = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const passwordDialog = useRef()
    const companyName = useRef()
    const employeeId = useRef()
    const history = useHistory()

    const handleRegister = (e) => {
        e.preventDefault()

        if (password.current.value === verifyPassword.current.value) {
            const newUser = {
                "username": email.current.value,
                "firstName": firstName.current.value,
                "lastName": lastName.current.value,
                "email": email.current.value,
                "password": password.current.value,
                "companyName": companyName.current.value,
                "ein": ein.current.value,
                "employeeId": employeeId.current.value
            }

            return fetch("http://127.0.0.1:8000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(newUser)
            })
                .then(res => res.json())
                .then(res => {
                    if ('token' in res) {
                        localStorage.setItem("lu_token", res.token)
                        history.push("/")
                    }
                })
        } else {
            passwordDialog.current.showModal()
        }
    }

    return (
        <main style={{ textAlign: "center" }}>
            <dialog className="dialog dialog--password" ref={passwordDialog}>
                <div>Passwords do not match</div>
                <button className="button--close" onClick={e => passwordDialog.current.close()}>Close</button>
            </dialog>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Register an account</h1>
                <h2>Personal Info</h2>
                <fieldset>
                    <label htmlFor="firstName"> </label>
                    <input ref={firstName} type="text" name="firstName" className="form-control" placeholder="First name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"> </label>
                    <input ref={lastName} type="text" name="lastName" className="form-control" placeholder="Last name" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="employeeId">  </label>
                    <input ref={employeeId} type="text" name="employeeId" className="form-control" placeholder="Employee Id"/>
                </fieldset>
                <fieldset>
                    <label htmlFor="inputEmail"> </label>
                    <input ref={email} type="email" name="email" className="form-control" placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputPassword"> </label>
                    <input ref={password} type="password" name="password" className="form-control" placeholder="Password" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="verifyPassword"> </label>
                    <input ref={verifyPassword} type="password" name="verifyPassword" className="form-control" placeholder="Verify password" required />
                </fieldset>
                <h2>Company Info</h2>
                <fieldset>
                    <label htmlFor="companyName"> </label>
                    <input ref={companyName} type="text" name="companyName" className="form-control" placeholder="Company name" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="ein"> </label>
                    <input ref={ein} type="text" name="ein" className="form-control" placeholder="Employer Identification Number"/>
                </fieldset>
                <fieldset style={{
                    textAlign: "center"
                }}>
                    <button className="btn btn-1 btn-sep icon-send" type="submit">Register</button>
                </fieldset>
            </form>
            <section className="link--register">
                Already registered? <Link to="/login">Login</Link>
            </section>
        </main>
    )
}