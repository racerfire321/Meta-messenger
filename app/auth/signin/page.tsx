import { getProviders } from "next-auth/react";
import Image from "next/image";
import SignInComponent from "./SignInComponent";

async function SignInPage() {
  const providers = await getProviders();

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mr-5">
        <Image
          className="rounded-full object-cover"
          width={600}
          height={700}
          src="https://links.papareact.com/161"
          alt="Messenger logo"
        />
      </div>
      <SignInComponent providers={providers} />
    </div>
  );
}

export default SignInPage;
