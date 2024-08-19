import { createCanvas } from "canvas";
import { LayerManager } from "./LayerManager";
import { Request, Response } from "express";
import fs from 'fs';
import path from 'path';

interface IData {
    name: string, cab: string, chassis: string, phone: string, state: string, barrier: string, price: string, date: string, endDate: string
}


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
        let {name, cab, chassis, phone, state, barrier, price, date, endDate}: IData = req.body;
        
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
        this.layerManager.addHeadings(this.ctx, a, b, c, 1000/2, 25);

        // LEFT DETAILS
        this.layerManager.addLeftDetails(this.ctx, cab, date, time, name, chassis, phone);

        // RIGHT DETAILS
        this.layerManager.addRightDetails(this.ctx, barrier);

        // LOGO 
        await this.layerManager.addLogo(this.ctx, 250, 60, 200, 220);

        // QR 
        await this.layerManager.addQR(this.ctx, 1000-250, 15, 100, 100);

        // TABLE 
        this.layerManager.addTable(this.ctx, [20, 1000-400, 1000-300, 1000-200], 320, date, endDate);

        // FOOTER 
        this.layerManager.addDetails(this.ctx, 20, 400, price);

        // SAVE
        this.save();
        this.sendFile(res);
    }

    private getText(cab: string, date: string){
        let data = cab + " / " + date;
        let text = ""
        for(let i = 0; i < 33; i++){
            if(i == 32){
                text = text + data;
            }else{
                text = text + (data + ", ");
            }
        }
        return text;
    }

    private save(){
        
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

    private sendFile(res: Response){
        
        // Set headers to indicate a file download
        res.setHeader('Content-Type', 'application/pdf');

        // Content-Disposition Header: This header specifies how the content should be displayed or handled by the browser.
        // attachment: Indicates that the content should be treated as a downloadable file. Instead of displaying it inline (e.g., in the browser), it prompts the user to download the file.
        // filename="canvas-output.pdf": Suggests a default name for the downloaded file. This is the name that will appear in the download dialog when the user saves the file.
        res.setHeader('Content-Disposition', 'attachment; filename="canvas-output.pdf"');
        
        // Stream the file to the client
        const pdfDir = path.join(__dirname, '../pdf');
        const filePath = path.join(pdfDir, 'canvas-output.pdf');
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res); // it will send response to client

        // Optionally, handle errors
        fileStream.on('error', (error) => {
            console.error('Error streaming file:', error);
            res.status(500).send('Error streaming file');
        });

    }
}