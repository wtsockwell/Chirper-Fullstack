import * as React from 'react'
import { useState, useEffect } from 'react'
import { RouteComponentProps, useHistory } from 'react-router-dom'

interface Formprops extends RouteComponentProps { }

const Form: React.FC<Formprops> = ({ history }) => {
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userid, setUserid] = useState("")
    const [message, setMessage] = useState("");
    const [location, setLocation] = useState("")

    const newHistory = useHistory()

    const handleUser = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser(e.target.value)
    }

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value)
    }

    const handleLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocation(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        sendChirp()
        setUser("")
        setMessage("")
    }

    const handleReturn = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        newHistory.push('/')
    }

    const sendChirp = async () => {

        try{
            let users = {
                name: user,
                email: email,
                password: password
            }
            let userRes = await fetch('/api/user',{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(users)
            })

            const newUser = await userRes.json()

            let chirp = {
                userid: newUser.insertId,
                content: message,
                location: location
            }
            let r = await fetch('/api/chirps', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(chirp)
            })
        }catch (err){
            console.log(err)
        }


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
                        <input type="email" name="" id="email" onChange={handleEmail} value={email} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">password</label>
                        <input type="password" name="" id="password" onChange={handlePassword} value={password} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">What'cha gonna say?</label>
                        <textarea name="" id="message" cols={30} rows={10} onChange={handleMessage} value={message} className="form-control"></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="location">Location</label>
                        <input type="text" name="" id="location" className="form-control" onChange={handleLocation} />
                    </div>
                    <button onClick={handleSubmit} className="btn btn-primary mx-1">Submit</button>
                    <button onClick={handleReturn} className="btn btn-secondary mx-1">Go back</button>
                </div>
            </form>
        </div>
    )
}

export default Form