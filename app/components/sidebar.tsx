import { Show, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function SideBar() {
  return (
    <aside className='flex w-1/5 max-w-1/3 border-zinc-100 shadow-xl flex-col bg-white p-4 text-black'>
      <h1 className='font-bold text-xl'>
        <Link href={"/"}>Expense Tracker</Link>
      </h1>
      <nav className='flex flex-col mt-16 gap-3 text-zinc-600 font-semibold tracking-wider text-xl'>
        <div className='flex justify-start'>
          <Show when={"signed-in"}>
            <div className='flex flex-col gap-4'>
              <UserButton />
            </div>
          </Show>
        </div>
        <Link href='/dashboard'>Dashboard</Link>
        <Link href='/transactions'>Transactions</Link>
      </nav>
    </aside>
  );
}
