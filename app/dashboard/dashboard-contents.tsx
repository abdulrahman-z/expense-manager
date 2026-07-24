"use client";

import { useMemo, useState } from "react";
import Card from "../components/card";
import ChartView from "../components/chartview";
import RecentsView from "../components/recents";
import { recentTransaction, transaction } from "../types/types";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function DashboardContent({
  expenses,
  recentExpenses,
}: {
  expenses: transaction[];
  recentExpenses: recentTransaction[];
}) {
  const [selectedMonth, setSelectedMonth] = useState<number | "all">(
    new Date().getMonth(),
  );
  const [selectedYear, setSelectedYear] = useState<number | "all">(
    new Date().getFullYear(),
  );

  const availableYears = useMemo(() => {
    const years = new Set<number>(
      expenses.map((e) => {
        return new Date(e.date).getFullYear();
      }),
    );
    if (years.size === 0) years.add(new Date().getFullYear());
    return Array.from(years).sort((a, b) => b - a);
  }, [expenses]);

  const filteredExpenses = useMemo(() => {
    return expenses.filter((e) => {
      const d = new Date(e.date);
      const matchesYear =
        selectedYear === "all" || d.getFullYear() === selectedYear;
      const matchesMonth =
        selectedMonth === "all" || d.getMonth() === selectedMonth;
      return matchesYear && matchesMonth;
    });
  }, [expenses, selectedMonth, selectedYear]);

  const totalAmount = useMemo(
    () => filteredExpenses.reduce((acc, curr) => acc + curr.amount, 0),
    [filteredExpenses],
  );

  return (
    <div className='p-8 flex flex-col'>
      <h1 className='mb-8 text-2xl font-semibold text-zinc-600'>Dashboard</h1>

      <div className='flex gap-4 mb-6'>
        <select
          id='month'
          value={selectedMonth}
          onChange={(e) =>
            setSelectedMonth(
              e.target.value === "all" ? "all" : Number(e.target.value),
            )
          }
          className='bg-zinc-700 text-white rounded-lg px-3 py-2 text-medium outline-none'
        >
          <option value='all'>All Months</option>
          {MONTH_NAMES.map((m, i) => (
            <option key={m} value={i}>
              {m}
            </option>
          ))}
        </select>

        <select
          id='year'
          value={selectedYear}
          onChange={(e) =>
            setSelectedYear(
              e.target.value === "all" ? "all" : Number(e.target.value),
            )
          }
          className='bg-zinc-700 text-white rounded-lg px-3 py-2 text-medium outline-none'
        >
          <option value='all'>All Years</option>
          {availableYears.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      <div className='flex gap-6 items-center'>
        <Card title='Expenses' amount={totalAmount} />
      </div>

      <div className='text-white mt-6 h-140 flex justify-between gap-4 sm:flex-wrap'>
        <ChartView expenses={filteredExpenses} />
        <RecentsView recentExpenses={recentExpenses} />
      </div>
    </div>
  );
}
