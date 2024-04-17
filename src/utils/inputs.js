export const inputs = {
  mediumInputs: [
    {
      name: "name",
      label: "Nom du produit",
      placeholder: "Entrez le nom du produit",
    },
    {
      name: "scientific_name",
      label: "Nom scientifique",
      placeholder: "Entrez le nom scientifique",
    },
    {
      name: "maturity_height",
      label: "Hauteur de maturité",
      placeholder: "Entrez la hauteur de maturité",
    },
    {
      name: "maturity_width",
      label: "Largeur de maturité",
      placeholder: "Entrez la largeur de maturité",
    },
    { name: "family", label: "Famille", placeholder: "Entrez la famille" },
    { name: "origin", label: "Origine", placeholder: "Entrez l'origine" },
    {
      name: "flower_color",
      label: "Couleur de la fleur",
      placeholder: "Entrez la couleur de la fleur",
    },
    {
      name: "leaf_color",
      label: "Couleur de la feuille",
      placeholder: "Entrez la couleur de la feuille",
    },
  ],
  descriptionInputs: [
    {
      name: "description1",
      label: "Description 1",
      placeholder: "Entrez la description 1",
    },
    {
      name: "description2",
      label: "Description 2",
      placeholder: "Entrez la description 2",
    },
  ],
  smallInputs: [
    { name: "size", label: "Taille", placeholder: "Entrez la taille" },
    { name: "pot", label: "Pot", placeholder: "Entrez le pot" },
    { name: "stock", label: "Stock", placeholder: "Entrez le stock" },
    { name: "price", label: "Prix", placeholder: "Entrez le prix" },
    { name: "vat", label: "TVA", placeholder: "Entrez la TVA" },
  ],

  selectInputs: [
    {
      name: "yield_id",
      label: "Rendement",
      placeholder: "Entrez le rendement",
      options: ["Correct", "Bon", "Très bon", "Excellent"],
    },
    {
      name: "hardiness_zone_id",
      label: "Zone de rusticité",
      placeholder: "Entrez la zone de rusticité",
      options: [
        "Zone 1a : -51,1 à -48,3°C",
        "Zone 1b : -48,3 à -45,6°C",
        "Zone 2a : -45,6 à -42,8°C",
        "Zone 2b : -42,8 à -40°C",
        "Zone 3a : -40 à -37,2°C",
        "Zone 3b : -37,2 à -34,4°C",
        "Zone 4a : -34,4 à -31,7°C",
        "Zone 4b : -31,7 à -28,9°C",
        "Zone 5a : -28,9 à -26,1°C",
        "Zone 5b : -26,1 à -23,3°C",
        "Zone 6a : -23,3 à -20,6°C",
        "Zone 6b : -20,6 à -17,8°C",
        "Zone 7a : -17,8 à -15°C",
        "Zone 7b : -15 à -12,2°C",
        "Zone 8a : -12,2 à -9,4°C",
        "Zone 8b : -9,4 à -6,7°C",
        "Zone 9a : -6,7 à -3,9°C",
        "Zone 9b : -3,9 à -1,1°C",
        "Zone 10a : -1,1 à 1,7°C",
        "Zone 10b : 1,7 à 4,4°C",
        "Zone 11a : 4,4 à 7,2°C",
        "Zone 11b : 7,2 à 10°C",
        "Zone 12a : 10 à 12,8°C",
        "Zone 12b : 12,8 à 15,6°C",
        "Zone 13a : 15,6 à 18,3°C",
        "Zone 13b : 18,3 à 21,1°C",
      ],
    },
    {
      name: "water_requirement_id",
      label: "Besoin en eau",
      placeholder: "Entrez le besoin en eau",
      options: ["Faible", "Moyen", "Fort"],
    },
    {
      name: "exposure_id",
      label: "Exposition",
      placeholder: "Entrez l'exposition",
      options: [
        "Plein Soleil",
        "Ombre légère",
        "Ombre modérée",
        "Pleine ombre",
        "Ombre profonde",
      ],
    },
    {
      name: "ground_cover_power_id",
      label: "Couvrance du sol",
      placeholder: "Entrez la couvrance du sol",
      options: [
        "Mauvais",
        "Correct (Désherbage printemps/été)",
        "Bon",
        "Très bon",
        "Non couvrant",
      ],
    },
    {
      name: "foliage_id",
      label: "Feuillage",
      placeholder: "Entrez le feuillage",
      options: ["Persistant", "Caduc", "Persistant et caduc"],
    },
    {
      name: "strate_id",
      label: "Strate",
      placeholder: "Entrez la strate",
      options: [
        "Arbre",
        "Arbuste",
        "Herbacés haute",
        "Herbacés basse",
        "Couvre-sol",
        "Racine",
        "Grimpante",
      ],
    },
  ],
};
