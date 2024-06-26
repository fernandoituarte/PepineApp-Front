import { PhoneIcon } from "@heroicons/react/20/solid";
import { Title } from "@/components";

export const metadata = {
  title: "Mentions Legales",
  description: "...",
};

export default function Legal() {
  return (
    <div className="px-6 pb-16 m-auto max-w-[800px] mt-5">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <p className="text-base font-semibold leading-7 text-amber-800">
          Pépinière PPD
        </p>
        <Title title={metadata.title} className={"text-center"} />
        <h3 className="mt-6 text-lg font-medium tracking-tight text-green-800 sm:text-xl">
          Edition du site
        </h3>
        <p className="mt-2 text-base leading-8">
          Le présent site est édité par GERANT, société par FORME DE SOCIETE
          (forme de société, au capital de, siège, adresse), immatriculée au
          Registre du Commerce et des Sociétés de VILLE sous le numéro SIRET /
          SIREN et dont le numéro TVA est NUMERO DE TVA.
        </p>
        <h3 className="mt-4 text-base font-medium tracking-tight text-green-800 sm:text-xl">
          Responsable de publication
        </h3>
        <p className="mt-2 text-base leading-8">Monsieur...</p>
        <h3 className="mt-4 text-base font-medium tracking-tight text-green-800 sm:text-xl">
          Hébergeur
        </h3>
        <p className="mt-2 text-base leading-8">
          Le présent site est hébergé par la société Amazon Web Services LLC
          Adresse: P.O. Box 81226, Seattle, WA 98108-1226
        </p>
        <div className="mt-10 max-w-2xl">
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
                par téléphone au 06 19 10 04 12 ou par mail at
                pepiniereppd@gmail.com
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
