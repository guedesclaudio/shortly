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

function checkUrl(string) {
    try {
        let url = new URL(string)
        return true
    } catch(error) {
        return false
    }
}

export {validateCreateShortUrl}