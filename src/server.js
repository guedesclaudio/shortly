import express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()

const server = express()
const PORT = process.env.PORT

server
    .use(cors())
    .use(express.json())

server.get("/status", (req, res) => {
    res.send("server it's on")
})

server.listen(PORT, () => console.log(`Server listen on PORT ${PORT}`))