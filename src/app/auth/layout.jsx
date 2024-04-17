import { NavBar, Footer } from "@/components";

export default function RootLayout({ children }) {
  return (
    <div>
      <header>
        <NavBar />
      </header>
      <div className="bg-white min-h-screen">{children}</div>
      <Footer />
    </div>
  );
}
