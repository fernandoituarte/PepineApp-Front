import { NavBar } from "@/components";
import { Footer } from "../(shop)/components/footer/Footer";

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
