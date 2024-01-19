import { Product } from "@prisma/client";
import { ProductService } from "../../services/ProductService";

describe("ProductService", () => {
    describe("find", () => {
        const serviceStub: jasmine.SpyObj<ProductService> = jasmine.createSpyObj("prductService", [
            "find",
            "create",
            "update",
            "delete",
            "listAll",
        ]);

        const productStub: Product = {
            id: "id-teste",
            slug: "slug-teste",
            title: "title-teste",
            description: "description-teste",
            price: 1.99,
            categoryId: "category-teste",
            userId: "user-teste",
        };

        it("should be correctly mocked", async () => {
            serviceStub.find
                .withArgs({
                    id: productStub.id,
                })
                .and.resolveTo(productStub);

            const actual = await serviceStub.find({
                id: productStub.id,
            });

            expect(actual).toEqual(productStub);
            expect(serviceStub.find).toHaveBeenCalled();
        });
    });
});
