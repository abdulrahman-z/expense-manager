import DashboardContent from "./dashboard-contents";
import { getExpenses } from "../prisma-db";
import { recentTransaction, transaction } from "../types/types";

export default async function DashboardPage() {
  const expenses: transaction[] = await getExpenses();
  const recentExpenses: recentTransaction[] = expenses.filter(
    (d, idx) => idx >= expenses.length - 5,
  );

  return (
    <DashboardContent expenses={expenses} recentExpenses={recentExpenses} />
  );
}
