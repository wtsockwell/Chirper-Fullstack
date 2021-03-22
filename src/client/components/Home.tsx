import * as React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

interface chirpsProps { }
interface chirps {
    id: number,
    userid: string,
    content: string
}

const Home: React.FC<chirpsProps> = (props) => {

    const [chirps, setChirps] = useState<chirps[]>([])

    const getChirps = async () => {
        let r = await fetch('/api/chirps')
        let chirp = await r.json()
        setChirps(chirp)
    }

    const handleClick = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()

    }

    useEffect(() => { getChirps(); }, [])

    return (
        <div>
            <div className="jumbostron d-flex align-items-center flex-column">
                <h1 className="display-3">Home Page</h1>
                <Link to="/user" className="btn btn-primary ">Make a new Post</Link>
            </div>
            <div className="container mt-3">

                {chirps.map(chirp => (
                    <div key={chirp.id} className="">
                        <div className="card my-2">
                            <div className="card-body">
                                <h4 className="card-title">{chirp.userid} </h4>
                                <p className="card-text">
                                    {chirp.content}
                                </p>
                                <Link to={`/api/chirps/${chirp.id}/Admin`} className="btn btn-primary float-right">Admin Options</Link>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default Home