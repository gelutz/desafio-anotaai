import { S3 } from "@aws-sdk/client-s3";
import { S3Bucket } from "../interfaces/S3";

class FileService {
    private fileUploader;

    constructor(fileUploader: S3) {
        this.fileUploader = fileUploader;
    }
}

export const fileService = new FileService(S3Bucket);
