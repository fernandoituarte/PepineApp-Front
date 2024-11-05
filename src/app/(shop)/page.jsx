import { SubTitle } from "@/components";
import { ImagesHeader } from "./components/home/ImagesHeader";
import { About } from "./components/home/About";
import { CategoriesSwiper } from "./categories/components/CategoriesSwiper";

export const metadata = {
  title: "Home",
  description:
    "Nous avons décidé de centrer notre pépinière sur les plantes comestibles, offrant ainsi à chacun la possibilité de déambuler dans son jardin ou sur sa terrasse tout en savourant ce qui l'entoure. Si vous souhaitez obtenir davantage d'informations, n'hésitez pas à nous contacter au 06 19 10 04 12",
};

export default async function Home() {
  return (
    <>
      <ImagesHeader />
      <SubTitle subtitle="Nos categories" className={"text-center"} />
      <CategoriesSwiper />
      <About />
    </>
  );
}
