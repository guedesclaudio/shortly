import connection from "../database/database.js"
import STATUS_CODE from "../enums/statusCode.enum.js"
import {schemaUrl} from "../schemas/url.schema.js"

async function validateCreateShortUrl(req, res, next) {

    const {url} = req.body
    const {error} = schemaUrl.validate(req.body, {abortEarly: false})

    if (error) {
        const errors = error.details.map(value => value.message) 
        return res.status(STATUS_CODE.UNPROCESSABLE).send(errors)
    }
    if (!checkUrl(url)) {
        return res.sendStatus(STATUS_CODE.UNPROCESSABLE)
    }

    res.locals.url = url
    next()
}

async function validateListUrlsById(req, res, next) {

    const {id} = req.params

    if (!id || isNaN(id)) {
        return res.sendStatus(STATUS_CODE.NOT_FOUND)
    }

    try {
        const link = (await connection.query('SELECT * FROM links WHERE id = $1;', [id])).rows[0]
        if (!link) {
            return res.sendStatus(STATUS_CODE.NOT_FOUND)
        }

        res.locals.linkData = link
        next()
    } catch (error) {
        console.error(error)
        res.sendStatus(STATUS_CODE.SERVER_ERROR)
    }
}

async function validateOpenShortUrl(req, res, next) {

    const {shortUrl} = req.params

    if (!shortUrl) {
        return res.sendStatus(STATUS_CODE.NOT_FOUND)
    }

    try {
        const link = (await connection.query('SELECT * FROM links WHERE "shortUrl" = $1;', [shortUrl])).rows[0]

        if (!link) {
            return res.sendStatus(STATUS_CODE.NOT_FOUND)
        }

        res.locals.linkData = link
        next()

    } catch (error) {
        console.error(error)
        res.sendStatus(STATUS_CODE.SERVER_ERROR)
    }
}

async function validateDeleteUrl(req, res, next) {

    const {id} = req.params
    const userId = res.locals.userId

    try {

        const link = (await connection.query('SELECT * FROM links WHERE id = $1;', [id])).rows[0]

        if (!link) {
            return res.sendStatus(STATUS_CODE.NOT_FOUND)
        }

        const userLink = (await connection.query('SELECT * FROM "usersLinks" WHERE "userId" = $1 AND "linkId" = $2;', [userId, link.id])).rows[0]

        if (!userLink) {
            return res.sendStatus(STATUS_CODE.UNAUTHORIZED)
        }
        res.locals.userLinkData = {link, userId}
        next()
        
    } catch (error) {
        console.error(error)
        res.sendStatus(STATUS_CODE.SERVER_ERROR)
    }
}

function checkUrl(string) {
    try {
        let url = new URL(string)
        return true
    } catch(error) {
        return false
    }
}

export {validateCreateShortUrl, validateListUrlsById, validateOpenShortUrl, validateDeleteUrl}