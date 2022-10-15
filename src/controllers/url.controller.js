import STATUS_CODE from "../enums/statusCode.enum.js"
import connection from "../database/database.js"
import {nanoid} from "nanoid"
import { insertUrl, queryLinkId, updateVisitCount, insertUsersLinks, deleteUsersLinks, deleteUrlById} from "../repositories/urls.repository.js"

async function createShortUrl(req, res) {

    const url = res.locals.url
    const userId = res.locals.userId
    const shortUrl = nanoid(8)

    try {
        await insertUrl(url, shortUrl)
        const linkId = await queryLinkId(shortUrl)
        await insertUsersLinks(userId, linkId)
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
        await updateVisitCount(visitCount, linkData.id)
        res.redirect(linkData.url)
        
    } catch (error) {
        res.sendStatus(STATUS_CODE.SERVER_ERROR)
    }
}

async function deleteUrl(req, res) {
    
    const {link, userId} = res.locals.userLinkData
    
    try {
        await deleteUsersLinks(userId, link.id)
        await deleteUrlById(link.id)
        res.sendStatus(204)

    } catch (error) {
        console.error(error)
        res.sendStatus(STATUS_CODE.SERVER_ERROR)
    }
}

export {createShortUrl, listUrlsById, openShortUrl, deleteUrl}