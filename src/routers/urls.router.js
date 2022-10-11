import express from "express"
import {validateToken} from "../middlewares/token.middleware.js"

const router =  express.Router()

router.post("/urls/shorten", validateToken)
router.get("/urls/:id")
router.get("/urls/open/:shortUrl")
router.delete("/urls/:id")

export default router