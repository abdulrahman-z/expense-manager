export default function Card({
  title,
  amount,
}: {
  title: string;
  amount: number;
}) {
  return (
    <div className='h-32 w-[300] px-5 py-6 bg-zinc-800 rounded-2xl flex flex-col gap-3'>
      <h2 className='text-2xl font-semibold text-zinc-400'>{title}</h2>
      <p className='text-3xl flex gap-2 text-white font-bold'>
        <span>&#8377;</span>
        {amount}
      </p>
    </div>
  );
}
