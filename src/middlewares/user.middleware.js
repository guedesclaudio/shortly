import STATUS_CODE from "../enums/statusCode.enum.js"
import { queryUserById } from "../repositories/user.repository.js"

async function validateGetUserData(req, res, next) {

    const userId = res.locals.userId

    try {

        const user = await queryUserById(userId)
       
        if (!user) {
            return res.sendStatus(STATUS_CODE.NOT_FOUND)
        }
        res.locals.user = user
        next()
        
    } catch (error) {
        console.error(error)
        res.sendStatus(STATUS_CODE.SERVER_ERROR)
    }
}

export {validateGetUserData}