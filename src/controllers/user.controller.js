import connection from "../database/database.js"
import STATUS_CODE from "../enums/statusCode.enum.js"

async function getUserData(req, res) {
    
    const user = res.locals.user

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
            GROUP BY users.id;`, [user.id])).rows[0]
        
        if (!userData) {
            return res.send({id: user.id, name: user.name, visitCount: 0, shortenedUrls: []})
        }

        const {id, name, visitCount} = userData

        const links = (
            await connection.query(`
            SELECT 
                links.*
            FROM users 
            JOIN "usersLinks" 
                ON users.id = "usersLinks"."userId"
            JOIN links
                ON "usersLinks"."linkId" = links.id
            WHERE users.id = $1;`, [user.id])).rows
        res.send({id, name, visitCount, shortenedUrls: links})
        
    } catch (error) {
        console.error(error)
        res.sendStatus(STATUS_CODE.SERVER_ERROR)
    }
}

export {getUserData}