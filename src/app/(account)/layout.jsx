import { Dashboard, NavBar } from "@/components";
import { cookies } from "next/headers";

export default function AccountLayout({ children }) {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("user");

  const user = JSON.parse(userCookie.value);
  return (
    <>
      <header className="lg:ml-80 xl:ml-72">
        <NavBar className={"lg:hidden"} user={user} />
      </header>
      <Dashboard role={user.role} />
      <main className="px-0 lg:pl-10 ml-auto mb-6 w-full lg:w-[75%] xl:w-[80%] 2xl:w-[85%] min-h-screen">
        {children}
      </main>
    </>
  );
}
