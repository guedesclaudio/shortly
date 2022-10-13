import connection from "../database/database.js"
import STATUS_CODE from "../enums/statusCode.enum.js"

async function listRanking(req, res) {
    
    try {

        const ranking = (await connection.query(`
        SELECT 
            users.id,
            users.name,
            SUM(links."visitCount") AS "visitCount",
            COUNT(links.id) AS "linkCount"
        FROM users 
        JOIN "usersLinks" 
            ON users.id = "usersLinks"."userId"
        JOIN links
            ON "usersLinks"."linkId" = links.id
        GROUP BY users.id
        ORDER BY "visitCount" DESC
        LIMIT 10;
        `)).rows

        res.send(ranking)
        
    } catch (error) {
        res.sendStatus(STATUS_CODE.SERVER_ERROR)
    }
}

export {listRanking}