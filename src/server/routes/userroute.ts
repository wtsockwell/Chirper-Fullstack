import * as express from 'express';
import db from '../db/connection'

const router = express.Router();

router.get('/:id?',async (req,res) => {
    try {
        let id: string = req.params.id
        if(id){
            res.json((await db.users.one(id))[0])
        } else{
            res.json(await db.users.all())
        }
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

router.post('/', async (req,res)=>{
    let user = req.body
    try{
        const userRes = await db.users.createuser(user.name,user.email,user.password)
        res.json(userRes)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

router.put('/:id', async (req,res)=>{
    let newUser = req.body
    try {
        res.json(await db.users.updateuser(req.params.id, newUser.name, newUser.email, newUser.password))
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

router.delete('/:id', async (req,res)=>{
    let id:string = req.params.id
    try {
        res.json(await db.users.deleteuser(id))
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

export default router