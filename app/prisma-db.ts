import { PrismaClient } from "@/prisma/generated/prisma/client";
import { Category, PaymentType } from "./types/types";

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

// export const getRecentExpenses = async () => {
//   return await prisma.expense.findMany({
//     take: 5,
//   });
// };

export const addExpense = async (
  title: string,
  amount: number,
  date: Date,
  paymentType: PaymentType,
  category: Category,
  subCategory: string,
) => {
  const newExpense = await prisma.expense.create({
    data: {
      title,
      amount,
      date,
      paymentType,
      category,
      subCategory,
    },
  });
  return { data: newExpense };
};

export const removeExpense = async (id: string) => {
  await prisma.expense.delete({
    where: { id },
  });
};
