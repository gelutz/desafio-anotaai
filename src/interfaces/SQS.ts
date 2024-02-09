import { SQSClient } from "@aws-sdk/client-sqs";
import { env } from "../config/Environment";

export const SQS = new SQSClient({
    region: "us-east-2",
    credentials: {
        accessKeyId: env.awsUserKey,
        secretAccessKey: env.awsSecret,
    },
});
