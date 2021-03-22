import * as React from 'react'
import { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'

interface UserFormprops  extends RouteComponentProps { }

const UserForm: React.FC<UserFormprops> = ({ history }) => {
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleUser = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser(e.target.value)
    }

    const handleEmail = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEmail(e.target.value)
    }
    const handlePassword = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        sendChirp()
        setUser("")
        setEmail("")
        setPassword("")
    }

    const handleReturn = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        history.goBack()
    }

    const sendChirp = async () => {
        let chirp = {
            name: user,
            email: email,
            password: password
        }
        let r = await fetch('/api/chirps', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(chirp)
        })
    }

    return (
        <div>
            <form>
                <div className="container">

                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="" id="username" onChange={handleUser} value={user} className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">email</label>
                    <input type="email" name="" id="username" onChange={handleUser} value={user} className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">password</label>
                    <input type="password" name="" id="username" onChange={handleUser} value={user} className="form-control" />
                </div>
                <button onClick={handleSubmit} className="btn btn-primary mx-1">Submit</button>
                <button onClick={handleReturn} className="btn btn-secondary mx-1">Go back</button>
                </div>
            </form>
        </div>
    )
}

export default UserForm