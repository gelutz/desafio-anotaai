import archiver from "archiver";
import * as fs from "fs";
import * as path from "path";

// Usage
const inputPaths = ["./dist/index.js", "./dist/package.json", "./dist/package-lock.json", "./dist/node_modules"];
const outputZipPath = "./aws.zip";

zipFilesAndFolders(inputPaths, outputZipPath);

function zipFilesAndFolders(inputPaths: string[], outputZipPath: string): void {
    const output = fs.createWriteStream(outputZipPath);
    const archive = archiver("zip", {
        zlib: { level: 9 }, // Sets the compression level.
    });

    output.on("close", () => {
        console.log(`${archive.pointer()} total bytes`);
        console.log("Archiver has finalized the compressing.");
    });

    archive.on("error", (err) => {
        console.error("Error while zipping:", err);
    });

    archive.pipe(output);

    inputPaths.forEach((inputPath) => {
        if (fs.existsSync(inputPath)) {
            const stat = fs.statSync(inputPath);
            if (stat.isFile()) {
                archive.file(inputPath, { name: path.basename(inputPath) });
            } else if (stat.isDirectory()) {
                archive.directory(inputPath, path.basename(inputPath));
            }
        }
    });

    archive.finalize();
}
