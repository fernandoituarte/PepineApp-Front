import { bodyFont } from "@/config/fonts";
import { Providers } from "@/store/Providers";
import CartStorageManager from "./CartStorageManager";
import "./globals.css";

export const metadata = {
  title: "Poussez Pas Derrière",
  description:
    "Nous avons décidé de centrer notre pépinière sur les plantes comestibles, offrant ainsi à chacun la possibilité de déambuler dans son jardin ou sur sa terrasse tout en savourant ce qui l'entoure. Si vous souhaitez obtenir davantage d'informations, n'hésitez pas à nous contacter au 06 19 10 04 12",
};
export const revalidate = 10;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Providers>
        <CartStorageManager />
        <body className={bodyFont.className}>{children}</body>
      </Providers>
    </html>
  );
}
