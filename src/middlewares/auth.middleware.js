import STATUS_CODE from "../enums/statusCode.enum.js"
import {schemaSignup, schemaSignin} from "../schemas/auth.schema.js"
import connection from "../database/database.js"

async function validateCreateUser(req, res, next) {

    const {error} = schemaSignup.validate(req.body, {abortEarly: false})

    if (error) {
        const errors = error.details.map(value => value.message) 
        return res.status(STATUS_CODE.UNPROCESSABLE).send(errors)
    }

    try {

        const users = await connection.query(`SELECT * FROM users;`)
        return res.send(users.rows)
        
    } catch (error) {
        console.error(error)
        res.send(STATUS_CODE.SERVER_ERROR)
    }
}

async function validateLoginUser(req, res, next) {

    const {error} = schemaSignin.validate(req.body, {abortEarly: false})

    if (error) {
        const errors = error.details.map(value => value.message) 
        return res.status(STATUS_CODE.UNPROCESSABLE).send(errors)
    }

    try {
        
    } catch (error) {
        console.error(error)
        res.send(STATUS_CODE.SERVER_ERROR)
    }
}

export {validateCreateUser, validateLoginUser}