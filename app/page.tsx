import { auth } from "@clerk/nextjs/server";
import { RedirectToSignIn } from "@clerk/nextjs";
import DashboardPage from "./dashboard/page";

export default async function Home() {
  const { userId } = await auth();

  if (!userId) {
    return <RedirectToSignIn />;
  }
  return (
    <div>
      <DashboardPage />
    </div>
  );
}
