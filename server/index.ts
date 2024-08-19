


import express, { Request, Response, Application } from "express";
import cors from 'cors';
import { DocManager } from "./managers/DocManager";
const app: Application = express();
app.use(express.urlencoded({ extended: true })); // for x-www-form-urlencoded data
app.use(express.json()); // for JSON data
const PORT = 8000;
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true, 
}))

app.get("/", (req: Request, res: Response) => {
    res.send("hello");
});

const docManager = new DocManager();
app.post("/api/generate", (req: Request, res: Response) => {
    docManager.generate(req, res);
})

app.listen(PORT, () => {
    console.log('listening to port', PORT);
})