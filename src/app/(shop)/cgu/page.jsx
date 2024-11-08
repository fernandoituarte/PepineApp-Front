import { Title } from "@/components";

const URL_FRONT = process.env.NEXT_PUBLIC_URL_FRONT;

export const metadata = {
  title: "Conditions générales d’utilisation du site",
  description:
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur possimus recusandae? Iusto saepe quas eligendi. Corporis atque ipsam exercitationem quaerat velit?",
  alternates: {
    canonical: `${URL_FRONT}/cgu`,
  },
};

export default function Cgu() {
  return (
    <article className=" mx-auto md:max-w-3xl text-base leading-7 text-gray-700 pb-10">
      <Title title={metadata.title} className={"text-center"} />
      <section>
        <h2 className="mt-6 text-lg font-medium tracking-tight text-green-800 sm:text-xl">
          Article 1 : Objet
        </h2>
        <p className="mt-2 text-base leading-8">
          Les présentes CGU ou Conditions Générales d’Utilisation encadrent
          juridiquement l’utilisation des services du site Poussez-pas-derrière
          (ci-après dénommé « le site »). Constituant le contrat entre la
          société Poussez pas derrière, l’Utilisateur, l’accès au site doit être
          précédé de l’acceptation de ces CGU. L’accès à cette plateforme
          signifie l’acceptation des présentes CGU.
        </p>
      </section>
      <section>
        <h3 className="mt-4 text-base font-medium tracking-tight text-green-800 sm:text-xl">
          Article 2 : Mentions légales
        </h3>
        <p className="mt-2 text-base leading-8">
          L’édition du site Poussez pas derrière est assurée par la société La
          Petite Perle inscrite au RCS sous le numéro xxx xxx xxx, dont le siège
          social est localisé au xxx, 66 690, Saint André, France
          Métropolitaine. L’hébergeur du site Poussez pas derrière.fr est la
          société SOCIETE + ADRESSE
        </p>
      </section>
      <section>
        <h3 className="mt-4 text-base font-medium tracking-tight text-green-800 sm:text-xl">
          Article 3 : Accès au site
        </h3>
        <p className="mt-2 text-base leading-8">
          Le site Poussez pas derrière permet d’accéder gratuitement aux
          services suivants : réservation de EXEMPLE. Le site est accessible
          gratuitement depuis n’importe où par tout utilisateur disposant d’un
          accès à Internet. Tous les frais nécessaires pour l’accès aux services
          (matériel informatique, connexion Internet…) sont à la charge de
          l’utilisateur. L’accès aux services dédiés aux membres s’effectue à
          l’aide d’un identifiant et d’un mot de passe. Pour des raisons de
          maintenance ou autres, l’accès au site peut être interrompu ou
          suspendu par l’éditeur sans préavis ni justification.
        </p>
      </section>
      <section>
        <h3 className="mt-4 text-base font-medium tracking-tight text-green-800 sm:text-xl">
          Article 4 : Collecte des données
        </h3>
        <p className="mt-2 text-base leading-8">
          Pour la création du compte de l’Utilisateur, la collecte des
          informations au moment de l’inscription sur le site est nécessaire et
          obligatoire. Conformément à la loi n°78-17 du 6 janvier relative à
          l’informatique, aux fichiers et aux libertés, la collecte et le
          traitement d’informations personnelles s’effectuent dans le respect de
          la vie privée. Suivant la loi Informatique et Libertés en date du 6
          janvier 1978, articles 39 et 40, l’Utilisateur dispose du droit
          d’accéder, de rectifier, de supprimer et d’opposer ses données
          personnelles. L’exercice de ce droit s’effectue par mail.
        </p>
      </section>
      <section>
        <h3 className="mt-4 text-base font-medium tracking-tight text-green-800 sm:text-xl">
          Article 5 : Propriété intellectuelle
        </h3>
        <p className="mt-2 text-base leading-8">
          Les marques, logos ainsi que les contenus du site Poussez pas derrière
          (illustrations graphiques, textes…) sont protégés par le Code de la
          propriété intellectuelle et par le droit d’auteur. La reproduction et
          la copie des contenus par l’Utilisateur requièrent une autorisation
          préalable du site. Dans ce cas, toute utilisation à des usages
          commerciaux ou à des fins publicitaires est proscrite.
        </p>
      </section>
      <section>
        <h3 className="mt-4 text-base font-medium tracking-tight text-green-800 sm:text-xl">
          Article 6 : Responsabilité
        </h3>
        <p className="mt-2 text-base leading-8">
          Bien que les informations publiées sur le site soient réputées
          fiables, le site se réserve la faculté d’une non-garantie de la
          fiabilité des sources. Les informations diffusées sur le site Poussez
          pas derrière sont présentées à titre purement informatif et sont sans
          valeur contractuelle. En dépit des mises à jour régulières, la
          responsabilité du site ne peut être engagée en cas de modification des
          dispositions administratives et juridiques apparaissant après la
          publication. Il en est de même pour l’utilisation et l’interprétation
          des informations communiquées sur la plateforme. Le site décline toute
          responsabilité concernant les éventuels virus pouvant infecter le
          matériel informatique de l’Utilisateur après l’utilisation ou l’accès
          à ce site. Le site ne peut être tenu pour responsable en cas de force
          majeure ou du fait imprévisible et insurmontable d’un tiers. La
          garantie totale de la sécurité et la confidentialité des données n’est
          pas assurée par le site. Cependant, le site s’engage à mettre en œuvre
          toutes les méthodes requises pour le faire au mieux.
        </p>
      </section>
      <section>
        <h3 className="mt-4 text-base font-medium tracking-tight text-green-800 sm:text-xl">
          Article 7 : Cookies
        </h3>
        <p className="mt-2 text-base leading-8">
          Lors des visites sur le site, l’installation automatique d’un cookie
          sur le logiciel de navigation de l’Utilisateur peut survenir. Les
          cookies correspondent à de petits fichiers déposés temporairement sur
          le disque dur de l’ordinateur de l’Utilisateur. Ces cookies sont
          nécessaires pour assurer l’accessibilité et la navigation sur le site.
          Ces fichiers ne comportent pas d’informations personnelles et ne
          peuvent pas être utilisés pour l’identification d’une personne.
          L’information présente dans les cookies est utilisée pour améliorer
          les performances de navigation sur le site Poussez pas derrière.fr. En
          naviguant sur le site, l’Utilisateur accepte les cookies. Leur
          désactivation peut s’effectuer via les paramètres du logiciel de
          navigation.
        </p>
      </section>
      <section>
        <h3 className="mt-4 text-base font-medium tracking-tight text-green-800 sm:text-xl">
          Article 8 : Durée du contrat
        </h3>
        <p className="mt-2 text-base leading-8">
          Le présent contrat est valable pour une durée indéterminée. Le début
          de l’utilisation des services du site marque l’application du contrat
          à l’égard de l’Utilisateur.
        </p>
      </section>
      <section>
        <h3 className="mt-4 text-base font-medium tracking-tight text-green-800 sm:text-xl">
          Article 9 : Droit applicable et juridiction compétente
        </h3>
        <p className="mt-2 text-base leading-8">
          Le présent contrat est soumis à la législation française. L’absence de
          résolution à l’amiable des cas de litige entre les parties implique le
          recours aux tribunaux français compétents pour régler le contentieux.{" "}
        </p>
      </section>
    </article>
  );
}
