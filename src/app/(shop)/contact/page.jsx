/* eslint-disable react/no-unescaped-entities */
import { Title } from "@/components";

export const metadata = {
  title: "Contactez-nous",
  description: "...",
};

const EMAIL = process.env.NEXT_PUBLIC_EMAIL;
const PHONE = process.env.NEXT_PUBLIC_PHONE;

export default function Contact() {
  return (
    <div className="px-6 pb-16 m-auto max-w-[800px] mt-8">
      <div className="mx-auto max-w-2xl text-center">
        <Title title={metadata.title} className={"text-center"} />
        <p className="mt-6 text-lg leading-8 text-gray-600 mb-1">
          Vous avez des questions relatives à la pépinière ou à nos végétaux ?
          Nous sommes là pour vous aider ! N'hésitez pas à nous contacter, et
          nous ferons notre possible pour vous répondre dans les plus brefs
          délais.
        </p>
        <h2 className="mt-6 text-xl font-bold text-gray-900">
          Coordonnées de contact :
        </h2>
        <ul className="text-lg text-gray-600">
          <li>
            Téléphone : <a href={`tel:${PHONE}`}>{PHONE}</a>
          </li>
          <li>
            E-mail : <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </li>
        </ul>

        <h2 className="mt-6 text-xl font-bold text-gray-900">Adresse :</h2>
        <address className="text-lg text-gray-600">
          Pepinière PPD
          <br />
          SAINT-ANDRE 66690
        </address>

        <h2 className="mt-6 text-xl font-bold text-gray-900">
          Réseaux sociaux :
        </h2>
        <p className="mt-3 text-lg text-gray-600">
          Suivez-nous sur{" "}
          <a
            href="https://www.facebook.com/PoussezPasDerriere/"
            className="text-blue-500 hover:underline"
          >
            Pepinière PPD
          </a>{" "}
          pour rester informé(e) de nos dernières actualités et offres
          spéciales.
        </p>

        <p className="mt-6 text-lg text-gray-600">
          N'hésitez pas à nous contacter pour toute demande ou renseignement.
          Nous sommes ravis de vous assister dans vos projets de jardinage et
          d'aménagement extérieur.
        </p>
      </div>
    </div>
  );
}
