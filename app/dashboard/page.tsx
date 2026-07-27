import DashboardContent from "./dashboard-contents";
import { getExpenses } from "../prisma-db";
import { recentTransaction } from "../types/types";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  await auth.protect();

  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }
  const { data } = await getExpenses(userId, 1, 8, true);
  const recentExpenses: recentTransaction[] = data.filter((d, idx) => idx < 5);

  return <DashboardContent expenses={data} recentExpenses={recentExpenses} />;
}
