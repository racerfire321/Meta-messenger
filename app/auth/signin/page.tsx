import { getProviders } from "next-auth/react";
import Image from "next/image";
import SignInComponent from "./SignInComponent";


async function SignInPage() {
  const provider = await getProviders();
  
  return (
    <div className="flex-row justify-center">
      <div>
        <Image
          className="rounded-full mx-2 object-cover"
          width={700}
          height={700}
          src="https://links.papareact.com/161"
          alt="messenger logo"
        />
      </div>
      <SignInComponent providers={provider} />
    </div>
  );
}

export default SignInPage;
