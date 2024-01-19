import { PrismaClient, Product } from "@prisma/client";

export type ProductCreateType = Product;

export class ProductService {
    prisma = new PrismaClient();

    listAll = async (): Promise<Product[]> => {
        return await this.prisma.product.findMany();
    };

    find = async (data: Product): Promise<Product | Product[]> => {
        return this.prisma.product.findMany({
            where: data,
        });
    };

    create = async (data: ProductCreateType): Promise<Product> => {
        return await this.prisma.product.create({ data });
    };

    update = async (id: string, data: ProductCreateType): Promise<Product> => {
        return await this.prisma.product.update({
            data,
            where: { id },
        });
    };

    delete = async (id: string): Promise<void> => {
        await this.prisma.product.delete({ where: { id } });
    };
}
