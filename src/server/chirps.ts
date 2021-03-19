import * as express from 'express';
import querystring from 'querystring';
import chirpsStore from '../../chirpstore';

let router = express.Router()

router.get('/:id?', (req, res) => {
    let id: string = req.params.id
    if (id) {
        res.send(chirpsStore.GetChirp(id))
    } else {
        const chirps = chirpsStore.GetChirps()
        delete chirps.nextid
        const tempArr = Object.entries(chirps)
        const chirpArr = tempArr.map((chirp: any) => {
            const newChirp: newChirp = {
                id: chirp[0],
                username: chirp[1].username,
                message: chirp[1].message
            }
            return newChirp
        })

        res.send(chirpArr)
    }
})

router.post('/', (req, res) => {
    chirpsStore.CreateChirp(req.body)
    res.sendStatus(200)
})

router.put('/:id?', (req, res) => {
    let id: string = req.params.id
    chirpsStore.UpdateChirp(id, req.body)
    res.sendStatus(200)
})

router.delete('/:id?', (req, res) => {
    let id: string = req.params.id
    chirpsStore.DeleteChirp(id)
    res.sendStatus(200)
})

interface newChirp {
    id: string,
    username: string,
    message: string
}

// interface oldChirp {
//     id: string,
//     username: string,
//     message: string
// }

export default router