import STATUS_CODE from "../enums/statusCode.enum.js"
import {schemaSignup, schemaSignin} from "../schemas/auth.schema.js"
import bcrypt from "bcrypt"
import {queryUser} from "../repositories/auth.repository.js"


async function validateCreateUser(req, res, next) {

    const {email, confirmPassword} = req.body
    const {error} = schemaSignup.validate(req.body, {abortEarly: false})

    if (error) {
        const errors = error.details.map(value => value.message) 
        return res.status(STATUS_CODE.UNPROCESSABLE).send(errors)
    }
    if (!confirmPassword) {
        return res.status(STATUS_CODE.UNPROCESSABLE).send("\"confirmPassword\" is required")
    }

    try {
        const user = await queryUser(email)
        
        if (user) {
            return res.sendStatus(STATUS_CODE.CONFLICT)
        }
        next()

    } catch (error) {
        res.send(STATUS_CODE.SERVER_ERROR)
    }
}

async function validateLoginUser(req, res, next) {

    const {email, password} = req.body
    const {error} = schemaSignin.validate(req.body, {abortEarly: false})

    if (error) {
        const errors = error.details.map(value => value.message) 
        return res.status(STATUS_CODE.UNPROCESSABLE).send(errors)
    }

    try {

        const user = await queryUser(email)

        if (!user ) {
            return res.sendStatus(STATUS_CODE.UNAUTHORIZED)
        }

        const passwordIsValid = bcrypt.compareSync(password, user?.password)
        
        if (!passwordIsValid) {
            return res.sendStatus(STATUS_CODE.UNAUTHORIZED)
        }
        res.locals.userId = user.id
        next()

    } catch (error) {
        res.send(STATUS_CODE.SERVER_ERROR)
    }
}

export {validateCreateUser, validateLoginUser}