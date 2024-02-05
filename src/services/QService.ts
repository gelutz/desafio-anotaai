import { Message, ReceiveMessageCommand, SQS, SendMessageCommand } from "@aws-sdk/client-sqs";
import { env } from "../config/Environment";
import { Q } from "../interfaces/Q";

class QService {
    private client: SQS;
    private queueUrl: string;

    constructor(client: SQS) {
        this.client = client;
        this.queueUrl = env.queueUrl;
    }

    // sendMessage = async (input: Omit<SendMessageCommandInput, "QueueUrl">): Promise<string | undefined> => {
    //     const response = await this.client.send(new SendMessageCommand({ QueueUrl: this.queueUrl, ...input }));

    //     return response.MessageId;
    // };
    sendMessage = async (): Promise<string | undefined> => {
        const response = await this.client.send(
            new SendMessageCommand({
                QueueUrl: this.queueUrl,
                MessageBody: "mensagem teste",
            })
        );

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

export const qService = new QService(Q);
