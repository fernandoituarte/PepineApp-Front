import { Categories, ImagesHeader, About, SubTitle } from "@/components";

export const metadata = {
  title: "Home",
  description:
    "Nous avons décidé de centrer notre pépinière sur les plantes comestibles, offrant ainsi à chacun la possibilité de déambuler dans son jardin ou sur sa terrasse tout en savourant ce qui l'entoure. Si vous souhaitez obtenir davantage d'informations, n'hésitez pas à nous contacter au 06 19 10 04 12",
};

export default function Home() {
  return (
    <>
      <ImagesHeader />
      <SubTitle subtitle="Nos categories" className={"text-center"} />
      <Categories />
      <About />
    </>
  );
}
