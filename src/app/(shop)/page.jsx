import { CategoriesSwiper, ImagesHeader, About, SubTitle } from "@/components";
import axios from "axios";

const URL = process.env.NEXT_PUBLIC_URL;

export const metadata = {
  title: "Home",
  description:
    "Nous avons décidé de centrer notre pépinière sur les plantes comestibles, offrant ainsi à chacun la possibilité de déambuler dans son jardin ou sur sa terrasse tout en savourant ce qui l'entoure. Si vous souhaitez obtenir davantage d'informations, n'hésitez pas à nous contacter au 06 19 10 04 12",
};

const getCategories = async () => {
  try {
    const response = await axios.get(`${URL}/categories`);
    const categories = response.data.data.category;

    return categories;
  } catch (error) {
    //TODO:
    console.log(error);
  }
};

export default async function Home() {
  const categories = await getCategories();
  return (
    <>
      <ImagesHeader />
      <SubTitle subtitle="Nos categories" className={"text-center"} />
      {categories && <CategoriesSwiper categories={categories} />}
      <About />
    </>
  );
}
