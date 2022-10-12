import STATUS_CODE from "../enums/statusCode.enum.js"
import connection from "../database/database.js"
import {nanoid} from "nanoid"

async function createShortUrl(req, res) {

    const url = res.locals.url
    const userId = res.locals.userId
    const shortUrl = nanoid(8)

    try {
        await connection.query('INSERT INTO links (url, "shortUrl") VALUES ($1, $2);', [url, shortUrl])
        const linkId = (await connection.query('SELECT * FROM links WHERE "shortUrl" = $1;', [shortUrl])).rows[0].id
        await connection.query('INSERT INTO "usersLinks" ("userId", "linkId") VALUES ($1, $2);', [userId, linkId])
        res.status(STATUS_CODE.CREATED).send({shortUrl})

    } catch (error) {
        console.error(error)
        res.sendStatus(STATUS_CODE.SERVER_ERROR)
    }
}

async function listUrlsById(req, res) {
    
    const linkData = res.locals.linkData
    delete linkData.visitCount
    delete linkData.createdAt
    res.status(STATUS_CODE.OK).send(linkData)
}

async function openShortUrl(req, res) {

    const linkData = res.locals.linkData
    const visitCount = linkData.visitCount + 1

    try {
        await connection.query('UPDATE links SET "visitCount" = $1 WHERE id = $2', [visitCount, linkData.id])
        return res.redirect(linkData.url)
        res.send(linkData.url)
    } catch (error) {
        console.error(error)
        res.sendStatus(STATUS_CODE.SERVER_ERROR)
    }
}

async function deleteUrl(req, res) {

    const {link, userId} = res.locals.userLinkData
    //return console.log(link.id)

    try {
        await connection.query('DELETE FROM "usersLinks" WHERE "userId" = $1 AND "linkId" = $2;', [userId,link.id])
        await connection.query('DELETE FROM links WHERE id = $1;', [link.id])
        res.sendStatus(204)

    } catch (error) {
        console.error(error)
        res.sendStatus(STATUS_CODE.SERVER_ERROR)
    }

}

export {createShortUrl, listUrlsById, openShortUrl, deleteUrl}