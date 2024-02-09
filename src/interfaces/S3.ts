import { S3Client } from "@aws-sdk/client-s3";
import { env } from "../config/Environment";

export const S3Bucket = new S3Client({
    region: "us-east-2",
    credentials: {
        accessKeyId: env.awsUserKey,
        secretAccessKey: env.awsSecret,
    },
});
