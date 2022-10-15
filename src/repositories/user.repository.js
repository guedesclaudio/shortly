import connection from "../database/database.js"

async function queryUserById(userId) {
    return (await connection.query('SELECT * FROM users WHERE id = $1;', [userId])).rows[0]
}

async function queryUserData(userId) {
    return (
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
        GROUP BY users.id;`, [userId])
        ).rows[0]
}

async function queryLinks(userId) {
    return (
        await connection.query(`
        SELECT 
            links.*
        FROM users 
        JOIN "usersLinks" 
            ON users.id = "usersLinks"."userId"
        JOIN links
            ON "usersLinks"."linkId" = links.id
        WHERE users.id = $1;`, [userId])
        ).rows
}
    
export {queryUserById, queryUserData, queryLinks}