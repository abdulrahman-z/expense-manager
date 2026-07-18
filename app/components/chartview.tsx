"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { ChartOptions } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ChartView() {
  const data = {
    labels: [
      "Groceries",
      "Shopping",
      "E-shopping",
      "Internet",
      "Entertainment / OTT",
    ],
    datasets: [
      {
        label: "July",
        data: [4000, 2000, 2500, 2000, 20000],
        backgroundColor: [
          "#22c55e",
          "#f59e0b",
          "#3b82f6",
          "#255957",
          "#A98743",
        ],
        borderWidth: 1,
      },
    ],
  };
  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        align: "center",
        labels: {
          color: "#fff",
          padding: 26,
        },
      },
    },
    cutout: "75%",
  };
  return (
    <div className='bg-zinc-800 sm:max-w-3/12 md:max-w-6/12 grow mt-8 rounded-2xl shadow-2xl overflow-auto'>
      <section className='w-100 h-120 p-8 mt-10 ml-20'>
        <Doughnut data={data} options={options} />
      </section>
    </div>
  );
}
