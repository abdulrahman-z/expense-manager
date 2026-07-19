import DashboardPage from "./dashboard/page";
import { getExpenses } from "./prisma-db";

export default async function Home() {
  const expensesList = await getExpenses();
  //console.log(expensesList);
  return (
    <>
      <DashboardPage />
    </>
  );
}
