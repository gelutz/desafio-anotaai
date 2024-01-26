import { GetObjectCommand, GetObjectCommandOutput, PutObjectCommand, S3 } from "@aws-sdk/client-s3";
import { readFileSync } from "fs";
import { env } from "../config/Environment";
import { S3Bucket } from "../interfaces/S3";

class S3Service {
    private client: S3;
    private bucketName: string;

    constructor(client: S3) {
        this.client = client;
        this.bucketName = env.bucketName;
    }

    checkBucket = async (): Promise<{ success: boolean; data?: unknown }> => {
        try {
            const response = await this.client.headBucket({ Bucket: this.bucketName });

            if (response.$metadata.httpStatusCode == 200) {
                return { success: true };
            }

            return { success: false, data: response };
        } catch (error) {
            console.error(error);
            return { success: false, data: error };
        }
    };

    download = async (path: string): Promise<GetObjectCommandOutput["Body"]> => {
        const response = await this.client.send(
            new GetObjectCommand({
                Bucket: env.bucketName,
                Key: path,
            })
        );
        return response.Body;
    };

    upload = async (path: string): Promise<string> => {
        const file = readFileSync(path);
        const input = {
            Body: file,
            Bucket: this.bucketName,
            Key: path,
        };
        const response = await this.client.send(new PutObjectCommand(input));

        return response.ETag || "";
    };
}

export const s3Service = new S3Service(S3Bucket);
