import Card from "../components/card";
import ChartView from "../components/chartview";
import RecentsView from "../components/recents";

export default function DashboardPage() {
  return (
    <div className='p-8 flex flex-col'>
      <h1 className='mb-8 text-2xl text-white'>Dashboard</h1>
      <div className='flex gap-6 items-center'>
        <Card title='Budget' amount={27000} />
        <Card title='Expense' amount={15000} />
        <Card title='Balance' amount={12000} />
      </div>
      <div className='text-white h-[560] flex justify-between gap-8'>
        <ChartView />
        <RecentsView />
      </div>
    </div>
  );
}
