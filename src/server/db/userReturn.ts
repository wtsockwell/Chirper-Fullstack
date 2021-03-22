import { Query } from './connection'

const all = async () => Query('SELECT * FROM users');
const one = async (id: string) => Query('SELECT * FROM users WHERE id = ?', [id])
const createuser = async (name: string, email: string, password: string) => Query('INSERT INTO users (name,email,password) VALUES(?,?,?)', [name, email, password])
const updateuser = async (id: string, name: string, email: string, password: string) => Query('UPDATE users SET name=?, email=?,password=? WHERE id = ?', [name, email, password, id])
const deleteuser = async (id: string) => Query('DELETE FROM users WHERE id=?', [id])

export default {
    all,
    one,
    createuser,
    updateuser,
    deleteuser
}