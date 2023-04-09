// imports
import http from "http";
import fs from "fs/promises";
import path from "path";
import {addNote} from "./notesController";
import chalk from "chalk";

// create server
const server = http.createServer(async (req, res) => {
    if (req.method === "GET") {
        const content = await fs.readFile(path.join(basePath, "index.ejs"))
        res.writeHead(200, {
            "Content-type": "text/html"
        })
        res.end(content)
    } else if (req.method === "POST") {
        res.writeHead(200, {
            "Content-type": "text/plain; charset=utf-8",
        })
        const body = []
        req.on("data", d => {
            body.push(Buffer.from(d))
        })
        req.on("end", d => {
            const title = body.toString().split("=")[1].replaceAll("+", " ")
            addNote(title)
            res.end(`${title}`)

        })
    }
})

// listen server
server.listen(port,() => {
    console.log(chalk.green(`Server has been started on port ${port}`))
})