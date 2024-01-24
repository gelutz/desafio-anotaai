import { Prisma, PrismaClient, User } from "@prisma/client";
import { prisma } from "../interfaces/Prisma";

export type CreateUser = Omit<User, "id">;

class UserService {
    private prisma: PrismaClient;

    constructor(prismaClient: PrismaClient) {
        this.prisma = prismaClient;
    }

    listAll = async (): Promise<User[]> => {
        return await this.prisma.user.findMany();
    };

    find = async (data: Prisma.UserFindFirstArgs): Promise<User | null> => {
        return await this.prisma.user.findFirst(data);
    };

    getByLogin = async (login: string): Promise<User | null> => {
        const user = await this.prisma.user.findFirst({
            where: { login },
        });
        return user;
    };

    create = async (data: CreateUser): Promise<User> => {
        return await this.prisma.user.create({ data });
    };

    update = async (id: string, data: Prisma.UserCreateInput): Promise<User> => {
        return await this.prisma.user.update({
            data,
            where: { id },
        });
    };

    delete = async (id: string): Promise<void> => {
        await this.prisma.user.delete({ where: { id } });
    };
}

export const userService = new UserService(prisma);
