import Link from "next/link";
import Image from "next/image";
import { Title, ForgotPassword } from "@/components";

export const metadata = {
  title: "Connectez-vous",
  description: "Connectez-vous",
};

export default function Page() {
  return (
    <>
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Image
              className="h-8 w-auto m-auto"
              src="/pépinière.png"
              width={500}
              height={500}
              alt=""
            />
            <Title title={"Mot de passe oublié"} className={"text-center"} />
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <ForgotPassword />
          </div>
        </div>
      </>
    </>
  );
}
