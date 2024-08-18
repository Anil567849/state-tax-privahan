import { createCanvas } from "canvas";
import { LayerManager } from "./LayerManager";
import { Request, Response } from "express";
import fs from 'fs';
import path from 'path';


export class DocManager{

    private layerManager: any;
    private doc: any;
    private ctx: any;

    constructor(){
        this.layerManager = new LayerManager();
        this.doc = createCanvas(1000, 800, "pdf");
        this.ctx = this.doc.getContext('2d');
    }

    async generate(req: Request, res: Response){

        //GETTING DATA
        const {cab, date, time} = req.body; // HP01Z0001 01-JAN-2024 01:00AM

        // BACKGROUND DATE 
        let data = cab + " / " + date + " " + time;
        let text = ""
        for(let i = 0; i < 33; i++){
            if(i == 32){
                text = text + data;
            }else{
                text = text + (data + ", ");
            }
        }
        this.layerManager.addBackgroundDate(this.ctx, text, 20, 25, 1000, 25);

        // HEADINGS 
        const a = "GOVERNMENT OF PUNJAB";
        const b = "Department of Transport";
        const c = "Checkpost Tax e-Receipt";
        this.layerManager.addHeadings(this.ctx, a, b, c, 1000/2, 25);

        // LEFT DETAILS 
        let name = 'OWNER NAME', chassis = 'MB4578986532-4587', phone = "7854212547";
        this.layerManager.addLeftDetails(this.ctx, cab, date, time, name, chassis, phone);

        // RIGHT DETAILS
        this.layerManager.addRightDetails(this.ctx, cab, date, time, name, chassis, phone);

        // LOGO 
        await this.layerManager.addLogo(this.ctx, 250, 60, 200, 220);

        // QR 
        await this.layerManager.addQR(this.ctx, 1000-250, 15, 100, 100);

        // TABLE 
        this.layerManager.addTable(this.ctx, [20, 1000-400, 1000-300, 1000-200], 320);

        // FOOTER 
        this.layerManager.addDetails(this.ctx, 20, 400);

        // SAVE
        this.save();
        res.send('file done');
    }

    save(){
        
        // Ensure the 'pdf' directory exists
        const pdfDir = path.join(__dirname, '../pdf');
        if (!fs.existsSync(pdfDir)) {
            fs.mkdirSync(pdfDir);
        }

        // Path to save the PDF file
        const filePath = path.join(pdfDir, 'canvas-output.pdf');

        const out = fs.createWriteStream(filePath);
        const stream = this.doc.createPDFStream();
        stream.pipe(out);
        out.on('finish', () => {
            console.log('The PDF file was created.');
        });

    }
}