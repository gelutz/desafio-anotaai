import { S3 } from "@aws-sdk/client-s3";
import "dotenv/config";
import { env } from "../config/Environment";

export const S3Bucket = new S3({
    region: "us-east-2",
    credentials: {
        accessKeyId: env.awsUserKey,
        secretAccessKey: env.awsSecret,
    },
});
