import express from "express"
import {validateToken} from "../middlewares/token.middleware.js"
import { validateCreateShortUrl, validateListUrlsById } from "../middlewares/urls.middleware.js"
import { createShortUrl, listUrlsById } from "../controllers/url.controller.js"

const router =  express.Router()

router.post("/urls/shorten", validateToken, validateCreateShortUrl, createShortUrl)
router.get("/urls/:id", validateListUrlsById, listUrlsById)
router.get("/urls/open/:shortUrl")
router.delete("/urls/:id")

export default router