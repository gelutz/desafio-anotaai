export const env = {
    awsUserKey: process.env.AWS_USER_KEY as string,
    awsSecret: process.env.AWS_SECRET as string,
    servicePort: (process.env.PORT || 3001) as string,
    bucketName: process.env.BUCKET_NAME,
};
