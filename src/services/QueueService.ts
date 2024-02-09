import {
    Message,
    ReceiveMessageCommand,
    SQSClient,
    SendMessageCommand,
    SendMessageCommandInput,
} from "@aws-sdk/client-sqs";
import { env } from "../config/Environment";
import { SQS } from "../interfaces/SQS";

class QueueService {
    private client: SQSClient;
    private queueUrl: string;

    constructor(client: SQSClient) {
        this.client = client;
        this.queueUrl = env.queueUrl;
    }

    // sendMessage = async (): Promise<string | undefined> => {
    //     const response = await this.client.send(new SendMessageCommand({ QueueUrl: this.queueUrl, ...input }));

    //     return response.MessageId;
    // };
    sendMessage = async (
        body: string,
        attributes?: SendMessageCommandInput["MessageAttributes"]
    ): Promise<string | undefined> => {
        const command = new SendMessageCommand({
            QueueUrl: this.queueUrl,
            MessageBody: body,
            MessageAttributes: attributes,
        });

        const response = await this.client.send(command);

        return response.MessageId;
    };

    getMessages = async (): Promise<Message[] | undefined> => {
        const response = await this.client.send(
            new ReceiveMessageCommand({
                QueueUrl: this.queueUrl,
            })
        );

        return response.Messages;
    };
}

export const queueService = new QueueService(SQS);
