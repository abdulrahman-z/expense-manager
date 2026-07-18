import React from "react";

const tHeaders = ["Title", "Date & Time", "Amount", "Transaction Mode"];
const data = [
  {
    id: 1,
    title: "Entertainment",
    dateTime: "July 18, 4:00 PM",
    amount: 2000,
    transactionMode: "Gpay",
  },
  {
    id: 2,
    title: "Shopping",
    dateTime: "July 18, 4:00 PM",
    amount: 2000,
    transactionMode: "Cash",
  },
  {
    id: 3,
    title: "E-shopping",
    dateTime: "July 18, 4:00 PM",
    amount: 2000,
    transactionMode: "Phonepe",
  },
  {
    id: 4,
    title: "E-shopping",
    dateTime: "July 18, 4:00 PM",
    amount: 2000,
    transactionMode: "Phonepe",
  },
  {
    id: 5,
    title: "E-shopping",
    dateTime: "July 18, 4:00 PM",
    amount: 2000,
    transactionMode: "Phonepe",
  },
];

export default function RecentsView() {
  return (
    <div className='bg-zinc-800 sm:max-w-3/12 md:max-w-6/12 grow mt-8 p-3 rounded-2xl shadow-2xl'>
      <h2 className='text-medium px-2 font-semibold'>Last 5 Transactions</h2>
      <div className='bg-indigo-50 w-full rounded-xl mt-8'>
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
            {data.map((d) => {
              return (
                <tr key={d.id} className='text-black shadow-sm rounded-xl'>
                  <td className='p-3'>{d.title}</td>
                  <td className='p-3'>{d.dateTime}</td>
                  <td className='p-3'>{d.amount}</td>
                  <td className='p-3'>{d.transactionMode}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className='mt-7 flex items-center justify-end p-3'>
        <button className='cursor-pointer'>Go to Transactions</button>
      </div>
    </div>
  );
}
