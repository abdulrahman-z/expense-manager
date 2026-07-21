import React from "react";
import ExpenseFormView from "../components/dialog";
import { Button } from "@/components/ui/button";
import { getExpenses } from "../prisma-db";
import { tableHeaders } from "../types/types";
import { deleteExpense } from "../actions/expenses";

export default async function Transactions() {
  const data = await getExpenses();
  return (
    <div className='p-8 flex flex-col h-[860] overflow-y-auto'>
      <div className='flex items-center justify-between w-10/12'>
        <h1 className='text-white text-xl font-semibold'>Transactions</h1>
        <ExpenseFormView dialogTrigger='Add' dialogTitle='Add Expense' />
      </div>

      <div className='bg-[#f8f9fa] grow w-10/12 rounded-xl my-6 overflow-x-auto'>
        <table className='table-auto ml-10 border-separate border-spacing-y-3 border-spacing-x-2'>
          <thead>
            <tr>
              {tableHeaders.map((header, idx) => {
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
            {data?.map((d) => {
              return (
                <tr key={d.id} className='text-black shadow-md rounded-xl'>
                  <td className='p-3'>
                    <ExpenseFormView
                      dialogTrigger={d.title}
                      dialogTitle='Edit Expense'
                    />
                  </td>
                  <td className='p-3'>{d.date.toDateString()}</td>
                  <td className='p-3'>{d.amount}</td>
                  <td className='p-3'>{d.paymentType}</td>
                  <td className='p-3'>{d.category}</td>
                  <td className='p-3'>{d.subCategory}</td>
                  <td className='p-3'>
                    <form action={deleteExpense.bind(null, d.id)}>
                      <Button
                        type='submit'
                        className='cursor-pointer'
                        variant={"destructive"}
                      >
                        Delete
                      </Button>
                    </form>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
