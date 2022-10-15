import connection from "../database/database.js"
import STATUS_CODE from "../enums/statusCode.enum.js"
import { queryLinks, queryUserData } from "../repositories/user.repositories.js"

async function getUserData(req, res) {
    
    const user = res.locals.user

    try {
        const userData = await queryUserData(user.id)
        
        if (!userData) {
            return res.send({id: user.id, name: user.name, visitCount: 0, shortenedUrls: []})
        }

        const {id, name, visitCount} = userData
        const links = await queryLinks(user.id)

        res.send({id, name, visitCount, shortenedUrls: links})
        
    } catch (error) {
        console.error(error)
        res.sendStatus(STATUS_CODE.SERVER_ERROR)
    }
}

export {getUserData}