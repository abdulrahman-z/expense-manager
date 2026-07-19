import Card from "../components/card";
import ChartView from "../components/chartview";
import RecentsView from "../components/recents";

export default function DashboardPage() {
  return (
    <div className='p-8 flex flex-col'>
      <h1 className='mb-8 text-2xl text-black'>Dashboard</h1>
      <div className='flex gap-6 items-center'>
        <Card title='Expenses' amount={0} />
      </div>
      <div className='text-white mt-6 h-140 flex justify-between gap-4 sm:flex-wrap'>
        <ChartView />
        <RecentsView />
      </div>
    </div>
  );
}
