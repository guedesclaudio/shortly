import STATUS_CODE from "../enums/statusCode.enum.js"
import bcrypt from "bcrypt"
import {v4 as uuid} from "uuid"
import { deleteSession, insertSession, insertUser, querySessions } from "../repositories/auth.repository.js"


async function createUser(req, res) {

    const {name, email} = req.body
    const encryptedPassword = encryptPassword(req)

    try {
        await insertUser(name, email, encryptedPassword)
        res.sendStatus(STATUS_CODE.CREATED)
        
    } catch (error) {
        res.sendStatus(STATUS_CODE.SERVER_ERROR)
    }
}

async function loginUser(req, res) {

    const id = res.locals.userId 
    const token = uuid()

    try {
        await insertSession(id, token)
        res.status(STATUS_CODE.OK).send({"token": token})

    } catch (error) {
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

async function checkSessionTime(req, res) {

    const sessions = await querySessions()
    const today = new Date().getTime()

    sessions.filter(async value => {
        const tokenDate = new Date(value.createdAt).getTime()

        if (today - tokenDate >= 7200000) {
            await deleteSession(value.id)
        }
    })
}
//setInterval(checkSessionTime, 5000)

export {createUser, loginUser}