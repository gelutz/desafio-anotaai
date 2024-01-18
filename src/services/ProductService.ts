import { PrismaClient, Product } from "@prisma/client";

export type ProductCreateType = Product;

export class ProductService {
    prisma = new PrismaClient();

    listAll = async (): Promise<Product[]> => {
        return [];
    };

    create = async (data: ProductCreateType): Promise<Product> => {
        return await this.prisma.product.create({ data });
    };
}
