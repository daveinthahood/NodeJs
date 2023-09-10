require('dotenv').config()
import {db} from "./db"
import jwt from "jsonwebtoken"



const login = async(req:Request, res:Response) => {
    const {username, password} = req.body

    const user = db.one( 'SELECT * FROM users WHERE username=$1', username)
    if (user && user.password === password) {
        const payload = {
            id: user.id, 
            username,
        }
        const {SECRET_KEY= ""} = process.env;        
        const token = jwt.sign(payload, SECRET_KEY);

        await db.none(`UPDATE users SET token=$1`, [user.id, token])
        res.status(200).json({id: user.id, username, token})
    } else  {
        res.status(400).json({ msg: "Users or password incorrect"})
    }
}

const signup =async (req, res) => {
    const {username, password} = req.body
    const user = await db.oneOrNone('SELECT * FROM users WHERE username=$1', username)


    if (user) {
        res.status(409).json({msg: "username alredy in use"})
    } else {
        await db.one('INSERT INTO users (username, password) VALUES ($1, $2) RETURNIND id', [username, password])
    }
    res.status(201).json({id, msg: "users "})
}


const logout = async() => {

}

export {login, signup, logout}