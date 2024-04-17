import { Roboto, Inter, Poppins } from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });

export const titleFont = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const bodyFont = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
});
