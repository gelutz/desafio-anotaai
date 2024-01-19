import { PrismaClient, Product } from "@prisma/client";
import { Optional } from "@prisma/client/runtime/library";

export type ProductCreateType = Product;

export class ProductService {
    prisma = new PrismaClient();

    listAll = async (): Promise<Product[]> => {
        return await this.prisma.product.findMany();
    };

    find = async (data: Optional<Product>): Promise<Product | null> => {
        return await this.prisma.product.findFirst({
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
