import * as express from 'express';
import chirproute from './chirproute'
import userroute from './userroute'

const router = express.Router();

router.use('/chirps', chirproute)
router.use('/user', userroute)

export default router;