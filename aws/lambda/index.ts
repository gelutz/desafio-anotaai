import { Context, SQSBatchResponse, SQSEvent, SQSHandler } from "aws-lambda";
import { S3 } from "aws-sdk";
import { MongoClient } from "mongodb";

const env = {
    accessKeyId: process.env.AWS_USER_KEY!,
    secretAccessKey: process.env.AWS_SECRET!,
    databaseUrl: process.env.DATABASE_URL!,
    bucketName: process.env.BUCKET_NAME!,
};

for (const v of Object.entries(env)) {
    if (v[1].length == 0) {
        throw new Error("env variable '" + v[0] + "' not set");
    }
}

export const handler: SQSHandler = async (__: SQSEvent, _: Context): Promise<void | SQSBatchResponse> => {
    const client = await MongoClient.connect(env.databaseUrl);
    const db = client.db();
    const products = await db
        .collection("products")
        .aggregate([
            {
                $lookup: {
                    from: "categories",
                    localField: "categoryId",
                    foreignField: "_id",
                    as: "category",
                },
            },
        ])
        .map((doc) => {
            return {
                slug: doc.slug,
                title: doc.title,
                description: doc.description,
                price: doc.price,
                category: {
                    ...doc.category[0],
                },
            };
        })
        .toArray();

    const s3 = new S3({
        region: "us-east-2",
        credentials: {
            accessKeyId: env.accessKeyId,
            secretAccessKey: env.secretAccessKey,
        },
    });

    await s3
        .upload({
            Bucket: env.bucketName,
            Key: "output_data.json",
            Body: JSON.stringify(products),
            ContentType: "application/json",
        })
        .promise();
};
