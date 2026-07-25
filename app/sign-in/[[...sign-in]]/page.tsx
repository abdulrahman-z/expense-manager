import { SignIn } from "@clerk/nextjs";

export default async function LogIn() {
  return (
    <div className='flex items-center justify-center mt-24'>
      <SignIn />
    </div>
  );
}
