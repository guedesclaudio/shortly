import connection from "../database/database.js"
import STATUS_CODE from "../enums/statusCode.enum.js"
import { queryShortUrl, queryUrl, queryUsersLinks } from "../repositories/urls.repository.js"
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
        const link = await queryUrl(id)
        if (!link) {
            return res.sendStatus(STATUS_CODE.NOT_FOUND)
        }

        res.locals.linkData = link
        next()
    } catch (error) {
        res.sendStatus(STATUS_CODE.SERVER_ERROR)
    }
}

async function validateOpenShortUrl(req, res, next) {

    const {shortUrl} = req.params

    if (!shortUrl) {
        return res.sendStatus(STATUS_CODE.NOT_FOUND)
    }

    try {
        const link = await queryShortUrl(shortUrl)

        if (!link) {
            return res.sendStatus(STATUS_CODE.NOT_FOUND)
        }

        res.locals.linkData = link
        next()

    } catch (error) {
        res.sendStatus(STATUS_CODE.SERVER_ERROR)
    }
}

async function validateDeleteUrl(req, res, next) {

    const {id} = req.params
    const userId = res.locals.userId

    if (isNaN(id)) {
        return res.sendStatus(STATUS_CODE.NOT_FOUND)
    }

    try {
        const link = await queryUrl(id)

        if (!link) {
            return res.sendStatus(STATUS_CODE.NOT_FOUND)
        }

        const userLink = await queryUsersLinks(userId, link.id)
    
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