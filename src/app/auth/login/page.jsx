import Link from "next/link";
import Image from "next/image";
import { Title } from "@/components";
import { Login } from "./components/Login";

export const metadata = {
  title: "Connectez-vous",
  description: "Connectez-vous",
};

export default function Page() {
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            className="h-8 w-auto m-auto"
            src="/pépinière.png"
            width={40}
            height={40}
            alt=""
          />
          <Title title={"Connectez-vous"} className={"text-center"} />
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Login />
          <p className="text-center text-gray-500">
            Pas encore de compte?{" "}
            <Link
              href="/auth/register"
              className="font-semibold leading-6 text-amber-600 hover:text-amber-500"
            >
              Inscrivez vous
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
