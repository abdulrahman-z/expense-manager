import React from "react";
import ExpenseFormView from "../components/dialog";
import { Button } from "@/components/ui/button";

const tHeaders = [
  "Title",
  "Date",
  "Amount",
  "Payment Type",
  "Category",
  "Sub-Category",
  "Actions",
];
const data = [
  {
    id: 1,
    title: "Entertainment",
    date: "July 18 2026",
    amount: 2000,
    transactionMode: "Gpay",
  },
  {
    id: 2,
    title: "Shopping",
    date: "July 18 2026",
    amount: 2000,
    transactionMode: "Cash",
  },
  {
    id: 3,
    title: "E-shopping",
    date: "July 18 2026",
    amount: 2000,
    transactionMode: "Phonepe",
  },
  {
    id: 4,
    title: "E-shopping",
    date: "July 18 2026",
    amount: 2000,
    transactionMode: "Phonepe",
  },
  {
    id: 5,
    title: "E-shopping",
    date: "July 18 2026",
    amount: 2000,
    transactionMode: "Phonepe",
  },
  {
    id: 6,
    title: "E-shopping",
    date: "July 18 2026",
    amount: 2000,
    transactionMode: "Phonepe",
  },
  {
    id: 7,
    title: "E-shopping",
    date: "July 18 2026",
    amount: 2000,
    transactionMode: "Phonepe",
  },
  {
    id: 8,
    title: "E-shopping",
    date: "July 18 2026",
    amount: 2000,
    transactionMode: "Phonepe",
  },
  {
    id: 9,
    title: "E-shopping",
    date: "July 18 2026",
    amount: 2000,
    transactionMode: "Phonepe",
  },
  {
    id: 10,
    title: "E-shopping",
    date: "July 18 2026",
    amount: 2000,
    transactionMode: "Phonepe",
  },
];

export default function Transactions() {
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
            {data.map((d) => {
              return (
                <tr key={d.id} className='text-black shadow-md rounded-xl'>
                  <td className='p-3'>
                    <ExpenseFormView
                      dialogTrigger={d.title}
                      dialogTitle='Edit Expense'
                    />
                  </td>
                  <td className='p-3'>{d.date}</td>
                  <td className='p-3'>{d.amount}</td>
                  <td className='p-3'>{d.transactionMode}</td>
                  <td className='p-3'>{"---"}</td>
                  <td className='p-3'>{"---"}</td>
                  <td className='p-3'>
                    <Button variant={"destructive"}>Delete</Button>
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
