import { Query } from './connection'

const all = async () => Query('SELECT c.id, u.name as userid, c.content, c.userid as user FROM chirps c JOIN users u ON u.id=c.userid ORDER BY c.id');
const one = async (id: string) => Query('SELECT u.name as userid, c.content FROM chirps c JOIN users u ON c.userid=u.id WHERE c.id = ?', [id])
const createchirp = async (userid: string, content: string, location: string) => Query('INSERT INTO chirps (userid, content, location) VALUES(?,?,?)', [userid, content, location])
const updatechirp = async (id: string, content: string, location: string) => Query('UPDATE chirps SET content=?, location=? WHERE id = ?', [content, location, id])
const deletechirp = async (id: string) => Query('DELETE FROM chirps WHERE id=?', [id])

export default {
    all,
    one,
    createchirp,
    updatechirp,
    deletechirp
}