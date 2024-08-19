import { loadImage } from "canvas";
import path from 'path';

export class LayerManager{
    
    addBackgroundDate(ctx: any, data: string, x: number, y: number, maxWidth: number, lineHeight: number){
        // Set font properties
        ctx.font = '18px "Arial"';
        ctx.fillStyle = "#DADADA"; // Text color
        this.wrapText(ctx, data, x, y, maxWidth, lineHeight);
    }
    
    addHeadings(ctx: any, a: string, b: string, c: string, x: number, y: number){
        // Set font properties
        ctx.font = 'bold 16px "Arial"';
        ctx.fillStyle = "#000000"; // Text color
        ctx.textAlign = "center";

        ctx.fillText(a, x, y);

        ctx.font = 'bold 14px "Arial"';
        ctx.fillText(b, x, y+20);

        ctx.font = 'bold 12px "Arial"';
        ctx.fillText(c, x, y+40);
    }

    addLeftDetails(ctx: any, cab: string, date: string, time: string, name: string, chassis: string, phone: string){
        let key = ['Registration No.', 'Receipt No.', 'Payment Date', 'Owner Name', 'Chassis No.', 'Vehicle Type', 'Mobile No.', 'Sleeper Cap.', 'Bank Ref. No.', " ", 'Service Type', 'Permit Type'];

        for(let i = 0; i < key.length; i++){
            const val = key[i];

            ctx.font = 'normal 10px "Arial"'; 
            ctx.textAlign = "start";
            ctx.fillText(val, 20, 75 + (i*19));
        }
        
        let value = [": " + cab, ': PBT220354125879', ": " + date + " " + time, ": " + name, ": " + chassis, ': CONTRACT CARRIAGE/PASSENGER VEHICLES', ": " + phone, ": 0", ': 254874515', ": ", ': NOT APPLICABLE', ": "]

        for(let i = 0; i < value.length; i++){
            const val = value[i];

            ctx.font = 'normal 10px "Arial"'; 
            ctx.textAlign = "start";
            ctx.fillText(val, 156, 75 + (i*19));
        }
    }

    addRightDetails(ctx: any, barrier: string){
        let key = ['Tax Mode', 'Vehicle Class', 'Checkpost Name', 'Seating Cap(Ex. Driver)', 'Payment Mode', " ", " ", 'Permit Category'];

        for(let i = 0; i < key.length; i++){
            const val = key[i];

            ctx.font = 'normal 10px "Arial"'; 
            ctx.textAlign = "start";
            ctx.fillText(val, 500, 151 + (i*19));
        }

        let values = ['DAYS', 'MOTOR CAB', barrier, '4', 'ONLINE', " ", " ", ""];

        for(let i = 0; i < values.length; i++){
            const val = values[i];

            ctx.font = 'normal 10px "Arial"'; 
            ctx.textAlign = "start";
            ctx.fillText(val, 500+156, 151 + (i*19));
        }
    }

    async addLogo(ctx: any, x: number, y: number, width: number, height: number){
        // Load the image
        const imgPath = path.join(__dirname, '../assets/images/logo.png');
        try {
            const cardImage = await loadImage(imgPath);
            ctx.drawImage(cardImage, x, y, width, height);
        } catch (error) {
            console.log(error);
        }
        
    }

    async addQR(ctx: any, x: number, y: number, width: number, height: number){
        // Load the image
        const imgPath = path.join(__dirname, '../assets/images/qr.png');
        try {
            const cardImage = await loadImage(imgPath);
            ctx.drawImage(cardImage, x, y, width, height);
        } catch (error) {
            console.log(error);
        }
        
    }

    addTable(ctx: any, x: number[], y: number, sDate: string, eDate: string){
        let key = [['Particular', `MV Tax( ${sDate} TO ${eDate} )`, 'Service/User Charge', 'Civic Infra Chess'],
                    ['Fees/Tax', '200', '20', '20'],
                    ['Fine', '0', '0', '0'],
                    ['Total', '0', '0', '0']];
        for(let i = 0; i < 4; i++){
            this.addTableUtils(ctx, x[i], y, key[i]);
        }

    }

    addDetails(ctx: any, x: number, y: number, price: string){
        ctx.font = 'normal 10px "Arial"';
        let arr = [`Grand Total : ${price}/- ( TWO HUNDRED FOURTY ONLY)`,
        'Note : 1) This is a computer generated printout and no signature is required.',
        '2) Incorrect mentioning of vehicle class or seating capacity may lead to tax evasion and defaulter shall be liable for penal action.',
        'You will also receive the payment confirmation message'];

        for(let i = 0; i < arr.length; i++){
            ctx.fillText(arr[i], x, y + (i*19));
        }

    }
    
    private wrapText(context: any, text: any, x: number, y: number, maxWidth: number, lineHeight: number) {
        context.font = '18px "Arial"';
        const words = text.split(' ');
        let line = '';
        for (let i = 0; i < words.length; i++) {
          const testLine = line + words[i] + ' ';
          const metrics = context.measureText(testLine);
          const testWidth = metrics.width;
          if (testWidth > maxWidth && i > 0) {
            context.fillText(line, x, y);
            line = words[i] + ' ';
            y += lineHeight;
          } else {
            line = testLine;
          }
        }
        context.fillText(line, x, y);
    }

    private addTableUtils(ctx: any, x: number, y: number, key: string[]){
        for(let i = 0; i < key.length; i++){
            if(i == 0){
                ctx.font = 'bold 10px "Arial"';
                ctx.textAlign = "start";
                ctx.fillText(key[i], x, y + (i*19));
            }else{
                ctx.font = 'normal 10px "Arial"';
                ctx.textAlign = "start";
                ctx.fillText(key[i], x, y + (i*19));
            }
            this.addLine(ctx, 20, y + (i*19) - 12);
        }
        this.addLine(ctx, 20, y + (key.length*19) -12);
    }

    private addLine(ctx: any, x: number, y: number){

        // Set line properties
        ctx.strokeStyle = 'black'; // Line color
        ctx.lineWidth = 1/2; // Line thickness
        // Draw a horizontal line from x = 20 to x = width - 20 at y = height / 2
        ctx.beginPath();
        ctx.moveTo(x, y); // Starting point (x = 20, y = middle of the canvas)
        ctx.lineTo(1000 - x, y); // Ending point (x = width - 20, y = middle of the canvas)
        ctx.stroke(); // Draw the line
    }

}