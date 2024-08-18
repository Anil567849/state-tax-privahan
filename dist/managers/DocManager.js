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
            const { cab, date, time } = req.body; // HP01Z0001 01-JAN-2024 01:00AM
            // BACKGROUND DATE 
            let data = cab + " / " + date + " " + time;
            let text = "";
            for (let i = 0; i < 33; i++) {
                if (i == 32) {
                    text = text + data;
                }
                else {
                    text = text + (data + ", ");
                }
            }
            this.layerManager.addBackgroundDate(this.ctx, text, 20, 25, 1000, 25);
            // HEADINGS 
            const a = "GOVERNMENT OF PUNJAB";
            const b = "Department of Transport";
            const c = "Checkpost Tax e-Receipt";
            this.layerManager.addHeadings(this.ctx, a, b, c, 1000 / 2, 25);
            // LEFT DETAILS 
            let name = 'OWNER NAME', chassis = 'MB4578986532-4587', phone = "7854212547";
            this.layerManager.addLeftDetails(this.ctx, cab, date, time, name, chassis, phone);
            // RIGHT DETAILS
            this.layerManager.addRightDetails(this.ctx, cab, date, time, name, chassis, phone);
            // LOGO 
            yield this.layerManager.addLogo(this.ctx, 250, 60, 200, 220);
            // QR 
            yield this.layerManager.addQR(this.ctx, 1000 - 250, 15, 100, 100);
            // TABLE 
            this.layerManager.addTable(this.ctx, [20, 1000 - 400, 1000 - 300, 1000 - 200], 320);
            // FOOTER 
            this.layerManager.addDetails(this.ctx, 20, 400);
            // SAVE
            this.save();
            res.send('file done');
        });
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
}
exports.DocManager = DocManager;
