"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocManager = void 0;
const canvas_1 = require("canvas");
const LayerManager_1 = require("./LayerManager");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class DocManager {
    constructor() {
        this.layerManager = new LayerManager_1.LayerManager();
        this.doc = (0, canvas_1.createCanvas)(1000, 800, "pdf");
        this.ctx = this.doc.getContext('2d');
    }
    generate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //GETTING DATA
            let { name, cab, chassis, phone, state, barrier, price, date, endDate } = req.body;
            let time = "";
            name = name.toUpperCase();
            cab = cab.toUpperCase();
            chassis = chassis.toUpperCase();
            barrier = barrier.toUpperCase();
            date = date.toUpperCase();
            state = state.toUpperCase();
            endDate = endDate.toUpperCase();
            // BACKGROUND DATE 
            const text = this.getText(cab, date);
            this.layerManager.addBackgroundDate(this.ctx, text, 20, 25, 1000, 25);
            // HEADINGS 
            const a = "GOVERNMENT OF PUNJAB";
            const b = "Department of Transport";
            const c = "Checkpost Tax e-Receipt";
            this.layerManager.addHeadings(this.ctx, a, b, c, 1000 / 2, 25);
            // LEFT DETAILS
            this.layerManager.addLeftDetails(this.ctx, cab, date, time, name, chassis, phone);
            // RIGHT DETAILS
            this.layerManager.addRightDetails(this.ctx, barrier);
            // LOGO 
            yield this.layerManager.addLogo(this.ctx, 250, 60, 200, 220);
            // QR 
            yield this.layerManager.addQR(this.ctx, 1000 - 250, 15, 100, 100);
            // TABLE 
            this.layerManager.addTable(this.ctx, [20, 1000 - 400, 1000 - 300, 1000 - 200], 320, date, endDate);
            // FOOTER 
            this.layerManager.addDetails(this.ctx, 20, 400, price);
            // SAVE
            this.save();
            this.sendFile(res);
        });
    }
    getText(cab, date) {
        let data = cab + " / " + date;
        let text = "";
        for (let i = 0; i < 33; i++) {
            if (i == 32) {
                text = text + data;
            }
            else {
                text = text + (data + ", ");
            }
        }
        return text;
    }
    save() {
        // Ensure the 'pdf' directory exists
        const pdfDir = path_1.default.join(__dirname, '../pdf');
        if (!fs_1.default.existsSync(pdfDir)) {
            fs_1.default.mkdirSync(pdfDir);
        }
        // Path to save the PDF file
        const filePath = path_1.default.join(pdfDir, 'canvas-output.pdf');
        const out = fs_1.default.createWriteStream(filePath);
        const stream = this.doc.createPDFStream();
        stream.pipe(out);
        out.on('finish', () => {
            console.log('The PDF file was created.');
        });
    }
    sendFile(res) {
        // Set headers to indicate a file download
        res.setHeader('Content-Type', 'application/pdf');
        // Content-Disposition Header: This header specifies how the content should be displayed or handled by the browser.
        // attachment: Indicates that the content should be treated as a downloadable file. Instead of displaying it inline (e.g., in the browser), it prompts the user to download the file.
        // filename="canvas-output.pdf": Suggests a default name for the downloaded file. This is the name that will appear in the download dialog when the user saves the file.
        res.setHeader('Content-Disposition', 'attachment; filename="canvas-output.pdf"');
        // Stream the file to the client
        const pdfDir = path_1.default.join(__dirname, '../pdf');
        const filePath = path_1.default.join(pdfDir, 'canvas-output.pdf');
        const fileStream = fs_1.default.createReadStream(filePath);
        fileStream.pipe(res); // it will send response to client
        // Optionally, handle errors
        fileStream.on('error', (error) => {
            console.error('Error streaming file:', error);
            res.status(500).send('Error streaming file');
        });
    }
}
exports.DocManager = DocManager;
