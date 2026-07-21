import DashboardContent from "./dashboard-contents";
import { getExpenses } from "../prisma-db";
import { recentTransaction } from "../types/types";

export default async function DashboardPage() {
  const { data } = await getExpenses(1);
  const recentExpenses: recentTransaction[] = data.filter(
    (d, idx) => idx >= data.length - 5,
  );

  return <DashboardContent expenses={data} recentExpenses={recentExpenses} />;
}
