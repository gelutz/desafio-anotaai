import { Prisma, Product } from "@prisma/client";
import { Optional } from "@prisma/client/runtime/library";
import { prisma } from "../interfaces/Prisma";
import { queueService } from "./QueueService";
import { s3Service } from "./S3Service";

export type CreateProduct = Omit<Product, "id">;

class ProductService {
    private prismaClient = prisma;
    private s3Service = s3Service;
    private queueService = queueService;

    list = async (): Promise<Product[]> => {
        const items = await this.s3Service.listItems();
        if (!items) {
            return [{}] as Product[];
        }

        console.log(items);

        const latestItem = items.reduce((prev, current) => {
            console.log(`prev: ${prev.Key}`, `current: ${current.Key}`);
            if (!prev || (current.LastModified && current.LastModified > prev.LastModified!)) {
                return current;
            }
            return prev;
        });

        const itemName = latestItem.Key!;
        console.log(itemName);
        const item = await this.s3Service.getItem(itemName);

        return JSON.parse(item) as Product[];
    };

    find = async (where: Prisma.ProductFindFirstArgs): Promise<Product | null> => {
        return await this.prismaClient.product.findFirst(where);
    };

    create = async (data: CreateProduct): Promise<Product> => {
        return await this.prismaClient.product.create({ data });
    };

    update = async (id: string, data: Optional<CreateProduct>): Promise<Product> => {
        const updated = await this.prismaClient.product.update({
            data,
            where: { id },
        });

        const queueResponse = await this.queueService.sendMessage("Updated product id: " + updated.id);
        console.log(queueResponse);

        return updated;
    };

    delete = async (id: string): Promise<void> => {
        await this.prismaClient.product.delete({ where: { id } });
    };
}

export const productService = new ProductService();
