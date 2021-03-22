import * as React from 'react'
import { useState, useEffect } from 'react'
import { RouteComponentProps, Link, useHistory } from 'react-router-dom'


interface UserFormprops extends RouteComponentProps<{ id: string; }> { }

const UserForm: React.FC<UserFormprops> = ({ history, match: { params: { id } } }) => {
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const newHistory = useHistory();

    const handleUser = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser(e.target.value)
    }

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }
    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        sendUser()
        newHistory.push('/')
    }

    const handleReturn = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        history.goBack()
    }

    useEffect(()=>{
        getUser()
    },[])

    const getUser = async () => {
        let r = await fetch(`/api/user/${id}`)
        let newUser = await r.json()
        setUser(newUser.name)
        setEmail(newUser.email)
        setPassword(newUser.password)
    }

    const sendUser = async () => {
        let users = {
            name: user,
            email: email,
            password: password
        }
        let r = await fetch(`/api/user/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(users)
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
                        <input type="email" name="" id="email" onChange={handleEmail} value={email} className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">password</label>
                        <input type="password" name="" id="password" onChange={handlePassword} value={password} className="form-control" />
                    </div>
                    <button className="btn btn-primary mx-1" onClick={handleSubmit}>Submit</button>
                    <button onClick={handleReturn} className="btn btn-secondary mx-1">Go back</button>
                </div>
            </form>
        </div>
    )
}

export default UserForm