import connection from "../database/database.js"

async function queryUrl(id) {
    return (await connection.query('SELECT * FROM links WHERE id = $1;', [id])).rows[0]
}

async function queryShortUrl(shortUrl) {
    return (await connection.query('SELECT * FROM links WHERE "shortUrl" = $1;', [shortUrl])).rows[0]
}

async function queryUsersLinks(userId, linkId) {
    return (await connection.query('SELECT * FROM "usersLinks" WHERE "userId" = $1 AND "linkId" = $2;', [userId, linkId])).rows[0]
}

function insertUrl(url, shortUrl) {
    return connection.query('INSERT INTO links (url, "shortUrl") VALUES ($1, $2);', [url, shortUrl])
}

async function queryLinkId(shortUrl) {
    return (await connection.query('SELECT * FROM links WHERE "shortUrl" = $1;', [shortUrl])).rows[0].id
}

function insertUsersLinks(userId, linkId) {
    return connection.query('INSERT INTO "usersLinks" ("userId", "linkId") VALUES ($1, $2);', [userId, linkId])
}

function updateVisitCount(visitCount, linkId) {
    return connection.query('UPDATE links SET "visitCount" = $1 WHERE id = $2', [visitCount, linkId])
}

function deleteUsersLinks(userId, linkId) {
    return connection.query('DELETE FROM "usersLinks" WHERE "userId" = $1 AND "linkId" = $2;', [userId, linkId])
}

function deleteUrlById(linkId) {
    return connection.query('DELETE FROM links WHERE id = $1;', [linkId])
}

export {
    queryUrl, 
    queryShortUrl, 
    queryUsersLinks, 
    insertUrl, 
    queryLinkId, 
    insertUsersLinks,
    updateVisitCount,
    deleteUsersLinks,
    deleteUrlById
}