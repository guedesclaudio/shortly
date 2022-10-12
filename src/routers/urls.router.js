import express from "express"
import {validateToken} from "../middlewares/token.middleware.js"
import { validateCreateShortUrl, validateListUrlsById , validateOpenShortUrl, validateDeleteUrl} from "../middlewares/urls.middleware.js"
import { createShortUrl, deleteUrl, listUrlsById , openShortUrl} from "../controllers/url.controller.js"

const router = express.Router()

router.post("/urls/shorten", validateToken, validateCreateShortUrl, createShortUrl)
router.get("/urls/:id", validateListUrlsById, listUrlsById)
router.get("/urls/open/:shortUrl", validateOpenShortUrl, openShortUrl)
router.delete("/urls/:id", validateToken, validateDeleteUrl, deleteUrl)

export default router