import { Context, SQSBatchResponse, SQSEvent, SQSHandler } from "aws-lambda";
import { S3 } from "aws-sdk";

export const handler: SQSHandler = async (event: SQSEvent, _: Context): Promise<void | SQSBatchResponse> => {
    const s3 = new S3({
        region: "us-east-2",
        credentials: {
            accessKeyId: process.env.AWS_USER_KEY!,
            secretAccessKey: process.env.AWS_SECRET!,
        },
    });

    const sqsMessageBody = event.Records[0];
    console.log(sqsMessageBody);
    await s3
        .upload({
            Bucket: process.env.BUCKET_NAME!,
            Key: "output_data.json",
            Body: JSON.stringify("EVENTO TESTE LAMBDA SQS: "),
            ContentType: "application/json",
        })
        .promise();
};
