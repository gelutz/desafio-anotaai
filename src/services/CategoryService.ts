import { Category, Prisma, PrismaClient } from "@prisma/client";
import { Optional } from "@prisma/client/runtime/library";
import { prisma } from "../interfaces/Prisma";

export type CreateCategory = Omit<Category, "id">;

class CategoryService {
    private prisma: PrismaClient;

    constructor(prismaClient: PrismaClient) {
        this.prisma = prismaClient;
    }

    listAll = async (): Promise<Category[]> => {
        return await this.prisma.category.findMany();
    };

    find = async (data: Prisma.CategoryFindFirstArgs): Promise<Category | null> => {
        return await this.prisma.category.findFirst(data);
    };

    create = async (data: CreateCategory): Promise<Category> => {
        return await this.prisma.category.create({ data });
    };

    update = async (id: string, data: Optional<CreateCategory>): Promise<Category> => {
        return await this.prisma.category.update({
            data,
            where: { id },
        });
    };

    delete = async (id: string): Promise<void> => {
        await this.prisma.category.delete({ where: { id } });
    };
}

export const categoryService = new CategoryService(prisma);
