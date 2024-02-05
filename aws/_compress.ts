import AdmZip from "adm-zip";
import * as fs from "fs";
import * as path from "path";

const folderToZip = "./dist";
const zipFilePath = "./aws.zip";

(function compressFolder(): void {
    try {
        const zip = new AdmZip();

        const files = fs.readdirSync(folderToZip);

        console.log("Compressing files...");
        for (const file of files) {
            const filePath = path.join(folderToZip, file);
            const stats = fs.statSync(filePath);

            if (stats.isFile()) {
                const baseName = path.basename(filePath);
                console.log("..." + baseName);
                zip.addLocalFile(filePath, baseName);
            } else {
                const baseName = path.basename(filePath);
                console.log("..." + baseName);
                zip.addLocalFolder(filePath, baseName);
            }
        }

        fs.writeFileSync(zipFilePath, zip.toBuffer());

        console.log(`Folder compressed successfully to ${zipFilePath}`);
    } catch (error) {
        console.error("Error compressing folder:", error);
    }
})();
