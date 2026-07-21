import Link from "next/link";
import React from "react";
import { recentTransaction } from "../types/types";

const tHeaders = ["Title", "Date", "Amount", "Payment Type"];

export default function RecentsView({
  recentExpenses,
}: {
  recentExpenses: recentTransaction[];
}) {
  return (
    <div className='bg-zinc-800 flex flex-col xl:max-w-8/12 grow mt-8 p-3 rounded-2xl shadow-2xl'>
      <h2 className='text-medium px-2 font-semibold'>Last 5 Transactions</h2>
      <div className='bg-indigo-50 grow w-full rounded-xl mt-8'>
        <table className='table-auto border-separate border-spacing-y-3 border-spacing-x-2'>
          <thead>
            <tr>
              {tHeaders.map((header, idx) => {
                return (
                  <React.Fragment key={idx}>
                    <th className='text-black text-left font-semibold text-sm p-3'>
                      {header}
                    </th>
                  </React.Fragment>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {recentExpenses?.map((d) => {
              return (
                <tr key={d.id} className='text-black shadow-sm rounded-xl'>
                  <td className='p-3'>{d.title}</td>
                  <td className='p-3'>{d.date.toDateString()}</td>
                  <td className='p-3'>{d.amount}</td>
                  <td className='p-3'>{d.paymentType}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className='mt-7 p-3 flex justify-end'>
        <button className='cursor-pointer'>
          <Link href='/transactions?page=1'>Go to Transactions </Link>
        </button>
      </div>
    </div>
  );
}
