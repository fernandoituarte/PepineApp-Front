import { NavBar } from "@/components";
import { Footer } from "./components/footer/Footer";

export default async function RootLayout({ children }) {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main className="bg-white min-h-screen max-w-[1250px] m-auto px-2">
        {children}
      </main>
      <Footer />
    </>
  );
}
