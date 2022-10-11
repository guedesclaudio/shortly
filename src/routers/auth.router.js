import express from "express"
import {createUser, loginUser} from "../controllers/auth.controller.js"
import {validateCreateUser, validateLoginUser} from "../middlewares/auth.middleware.js"

const router =  express.Router()

router.post("/signup", validateCreateUser, createUser)
router.post("/signin", validateLoginUser, loginUser)

export default router