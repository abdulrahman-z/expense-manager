export const Payments = [
  { label: "Select payment type", value: null },
  { label: "Cash", value: "Cash" },
  { label: "Gpay", value: "GPay" },
  { label: "Phonepe", value: "PhonePe" },
  { label: "Debit card", value: "DebitCard" },
];

export const categories = [
  { label: "Select Category", value: null },
  { label: "Internet", value: "internet" },
  { label: "Mobile", value: "mobile" },
  { label: "Food", value: "food" },
  { label: "Entertainment", value: "entertainment" },
  { label: "Shopping", value: "shopping" },
  { label: "Health", value: "health" },
  { label: "PaymentTo", value: "payment-to" },
  // { label: "E-shopping", value: "e-shopping" },
  { label: "Travel", value: "travel" },
  { label: "Others", value: "others" },
];

export const subCategories = [
  { label: "Select Sub-Category", value: null },
  { label: "Bills", value: "bills" },
  { label: "Groceries", value: "groceries" },
  { label: "F-online", value: "f-online" },
  { label: "F-pickup", value: "f-pickup" },
  { label: "Restaurant", value: "restaurant" },
  { label: "Medicine", value: "medicine" },
  { label: "Shopping", value: "shopping" },
  { label: "Fitness", value: "fitness" },
  { label: "Travel", value: "travel" },
  { label: "Others", value: "others" },
];

export type Category =
  | "internet"
  | "bills"
  | "mobile"
  | "food"
  | "entertainment"
  | "shopping"
  | "health"
  | "paymentTo"
  | "travel"
  | "others";

export type PaymentType = "Cash" | "GPay" | "PhonePe" | "DebitCard";

export type transaction = {
  id: string;
  title: string;
  amount: number;
  date: Date;
  category: Category;
  paymentType: PaymentType;
  subCategory: string;
};

export type recentTransaction = {
  id: string;
  title: string;
  amount: number;
  date: Date;
  paymentType: PaymentType;
};

export const tableHeaders = [
  "Title",
  "Date",
  "Amount",
  "Payment Type",
  "Category",
  "Sub-Category",
  "Actions",
];
