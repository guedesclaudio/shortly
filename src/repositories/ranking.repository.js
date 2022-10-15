import connection from "../database/database.js"

async function queryRanking() {
    return (await connection.query(`
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
}

export {queryRanking}