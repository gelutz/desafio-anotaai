import { Prisma, PrismaClient, Product } from "@prisma/client";

export type CreateProduct = Omit<Product, "id">;

export class ProductService {
    private prisma: PrismaClient;

    constructor(prismaClient: PrismaClient) {
        this.prisma = prismaClient;
    }

    listAll = async (): Promise<Product[]> => {
        return await this.prisma.product.findMany();
    };

    find = async (data: Prisma.ProductFindFirstArgs): Promise<Product | null> => {
        return await this.prisma.product.findFirst(data);
    };

    create = async (data: CreateProduct): Promise<Product> => {
        return await this.prisma.product.create({ data });
    };

    update = async (id: string, data: Prisma.ProductCreateInput): Promise<Product> => {
        return await this.prisma.product.update({
            data,
            where: { id },
        });
    };

    delete = async (id: string): Promise<void> => {
        await this.prisma.product.delete({ where: { id } });
    };
}
