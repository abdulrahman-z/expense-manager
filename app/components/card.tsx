export default function Card({
  title,
  amount,
}: {
  title: string;
  amount: number;
}) {
  return (
    <div className='h-32 w-[300] px-5 py-6 bg-zinc-800 rounded-2xl flex flex-col gap-3'>
      <h2 className='text-3xl font-semibold tracking-wider text-zinc-300'>
        {title}
      </h2>
      <p className='text-3xl flex gap-2 text-white font-bold tracking-wider'>
        <span>&#8377;</span>
        {amount}
      </p>
    </div>
  );
}
