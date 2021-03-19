import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'

export interface AdminProps extends RouteComponentProps<{ id: string; }> { }

const Admin: React.FC<AdminProps> = ({ history, match: { params: { id } } }) => {

    const [user, setUser] = useState("")
    const [message, setMessage] = useState("")

    const getChirps = async () => {
        let r = await fetch(`/api/chirps/${id}`)
        let chirp = await r.json()
        setUser(chirp.username)
        setMessage(chirp.message)
    }

    useEffect(() => {
        getChirps()

    }, [])

    const handleUser = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser(e.target.value)
    }
    const handleMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value)
    }

    const handleEdit = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        updateChirp()
        history.goBack()
    }
    const handleDelete = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        deleteChirp()
        history.goBack()
    }

    const updateChirp = () => {
        let chirp = {
            username: user,
            message: message
        }
        let r = fetch(`/api/chirps/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(chirp)
        })
    }

    const deleteChirp = () => {
        let r = fetch(`/api/chirps/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    return (
        <div>
            <form>
                <div className="container">
                    <label htmlFor="user">Who're you?</label>
                    <input type="text" name="" id="user" value={user} onChange={handleUser} className="form-control" />
                    <label htmlFor="message" className="my-2">What'dya mess up?</label>
                    <textarea name="" id="message" cols={30} rows={10} value={message} onChange={handleMessage} className="form-control my-2"></textarea>
                    <button onClick={handleEdit} className="btn btn-info mx-1">Save</button>
                    <button onClick={handleDelete} className="btn btn-danger mx-1">Delete</button>
                </div>
            </form>
        </div>
    )
}

export default Admin