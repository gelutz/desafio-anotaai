import { Prisma, PrismaClient, Product } from "@prisma/client";
import { Optional } from "@prisma/client/runtime/library";
import { prisma } from "../interfaces/Prisma";
import { s3Service } from "./S3Service";

export type CreateProduct = Omit<Product, "id">;

class ProductService {
    private prisma: PrismaClient;

    constructor(prismaClient: PrismaClient) {
        this.prisma = prismaClient;
    }

    listItems = async (): Promise<void> => {
        const items = await s3Service.listItems();
        console.log(items);
    };

    listAll = async (): Promise<Product[]> => {
        return await this.prisma.product.findMany();
    };

    find = async (data: Prisma.ProductFindFirstArgs): Promise<Product | null> => {
        return await this.prisma.product.findFirst(data);
    };

    create = async (data: CreateProduct): Promise<Product> => {
        return await this.prisma.product.create({ data });
    };

    update = async (id: string, data: Optional<CreateProduct>): Promise<Product> => {
        return await this.prisma.product.update({
            data,
            where: { id },
        });
    };

    delete = async (id: string): Promise<void> => {
        await this.prisma.product.delete({ where: { id } });
    };
}

export const productService = new ProductService(prisma);
