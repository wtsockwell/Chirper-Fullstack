import * as express from 'express';
import chirpstore from '../../../chirpstore';
import db from '../db/connection'

const router = express.Router();

router.get('/:id?',async (req,res) => {
    try {
        let id: string = req.params.id
        if(id){
            res.json((await db.chirps.one(id))[0])
        } else{
            res.json(await db.chirps.all())
        }
        // res.json(await chirps.chirps.all())
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

router.post('/', async (req,res)=>{
    let chirp = req.body
    try{
        const chirpRes = await db.chirps.createchirp(chirp.userid,chirp.content,chirp.location)
        res.json(chirpRes)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

export default router