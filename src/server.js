import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()

import AuthRouter from "./routers/auth.router.js"
import UrlsRouter from "./routers/urls.router.js"

const server = express()
const PORT = process.env.PORT

server
    .use(cors())
    .use(express.json())
    .use(AuthRouter)
    .use(UrlsRouter)

server.get("/status", (req, res) => {
    res.send("server it's on")
})

server.listen(PORT, () => console.log(`Server listen on PORT ${PORT}`))