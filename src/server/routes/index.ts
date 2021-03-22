import * as express from 'express';
import chirpsRouter from '../chirps';
import dbrouter from './chirproute'

const router = express.Router();

router.use('/chirps', dbrouter)

export default router;