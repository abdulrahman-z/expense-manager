import { PrismaClient } from "@/prisma/generated/prisma/client";

const prisma = new PrismaClient();

const seedData = async () => {
  const count = await prisma.expense.count();
  if (count === 0) {
    await prisma.expense.createMany({
      data: [
        {
          title: "Book purchase",
          date: new Date(),
          amount: 800,
          paymentType: "GPay",
          category: "shopping",
          subCategory: "shopping",
        },
        {
          title: "IM",
          date: new Date(),
          amount: 200,
          paymentType: "GPay",
          category: "entertainment",
          subCategory: "movie",
        },
      ],
    });
  }
};

seedData();

export const getExpenses = async () => {
  return await prisma.expense.findMany();
};
