import express from "express"
import { listRanking } from "../controllers/ranking.controller.js"

const router = express.Router()

router.get("/ranking", listRanking)

export default router