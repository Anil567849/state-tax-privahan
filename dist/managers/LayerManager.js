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
exports.LayerManager = void 0;
const canvas_1 = require("canvas");
const path_1 = __importDefault(require("path"));
class LayerManager {
    addBackgroundDate(ctx, data, x, y, maxWidth, lineHeight) {
        // Set font properties
        ctx.font = '18px "Arial"';
        ctx.fillStyle = "#DADADA"; // Text color
        this.wrapText(ctx, data, x, y, maxWidth, lineHeight);
    }
    addHeadings(ctx, a, b, c, x, y) {
        // Set font properties
        ctx.font = 'bold 16px "Arial"';
        ctx.fillStyle = "#000000"; // Text color
        ctx.textAlign = "center";
        ctx.fillText(a, x, y);
        ctx.font = 'bold 14px "Arial"';
        ctx.fillText(b, x, y + 20);
        ctx.font = 'bold 12px "Arial"';
        ctx.fillText(c, x, y + 40);
    }
    addLeftDetails(ctx, cab, date, time, name, chassis, phone) {
        let key = ['Registration No.', 'Receipt No.', 'Payment Date', 'Owner Name', 'Chassis No.', 'Vehicle Type', 'Mobile No.', 'Sleeper Cap.', 'Bank Ref. No.', " ", 'Service Type', 'Permit Type'];
        for (let i = 0; i < key.length; i++) {
            const val = key[i];
            ctx.font = 'normal 10px "Arial"';
            ctx.textAlign = "start";
            ctx.fillText(val, 20, 75 + (i * 19));
        }
        let value = [": " + cab, ': PBT220354125879', ": " + date + " " + time, ": " + name, ": " + chassis, ': CONTRACT CARRIAGE/PASSENGER VEHICLES', ": " + phone, ": 0", ': 254874515', ": ", ': NOT APPLICABLE', ": "];
        for (let i = 0; i < value.length; i++) {
            const val = value[i];
            ctx.font = 'normal 10px "Arial"';
            ctx.textAlign = "start";
            ctx.fillText(val, 156, 75 + (i * 19));
        }
    }
    addRightDetails(ctx) {
        let key = ['Tax Mode', 'Vehicle Class', 'Checkpost Name', 'Seating Cap(Ex. Driver)', 'Payment Mode', " ", " ", 'Permit Category'];
        for (let i = 0; i < key.length; i++) {
            const val = key[i];
            ctx.font = 'normal 10px "Arial"';
            ctx.textAlign = "start";
            ctx.fillText(val, 500, 151 + (i * 19));
        }
        let values = ['DAYS', 'MOTOR CAB', 'GHANHOULI', '4', 'ONLINE', " ", " ", ""];
        for (let i = 0; i < values.length; i++) {
            const val = values[i];
            ctx.font = 'normal 10px "Arial"';
            ctx.textAlign = "start";
            ctx.fillText(val, 500 + 156, 151 + (i * 19));
        }
    }
    addLogo(ctx, x, y, width, height) {
        return __awaiter(this, void 0, void 0, function* () {
            // Load the image
            const imgPath = path_1.default.join(__dirname, '../assets/images/logo.png');
            try {
                const cardImage = yield (0, canvas_1.loadImage)(imgPath);
                ctx.drawImage(cardImage, x, y, width, height);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    addQR(ctx, x, y, width, height) {
        return __awaiter(this, void 0, void 0, function* () {
            // Load the image
            const imgPath = path_1.default.join(__dirname, '../assets/images/qr.png');
            try {
                const cardImage = yield (0, canvas_1.loadImage)(imgPath);
                ctx.drawImage(cardImage, x, y, width, height);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    addTable(ctx, x, y) {
        let key = [['Particular', 'MV Tax()', 'Service/User Charge', 'Civic Infra Chess'],
            ['Fees/Tax', '200', '20', '20'],
            ['Fine', '0', '0', '0'],
            ['Total', '0', '0', '0']];
        for (let i = 0; i < 4; i++) {
            this.addTableUtils(ctx, x[i], y, key[i]);
        }
    }
    addDetails(ctx, x, y) {
        let arr = ['Grand Total : 240/- ( TWO HUNDRED FOURTY ONLY)',
            'Note : 1) This is a computer generated printout and no signature is required.',
            '2) Incorrect mentioning of vehicle class or seating capacity may lead to tax evasion and defaulter shall be liable for penal action.',
            'You will also receive the payment confirmation message'];
        for (let i = 0; i < arr.length; i++) {
            ctx.fillText(arr[i], x, y + (i * 19));
        }
    }
    wrapText(context, text, x, y, maxWidth, lineHeight) {
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
            }
            else {
                line = testLine;
            }
        }
        context.fillText(line, x, y);
    }
    addTableUtils(ctx, x, y, key) {
        for (let i = 0; i < key.length; i++) {
            if (i == 0) {
                ctx.font = 'bold 10px "Sura"';
                ctx.textAlign = "start";
                ctx.fillText(key[i], x, y + (i * 19));
            }
            else {
                ctx.font = 'normal 10px "Sura"';
                ctx.textAlign = "start";
                ctx.fillText(key[i], x, y + (i * 19));
            }
            this.addLine(ctx, 20, y + (i * 19) - 12);
        }
        this.addLine(ctx, 20, y + (key.length * 19) - 12);
    }
    addLine(ctx, x, y) {
        // Set line properties
        ctx.strokeStyle = 'black'; // Line color
        ctx.lineWidth = 1 / 2; // Line thickness
        // Draw a horizontal line from x = 20 to x = width - 20 at y = height / 2
        ctx.beginPath();
        ctx.moveTo(x, y); // Starting point (x = 20, y = middle of the canvas)
        ctx.lineTo(1000 - x, y); // Ending point (x = width - 20, y = middle of the canvas)
        ctx.stroke(); // Draw the line
    }
}
exports.LayerManager = LayerManager;
