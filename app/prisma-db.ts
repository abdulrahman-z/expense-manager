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

export const getExpenses = async (
  page: number = 1,
  size: number = 8,
  fetchAll: boolean = false,
) => {
  const skip = fetchAll ? 0 : (page - 1) * size;
  const take = fetchAll ? undefined : size;
  const [data, total] = await Promise.all([
    prisma.expense.findMany({
      skip,
      take,
      orderBy: { id: "desc" },
    }),
    prisma.expense.count(),
  ]);
  return { data, total, totalPages: Math.ceil(total / size) };
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

export const updateExpenseData = async (
  id: string,
  title: string,
  amount: number,
  date: Date,
  paymentType: PaymentType,
  category: Category,
  subCategory: string,
) => {
  await prisma.expense.update({
    where: { id },
    data: {
      title,
      amount,
      date,
      paymentType,
      category,
      subCategory,
    },
  });
};
