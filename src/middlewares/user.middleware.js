import connection from "../database/database.js"
import STATUS_CODE from "../enums/statusCode.enum.js"

async function validateGetUserData(req, res, next) {

    const userId = res.locals.userId

    try {

        const user = (await connection.query('SELECT * FROM users WHERE id = $1;', [userId])).rows[0]
       
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