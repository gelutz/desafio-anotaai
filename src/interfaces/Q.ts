import { SQS } from "@aws-sdk/client-sqs";
import { env } from "../config/Environment";

export const Q = new SQS({
    region: "us-east-2",
    credentials: {
        accessKeyId: env.awsUserKey,
        secretAccessKey: env.awsSecret,
    },
});
