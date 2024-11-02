import { PhoneIcon } from "@heroicons/react/20/solid";
import { Title } from "@/components";

const URL_FRONT = process.env.NEXT_PUBLIC_URL_FRONT;
const EMAIL = process.env.NEXT_PUBLIC_EMAIL;
const PHONE = process.env.NEXT_PUBLIC_PHONE;

export const metadata = {
  title: "Mentions Legales",
  description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur dicta maxime tempore, quasi nobis neque enim! Dolor eveniet voluptatibus assumenda temporibus!`,
  alternates: {
    canonical: `${URL_FRONT}/legal`,
  },
};

export default function Legal() {
  return (
    <article className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
      <Title title={metadata.title} className={"text-center"} />

      <section>
        <h2 className="mt-6 text-lg font-medium tracking-tight text-green-800 sm:text-xl">
          Edition du site
        </h2>
        <p className="mt-2 text-base leading-8">
          Le présent site est édité par GERANT, société par FORME DE SOCIETE
          (forme de société, au capital de, siège, adresse), immatriculée au
          Registre du Commerce et des Sociétés de VILLE sous le numéro SIRET /
          SIREN et dont le numéro TVA est NUMERO DE TVA.
        </p>
      </section>
      <section>
        <h3 className="mt-4 text-base font-medium tracking-tight text-green-800 sm:text-xl">
          Responsable de publication
        </h3>
        <p className="mt-2 text-base leading-8">Monsieur...</p>
      </section>
      <section>
        <h3 className="mt-4 text-base font-medium tracking-tight text-green-800 sm:text-xl">
          Hébergeur
        </h3>
        <p className="mt-2 text-base leading-8">
          Le présent site est hébergé par la société Amazon Web Services LLC
          Adresse: P.O. Box 81226, Seattle, WA 98108-1226
        </p>
      </section>
      <section className="mt-10 max-w-2xl">
        <ul role="list" className="mt-8 max-w-xl space-y-8 text-gray-600">
          <li className="flex gap-x-3">
            <PhoneIcon
              className="mt-1 h-5 w-5 flex-none text-green-800"
              aria-hidden="true"
            />
            <span>
              <strong className="font-semibold text-gray-900">
                Nous contacter
              </strong>{" "}
              par téléphone au {PHONE} ou par mail: {EMAIL}
            </span>
          </li>
        </ul>
      </section>
    </article>
  );
}
