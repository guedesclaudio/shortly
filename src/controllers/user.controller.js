import connection from "../database/database.js"
import STATUS_CODE from "../enums/statusCode.enum.js"

async function getUserData(req, res) {
    
    const userId = res.locals.userId

    try {
        const userData = (
            await connection.query(`
            SELECT 
                users.id,
                users.name,
                SUM(links."visitCount") AS "visitCount"
            FROM users 
            JOIN "usersLinks" 
                ON users.id = "usersLinks"."userId"
            JOIN links
                ON "usersLinks"."linkId" = links.id
            WHERE users.id = $1
            GROUP BY users.id;`, [userId])).rows[0]

        const links = (
            await connection.query(`
            SELECT 
                links.*
            FROM users 
            JOIN "usersLinks" 
                ON users.id = "usersLinks"."userId"
            JOIN links
                ON "usersLinks"."linkId" = links.id
            WHERE users.id = $1;`, [userId])).rows
        res.send({userData, shorteneUrls: links})
        
    } catch (error) {
        console.error(error)
        res.sendStatus(STATUS_CODE.SERVER_ERROR)
    }
}

export {getUserData}