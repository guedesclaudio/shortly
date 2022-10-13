import connection from "../database/database.js"
import STATUS_CODE from "../enums/statusCode.enum.js"

async function validateToken(req, res, next) {

    const {authorization} = req.headers
    const token = authorization?.replace("Bearer ", "")

    if (!token) {
        return res.sendStatus(STATUS_CODE.UNAUTHORIZED)
    }

    try {
        const session = (await connection.query("SELECT * FROM sessions WHERE token = $1", [token])).rows[0]

        if (!session) {
            return res.sendStatus(STATUS_CODE.UNAUTHORIZED)
        }
        res.locals.userId = session.userId
        next()
    } catch (error) {
        res.sendStatus(STATUS_CODE.SERVER_ERROR)
    }
}


export {validateToken} 