import { PrismaClient } from "@/prisma/generated/prisma/client";
import { Category, PaymentType } from "./types/types";

const prisma = new PrismaClient();

export const getExpenses = async (
  userId: string,
  page: number = 1,
  size: number = 8,
  fetchAll: boolean = false,
) => {
  const skip = fetchAll ? 0 : (page - 1) * size;
  const take = fetchAll ? undefined : size;
  const [data, total] = await Promise.all([
    prisma.expense.findMany({
      where: { userId },
      skip,
      take,
      orderBy: { date: "desc" },
    }),
    prisma.expense.count({ where: { userId } }),
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
  userId: string,
) => {
  const newExpense = await prisma.expense.create({
    data: {
      title,
      amount,
      date,
      paymentType,
      category,
      subCategory,
      userId,
    },
  });
  return { data: newExpense };
};

export const removeExpense = async (id: string, userId: string) => {
  await prisma.expense.delete({
    where: { id, userId },
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
  userId: string,
) => {
  await prisma.expense.update({
    where: { id, userId },
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
