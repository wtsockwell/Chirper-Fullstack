import { Query } from './connection'

const all = async () =>Query('SELECT * FROM users');
const one = async (id:string) =>Query('SELECT * FROM users WHERE id = ?', [id])
const createuser = async (name:string, email:string, password: string) => Query('INSERT INTO users (name) VALUES(name=?, email=?, password=?)', [name, email, password])
const updateuser = async () => Query('')
const deleteuser = async () => Query('')

export default {
    all,
    one,
    createuser
}