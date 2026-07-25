import DashboardContent from "./dashboard-contents";
import { getExpenses } from "../prisma-db";
import { recentTransaction } from "../types/types";
import { auth } from "@clerk/nextjs/server";

export default async function DashboardPage() {
  await auth.protect();

  const { data } = await getExpenses(1, 8, true);
  const recentExpenses: recentTransaction[] = data.filter((d, idx) => idx < 5);

  return <DashboardContent expenses={data} recentExpenses={recentExpenses} />;
}
