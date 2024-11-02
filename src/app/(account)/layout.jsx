import { NavBar } from "@/components";
import { Dashboard } from "./components/dashboard/Dashboard";

export default async function AccountLayout({ children }) {
  return (
    <>
      <header className="lg:ml-80 xl:ml-72">
        <NavBar className={"lg:hidden"} />
      </header>
      <Dashboard />
      <main className="px-0 lg:pl-10 ml-auto mb-6 w-full lg:w-[75%] xl:w-[80%] 2xl:w-[85%] min-h-screen">
        {children}
      </main>
    </>
  );
}
