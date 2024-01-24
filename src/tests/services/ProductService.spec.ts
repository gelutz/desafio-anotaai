import { Product } from "@prisma/client";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { prisma } from "../../interfaces/__mocks__/prisma";
import { ProductService } from "../../services/ProductService";

vi.mock("../../interfaces/Prisma.ts");

describe("ProductService", () => {
    let sut: ProductService = new ProductService(prisma);

    describe("find", () => {
        beforeEach(() => {
            sut = new ProductService(prisma);
        });

        it("should return undefined when given an unknown ID", async () => {
            prisma.product.findFirst.mockResolvedValue(null);

            const actual = await sut.find({
                where: {
                    id: "id-inexistente",
                },
            });

            expect(actual).toEqual(null);
        });

        it("should return the object when given a known ID", async () => {
            const productStub: Product = {
                id: "id-teste",
                slug: "slug-teste",
                title: "title-teste",
                description: "description-teste",
                price: 1.99,
                categoryId: "category-teste",
                userId: "user-teste",
            };

            prisma.product.findFirst.mockResolvedValue({ ...productStub });

            const actual = await sut.find({ where: { id: productStub.id } });
            expect(actual).toEqual(productStub);
        });
    });

    describe("create", () => {
        beforeEach(() => {
            sut = new ProductService(prisma);
        });

        it("should return a product after creating", async () => {
            const productStub: Product = {
                id: "id-teste",
                slug: "slug-teste",
                title: "title-teste",
                description: "description-teste",
                price: 1.99,
                categoryId: "category-teste",
                userId: "user-teste",
            };

            prisma.product.create.mockResolvedValue({ ...productStub });

            const actual = await sut.create({ ...productStub });
            expect(actual).toEqual(productStub);
        });
    });
});
