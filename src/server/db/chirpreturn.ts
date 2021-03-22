import { Query } from './connection'

const all = async () =>Query('SELECT c.id, u.name as userid, c.content FROM chirps c JOIN users u ON u.id=c.userid ORDER BY c.id');
const one = async (id:string) =>Query('SELECT u.name as userid, c.content FROM chirps c JOIN users u ON c.userid=u.id WHERE c.id = ?', [id])
const createchirp = async (userid:string, content:string, location:string) => Query('INSERT INTO chirps (userid, content, location) VALUES(?,?,?)', [userid,content, location])
const updatechirp = async () => Query('')
const deletechirp = async () => Query('')

export default {
    all,
    one,
    createchirp
}