import { Category, PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

const seed = async (): Promise<void> => {
    const categories = await prisma.category.findMany();
    if (categories.length < 1) await seedCategories();
    console.log(categories);

    const users = await prisma.user.findMany();
    console.log(users);
    if (users.length < 1) await seedUsers();

    await seedProducts(categories, users);
};

const seedProducts = async (categories: Category[], users: User[]): Promise<void> => {
    const PRODUCT_COUNT = 10;

    for (let i = 0; i < PRODUCT_COUNT; i++) {
        const slug = `category-seed-${i}`;
        const title = `title${i}`;
        const description = `description${i}`;

        const price = new Number(i);
        price.toFixed(2);

        await prisma.product.create({
            data: {
                slug,
                title,
                price: price.valueOf(),
                categoryId: categories[i % 3].id,
                description,
                userId: users[i].id,
            },
        });
    }
};

const seedCategories = async (): Promise<void> => {
    const CATEGORY_COUNT = 3;
    const categoriesData = [];

    for (let i = 0; i < CATEGORY_COUNT; i++) {
        categoriesData.push({
            slug: `category-test-${i}`,
            title: `Title${i}`,
        });
    }

    await prisma.category.createMany({ data: categoriesData });
};

const seedUsers = async (): Promise<void> => {
    const USER_COUNT = 10;

    for (let i = 0; i < USER_COUNT; i++) {
        const name = `user${i}`;
        const email = `email${i}@email.com`;
        const password = `123123${i}`;
        const login = `login-user-${i}`;

        await prisma.user.create({
            data: {
                name,
                login,
                email,
                password,
            },
        });
    }
};

// Call the seed function
seed()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
