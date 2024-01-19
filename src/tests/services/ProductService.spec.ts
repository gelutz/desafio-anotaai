import { ProductService } from "../../services/ProductService";

describe("ProductService", () => {
    describe("listAll", () => {
        let productService: ProductService;

        beforeEach(() => {
            productService = new ProductService();
        });

        it("should return an array", async () => {
            return expectAsync(productService.listAll()).toBeResolvedTo([]);
        });
    });
});
