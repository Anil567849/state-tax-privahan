"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const DocManager_1 = require("./managers/DocManager");
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true })); // for x-www-form-urlencoded data
app.use(express_1.default.json()); // for JSON data
const PORT = 8000;
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.get("/", (req, res) => {
    res.send("hello");
});
const docManager = new DocManager_1.DocManager();
app.post("/api/generate", (req, res) => {
    docManager.generate(req, res);
});
app.listen(PORT, () => {
    console.log('listening to port', PORT);
});
