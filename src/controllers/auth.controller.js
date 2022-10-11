import STATUS_CODE from "../enums/statusCode.enum.js"
import connection from "../database/database.js"
import bcrypt from "bcrypt"
import {v4 as uuid} from "uuid"


async function createUser(req, res) {

    const {name, email} = req.body
    const encryptedPassword = encryptPassword(req)

    try {
        await connection.query("INSERT INTO users (name, email, password) VALUES ($1,$2,$3)", [name, email, encryptedPassword])
        res.sendStatus(STATUS_CODE.CREATED)
        
    } catch (error) {
        console.error(error)
        res.sendStatus(STATUS_CODE.SERVER_ERROR)
    }
}

async function loginUser(req, res) {

    const id = res.locals.userId 
    const token = uuid()

    try {
        await connection.query('INSERT INTO sessions ("userId", token) VALUES ($1, $2);', [id, token])
        res.status(STATUS_CODE.OK).send({"token": token})

    } catch (error) {
        console.error(error)
        res.send(STATUS_CODE.SERVER_ERROR)
    }
}

function encryptPassword(req) {
    const {password} = req.body
    const encryptedPassword = bcrypt.hashSync(password, 10)
    delete req.body.password 
    delete req.body.confirmPassword
    return encryptedPassword
}

export {createUser, loginUser}