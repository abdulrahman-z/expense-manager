"use server";

import { revalidatePath } from "next/cache";
import { addExpense } from "../prisma-db";
import { Category, PaymentType } from "../types/types";

export type FormErrors = {
  title?: string;
  amount?: string;
  date?: string;
  paymentType?: string;
  category?: string;
  subCategory?: string;
  general?: string;
};

export type FormState = {
  errors: FormErrors;
  canSubmit: boolean;
};

export const createExpense = async (
  prevState: FormState,
  formData: FormData,
): Promise<FormState> => {
  const title = formData.get("title") as string;
  const amount = formData.get("amount") as string;
  const date = formData.get("date") as string;
  const paymentType = formData.get("payment") as PaymentType;
  const category = formData.get("category") as Category;
  const subCategory = formData.get("subcategory") as string;

  const errors: FormErrors = {};
  if (!title) errors.title = "Title is a required field";
  if (!amount) errors.amount = "Amount is a required field";
  if (!date) errors.date = "Date is a required field";
  if (!paymentType) errors.paymentType = "Payment type is a required field";
  if (!category) errors.category = "Category is a required field";
  if (!subCategory) errors.subCategory = "Sub category is a required field";

  if (Object.keys(errors).length) {
    return { canSubmit: false, errors };
  }

  try {
    const dateObj = new Date(date);
    await addExpense(
      title,
      Number(amount),
      dateObj,
      paymentType,
      category,
      subCategory,
    );
  } catch (err) {
    console.error("createExpense failed:", err);
    return {
      canSubmit: false,
      errors: {
        general: "Something went wrong while saving. Please try again.",
      },
    };
  }

  revalidatePath("/transaction");
  return { canSubmit: true, errors: {} };
};
