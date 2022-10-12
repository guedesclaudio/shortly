import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()

import AuthRouter from "./routers/auth.router.js"
import UrlsRouter from "./routers/urls.router.js"
import UserRouter from "./routers/user.router.js"
import RankingRouter from "./routers/ranking.router.js"

const server = express()
const PORT = process.env.PORT

server
    .use(cors())
    .use(express.json())
    .use(AuthRouter)
    .use(UrlsRouter)
    .use(UserRouter)
    .use(RankingRouter)

server.get("/status", (req, res) => {
    res.send("server it's on")
})

server.listen(PORT, () => console.log(`Server listen on PORT ${PORT}`))