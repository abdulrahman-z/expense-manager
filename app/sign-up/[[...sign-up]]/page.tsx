import { SignUp } from "@clerk/nextjs";

export default async function SignUpUser() {
  return (
    <div className='flex items-center justify-center mt-24'>
      <SignUp />
    </div>
  );
}
