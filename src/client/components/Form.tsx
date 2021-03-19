import * as React from 'react'
import { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'

interface Formprops  extends RouteComponentProps { }

const Form: React.FC<Formprops> = ({ history }) => {
    const [user, setUser] = useState("");
    const [message, setMessage] = useState("");

    const handleUser = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser(e.target.value)
    }

    const handleMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        sendChirp()
        setUser("")
        setMessage("")
    }

    const handleReturn = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        history.goBack()
    }

    const sendChirp = async () => {
        let chirp = {
            username: user,
            message: message
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
                    <label htmlFor="message">What'cha gonna say?</label>
                    <textarea name="" id="message" cols={30} rows={10} onChange={handleMessage} value={message} className="form-control"></textarea>
                </div>
                <button onClick={handleSubmit} className="btn btn-primary mx-1">Submit</button>
                <button onClick={handleReturn} className="btn btn-secondary mx-1">Go back</button>
                </div>
            </form>
        </div>
    )
}

export default Form