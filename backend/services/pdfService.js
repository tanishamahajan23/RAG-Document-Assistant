import fs from "fs";
import { PDFParse } from "pdf-parse";

async function extractText(filePath) {

    const fileBuffer = await fs.promises.readFile(filePath);

    const parser = new PDFParse({

        data: fileBuffer

    });

    const result = await parser.getText();

    await parser.destroy();

    return result.text;

}

export default extractText;