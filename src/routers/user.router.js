import express from "express"
import { validateToken } from "../middlewares/token.middleware.js"
import { validateGetUserData } from "../middlewares/user.middleware.js"
import { getUserData } from "../controllers/user.controller.js"

const router = express.Router()

router.get("/users/me", validateToken, validateGetUserData, getUserData)

export default router