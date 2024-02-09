import {
    DeleteObjectsCommand,
    DeletedObject,
    GetObjectCommand,
    HeadBucketCommand,
    ListObjectsCommand,
    S3Client,
    _Object,
} from "@aws-sdk/client-s3";
import { env } from "../config/Environment";
import { S3Bucket } from "../interfaces/S3";

class S3Service {
    private client: S3Client;
    private bucketName: string;

    constructor(client: S3Client) {
        this.client = client;
        this.bucketName = env.bucketName;
    }

    checkBucket = async (): Promise<{ success: boolean; data?: unknown }> => {
        try {
            const command = new HeadBucketCommand({ Bucket: this.bucketName });
            const response = await this.client.send(command);

            if (response.$metadata.httpStatusCode == 200) {
                return { success: true };
            }

            return { success: false, data: response };
        } catch (error) {
            console.error(error);
            return { success: false, data: error };
        }
    };

    listItems = async (): Promise<_Object[] | undefined> => {
        const command = new ListObjectsCommand({ Bucket: this.bucketName });
        const response = await this.client.send(command);

        return response.Contents;
    };

    getItem = async (key: string): Promise<string> => {
        const command = new GetObjectCommand({ Key: key, Bucket: this.bucketName });
        const response = await this.client.send(command);

        return response.Body?.transformToString() ?? "";
    };

    deleteItems = async (keys: [{ Key: string; VersionId?: string }]): Promise<DeletedObject[] | undefined> => {
        const command = new DeleteObjectsCommand({
            Delete: {
                Objects: keys,
                Quiet: false,
            },
            Bucket: this.bucketName,
        });

        const response = await this.client.send(command);
        return response.Deleted;
    };
}

export const s3Service = new S3Service(S3Bucket);
