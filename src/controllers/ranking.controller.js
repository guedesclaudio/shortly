import connection from "../database/database.js"
import STATUS_CODE from "../enums/statusCode.enum.js"
import { queryRanking } from "../repositories/ranking.repository.js"

async function listRanking(req, res) {
    
    try {
        const ranking = await queryRanking()
        res.send(ranking)
        
    } catch (error) {
        res.sendStatus(STATUS_CODE.SERVER_ERROR)
    }
}

export {listRanking}