"use client";

import { useMemo } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { ChartOptions } from "chart.js";
import { transaction } from "../types/types";

ChartJS.register(ArcElement, Tooltip, Legend);

const COLORS = [
  "oklch(76.5% 0.177 163.223)",
  "oklch(74.6% 0.16 232.661)",
  "oklch(84.1% 0.238 128.85)",
  "oklch(60.6% 0.25 292.717)",
  "oklch(56% 0.021 213.5)",
  "oklch(64.5% 0.246 16.439)",
  "oklch(48.8% 0.243 264.376)",
  "oklch(90.5% 0.182 98.111)",
  "oklch(37.8% 0.077 168.94)",
];

export default function ChartView({ expenses }: { expenses: transaction[] }) {
  const grouped = useMemo(() => {
    const map = new Map<string, number>();
    for (const e of expenses) {
      map.set(e.category, (map.get(e.category) ?? 0) + e.amount);
    }
    return map;
  }, [expenses]);

  const labelsList = Array.from(grouped.keys());
  const dataValues = Array.from(grouped.values());

  const data = {
    labels: labelsList,
    datasets: [
      {
        label: "",
        data: dataValues,
        backgroundColor: COLORS,
        borderWidth: 2,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    spacing: 1,
    plugins: {
      legend: {
        position: "bottom",
        align: "center",
        labels: {
          color: "#fff",
          padding: 26,
        },
      },
      tooltip: {
        padding: 6,
        boxPadding: 8,
      },
    },
    cutout: "75%",
  };

  return (
    <div className='bg-zinc-800 xl:max-w-8/12 grow mt-8 rounded-2xl shadow-2xl overflow-auto'>
      <section className='h-120 md:w-10/12 mt-12 ml-10'>
        {dataValues.length > 0 ? (
          <Doughnut data={data} options={options} />
        ) : (
          <p className='text-zinc-400 text-sm'>
            No expenses for the selected period.
          </p>
        )}
      </section>
    </div>
  );
}
