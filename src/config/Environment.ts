import "dotenv/config";

const env = {
    awsUserKey: process.env.AWS_USER_KEY as string,
    awsSecret: process.env.AWS_SECRET as string,
    servicePort: process.env.PORT || 3001,
    bucketName: process.env.BUCKET_NAME as string,
    queueUrl: process.env.QUEUE_URL as string,
};

for (const v of Object.entries(env)) {
    if (v[1].toString().length == 0) {
        throw new Error("env variable '" + v[0] + "' not set");
    }
}

export { env };

